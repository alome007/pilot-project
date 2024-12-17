import sgMail from '@sendgrid/mail';
import { UserPlan } from '../types';
import { logger } from 'firebase-functions/v1';
require("dotenv").config();


const BRAND = {
  name: 'MailGuard',
  logo: 'https://your-logo-url.com',
  primaryColor: '#3B82F6', // subtle blue
  textColor: '#4B5563',    // text-gray-600
  textColorDark: '#9CA3AF', // dark:text-gray-400
  bgColor: '#F8F8F8',
  bgColorDark: '#1F2937',
  contentBg: '#FFFFFF'
};


const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${BRAND.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 20px 10px !important;
      }
      .content {
        padding: 20px !important;
      }
    }
    
    @media only screen and (max-width: 400px) {
      .brand {
        font-size: 24px !important;
      }
      h1 {
        font-size: 20px !important;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      .container { background-color: ${BRAND.bgColorDark} !important; }
      .content { color: ${BRAND.textColorDark} !important; }
      .highlight { background-color: ${BRAND.bgColorDark} !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.bgColor}; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
  <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div class="brand" style="text-align: center; margin-bottom: 40px;">
      <div style="color: ${BRAND.primaryColor}; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
        ${BRAND.name}
      </div>
    </div>
    <div class="content" style="background-color: ${BRAND.contentBg}; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="color: ${BRAND.textColor};">
        ${content}
      </div>
    </div>
  </div>
</body>
</html>
`;

const styles = {
  button: `display: inline-block; padding: 12px 24px; background-color: ${BRAND.primaryColor}; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: 600; text-align: center;`,
  heading: `color: ${BRAND.primaryColor}; font-size: 24px; font-weight: 700; margin: 0 0 24px 0; letter-spacing: -0.5px;`,
  text: `color: ${BRAND.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;`,
  highlight: `background-color: ${BRAND.bgColor}; padding: 20px; border-radius: 8px; margin: 24px 0;`,
  signature: `margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;`
};

export async function sendWelcomeEmail (email: string, name: string) {
  try {


    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const content = `
    <h1 style="${styles.heading}">Welcome to the Future of Email Privacy 👋</h1>
    <p style="${styles.text}">Hey ${name},</p>
    <p style="${styles.text}">Thank you for choosing ${BRAND.name}! We're thrilled to help you take control of your inbox and protect your online identity.</p>
    
    <div style="${styles.highlight}">
      <p style="${styles.text}">✨ <strong>Get Started Now:</strong></p>
      <ul style="${styles.text}; margin: 8px 0 0 0; padding-left: 20px;">
        <li>Create your first secure email alias</li>
        <li>Set up smart forwarding rules</li>
        <li>Enable advanced spam protection</li>
      </ul>
    </div>
    
    <a href="https://app.mailguard.com/dashboard" style="${styles.button}">
      Get Started
    </a>
    
    <div style="${styles.signature}">
      <p style="${styles.text}">Best regards,</p>
      <p style="${styles.text}">
        <strong>The ${BRAND.name} Team</strong>
      </p>
    </div>
  `;

    const msg = {
      to: email,
      from: {
        email: 'daniel@astrocoder.me',
        name: 'Daniel from Kinetic'
      },
      subject: `Welcome to ${BRAND.name}! 🚀`,
      html: baseTemplate(content)
    };
    await sgMail.send(msg);
  } catch (err) {
    logger.error(err);
  }
}

export async function sendUpgradeEmail (email: string, plan: UserPlan) {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const content = `
    <h1 style="${styles.heading}">Welcome to ${plan.planName}! 🎉</h1>
    <p style="${styles.text}">Thank you for upgrading your ${BRAND.name} account. You've just unlocked a whole new level of email privacy and control.</p>
    
    <div style="${styles.highlight}">
      <p style="${styles.text}"><strong>Your New Features:</strong></p>
      <ul style="${styles.text}; margin: 8px 0 0 0; padding-left: 20px;">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    
    <p style="${styles.text}">Your next billing date is ${new Date(plan.nextBillingDate!).toLocaleDateString()}.</p>
    
    <a href="https://app.mailguard.com/dashboard" style="${styles.button}">
      Explore New Features
    </a>
    
    <div style="${styles.signature}">
      <p style="${styles.text}">Best regards,</p>
      <p style="${styles.text}">
        <strong>The ${BRAND.name} Team</strong>
      </p>
    </div>
  `;

  await sgMail.send({
    to: email,
    from: `${BRAND.name} <billing@mailguard.com>`,
    subject: `Welcome to ${BRAND.name} ${plan.planName}! 🚀`,
    html: baseTemplate(content),
  });
}

export async function sendDowngradeEmail (email: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const content = `
    <h1 style="${styles.heading}">Plan Change Confirmation</h1>
    <p style="${styles.text}">We understand that needs change, and we're here to support you every step of the way.</p>
    
    <div style="${styles.highlight}">
      <p style="${styles.text}"><strong>What happens next:</strong></p>
      <ul style="${styles.text}; margin: 8px 0 0 0; padding-left: 20px;">
        <li>Your account will switch to the Free plan at the end of your billing period</li>
        <li>You'll keep access to all features until then</li>
        <li>Your existing aliases will continue working</li>
      </ul>
    </div>
    
    <p style="${styles.text}">Remember, you can always upgrade again if you need access to premium features in the future.</p>
    
    <a href="https://app.mailguard.com/billing" style="${styles.button}">
      Manage Subscription
    </a>
    
    <div style="${styles.signature}">
      <p style="${styles.text}">Best regards,</p>
      <p style="${styles.text}">
        <strong>The ${BRAND.name} Team</strong>
      </p>
    </div>
  `;

  await sgMail.send({
    to: email,
    from: `${BRAND.name} <billing@mailguard.com>`,
    subject: `${BRAND.name} Plan Change Confirmation`,
    html: baseTemplate(content),
  });
}