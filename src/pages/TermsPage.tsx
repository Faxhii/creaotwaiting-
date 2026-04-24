import React from 'react';
import LegalLayout from '../components/LegalLayout';

const TermsPage: React.FC = () => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 2025">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By joining the Vero waitlist or using the Vero platform, you agree to these Terms of Service. If you do not agree, please do not use our services.
      </p>

      <h2>2. What Vero Does</h2>
      <p>
        Vero is a marketplace that connects brands with creators for influencer marketing campaigns. Vero facilitates deals, tracks campaign performance, and processes payments between brands and creators. Vero charges a 15% commission on completed deals.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 18 years old to use Vero.
      </p>

      <h2>4. Brands — Your Responsibilities</h2>
      <p>
        As a brand on Vero, you agree to:
        <br />— Provide accurate campaign briefs
        <br />— Pay agreed deal amounts into escrow before campaigns begin
        <br />— Review and approve or dispute campaign delivery within 7 days of submission
        <br />— Not attempt to contact or pay creators outside the Vero platform to avoid commission fees
      </p>

      <h2>5. Creators — Your Responsibilities</h2>
      <p>
        As a creator on Vero, you agree to:
        <br />— Provide accurate social media and performance data
        <br />— Deliver campaign content as agreed within the deal timeline
        <br />— Not misrepresent your audience or engagement data
        <br />— Submit genuine post URLs as proof of delivery
      </p>

      <h2>6. Payments and Commission</h2>
      <p>
        Vero charges a 15% commission on all successfully completed deals. This is deducted automatically from the brand's payment before the creator receives their payout. Brands pay into escrow at deal confirmation. Creators receive their payout after campaign verification is complete. Vero uses Razorpay for payment processing in India.
      </p>

      <h2>7. Disputes</h2>
      <p>
        If a dispute arises between a brand and creator, either party may raise it through the Vero platform. Vero's team will review available tracking data and make a final decision within 5 business days. Vero's decision on disputes is final.
      </p>

      <h2>8. Prohibited Behaviour</h2>
      <p>
        Users may not:
        <br />— Create fake or misleading profiles
        <br />— Artificially inflate engagement or follower counts
        <br />— Conduct deals outside the platform to avoid commission
        <br />— Harass or abuse other users
        <br />— Use bots or automated tools to manipulate platform data
      </p>
      <p>
        Violations may result in immediate account termination.
      </p>

      <h2>9. Intellectual Property</h2>
      <p>
        Creators retain ownership of content they create for campaigns. By posting content, creators grant the brand a license to use that content for the agreed campaign purpose. Vero does not claim ownership of creator content.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        Vero is a marketplace and is not liable for the actions of brands or creators on the platform. We do not guarantee campaign results. Our liability is limited to the commission fees collected on a given transaction.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these terms. Continued use of Vero after changes means you accept the updated terms. We will notify users of major changes via email.
      </p>

      <h2>12. Contact</h2>
      <p>
        For terms-related questions:
        <br />Email: <a href="mailto:legal@vero.app">legal@vero.app</a>
      </p>
    </LegalLayout>
  );
};

export default TermsPage;
