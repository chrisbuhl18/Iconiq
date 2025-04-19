"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, Download, Eye, EyeOff, User, Info, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EmailSignature } from "@/components/email-signature"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export type Employee = {
  id: string
  name: string
  email: string
  title: string
  department: string
  phone?: string
  mobile?: string
  avatar?: string
  location?: string
  linkedin?: string
  twitter?: string
}

export type CompanyInfo = {
  name: string
  logo: string
  primaryColor: string
  secondaryColor: string
  signatureTemplates: {
    id: string
    name: string
    description: string
  }[]
}

interface SignatureDeliveryPageProps {
  companyInfo: CompanyInfo
  employees: Employee[]
}

export function SignatureDeliveryPage({ companyInfo, employees }: SignatureDeliveryPageProps) {
  const router = useRouter()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState(companyInfo.signatureTemplates[0].id)
  const [showPreview, setShowPreview] = useState(true)
  const [customizations, setCustomizations] = useState({
    showAvatar: true,
    showSocialIcons: true,
    showCompanyLogo: true,
    showMobile: true,
    showLocation: true,
    customTagline: "",
  })

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId) || null
    setSelectedEmployee(employee)
  }

  const handleCopyHTML = () => {
    // In a real implementation, this would get the HTML from the EmailSignature component
    const signatureHTML = document.getElementById("signature-preview")?.innerHTML || ""
    navigator.clipboard.writeText(signatureHTML)
    toast({
      title: "HTML copied to clipboard",
      description: "You can now paste your signature into your email client",
    })
  }

  const handleDownloadHTML = () => {
    // In a real implementation, this would get the HTML from the EmailSignature component
    const signatureHTML = document.getElementById("signature-preview")?.innerHTML || ""
    const blob = new Blob([signatureHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedEmployee?.name.replace(/\s+/g, "-").toLowerCase()}-signature.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({
      title: "Signature downloaded",
      description: "Your HTML signature file has been downloaded",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/delivery")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{companyInfo.name} Email Signatures</h1>
            <p className="text-muted-foreground">Customize and download your email signature</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/signature-templates">
            <Button variant="outline" size="sm">
              <Palette className="mr-2 h-4 w-4" />
              Signature Templates
            </Button>
          </Link>
          <div
            className="h-12 w-auto"
            style={{
              backgroundImage: `url(${companyInfo.logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minWidth: "120px",
            }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Signature Settings</CardTitle>
            <CardDescription>Customize your email signature</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employee">Select Your Name</Label>
              <Select onValueChange={handleEmployeeSelect}>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Select your name" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Signature Template</Label>
              <Select defaultValue={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {companyInfo.signatureTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="customizations">
                <AccordionTrigger>Advanced Customizations</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-avatar" className="cursor-pointer">
                      Show Avatar
                    </Label>
                    <Switch
                      id="show-avatar"
                      checked={customizations.showAvatar}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, showAvatar: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-social" className="cursor-pointer">
                      Show Social Icons
                    </Label>
                    <Switch
                      id="show-social"
                      checked={customizations.showSocialIcons}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, showSocialIcons: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-logo" className="cursor-pointer">
                      Show Company Logo
                    </Label>
                    <Switch
                      id="show-logo"
                      checked={customizations.showCompanyLogo}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, showCompanyLogo: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-mobile" className="cursor-pointer">
                      Show Mobile Number
                    </Label>
                    <Switch
                      id="show-mobile"
                      checked={customizations.showMobile}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, showMobile: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-location" className="cursor-pointer">
                      Show Location
                    </Label>
                    <Switch
                      id="show-location"
                      checked={customizations.showLocation}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, showLocation: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-tagline">Custom Tagline</Label>
                    <Input
                      id="custom-tagline"
                      placeholder="Add a custom tagline (optional)"
                      value={customizations.customTagline}
                      onChange={(e) => setCustomizations({ ...customizations, customTagline: e.target.value })}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button className="w-full" disabled={!selectedEmployee} onClick={handleCopyHTML}>
              <Copy className="mr-2 h-4 w-4" />
              Copy HTML
            </Button>
            <Button variant="outline" className="w-full" disabled={!selectedEmployee} onClick={handleDownloadHTML}>
              <Download className="mr-2 h-4 w-4" />
              Download HTML File
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Signature Preview</CardTitle>
              <CardDescription>See how your signature will appear in emails</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            {!selectedEmployee ? (
              <div className="flex h-64 items-center justify-center rounded-md border border-dashed p-8 text-center">
                <div className="space-y-2">
                  <User className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No Employee Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your name from the dropdown to preview your signature
                  </p>
                </div>
              </div>
            ) : showPreview ? (
              <div id="signature-preview" className="rounded-md border p-6" style={{ backgroundColor: "#ffffff" }}>
                <EmailSignature
                  employee={selectedEmployee}
                  company={companyInfo}
                  template={selectedTemplate}
                  customizations={customizations}
                />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-md border border-dashed p-8 text-center">
                <div className="space-y-2">
                  <EyeOff className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Preview Hidden</h3>
                  <p className="text-sm text-muted-foreground">Click the eye icon to show the preview</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Tabs defaultValue="outlook" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="outlook">Outlook</TabsTrigger>
                <TabsTrigger value="gmail">Gmail</TabsTrigger>
                <TabsTrigger value="apple-mail">Apple Mail</TabsTrigger>
              </TabsList>
              <TabsContent value="outlook" className="space-y-4 pt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <ol className="ml-4 list-decimal space-y-2 text-sm">
                      <li>Copy your signature HTML using the "Copy HTML" button</li>
                      <li>In Outlook, go to File &gt; Options &gt; Mail &gt; Signatures</li>
                      <li>Click "New" to create a new signature</li>
                      <li>Give your signature a name and paste the HTML</li>
                      <li>Click "OK" to save your new signature</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="gmail" className="space-y-4 pt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <ol className="ml-4 list-decimal space-y-2 text-sm">
                      <li>Copy your signature HTML using the "Copy HTML" button</li>
                      <li>In Gmail, click the gear icon and select "See all settings"</li>
                      <li>In the "General" tab, scroll down to the "Signature" section</li>
                      <li>Create a new signature or edit an existing one</li>
                      <li>Paste your signature HTML and click "Save Changes"</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="apple-mail" className="space-y-4 pt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <ol className="ml-4 list-decimal space-y-2 text-sm">
                      <li>Copy your signature HTML using the "Copy HTML" button</li>
                      <li>In Apple Mail, go to Mail &gt; Preferences &gt; Signatures</li>
                      <li>Select your email account and click the "+" button</li>
                      <li>Name your signature and paste the HTML</li>
                      <li>Close the preferences window to save</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
