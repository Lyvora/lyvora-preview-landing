"use server"

import { sendWaitlistEmail, sendConfirmationEmail, type WaitlistFormData } from "@/lib/email"

export type WaitlistState = {
  success: boolean
  message: string
} | null

export async function submitWaitlist(prevState: WaitlistState, formData: FormData): Promise<WaitlistState> {
  try {
    // Extract form data
    const email = formData.get("email") as string
    const fullName = formData.get("fullName") as string
    const role = formData.get("role") as string
    const description = formData.get("description") as string
    const country = formData.get("country") as string
    const expectations = formData.get("expectations") as string

    // Validate required fields
    if (!email || !description) {
      return {
        success: false,
        message: "Email and description are required fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Prepare email data
    const waitlistData: WaitlistFormData = {
      email,
      fullName: fullName || undefined,
      role: role || undefined,
      description,
      country: country || undefined,
      expectations: expectations || undefined,
    }

    // Send notification email to Lyvora team
    const result = await sendWaitlistEmail(waitlistData)

    if (result.success) {
      // Send confirmation email to user (optional)
      try {
        await sendConfirmationEmail(email, fullName)
      } catch (confirmationError) {
        console.error("Failed to send confirmation email:", confirmationError)
        // Don't fail the main process if confirmation email fails
      }

      return {
        success: true,
        message: "Thank you for joining our waitlist! Check your email for confirmation.",
      }
    } else {
      return {
        success: false,
        message: "There was an error submitting your information. Please try again.",
      }
    }
  } catch (error) {
    console.error("Error in submitWaitlist:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
