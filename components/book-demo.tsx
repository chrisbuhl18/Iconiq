import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video } from "lucide-react"
import Link from "next/link"

export default function BookDemo() {
  // Replace with your actual Calendly link
  const calendlyLink = "https://calendly.com/lumio/demo"

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="bg-gradient-to-r from-periwinkle to-misty-rose rounded-t-lg">
        <CardTitle className="text-2xl text-english-violet flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Book a Demo
        </CardTitle>
        <CardDescription className="text-gray-700">Schedule a personalized demo with our team</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Video className="h-5 w-5 text-english-violet mt-1" />
            <div>
              <h3 className="font-medium text-english-violet">Live Walkthrough</h3>
              <p className="text-sm text-gray-600">
                Get a personalized walkthrough of our animated email solutions tailored to your needs.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-english-violet mt-1" />
            <div>
              <h3 className="font-medium text-english-violet">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">
                Choose a time that works for you. Demos typically last 20-30 minutes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={calendlyLink} target="_blank" className="w-full">
          <Button className="w-full bg-english-violet hover:bg-english-violet/90">Schedule a Demo</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
