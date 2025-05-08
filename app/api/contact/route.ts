import { Resend } from "resend"
import { NextResponse } from "next/server"

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, company, product, emailProvider, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Product Interest:</strong> ${product || "Not specified"}</p>
      <p><strong>Email Provider:</strong> ${emailProvider || "Not specified"}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "hello@golumio.co",
      to: "chris@golumio.co",
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
      reply_to: email,
    })

    if (error) {
      console.error("Resend API error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
