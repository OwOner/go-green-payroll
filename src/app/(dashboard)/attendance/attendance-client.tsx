"use client"

import { useState, useEffect } from "react"
import { format, eachDayOfInterval, parseISO, isAfter, startOfDay } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, LayoutGrid, List, Search, Upload, FileUp, FileDown, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import { fetchAttendanceMatrix } from "./actions"
import AttendanceDetailDrawer from "./attendance-detail-drawer"
import AttendanceImportModal from "./attendance-import-modal"

type ViewMode = 'grid' | 'list'

interface AttendanceClientProps {
  initialStartDate: string
  initialEndDate: string
}

export default function AttendanceClient({ initialStartDate, initialEndDate }: AttendanceClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  
  const [searchQuery, setSearchQuery] = useState("")
  
  const [employees, setEmployees] = useState<any[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedRecord, setSelectedRecord] = useState<{emp: any, date: string, record: any | null} | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    const { employees: emps, records: recs } = await fetchAttendanceMatrix(startDate, endDate)
    setEmployees(emps)
    setRecords(recs)
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [startDate, endDate])

  const filteredEmployees = employees.filter(e => 
    `${e.first_name} ${e.last_name} ${e.employee_code}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Compute days in interval
  const days: Date[] = []
  try {
    days.push(...eachDayOfInterval({ start: parseISO(startDate), end: parseISO(endDate) }))
  } catch (e) {
    // invalid dates
  }

  // Summary statistics
  const presentCount = records.filter(r => r.status === 'Present').length
  const absentCount = records.filter(r => r.status === 'Absent').length

  const today = startOfDay(new Date())
  const isDateLocked = (dateObj: Date) => isAfter(startOfDay(dateObj), today)

  const handleCellClick = (emp: any, dateObj: Date) => {
    if (isDateLocked(dateObj)) return
    const dateStr = format(dateObj, 'yyyy-MM-dd')
    const existingRecord = records.find(r => r.employee_id === emp.id && r.work_date === dateStr)
    setSelectedRecord({ emp, date: dateStr, record: existingRecord || null })
    setDrawerOpen(true)
  }

  const getStatusDisplay = (record: any | undefined) => {
    if (!record) return { label: "-", color: "text-slate-300", title: "No Record" }
    switch (record.status) {
      case 'Present': return { label: "P", color: "text-emerald-600 bg-emerald-50", title: "Present" }
      case 'Absent': return { label: "A", color: "text-red-600 bg-red-50", title: "Absent" }
      default: return { label: record.status.charAt(0), color: "text-slate-600 bg-slate-100", title: record.status }
    }
  }

  const generateAttendanceExcel = async (isTemplate: boolean) => {
    // Dynamic import to keep bundle size small
    const ExcelJS = (await import('exceljs')).default;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(isTemplate ? 'Template' : 'Attendance Data', {
      views: [
        { state: 'frozen', xSplit: 2, ySplit: 3 }
      ]
    });

    const dateHeadersISO = days.map(d => format(d, 'yyyy-MM-dd'));

    // 1. Legend Row
    sheet.mergeCells(1, 1, 1, days.length + 2);
    const legendCell = sheet.getCell('A1');
    legendCell.value = "Legend: Select 'Present' or 'Absent' from the dropdowns. Leave blank for unrecorded days.";
    legendCell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
    legendCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
    legendCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    // 2. Title Row
    sheet.mergeCells(2, 1, 2, days.length + 2);
    const titleCell = sheet.getCell('A2');
    titleCell.value = isTemplate ? `Attendance Template (${startDate} to ${endDate})` : `Attendance Export (${startDate} to ${endDate})`;
    titleCell.font = { italic: true, color: { argb: 'FF64748B' }, size: 10 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    // 3. Header Row
    // We pass the actual Date objects to exceljs, which preserves the year, but we'll format them to look like "Sep 1"
    const headerRow = sheet.addRow(['Employee Code', 'Employee Name', ...days]);
    headerRow.height = 25;
    
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF000000' } },
        left: { style: 'medium', color: { argb: 'FF000000' } },
        bottom: { style: 'medium', color: { argb: 'FF000000' } },
        right: { style: 'medium', color: { argb: 'FF000000' } }
      };

      if (colNumber > 2) {
        cell.numFmt = 'mmm d'; // This displays "Sep 1" in Excel while keeping the full year in the background
      }
    });

    // Set column widths
    sheet.getColumn(1).width = 18;
    sheet.getColumn(2).width = 30;
    for (let i = 0; i < days.length; i++) {
      sheet.getColumn(i + 3).width = 15;
    }

    // 4. Data Rows
    employees.forEach(emp => {
      const rowData: any[] = [emp.employee_code || '', `${emp.first_name} ${emp.last_name}`];
      
      dateHeadersISO.forEach(dateStr => {
        if (isTemplate) {
          rowData.push('');
        } else {
          const record = records.find(r => r.employee_id === emp.id && r.work_date === dateStr);
          rowData.push(record?.status || '');
        }
      });
      
      const row = sheet.addRow(rowData);
      
      row.eachCell((cell, colNumber) => {
        // Subtle borders
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
        
        if (colNumber > 2) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          
          // Data Validation Dropdown!
          cell.dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"Present,Absent"']
          };

          // Weekend styling (light grey background)
          const d = new Date(dateHeadersISO[colNumber - 3]);
          if (d.getDay() === 0 || d.getDay() === 6) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
          }
        } else {
          cell.alignment = { vertical: 'middle', indent: 1 };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isTemplate ? `attendance_template_${startDate}_to_${endDate}.xlsx` : `attendance_export_${startDate}_to_${endDate}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleExportTemplate = () => generateAttendanceExcel(true)
  const handleExportExcel = () => generateAttendanceExcel(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportTemplate}>
            <FileDown className="mr-2 h-4 w-4 text-slate-500" /> Download Template
          </Button>
          <Button variant="outline" onClick={() => setImportModalOpen(true)}>
            <FileUp className="mr-2 h-4 w-4 text-indigo-500" /> Import Attendance
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-500" /> Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><div className="text-3xl font-black text-slate-900">{filteredEmployees.length}</div><div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Employees</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-3xl font-black text-emerald-600">{presentCount}</div><div className="text-sm font-medium text-emerald-600/80 uppercase tracking-wider mt-1">Present Days</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-3xl font-black text-red-600">{absentCount}</div><div className="text-sm font-medium text-red-600/80 uppercase tracking-wider mt-1">Absent Days</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employee..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-[140px] h-8 text-sm" />
                <span className="text-muted-foreground">to</span>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-[140px] h-8 text-sm" />
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
              <Button variant={viewMode === 'grid' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('grid')}>
                <LayoutGrid className="h-4 w-4 mr-2" /> Grid
              </Button>
              <Button variant={viewMode === 'list' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('list')}>
                <List className="h-4 w-4 mr-2" /> List
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading attendance data...</div>
          ) : viewMode === 'grid' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] sticky left-0 bg-white border-r border-slate-200 z-10 shadow-[1px_0_0_0_#e2e8f0]">Employee</TableHead>
                  {days.map(d => (
                    <TableHead key={d.toISOString()} className="text-center min-w-[50px] px-1 border-b border-slate-200">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">{format(d, 'EEE')}</div>
                      <div className="text-sm font-bold text-slate-900">{format(d, 'd')}</div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map(emp => (
                  <TableRow key={emp.id} className="hover:bg-slate-50/50">
                    <TableCell className="sticky left-0 bg-white border-r border-slate-200 z-10 shadow-[1px_0_0_0_#e2e8f0] font-medium text-xs">
                      {emp.last_name}, {emp.first_name}
                    </TableCell>
                    {days.map(d => {
                      const dateStr = format(d, 'yyyy-MM-dd')
                      const record = records.find(r => r.employee_id === emp.id && r.work_date === dateStr)
                      const display = getStatusDisplay(record)
                      const locked = isDateLocked(d)
                      return (
                        <TableCell 
                          key={dateStr} 
                          className={`text-center p-1 border-b border-slate-100 ${locked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-100'}`}
                          onClick={() => handleCellClick(emp, d)}
                          title={locked ? 'Future dates cannot be edited' : display.title}
                        >
                          <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-md font-bold text-sm ${display.color}`}>
                            {display.label}
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
                {filteredEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={days.length + 1} className="text-center py-8 text-slate-500">No employees found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.filter(r => filteredEmployees.some(e => e.id === r.employee_id)).map(r => {
                  const emp = employees.find(e => e.id === r.employee_id)
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{r.work_date}</TableCell>
                      <TableCell className="font-medium">{emp?.last_name}, {emp?.first_name}</TableCell>
                      <TableCell>
                         <Badge variant={r.status === 'Present' ? 'default' : r.status === 'Absent' ? 'destructive' : 'outline'} className={r.status === 'Present' ? 'bg-emerald-500' : ''}>
                           {r.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">{r.remarks || '-'}</TableCell>
                      <TableCell className="text-right">
                         {!isDateLocked(parseISO(r.work_date)) && (
                           <Button variant="ghost" size="sm" onClick={() => handleCellClick(emp, parseISO(r.work_date))}>Edit</Button>
                         )}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {records.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">No records found for this period.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {drawerOpen && selectedRecord && (
        <AttendanceDetailDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          emp={selectedRecord.emp}
          date={selectedRecord.date}
          record={selectedRecord.record}
          onSaved={loadData}
        />
      )}

      {importModalOpen && (
        <AttendanceImportModal
          open={importModalOpen}
          onOpenChange={setImportModalOpen}
          employees={employees}
          onSaved={loadData}
        />
      )}
    </div>
  )
}
