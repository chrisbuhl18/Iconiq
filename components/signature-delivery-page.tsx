"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Employee } from "@/data/movement-employees"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, Download, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import EmailSignature from "@/components/email-signature"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SignatureDeliveryPageProps {
  companyName: string
  companyLogo: string
  companyColor: string
  companyBrandedGif: string
  employees: Employee[]
  isAdmin?: boolean
}

export default function SignatureDeliveryPage({
  companyName,
  companyLogo,
  companyColor,
  companyBrandedGif,
  employees,
  isAdmin = false,
}: SignatureDeliveryPageProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id || "")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId) || employees[0]

  // Form state for editable fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    scheduleLink: "",
    useCompanyLogo: false,
  })

  // Create a modified employee object with the current form data
  const [modifiedEmployee, setModifiedEmployee] = useState<Employee | null>(null)

  // Initialize form data when selected employee changes
  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        title: selectedEmployee.title,
        phone: selectedEmployee.phone,
        scheduleLink: selectedEmployee.scheduleLink || "",
        useCompanyLogo: selectedEmployee.useCompanyLogo || false,
      })
    }
  }, [selectedEmployee])

  // Update modified employee when form data changes
  useEffect(() => {
    if (selectedEmployee) {
      setModifiedEmployee({
        ...selectedEmployee,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        phone: formData.phone,
        scheduleLink: formData.scheduleLink,
        useCompanyLogo: formData.useCompanyLogo,
        avatarUrl: formData.useCompanyLogo ? companyBrandedGif : selectedEmployee.avatarUrl,
      })
    }
  }, [formData, selectedEmployee, companyBrandedGif])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      useCompanyLogo: checked,
    }))
  }

  const copySignatureToClipboard = async () => {
    const signatureElement = document.getElementById("signature-preview")
    if (signatureElement) {
      try {
        const signatureHtml = signatureElement.innerHTML
        await navigator.clipboard.writeText(signatureHtml)
        setCopied(true)
        toast({
          title: "Signature copied!",
          description: "The HTML signature has been copied to your clipboard.",
        })
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Please try again or use the HTML code directly.",
          variant: "destructive",
        })
      }
    }
  }

  const downloadSignatureAsHtml = () => {
    const signatureElement = document.getElementById("signature-preview")
    if (signatureElement) {
      const signatureHtml = signatureElement.innerHTML
      const blob = new Blob([signatureHtml], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedEmployee.name.replace(" ", "-")}-signature.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Signature downloaded!",
        description: "The HTML signature has been downloaded as a file.",
      })
    }
  }

  // Function to save employee preferences (in a real app, this would connect to a backend)
  const savePreferences = () => {
    // In a real implementation, this would update the database
    toast({
      title: "Preferences saved!",
      description: "Your signature information has been updated.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={companyLogo || "/placeholder.svg"} alt={companyName} className="h-10" />
              <div className="text-2xl font-bold" style={{ color: companyColor }}>
                Email Signature Portal
              </div>
            </div>
            <div className="text-sm text-gray-500">Powered by Lumio</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold mb-6" style={{ color: companyColor }}>
              Get Your Email Signature
            </h1>
            <p className="text-gray-600 mb-8">
              Select your name from the dropdown below to generate your personalized email signature.
            </p>

            {/* Employee Selector */}
            <div className="mb-8">
              <label htmlFor="employee-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Name
              </label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.title.split("//")[0].trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Self-Service Form */}
            {selectedEmployee && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4" style={{ color: companyColor }}>
                  Customize Your Signature
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  You can update your personal information below. Company branding and formatting will remain
                  consistent.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="title" className="text-sm font-medium">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="scheduleLink" className="text-sm font-medium">
                        Scheduling Link (Optional)
                      </Label>
                      <Input
                        id="scheduleLink"
                        name="scheduleLink"
                        value={formData.scheduleLink}
                        onChange={handleInputChange}
                        placeholder="https://calendly.com/your-link"
                        className="mt-1"
                      />
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="avatar-type"
                          checked={formData.useCompanyLogo}
                          onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="avatar-type">Use company logo instead of personal headshot</Label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-7">
                        {formData.useCompanyLogo
                          ? "Using company branded logo"
                          : "Using personal headshot with company branding"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={savePreferences}
                    className="flex items-center gap-2"
                    style={{ backgroundColor: companyColor }}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Signature Preview and Code */}
            {modifiedEmployee && (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="html">HTML Code</TabsTrigger>
                  <TabsTrigger value="instructions">Installation Instructions</TabsTrigger>
                </TabsList>

                <TabsContent value="preview">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4" style={{ color: companyColor }}>
                        Your Email Signature
                      </h2>
                      <div className="border p-6 bg-white rounded-md mb-6">
                        <div id="signature-preview">
                          <EmailSignature employee={modifiedEmployee} companyColor={companyColor} />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={copySignatureToClipboard}
                          className="flex items-center gap-2"
                          style={{ backgroundColor: companyColor }}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copied ? "Copied!" : "Copy Signature"}
                        </Button>
                        <Button onClick={downloadSignatureAsHtml} variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download as HTML
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="html">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4" style={{ color: companyColor }}>
                        HTML Code
                      </h2>
                      <p className="text-gray-600 mb-4">
                        If you need to manually add your signature, copy the HTML code below:
                      </p>
                      <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 mb-4">
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                          {`<div id="signature-preview">
  <EmailSignature employee={modifiedEmployee} companyColor={companyColor} />
</div>`}
                        </pre>
                      </div>
                      <Button
                        onClick={copySignatureToClipboard}
                        className="flex items-center gap-2"
                        style={{ backgroundColor: companyColor }}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy HTML"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructions">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4" style={{ color: companyColor }}>
                        Installation Instructions
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-lg mb-2">Gmail</h3>
                          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                            <li>Click the "Copy Signature" button above</li>
                            <li>Open Gmail and go to Settings (gear icon) &gt; See all settings</li>
                            <li>In the "General" tab, scroll down to the "Signature" section</li>
                            <li>Create a new signature or edit an existing one</li>
                            <li>Paste your copied signature into the editor</li>
                            <li>Scroll down and click "Save Changes"</li>
                          </ol>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg mb-2">Outlook</h3>
                          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                            <li>Click the "Copy Signature" button above</li>
                            <li>Open Outlook and go to File &gt; Options &gt; Mail &gt; Signatures</li>
                            <li>Create a new signature or select an existing one to edit</li>
                            <li>Paste your copied signature into the editor</li>
                            <li>Click "Save" and then "OK"</li>
                          </ol>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg mb-2">Apple Mail</h3>
                          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                            <li>Click the "Copy Signature" button above</li>
                            <li>Open Mail and go to Mail &gt; Preferences &gt; Signatures</li>
                            <li>Select your email account and click the "+" button to add a new signature</li>
                            <li>Name your signature and paste the copied signature</li>
                            <li>Close the preferences window to save</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>
              Having trouble? Contact{" "}
              <a
                href="mailto:support@lumio.com"
                className="text-blue-600 hover:underline"
                style={{ color: companyColor }}
              >
                support@lumio.com
              </a>{" "}
              for assistance.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
