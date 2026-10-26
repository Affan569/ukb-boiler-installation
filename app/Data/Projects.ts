export type Category = "Boiler Installations" | "Upgrades" | "Repairs";

export interface Project {
  id: number;
  title: string;
  description: string; // short text shown on the card
  location: string;
  brand: string;
  category: Category;
  before: string;
  after: string;

  // Extra details shown in the popup
  details: {
    overview: string;
    boilerModel: string;
    propertyType: string;
    completedOn: string;
    duration: string;
    warranty: string;
    workDone: string[];
    results: string[];
  };
}

export const FILTERS = ["All Projects", "Boiler Installations", "Upgrades", "Repairs"] as const;
export type Filter = (typeof FILTERS)[number];

// Swap the image paths and edit any text below. The UI updates automatically.
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Boiler Replacement",
    description: "From old and inefficient to modern and efficient.",
    location: "Southampton",
    brand: "Vaillant",
    category: "Boiler Installations",
    before: "/images/before1.jpg",
    after: "/images/after1.jpg",
    details: {
      overview:
        "The customer's 15-year-old boiler was noisy, unreliable and costing far too much to run. We removed the old unit and fitted a new high-efficiency Vaillant boiler with a tidy, fully labelled pipework finish.",
      boilerModel: "Vaillant ecoTEC Plus 832",
      propertyType: "3-bed semi-detached house",
      completedOn: "March 2026",
      duration: "1 day",
      warranty: "10 years",
      workDone: [
        "Safe removal of the old boiler",
        "New boiler fitted and commissioned",
        "Copper pipework replaced and tidied",
        "Magnetic system filter installed",
        "Full system flush and inhibitor added",
      ],
      results: ["Up to 30% lower energy bills", "Quieter running", "Reliable hot water on demand"],
    },
  },
  {
    id: 2,
    title: "Combi Boiler Installation",
    description: "Compact, efficient and perfect for modern homes.",
    location: "Southampton",
    brand: "Worcester Bosch",
    category: "Boiler Installations",
    before: "/images/before2.jpg",
    after: "/images/after2.jpg",
    details: {
      overview:
        "A conventional boiler with a hot water cylinder was swapped for a compact combi boiler, freeing up storage space and giving the customer instant hot water.",
      boilerModel: "Worcester Bosch Greenstar 4000",
      propertyType: "2-bed terraced house",
      completedOn: "May 2026",
      duration: "2 days",
      warranty: "7 years",
      workDone: [
        "Cylinder and loft tanks removed",
        "Combi boiler installed in the kitchen",
        "New flue routed through the external wall",
        "Smart thermostat fitted",
        "Gas safety checks completed",
      ],
      results: ["Extra storage space gained", "Instant hot water", "Better heating control"],
    },
  },
  {
    id: 3,
    title: "Full System Upgrade",
    description: "Improved efficiency, lower bills, greater comfort.",
    location: "Southampton",
    brand: "Baxi",
    category: "Upgrades",
    before: "/images/before3.jpg",
    after: "/images/after3.jpg",
    details: {
      overview:
        "A complete heating system upgrade: new boiler, radiators and controls. The old cupboard-mounted unit was replaced with a wall-hung boiler and fresh pipework.",
      boilerModel: "Baxi 800 Combi",
      propertyType: "4-bed detached house",
      completedOn: "July 2026",
      duration: "3 days",
      warranty: "10 years",
      workDone: [
        "Old boiler and cylinder removed",
        "New wall-hung boiler installed",
        "Radiators replaced with modern panels",
        "Thermostatic radiator valves fitted",
        "Power flush of the full system",
      ],
      results: ["Even heat in every room", "Lower running costs", "Improved comfort all year"],
    },
  },
 
];