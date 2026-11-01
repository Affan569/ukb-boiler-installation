import type { Metadata } from "next";

const GALLERY_DESCRIPTION = "Recent boiler installation and heating projects in Southampton. Before and after photos of combi boiler replacements completed by our Gas Safe engineers.";

export const metadata: Metadata = {
  title: "Our Work Gallery",
  description: GALLERY_DESCRIPTION,
  alternates: {
    canonical: 'https://ukbboilerinstalls.co.uk/gallery',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ukbboilerinstalls.co.uk/gallery',
    title: 'Our Work Gallery | UKB Boiler Installs',
    description: GALLERY_DESCRIPTION,
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Boiler installation projects gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work Gallery | UKB Boiler Installs',
    description: GALLERY_DESCRIPTION,
    images: ['/images/hero.png'],
  },
};

export default function GalleryLayout({ children }: LayoutProps<"/gallery">) {
  return children;
}
