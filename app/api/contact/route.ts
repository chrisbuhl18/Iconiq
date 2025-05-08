import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with your API key
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
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Lumio Contact Form <hello@golumio.co>", // Use your verified domain
      to: ["chris@golumio.co"], // Where you want to receive submissions
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
      reply_to: email, // Set reply-to as the submitter's email
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
