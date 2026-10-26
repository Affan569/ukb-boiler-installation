import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import UKBFooter from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boiler Installation Southampton | Gas Safe Registered Engineers | UKB Boiler Installs",
  description: "Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers offering 24/7 emergency boiler repair, combi boiler replacement and central heating services. Get a free quote today.",
  keywords: "boiler installation Southampton, boiler repair Southampton, Gas Safe registered engineers, combi boiler installation, emergency boiler repair, central heating Southampton, boiler replacement, boiler service, Worcester boiler, Vaillant boiler, Baxi boiler, heating engineers Southampton, new boiler cost, boiler servicing",
  authors: [{ name: "UKB Boiler Installs" }],
  creator: "UKB Boiler Installs",
  publisher: "UKB Boiler Installs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ukbboilerinstalls.co.uk'),
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk',
    title: 'Boiler Installation Southampton | Gas Safe Registered Engineers | UKB Boiler Installs',
    description: 'Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers offering 24/7 emergency boiler repair, combi boiler replacement and central heating services.',
    siteName: 'UKB Boiler Installs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Installation Southampton | Gas Safe Registered Engineers | UKB Boiler Installs',
    description: 'Professional boiler installation, repair and servicing in Southampton. Gas Safe registered engineers offering 24/7 emergency boiler repair, combi boiler replacement and central heating services.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        {children}
        <UKBFooter />
      </body>
    </html>
  );
}
