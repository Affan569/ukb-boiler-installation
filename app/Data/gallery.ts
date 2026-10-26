// data.ts
// All gallery content lives here. Edit this file to add / change projects.
// Put your photos in /public/images/gallery/ (or change the paths below).

export type GalleryCategory =
  | "Boiler Installations"
  | "Repairs & Maintenance"
  | "Heating Systems"
  | "Commercial Projects"
  | "Customer Homes";

export interface GalleryProject {
  id: string;
  title: string;
  /** Used by the filter pills */
  category: GalleryCategory;
  /** Small label shown on the image, e.g. "Boiler Installation" */
  tag: string;
  /** "Residential" | "Commercial" */
  propertyType: "Residential" | "Commercial";
  location: string;
  /** Main image (card + popup) */
  image: string;
  /** Optional extra photos shown as thumbnails in the popup */
  images?: string[];
  year: string;
  duration: string;
  summary: string;
  description: string;
  /** What we actually did on the job */
  workDone: string[];
  /** Equipment used */
  equipment: string;
  /** Outcome the customer got */
  result: string;
  featured?: boolean;
}

export const categories: ("All Projects" | GalleryCategory)[] = [
  "All Projects",
  "Boiler Installations",
  "Repairs & Maintenance",
  "Heating Systems",
  "Commercial Projects",
  "Customer Homes",
];

export const galleryStats = [
  { label: "Real Projects", sub: "Every job is our own work", icon: "projects" },
  { label: "Quality Work", sub: "Neat, safe and built to last", icon: "quality" },
  { label: "Happy Customers", sub: "Homes kept warm all winter", icon: "customers" },
] as const;

const img = (name: string) => `/images/gallery/${name}.jpg`;

export const galleryProjects: GalleryProject[] = [
  {
    id: "modern-boiler-installation",
    title: "Modern Boiler Installation",
    category: "Boiler Installations",
    tag: "Boiler Installation",
    propertyType: "Residential",
    location: "Southampton",
    image: "/images/q.jpg",
    images: ["/images/q.jpg"],
    year: "2026",
    duration: "1 day",
    summary: "Old floor-standing boiler replaced with a wall-mounted combi.",
    description:
      "The customer's 20-year-old boiler was failing and costing a lot to run. We removed it, re-routed the pipework and fitted a new high-efficiency combi boiler with a smart thermostat.",
    workDone: [
      "Removed the old boiler and flushed the system",
      "Fitted a wall-mounted combi boiler and new flue",
      "Installed a smart thermostat",
      "Tested, commissioned and registered the warranty",
    ],
    equipment: "A-rated combi boiler with smart thermostat",
    result: "Lower gas bills and instant hot water in a single day's work.",
    featured: true,
  },
  {
    id: "smart-boiler-setup",
    title: "Smart Boiler Setup",
    category: "Boiler Installations",
    tag: "Boiler Installation",
    propertyType: "Residential",
    location: "Southampton",
    image: "/images/w.jpg",
    images: ["/images/w.jpg"],
    year: "2026",
    duration: "1 day",
    summary: "New boiler with app-controlled heating.",
    description:
      "A tidy install in a family kitchen. The boiler is connected to a smart thermostat so the customer can set schedules and temperatures from their phone.",
    workDone: [
      "Replaced the existing boiler like-for-like",
      "Set up the smart thermostat and app",
      "Showed the customer how to use the controls",
    ],
    equipment: "Wall-mounted combi boiler, smart thermostat",
    result: "Heating that follows the family's routine and wastes less gas.",
    featured: true,
  },
  {
    id: "annual-service-inspection",
    title: "Annual Service & Inspection",
    category: "Repairs & Maintenance",
    tag: "Maintenance",
    propertyType: "Residential",
    location: "Southampton",
    image: "/images/e.jpg",
    images: ["/images/e.jpg"],
    year: "2026",
    duration: "1 hour",
    summary: "Full yearly service and safety check.",
    description:
      "A routine annual service to keep the boiler safe and efficient. We checked every component, cleaned the unit and tested the controls and safety devices.",
    workDone: [
      "Checked pressure, flue and seals",
      "Cleaned the heat exchanger and burner",
      "Tested the carbon monoxide safety readings",
      "Issued a service record",
    ],
    equipment: "Existing boiler",
    result: "A safe, reliable boiler and a valid service record for the warranty.",
  },
  {
    id: "central-heating-installation",
    title: "Central Heating Installation",
    category: "Heating Systems",
    tag: "Heating Systems",
    propertyType: "Residential",
    location: "Southampton",
    image: "/images/r.jpg",
    images: ["/images/r.jpg"],
    year: "2025",
    duration: "3 days",
    summary: "New radiators and pipework throughout the house.",
    description:
      "A full central heating installation for a house that had no working system. We fitted new radiators with thermostatic valves in every room and connected them to a new boiler.",
    workDone: [
      "Installed new pipework in every room",
      "Fitted radiators with thermostatic valves",
      "Powerflushed and balanced the system",
    ],
    equipment: "Combi boiler, panel radiators, thermostatic radiator valves",
    result: "Even heat in every room and control over each radiator.",
  },
  {
    id: "commercial-boiler-system",
    title: "Commercial Boiler System",
    category: "Commercial Projects",
    tag: "Commercial Project",
    propertyType: "Commercial",
    location: "Southampton",
    image: "/images/t.jpg",
    images: ["/images/t.jpg"],
    year: "2025",
    duration: "5 days",
    summary: "Heating and hot water for a busy office building.",
    description:
      "We installed a commercial heating system for an office building, working in phases so the team could keep using the building during the job.",
    workDone: [
      "Surveyed the building's heat demand",
      "Installed commercial boilers and controls",
      "Worked out of hours to avoid disruption",
      "Trained the site manager on the controls",
    ],
    equipment: "Commercial boilers with zoned controls",
    result: "Reliable heat across all floors with no lost working days.",
    featured: true,
  },
 
];