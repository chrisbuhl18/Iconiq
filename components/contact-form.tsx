"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import Script from "next/script"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    product: "",
    emailProvider: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const { toast } = useToast()

  // Effect to handle the Convai widget
  useEffect(() => {
    // Function to handle the widget when tab changes
    const handleWidgetVisibility = () => {
      // Find the widget element that gets injected into the DOM
      const widgetElement = document.querySelector(".convai-widget-container") as HTMLElement

      if (widgetElement) {
        if (activeTab === "ai") {
          // Move the widget into our container
          const container = document.getElementById("ai-assistant-container")
          if (container) {
            // Modify the widget styles to fit in our container
            widgetElement.style.position = "relative"
            widgetElement.style.bottom = "0"
            widgetElement.style.right = "0"
            widgetElement.style.width = "100%"
            widgetElement.style.height = "500px"
            widgetElement.style.maxHeight = "none"

            // Move the widget into our container
            container.appendChild(widgetElement)

            // Make it visible
            widgetElement.style.display = "block"
          }
        } else {
          // Hide the widget when not on the AI tab
          widgetElement.style.display = "none"
        }
      }
    }

    // Initial check
    const checkForWidget = setInterval(() => {
      const widgetElement = document.querySelector(".convai-widget-container")
      if (widgetElement) {
        clearInterval(checkForWidget)
        handleWidgetVisibility()
      }
    }, 500)

    // Cleanup
    return () => {
      clearInterval(checkForWidget)
    }
  }, [activeTab])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success toast
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        product: "",
        emailProvider: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-english-violet">Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below or chat with our AI assistant to get in touch with our team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="form">Traditional Form</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product">Product Interest</Label>
                  <Select value={formData.product} onValueChange={(value) => handleSelectChange("product", value)}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avatars">Email Avatars</SelectItem>
                      <SelectItem value="signatures">Email Signatures</SelectItem>
                      <SelectItem value="both">Both Products</SelectItem>
                      <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailProvider">Email Provider</Label>
                <Select
                  value={formData.emailProvider}
                  onValueChange={(value) => handleSelectChange("emailProvider", value)}
                >
                  <SelectTrigger id="emailProvider">
                    <SelectValue placeholder="Select your email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google (Gmail, Google Workspace)</SelectItem>
                    <SelectItem value="outlook">Microsoft (Outlook, Office 365)</SelectItem>
                    <SelectItem value="other">Other Provider</SelectItem>
                    <SelectItem value="unknown">I Don't Know</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs or ask us a question..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-english-violet hover:bg-english-violet/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="ai" className="min-h-[500px]">
            <div className="w-full">
              <div className="mb-4 text-center">
                <p className="text-gray-700">
                  Chat with our AI assistant to help you with your inquiry. It will collect the same information as the
                  form in a conversational way.
                </p>
              </div>

              {/* Hidden element that will be used to initialize the widget */}
              <div className="hidden">
                <elevenlabs-convai agent-id="BE6kueB9nSdDyR6AhH1y"></elevenlabs-convai>
              </div>

              {/* Container where we'll move the widget */}
              <div
                id="ai-assistant-container"
                className="w-full h-[500px] border rounded-lg overflow-hidden bg-white"
              ></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Load the Convai script */}
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Force a check for the widget after script loads
          const widgetElement = document.querySelector(".convai-widget-container") as HTMLElement
          if (widgetElement && activeTab === "ai") {
            const container = document.getElementById("ai-assistant-container")
            if (container) {
              widgetElement.style.position = "relative"
              widgetElement.style.bottom = "0"
              widgetElement.style.right = "0"
              widgetElement.style.width = "100%"
              widgetElement.style.height = "500px"
              widgetElement.style.maxHeight = "none"
              container.appendChild(widgetElement)
              widgetElement.style.display = "block"
            }
          }
        }}
      />
    </Card>
  )
}
