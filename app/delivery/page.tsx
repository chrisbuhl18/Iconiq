import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Users, Settings, Palette } from "lucide-react"

export const metadata: Metadata = {
  title: "Lumio | Email Signature Delivery Portal",
  description: "Access your animated email signatures and avatars",
}

export default function DeliveryPortalPage() {
  // In a real app, this would come from a database or API
  const companies = [
    { id: "movement", name: "Movement", employeeCount: 124, signatureCount: 3 },
    { id: "acme", name: "Acme Inc", employeeCount: 56, signatureCount: 2 },
    { id: "globex", name: "Globex Corp", employeeCount: 78, signatureCount: 1 },
  ]

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Email Signature Delivery Portal</h1>
        <p className="text-muted-foreground text-lg">
          Access and customize your company's animated email signatures and avatars
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Card key={company.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-xl">{company.name}</CardTitle>
              <CardDescription className="text-blue-100">
                {company.employeeCount} employees • {company.signatureCount} signature templates
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{company.employeeCount} employees</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{company.signatureCount} signatures</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 px-6 py-4">
              <Link href={`/delivery/${company.id}`} className="w-full">
                <Button className="w-full">
                  Access Signatures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Admin Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/admin/signatures">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Signature Management
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Button>
          </Link>
          <Link href="/signature-templates">
            <Button variant="outline" className="w-full justify-start">
              <Palette className="mr-2 h-4 w-4" />
              Signature Templates
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
