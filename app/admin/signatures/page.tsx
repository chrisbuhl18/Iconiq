"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Trash2, Plus, Search, FileSpreadsheet, Users, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { movementEmployees } from "@/data/movement-employees"

export default function AdminSignaturesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [csvContent, setCsvContent] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedEmployees, setUploadedEmployees] = useState<any[]>([])

  // Companies data - in a real app, this would come from a database
  const companies = [
    { id: "movement", name: "Movement", employeeCount: 124, signatureCount: 3 },
    { id: "acme", name: "Acme Inc", employeeCount: 56, signatureCount: 2 },
    { id: "globex", name: "Globex Corp", employeeCount: 78, signatureCount: 1 },
  ]

  // Filter employees based on search query
  const filteredEmployees = movementEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setCsvContent(content)

      // Parse CSV (simplified for demo)
      const lines = content.split("\n")
      const headers = lines[0].split(",")

      const parsedEmployees = []
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue

        const values = lines[i].split(",")
        const employee: Record<string, string> = {}

        headers.forEach((header, index) => {
          employee[header.trim()] = values[index]?.trim() || ""
        })

        parsedEmployees.push(employee)
      }

      setUploadedEmployees(parsedEmployees)
      setIsUploading(false)
    }

    reader.readAsText(file)
  }

  const processUpload = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "CSV processed successfully",
        description: `${uploadedEmployees.length} employees imported`,
      })
      setUploadedEmployees([])
      setCsvContent("")
    }, 2000)
  }

  const downloadTemplate = () => {
    const template = "name,email,title,department,phone,mobile,location,linkedin,twitter\n"
    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "employee-template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/delivery">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Signature Management</h1>
            <p className="text-muted-foreground">Manage email signatures for your companies</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="companies">
        <TabsList className="mb-8">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-6">
          <div className="flex justify-between">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-8" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>
                    {company.employeeCount} employees • {company.signatureCount} signature templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{company.employeeCount} employees</span>
                    </div>
                    <Link href={`/delivery/${company.id}`} className="text-blue-600 hover:underline">
                      View Portal
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No employees found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Link href={`/delivery/movement?employee=${employee.id}`}>
                                <Search className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import Employee Data</CardTitle>
              <CardDescription>Upload a CSV file with employee data to create signatures in bulk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">CSV Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Download our template to ensure your data is formatted correctly
                  </p>
                </div>
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>

              <div className="rounded-lg border border-dashed p-10">
                <div className="flex flex-col items-center justify-center text-center">
                  <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Upload CSV File</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <label className="mt-4">
                    <Input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <div className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                      {isUploading ? "Uploading..." : "Select CSV File"}
                    </div>
                  </label>
                </div>
              </div>

              {uploadedEmployees.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preview ({uploadedEmployees.length} employees)</h3>
                  <div className="max-h-60 overflow-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Department</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedEmployees.map((employee, index) => (
                          <TableRow key={index}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.title}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedEmployees([])
                        setCsvContent("")
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={processUpload} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Process CSV
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Actions</CardTitle>
              <CardDescription>Perform actions on multiple signatures at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="company">Select Company</Label>
                  <select
                    id="company"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a company</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="action">Select Action</Label>
                  <select
                    id="action"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select an action</option>
                    <option value="regenerate">Regenerate All Signatures</option>
                    <option value="export">Export All Signatures</option>
                    <option value="delete">Delete All Signatures</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Execute Action</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to perform this action? This cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
