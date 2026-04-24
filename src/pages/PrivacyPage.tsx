import React from 'react';
import LegalLayout from '../components/LegalLayout';

const PrivacyPage: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2025">
      <h2>1. Who We Are</h2>
      <p>
        Vero is a global influencer marketing marketplace that connects brands with verified creators. This Privacy Policy explains how we collect, use, and protect your personal information when you use our waitlist or platform.
      </p>

      <h2>2. What We Collect</h2>
      <p>
        When you join our waitlist, we collect:
        <br />— Your name
        <br />— Your email address
        <br />— Your country
        <br />— Your role (Brand or Creator)
        <br />— The referral source if you were referred by another user
        <br />— Your device type and approximate location (via IP address)
      </p>
      <p>
        When you use the Vero platform (post-launch), we additionally collect:
        <br />— Social media handles and connected account data
        <br />— Campaign performance data
        <br />— Payment and payout details
        <br />— Communication history with other platform users
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use your information to:
        <br />— Send you early access and launch notifications
        <br />— Personalise your experience on the platform
        <br />— Process payments and payouts securely via Razorpay
        <br />— Calculate and display your Creator Score (creators only)
        <br />— Detect and prevent fraud
        <br />— Improve our platform and services
      </p>
      <p>
        We do not sell your personal information to any third party. Ever.
      </p>

      <h2>4. Data Storage</h2>
      <p>
        Your data is stored securely using Supabase infrastructure, hosted on servers compliant with industry security standards. Campaign tracking data (clicks, conversions) is stored in our encrypted PostgreSQL database. File uploads are stored on Cloudflare R2 with restricted access.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use minimal cookies necessary for the platform to function, including:
        <br />— Session authentication cookies
        <br />— Your referral code if you arrived via a referral link
        <br />We do not use advertising cookies or third-party tracking pixels.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to:
        <br />— Access the personal data we hold about you
        <br />— Request correction of inaccurate data
        <br />— Request deletion of your account and associated data
        <br />— Withdraw consent for marketing communications at any time
      </p>
      <p>
        To exercise any of these rights, email us at <a href="mailto:privacy@vero.app">privacy@vero.app</a>
      </p>

      <h2>7. Third Party Services</h2>
      <p>
        Vero uses the following third-party services which have their own privacy policies:
        <br />— Razorpay (payment processing)
        <br />— Supabase (data storage)
        <br />— Cloudflare R2 (file storage)
        <br />— Resend (transactional email)
      </p>

      <h2>8. Children</h2>
      <p>
        Vero is not intended for users under the age of 18. We do not knowingly collect data from minors.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy-related questions:
        <br />Email: <a href="mailto:privacy@vero.app">privacy@vero.app</a>
      </p>
    </LegalLayout>
  );
};

export default PrivacyPage;
