// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import * as sgMail from '@sendgrid/mail'
require('dotenv/config')
export const sendMail = async (
    toEmail: string,
    subject:string,
    text: string,
    htmlText: string
    ) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: toEmail,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text,
    html: htmlText
  }
  await sgMail.send(msg)
  return null
}
