import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { updateCompanySettings } from "./actions"

export default async function CompanySettingsPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('company_settings')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Company Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your company details and employer registration numbers.
        </p>
      </div>

      <form action={updateCompanySettings as any}>
        <div className="grid gap-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                This information will appear on payslips and reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" name="company_name" defaultValue={settings?.company_name || ""} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" defaultValue={settings?.address || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" defaultValue={settings?.email || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" defaultValue={settings?.phone || ""} />
              </div>
            </CardContent>
          </Card>



          <div className="flex justify-end">
            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  )
}
