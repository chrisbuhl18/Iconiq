"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { movementEmployees } from "@/data/movement-employees"

export default function SignatureAdminPage() {
  const [employees, setEmployees] = useState(movementEmployees)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!csvFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would parse the CSV and update the database
    toast({
      title: "CSV uploaded successfully",
      description: `Processed ${csvFile.name} with employee data.`,
    })

    // Reset the file input
    setCsvFile(null)
    const fileInput = document.getElementById("csv-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const downloadTemplate = () => {
    // Create CSV template content
    const csvContent =
      "id,name,firstName,lastName,title,email,phone,avatarUrl,useCompanyLogo,scheduleLink\n" +
      "john-doe,John Doe,JOHN,DOE,Marketing Manager,john@movement.io,(616) 555-1234,/animations/sample-avatar.gif,true,https://calendly.com/movement-io/john\n" +
      "jane-smith,Jane Smith,JANE,SMITH,Creative Director,jane@movement.io,(616) 555-5678,/animations/sample-email-sig.gif,false,"

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "employee-signature-template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded to your device.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-english-violet">Lumio</span>
              <span className="text-xl">Admin Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-english-violet">Email Signature Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* CSV Upload Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Employee Data</CardTitle>
                <CardDescription>
                  Upload a CSV file with employee information to create or update signatures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="csv-upload">CSV File</Label>
                    <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
                <Button onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Signature Stats</CardTitle>
                <CardDescription>Overview of your email signature system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Employees:</span>
                    <span className="text-lg font-bold">{employees.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Using Company Logo:</span>
                    <span className="text-lg font-bold">{employees.filter((emp) => emp.useCompanyLogo).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Using Personal Headshot:</span>
                    <span className="text-lg font-bold">{employees.filter((emp) => !emp.useCompanyLogo).length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Reports
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Employee
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Company Settings
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Actions
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Employee Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Signatures</CardTitle>
              <CardDescription>Manage individual employee signature settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avatar Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.title.split("//")[0].trim()}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        {employee.useCompanyLogo ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Company Logo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Personal Headshot
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
