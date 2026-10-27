import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | UKB Boiler Installs Southampton",
  description: "Learn about how UKB Boiler Installs uses cookies on our website and your choices regarding them. Understand our cookie policy for boiler installation services in Southampton.",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/cookie-policy',
  },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#0a2a6b] mb-4">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by allowing the site to remember your preferences and track how you use our services.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Marketing Cookies:</strong> Track your browsing habits to provide relevant advertisements</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">3. Types of Cookies We Use</h2>
          <p><strong>Strictly Necessary Cookies:</strong></p>
          <ul>
            <li>Session cookies for maintaining your user session</li>
            <li>Security cookies for fraud prevention</li>
          </ul>

          <p><strong>Performance and Analytics Cookies:</strong></p>
          <ul>
            <li>Google Analytics for understanding website traffic</li>
            <li>Heatmap tools for user behavior analysis</li>
          </ul>

          <p><strong>Targeting/Advertising Cookies:</strong></p>
          <ul>
            <li>Social media cookies for sharing content</li>
            <li>Retargeting cookies for personalized ads</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">4. Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and certain parts of our website may no longer be fully accessible.
          </p>
          <ul>
            <li>Most web browsers allow you to control cookies through their settings</li>
            <li>You can delete all cookies that are already on your device</li>
            <li>You can set your browser to not accept cookies</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">5. Third-Party Cookies</h2>
          <p>
            We may use third-party services that place cookies on your device. These include analytics tools, social media platforms, and advertising networks. Each third-party has its own privacy policy governing the use of cookies.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> info@ukbboilerinstallation.co.uk<br />
            <strong>Phone:</strong> 07988530358
          </p>
        </div>
      </div>
    </div>
  );
}
