import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Boiler Installation Gallery | Our Recent Projects | UKB Boiler Installs Southampton",
  description: "View our boiler installation gallery showcasing recent projects in Southampton. See our quality workmanship on combi boilers, system boilers, and heating installations with before & after photos.",
  keywords: "boiler installation gallery, boiler projects Southampton, heating installation photos, combi boiler installation examples, boiler repair before after, heating system gallery, boiler replacement projects",
  alternates: {
    canonical: 'https://ukbboilerinstallation.co.uk/gallery',
  },
  openGraph: {
    type: 'website',
    url: 'https://ukbboilerinstallation.co.uk/gallery',
    title: 'Boiler Installation Gallery | Our Recent Projects | UKB Boiler Installs Southampton',
    description: 'View our boiler installation gallery showcasing recent projects in Southampton. See our quality workmanship on combi boilers, system boilers, and heating installations with before & after photos.',
  },
};

export default function GalleryLayout() {
  return <GalleryClient />;
}
