"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Import our signature templates
import { Template1 } from "@/components/email-templates/template-1"
import { Template2 } from "@/components/email-templates/template-2"
import { Template3 } from "@/components/email-templates/template-3"
import { Template4 } from "@/components/email-templates/template-4"
import { Template5 } from "@/components/email-templates/template-5"
import { Template6 } from "@/components/email-templates/template-6"
import { Template7 } from "@/components/email-templates/template-7"

// Default data
const defaultEmployeeData = {
  name: "Sarah Johnson",
  position: "Chief Marketing Officer",
  phone: "550-354-0506",
  meetingLink: "https://calendly.com/movement-io/sarah",
  email: "sarah@golumio.co",
  photo: "/Sample-Email-Sig.gif",
  mobile: "",
  fax: "",
}

const defaultCompanyData = {
  name: "Lumio",
  website: "golumio.co",
  slogan: "Make Email Memorable",
  address: "123 Email Avenue, San Francisco, CA 94107",
  logo: "/lumio-logo-pale-violet.png",
  icon: "/lumio-lcon-dark-violet.png",
  socialMedia: {
    instagram: "https://instagram.com/lumio",
    twitter: "https://twitter.com/lumio",
    linkedin: "https://linkedin.com/company/lumio",
    facebook: "https://facebook.com/lumio",
    youtube: "https://youtube.com/lumio",
  },
}

// Template definitions
const templates = [
  {
    id: "template1",
    name: "Modern Circle",
    description: "Clean design with circular photo and social icons",
    component: Template1,
    primaryColor: "#4267B2",
  },
  {
    id: "template2",
    name: "Corporate Color",
    description: "Strong brand color with letter prefixes",
    component: Template2,
    primaryColor: "#5F00BA",
    secondaryColor: "#8F8F8F",
  },
  {
    id: "template3",
    name: "Icon Rich",
    description: "Circular photo with colored background and icons",
    component: Template3,
    primaryColor: "#F9C74F",
  },
  {
    id: "template4",
    name: "Banner Promotion",
    description: "Standard contact with marketing banner",
    component: Template4,
    primaryColor: "#E07A5F",
  },
  {
    id: "template5",
    name: "Square Photo",
    description: "Square photo with promotional area",
    component: Template5,
    primaryColor: "#F9C74F",
  },
  {
    id: "template6",
    name: "Professional Services",
    description: "Company logo with disclaimer text",
    component: Template6,
    primaryColor: "#81B29A",
  },
  {
    id: "template7",
    name: "Compact Icon",
    description: "Small company icon with compact layout",
    component: Template7,
    primaryColor: "#3DD1E7",
  },
]

