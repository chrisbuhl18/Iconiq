import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DeliveryPortalPage() {
  const companies = [
    {
      id: "movement",
      name: "Movement.io",
      description: "Digital marketing and media production",
      logo: "/placeholder.svg?height=60&width=200&text=Movement.io",
      color: "#29505F",
    },
    // Add more companies as needed
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-english-violet">Iconiq</span>
              <span className="text-xl">Email Signature Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-english-violet">Company Signature Portals</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img src={company.logo || "/placeholder.svg"} alt={company.name} className="h-10" />
                    <CardTitle style={{ color: company.color }}>{company.name}</CardTitle>
                  </div>
                  <CardDescription>{company.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Access the email signature portal for {company.name} employees.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/delivery/${company.id}`}>
                    <Button style={{ backgroundColor: company.color }}>Access Portal</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
