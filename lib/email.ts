import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailProps {
  to: string
  name: string
  token: string
}

export async function sendVerificationEmail({ to, name, token }: EmailProps) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  try {
    const { data, error } = await resend.emails.send({
      from: 'Learning Platform <noreply@yourdomain.com>',
      to: [to],
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Learning Platform!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p>${verificationLink}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="color: #666; font-size: 14px;">
            This is an automated email, please do not reply to this message.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send verification email:', error)
      throw new Error('Failed to send verification email')
    }

    return data
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
} 