export default function SignatureTemplatesPage() {
  // State for form data
  const [employeeData, setEmployeeData] = useState(defaultEmployeeData)
  const [companyData, setCompanyData] = useState(defaultCompanyData)
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  // Toggle states for showing/hiding elements
  const [showElements, setShowElements] = useState({
    photo: true,
    position: true,
    phone: true,
    mobile: false,
    fax: false,
    email: true,
    meetingLink: true,
    address: true,
    website: true,
    socialMedia: true,
    logo: true,
    icon: false,
    slogan: true,
    banner: false,
    disclaimer: false,
  })

  // Handle employee data changes
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmployeeData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle company data changes
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle social media changes
  const handleSocialChange = (platform: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }))
  }

  // Handle toggle changes
  const handleToggleChange = (element: string, checked: boolean) => {
    setShowElements((prev) => ({ ...prev, [element]: checked }))
  }

  // Handle template selection
  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template)
  }

  // Copy HTML to clipboard
  const copyHtml = () => {
    const signatureElement = document.getElementById("signature-preview")
    if (signatureElement) {
      const html = signatureElement.innerHTML
      navigator.clipboard.writeText(html)
      toast({
        title: "HTML copied to clipboard",
        description: "You can now paste your signature into your email client",
      })
    }
  }

  // Download HTML file
  const downloadHtml = () => {
    const signatureElement = document.getElementById("signature-preview")
    if (signatureElement) {
      const html = signatureElement.innerHTML
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${employeeData.name.replace(/\s+/g, "-").toLowerCase()}-signature.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "HTML file downloaded",
        description: "Your signature HTML file has been downloaded",
      })
    }
  }

  // Get current template component
  const TemplateComponent = selectedTemplate.component

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Email Signature Templates</h1>
      <p className="text-muted-foreground mb-8">
        Customize and preview email signature templates for client demonstrations
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Template selection and data input */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Select Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTemplate.id === template.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="employee">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="toggles">Toggles</TabsTrigger>
            </TabsList>

            <TabsContent value="employee" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={employeeData.name} onChange={handleEmployeeChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Title</Label>
                    <Input
                      id="position"
                      name="position"
                      value={employeeData.position}
                      onChange={handleEmployeeChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={employeeData.email} onChange={handleEmployeeChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={employeeData.phone} onChange={handleEmployeeChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile (Optional)</Label>
                    <Input id="mobile" name="mobile" value={employeeData.mobile} onChange={handleEmployeeChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fax">Fax (Optional)</Label>
                    <Input id="fax" name="fax" value={employeeData.fax} onChange={handleEmployeeChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      name="meetingLink"
                      value={employeeData.meetingLink}
                      onChange={handleEmployeeChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input id="photo" name="photo" value={employeeData.photo} onChange={handleEmployeeChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="name" value={companyData.name} onChange={handleCompanyChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" value={companyData.website} onChange={handleCompanyChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan/Tagline</Label>
                    <Input id="slogan" name="slogan" value={companyData.slogan} onChange={handleCompanyChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={companyData.address}
                      onChange={handleCompanyChange}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input id="logo" name="logo" value={companyData.logo} onChange={handleCompanyChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon URL</Label>
                    <Input id="icon" name="icon" value={companyData.icon} onChange={handleCompanyChange} />
                  </div>

                  <h3 className="font-medium pt-2">Social Media</h3>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <Input
                      id="instagram"
                      value={companyData.socialMedia.instagram}
                      onChange={(e) => handleSocialChange("instagram", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                      <Label htmlFor="twitter">Twitter/X</Label>
                    </div>
                    <Input
                      id="twitter"
                      value={companyData.socialMedia.twitter}
                      onChange={(e) => handleSocialChange("twitter", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                      <Label htmlFor="linkedin">LinkedIn</Label>
                    </div>
                    <Input
                      id="linkedin"
                      value={companyData.socialMedia.linkedin}
                      onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                      <Label htmlFor="facebook">Facebook</Label>
                    </div>
                    <Input
                      id="facebook"
                      value={companyData.socialMedia.facebook}
                      onChange={(e) => handleSocialChange("facebook", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Youtube className="h-4 w-4 mr-2 text-red-600" />
                      <Label htmlFor="youtube">YouTube</Label>
                    </div>
                    <Input
                      id="youtube"
                      value={companyData.socialMedia.youtube}
                      onChange={(e) => handleSocialChange("youtube", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="toggles">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-photo" className="cursor-pointer">
                        Show Photo
                      </Label>
                      <Switch
                        id="toggle-photo"
                        checked={showElements.photo}
                        onCheckedChange={(checked) => handleToggleChange("photo", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-position" className="cursor-pointer">
                        Show Position
                      </Label>
                      <Switch
                        id="toggle-position"
                        checked={showElements.position}
                        onCheckedChange={(checked) => handleToggleChange("position", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-phone" className="cursor-pointer">
                        Show Phone
                      </Label>
                      <Switch
                        id="toggle-phone"
                        checked={showElements.phone}
                        onCheckedChange={(checked) => handleToggleChange("phone", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-mobile" className="cursor-pointer">
                        Show Mobile
                      </Label>
                      <Switch
                        id="toggle-mobile"
                        checked={showElements.mobile}
                        onCheckedChange={(checked) => handleToggleChange("mobile", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-fax" className="cursor-pointer">
                        Show Fax
                      </Label>
                      <Switch
                        id="toggle-fax"
                        checked={showElements.fax}
                        onCheckedChange={(checked) => handleToggleChange("fax", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-email" className="cursor-pointer">
                        Show Email
                      </Label>
                      <Switch
                        id="toggle-email"
                        checked={showElements.email}
                        onCheckedChange={(checked) => handleToggleChange("email", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-meeting" className="cursor-pointer">
                        Show Meeting Link
                      </Label>
                      <Switch
                        id="toggle-meeting"
                        checked={showElements.meetingLink}
                        onCheckedChange={(checked) => handleToggleChange("meetingLink", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-address" className="cursor-pointer">
                        Show Address
                      </Label>
                      <Switch
                        id="toggle-address"
                        checked={showElements.address}
                        onCheckedChange={(checked) => handleToggleChange("address", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-website" className="cursor-pointer">
                        Show Website
                      </Label>
                      <Switch
                        id="toggle-website"
                        checked={showElements.website}
                        onCheckedChange={(checked) => handleToggleChange("website", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-social" className="cursor-pointer">
                        Show Social Media
                      </Label>
                      <Switch
                        id="toggle-social"
                        checked={showElements.socialMedia}
                        onCheckedChange={(checked) => handleToggleChange("socialMedia", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-logo" className="cursor-pointer">
                        Show Logo
                      </Label>
                      <Switch
                        id="toggle-logo"
                        checked={showElements.logo}
                        onCheckedChange={(checked) => handleToggleChange("logo", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-icon" className="cursor-pointer">
                        Show Icon
                      </Label>
                      <Switch
                        id="toggle-icon"
                        checked={showElements.icon}
                        onCheckedChange={(checked) => handleToggleChange("icon", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-slogan" className="cursor-pointer">
                        Show Slogan
                      </Label>
                      <Switch
                        id="toggle-slogan"
                        checked={showElements.slogan}
                        onCheckedChange={(checked) => handleToggleChange("slogan", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-banner" className="cursor-pointer">
                        Show Banner
                      </Label>
                      <Switch
                        id="toggle-banner"
                        checked={showElements.banner}
                        onCheckedChange={(checked) => handleToggleChange("banner", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle-disclaimer" className="cursor-pointer">
                        Show Disclaimer
                      </Label>
                      <Switch
                        id="toggle-disclaimer"
                        checked={showElements.disclaimer}
                        onCheckedChange={(checked) => handleToggleChange("disclaimer", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column: Preview and export */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={copyHtml}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy HTML
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadHtml}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-white">
                <div id="signature-preview">
                  <TemplateComponent
                    employee={employeeData}
                    company={companyData}
                    showElements={showElements}
                    primaryColor={selectedTemplate.primaryColor}
                    secondaryColor={selectedTemplate.secondaryColor}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Installation Instructions</h2>

              <Tabs defaultValue="outlook">
                <TabsList className="mb-4">
                  <TabsTrigger value="outlook">Outlook</TabsTrigger>
                  <TabsTrigger value="gmail">Gmail</TabsTrigger>
                  <TabsTrigger value="apple">Apple Mail</TabsTrigger>
                </TabsList>

                <TabsContent value="outlook">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy your signature HTML using the "Copy HTML" button above</li>
                    <li>In Outlook, go to File &gt; Options &gt; Mail &gt; Signatures</li>
                    <li>Click "New" to create a new signature</li>
                    <li>Give your signature a name and paste the HTML</li>
                    <li>Click "OK" to save your new signature</li>
                  </ol>
                </TabsContent>

                <TabsContent value="gmail">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy your signature HTML using the "Copy HTML" button above</li>
                    <li>In Gmail, click the gear icon and select "See all settings"</li>
                    <li>In the "General" tab, scroll down to the "Signature" section</li>
                    <li>Create a new signature or edit an existing one</li>
                    <li>Paste your signature HTML and click "Save Changes"</li>
                  </ol>
                </TabsContent>

                <TabsContent value="apple">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy your signature HTML using the "Copy HTML" button above</li>
                    <li>In Apple Mail, go to Mail &gt; Preferences &gt; Signatures</li>
                    <li>Select your email account and click the "+" button</li>
                    <li>Name your signature and paste the HTML</li>
                    <li>Close the preferences window to save</li>
                  </ol>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
