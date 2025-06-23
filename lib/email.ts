
import { Resend } from "resend"

export interface WaitlistFormData {
  email: string
  fullName?: string
  role?: string
  description: string
  country?: string
  expectations?: string
}

// Initialize Resend (preferred method)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWaitlistEmail(formData: WaitlistFormData) {
  // Email content
  const emailContent = `
    New Waitlist Signup - Lyvora
    
    Email: ${formData.email}
    ${formData.fullName ? `Full Name: ${formData.fullName}` : ""}
    ${formData.role ? `Role: ${formData.role}` : ""}
    Description: ${formData.description}
    ${formData.country ? `Country: ${formData.country}` : ""}
    ${formData.expectations ? `Expectations: ${formData.expectations}` : ""}
    
    Submitted at: ${new Date().toLocaleString()}
  `

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Waitlist Signup - Lyvora</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); border-radius: 12px;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">
          🚀 New Waitlist Signup
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 16px;">
          Lyvora Decentralized Marketplace
        </p>
      </div>

      <!-- Content -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
        <h2 style="color: #1e293b; margin-top: 0; font-size: 18px; margin-bottom: 20px;">
          📋 User Information
        </h2>
        
        <div style="space-y: 12px;">
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Email:</strong>
            <span style="color: #1e293b;">${formData.email}</span>
          </div>
          
          ${
            formData.fullName
              ? `
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Full Name:</strong>
            <span style="color: #1e293b;">${formData.fullName}</span>
          </div>
          `
              : ""
          }
          
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Description:</strong>
            <span style="color: #1e293b;">${formData.description}</span>
          </div>
          
          ${
            formData.role
              ? `
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Role:</strong>
            <span style="color: #1e293b;">${formData.role}</span>
          </div>
          `
              : ""
          }
          
          ${
            formData.country
              ? `
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Country:</strong>
            <span style="color: #1e293b;">${formData.country}</span>
          </div>
          `
              : ""
          }
          
          ${
            formData.expectations
              ? `
          <div style="margin-bottom: 12px;">
            <strong style="color: #475569; display: inline-block; width: 120px;">Expectations:</strong>
            <div style="color: #1e293b; margin-top: 5px; padding: 10px; background: white; border-radius: 6px; border-left: 3px solid #7c3aed;">
              ${formData.expectations}
            </div>
          </div>
          `
              : ""
          }
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #1e293b; border-radius: 12px;">
        <p style="color: #94a3b8; margin: 0; font-size: 14px;">
          📅 Submitted at: ${new Date().toLocaleString()}
        </p>
        <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
          Lyvora - Decentralized Marketplace Platform
        </p>
      </div>
      
    </body>
    </html>
  `

  try {
    // Use Resend API (preferred method)
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Lyvora <noreply@getlyvora.com>",
        to: [process.env.DESTINATION_EMAIL || "contact@getlyvora.com"],
        subject: "🚀 New Waitlist Signup - Lyvora",
        text: emailContent,
        html: htmlContent,
      })

      if (error) {
        console.error("Resend API error:", error)
        return { success: false, message: "Failed to send email via Resend API" }
      }

      console.log("Email sent successfully via Resend API:", data)
      return { success: true, message: "Email sent successfully" }
    } else {
      // Fallback to SMTP if API key is not available
      const nodemailer = await import("nodemailer")

      const transporter = nodemailer.default.createTransport({
        host: "smtp.resend.com",
        port: 587,
        secure: false,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      })

      await transporter.sendMail({
        from: process.env.RESEND_FROM_EMAIL || "Lyvora <noreply@getlyvora.com>",
        to: process.env.DESTINATION_EMAIL || "contact@getlyvora.com",
        subject: "🚀 New Waitlist Signup - Lyvora",
        text: emailContent,
        html: htmlContent,
      })

      return { success: true, message: "Email sent successfully via SMTP" }
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}

// Optional: Send confirmation email to the user
export async function sendConfirmationEmail(userEmail: string, userName?: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Lyvora Waitlist</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 30px; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); border-radius: 12px;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
          🎉 Welcome to Lyvora!
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">
          You're now on our exclusive waitlist
        </p>
      </div>

      <!-- Content -->
      <div style="padding: 0 20px;">
        <p style="font-size: 16px; color: #1e293b;">
          ${userName ? `Hi ${userName},` : "Hi there,"}
        </p>
        
        <p style="font-size: 16px; color: #1e293b; line-height: 1.6;">
          Thank you for joining the Lyvora waitlist! We're excited to have you as part of our community as we build the future of decentralized commerce.
        </p>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #7c3aed;">
          <h3 style="margin-top: 0; color: #1e293b;">What's Next?</h3>
          <ul style="color: #475569; padding-left: 20px;">
            <li>We'll keep you updated on our development progress</li>
            <li>You'll get early access when we launch our testnet</li>
            <li>Exclusive updates about new features and partnerships</li>
            <li>Priority access to our token launch and governance</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; color: #1e293b;">
          In the meantime, feel free to:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://x.com/lyvoraofficial" style="display: inline-block; margin: 0 10px; padding: 12px 24px; background: #1da1f2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Follow us on X
          </a>
          <a href="https://discord.gg/wa3aMU5pmH" style="display: inline-block; margin: 0 10px; padding: 12px 24px; background: #5865f2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Join our Discord
          </a>
        </div>
        
        <p style="font-size: 16px; color: #1e293b;">
          Questions? Reply to this email or reach out to us at <a href="mailto:contact@getlyvora.com" style="color: #7c3aed;">contact@getlyvora.com</a>
        </p>
        
        <p style="font-size: 16px; color: #1e293b;">
          Best regards,<br>
          <strong>The Lyvora Team</strong>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding: 20px; background: #1e293b; border-radius: 12px;">
        <p style="color: #94a3b8; margin: 0; font-size: 14px;">
          Lyvora - Decentralized Marketplace Platform
        </p>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
          Building the future of commerce, one transaction at a time
        </p>
      </div>
      
    </body>
    </html>
  `

  try {
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Lyvora <noreply@getlyvora.com>",
        to: [userEmail],
        subject: "🎉 Welcome to Lyvora Waitlist!",
        html: htmlContent,
      })

      if (error) {
        console.error("Resend API error for confirmation:", error)
        return { success: false, message: "Failed to send confirmation email" }
      }

      return { success: true, message: "Confirmation email sent" }
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, message: "Failed to send confirmation email" }
  }
}
