"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WordDownloadButton({ 
  data, 
  filename = "download.doc",
  companyName = "Company Name",
  periodInfo = ""
}: { 
  data: any[], 
  filename?: string,
  companyName?: string,
  periodInfo?: string 
}) {
  const handleDownload = () => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    
    let tableHtml = `<table border="1" style="border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 12px; text-align: left;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          ${headers.map(h => `<th style="padding: 8px;">${h}</th>`).join('')}
          <th style="padding: 8px; width: 200px;">Signature</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>
            ${headers.map(h => `<td style="padding: 8px;">${row[h]}</td>`).join('')}
            <td style="padding: 8px;"></td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;

    const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Signature Sheet</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page WordSection1 {
          size: 8.5in 11.0in;
          margin: 1.0in 1.0in 1.0in 1.0in;
        }
        div.WordSection1 { page: WordSection1; }
      </style>
    </head>
    <body>
      <div class="WordSection1">
        <h1 style="text-align: center; font-family: sans-serif;">${companyName}</h1>
        <h2 style="text-align: center; font-family: sans-serif; font-size: 16px;">ATTENDANCE SIGNATURE SHEET</h2>
        <p style="text-align: center; font-family: sans-serif; font-size: 14px;"><strong>Pay Period:</strong> ${periodInfo}</p>
        <br/>
        ${tableHtml}
      </div>
    </body>
    </html>
    `;
    
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button 
      variant="outline"
      onClick={handleDownload}
      className="gap-2"
    >
      <Download className="w-4 h-4" /> Download Word
    </Button>
  )
}
