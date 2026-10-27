import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UKB Boiler Installs Southampton",
  description: "Read our privacy policy to understand how UKB Boiler Installs collects, uses, and protects your personal information when you use our boiler installation services in Southampton.",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#0a2a6b] mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">1. Introduction</h2>
          <p>
            UKB Boiler Installation ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">2. Information We Collect</h2>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Name and contact details (email, phone number)</li>
            <li>Property address and heating requirements</li>
            <li>Payment information (where applicable)</li>
            <li>Communication records</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Provide boiler installation and maintenance services</li>
            <li>Process quotes and bookings</li>
            <li>Communicate with you about our services</li>
            <li>Improve our services and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">4. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share your data with trusted third parties only when necessary to provide our services, such as:
          </p>
          <ul>
            <li>Gas Safe Register for certification purposes</li>
            <li>Boiler manufacturers for warranty registration</li>
            <li>Payment processors for transactions</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> info@ukbboilerinstallation.co.uk<br />
            <strong>Phone:</strong> 07988530358
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
