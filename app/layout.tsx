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
  title: {
    default: "Boiler Installation Southampton | UKB Boiler Installs",
    template: "%s | UKB Boiler Installs",
  },
  description: "Gas Safe registered boiler installation, repair and servicing in Southampton. Combi boiler replacement and central heating with free, no-obligation quotes.",
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
    title: 'Boiler Installation Southampton | UKB Boiler Installs',
    description: 'Gas Safe registered boiler installation, repair and servicing in Southampton. Combi boiler replacement and central heating with free, no-obligation quotes.',
    siteName: 'UKB Boiler Installs',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Professional boiler installation in Southampton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boiler Installation Southampton | UKB Boiler Installs',
    description: 'Gas Safe registered boiler installation, repair and servicing in Southampton. Combi boiler replacement and central heating with free, no-obligation quotes.',
    images: ['/images/hero.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        {children}
        <UKBFooter />
      </body>
    </html>
  );
}
