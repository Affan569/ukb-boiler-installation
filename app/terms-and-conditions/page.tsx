import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | UKB Boiler Installs Southampton",
  description: "Read our terms and conditions for boiler installation and repair services in Southampton. Understand our service agreement, warranty terms, and customer responsibilities.",
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/terms-and-conditions',
  },
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#0a2a6b] mb-4">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">1. Introduction</h2>
          <p>
            These Terms and Conditions govern your use of UKB Boiler Installation's website and services. By accessing our website or using our services, you agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">2. Services</h2>
          <p>
            UKB Boiler Installation provides the following services:
          </p>
          <ul>
            <li>Boiler installation and replacement</li>
            <li>Boiler maintenance and servicing</li>
            <li>Emergency boiler repairs</li>
            <li>Heating system upgrades</li>
            <li>Free quotations and consultations</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">3. Quotes and Pricing</h2>
          <p>
            All quotations provided are valid for 30 days from the date of issue unless otherwise stated. Prices may vary based on:
          </p>
          <ul>
            <li>Boiler model and specifications</li>
            <li>Installation complexity</li>
            <li>Property location and access</li>
            <li>Additional materials required</li>
          </ul>
          <p>
            We reserve the right to adjust our quoted prices if unforeseen circumstances arise during the installation process.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">4. Booking and Cancellation</h2>
          <p>
            To book a service, you must provide accurate information about your heating requirements. Cancellations must be made at least 48 hours before the scheduled appointment to avoid cancellation fees.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">5. Payment Terms</h2>
          <p>
            Payment terms will be agreed upon before work commences. Standard payment terms:
          </p>
          <ul>
            <li>50% deposit required upon booking</li>
            <li>Remaining 50% due upon completion</li>
            <li>Payment methods: Bank transfer, cash, or card</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">6. Warranty</h2>
          <p>
            All installations come with manufacturer warranties (typically 5-12 years depending on the boiler model). We also provide a workmanship guarantee for all work completed by our engineers.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">7. Our Responsibilities</h2>
          <p>We agree to:</p>
          <ul>
            <li>Perform all work to Gas Safe standards</li>
            <li>Provide clear and honest advice</li>
            <li>Complete work within agreed timeframes</li>
            <li>Leave your property clean and tidy</li>
            <li>Provide relevant documentation and certificates</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">8. Customer Responsibilities</h2>
          <p>As a customer, you agree to:</p>
          <ul>
            <li>Provide safe access to your property</li>
            <li>Ensure a responsible adult is present during installation</li>
            <li>Inform us of any special requirements or hazards</li>
            <li>Pay agreed amounts on time</li>
            <li>Not interfere with our engineers during work</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">9. Liability</h2>
          <p>
            We are not liable for any loss or damage caused by circumstances beyond our control, including but not limited to: pre-existing system faults, third-party equipment failure, or customer negligence.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">10. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and images, is the property of UKB Boiler Installation and protected by copyright laws.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">11. Termination</h2>
          <p>
            We reserve the right to refuse service or terminate agreements with customers who breach these terms or engage in abusive behavior towards our staff.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">12. Governing Law</h2>
          <p>
            These terms are governed by the laws of the United Kingdom. Any disputes shall be subject to the exclusive jurisdiction of the UK courts.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">13. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-[#0a2a6b] mt-8 mb-4">14. Contact Information</h2>
          <p>
            For any questions about these terms, please contact us:
          </p>
          <p>
            <strong>Email:</strong> info@ukbboilerinstalls.co.uk<br />
            <strong>Phone:</strong> +92 314 2078089<br />
            <strong>Address:</strong> Southampton, United Kingdom
          </p>
        </div>
      </div>
    </div>
  );
}
