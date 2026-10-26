export type BlogCategory =
  | "Boiler Installation"
  | "Maintenance"
  | "Energy Saving"
  | "Heating Tips"
  | "Repairs";

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Label shown on the small tag on each card */
  tag: string;
  image: string;
  author: BlogAuthor;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Minutes */
  readTime: number;
  featured?: boolean;
  /** Shows in the "Popular Posts" sidebar */
  popular?: boolean;
  /** Paragraphs shown in the popup */
  content: string[];
}

export const heroImages = {
  background: "/images/hhero.jpg",
};

export const blogCategories: { label: "All Posts" | BlogCategory; icon: string }[] = [
  { label: "All Posts", icon: "grid" },
  { label: "Boiler Installation", icon: "boiler" },
  { label: "Maintenance", icon: "wrench" },
  { label: "Energy Saving", icon: "leaf" },
  { label: "Heating Tips", icon: "flame" },
  { label: "Repairs", icon: "tools" },
];

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "complete-guide-choosing-right-boiler",
    title: "The Complete Guide to Choosing the Right Boiler for Your Home",
    excerpt:
      "Discover the key factors to consider when selecting a boiler, from efficiency ratings to the right size for your home. Make a confident choice and enjoy reliable heating for years to come.",
    category: "Boiler Installation",
    tag: "HEATING SYSTEMS",
    image: "/images/111.jpg",
    author: { name: "Daniel Carter", avatar: "/images/11.jpg" },
    date: "2025-04-28",
    readTime: 8,
    featured: true,
    popular: true,
    content: [
      "Choosing a new boiler is one of the biggest decisions you will make for your home. The right system keeps you warm, keeps bills down and lasts for well over a decade.",
      "Start with the type of boiler. Combi boilers heat water on demand and suit smaller homes, system boilers work with a cylinder and suit larger households, and regular boilers suit older homes with existing tanks.",
      "Next, look at efficiency. Modern condensing boilers reach 90%+ efficiency, which means far less wasted energy. Check the ErP rating and ask your installer for the SEDBUK figure.",
      "Finally, size matters. A boiler that is too small struggles on cold days, while an oversized one wastes fuel. A qualified engineer will calculate the right output for your property.",
    ],
  },
  {
    id: 2,
    slug: "step-by-step-boiler-installation-process",
    title: "Step-by-Step Boiler Installation Process Explained",
    excerpt:
      "From the first survey to the final safety check, here is exactly what happens when a new boiler is installed in your home.",
    category: "Boiler Installation",
    tag: "PROCESS",
    image: "/images/22.png",
    author: { name: "Daniel Carter", avatar: "/images/11.jpg" },
    date: "2025-04-18",
    readTime: 6,
    content: [
      "A professional installation usually takes one to two days. Knowing the steps helps you prepare and know what to expect.",
      "First, an engineer surveys your property and confirms the right boiler, flue position and pipework. Then the old boiler is drained, disconnected and removed.",
      "The new boiler is mounted, connected to the gas, water and heating pipework, and the flue is fitted. The system is then flushed and a chemical inhibitor is added to protect it.",
      "Finally, the engineer commissions the boiler, checks for gas tightness, tests the controls and walks you through how everything works.",
    ],
  },
  {
    id: 3,
    slug: "signs-boiler-needs-professional-servicing",
    title: "Signs Your Boiler Needs Professional Servicing",
    excerpt:
      "Learn the warning signs that your boiler needs attention before a small problem becomes an expensive breakdown.",
    category: "Maintenance",
    tag: "MAINTENANCE",
    image: "/images/3.jpg",
    author: { name: "Sarah Mitchell", avatar: "/images/11.jpg" },
    date: "2025-04-15",
    readTime: 5,
    popular: true,
    content: [
      "Boilers rarely fail without warning. Spotting the early signs can save you money and keep your home warm all winter.",
      "Strange noises such as banging, whistling or gurgling often point to trapped air or limescale. A yellow or orange pilot flame instead of blue can mean an unsafe combustion problem.",
      "Falling pressure, leaks, radiators that stay cold at the bottom, or a sudden rise in your energy bills are all good reasons to book a service.",
      "As a rule, have your boiler serviced once a year by a Gas Safe registered engineer. It protects your warranty and your safety.",
    ],
  },
  {
    id: 4,
    slug: "simple-ways-improve-heating-efficiency",
    title: "Simple Ways to Improve Your Home's Heating Efficiency",
    excerpt:
      "Easy, low-cost changes that help your heating work harder for you, keeping every room warm without wasting energy.",
    category: "Energy Saving",
    tag: "ENERGY SAVING",
    image: "/images/4.jpg",
    author: { name: "James Wilson", avatar: "/images/11.jpg" },
    date: "2025-04-12",
    readTime: 6,
    popular: true,
    content: [
      "You do not need a full system upgrade to get more from your heating. A few simple changes can make a real difference.",
      "Bleed your radiators regularly to release trapped air, and place reflective foil behind them on external walls. Keep furniture and curtains clear of radiators so heat can circulate.",
      "Draught-proof doors and windows, insulate your loft and consider thermostatic radiator valves so each room only heats when needed.",
      "Together, these steps can cut your heating costs noticeably while making your home more comfortable.",
    ],
  },
  {
    id: 5,
    slug: "understanding-your-thermostat-settings",
    title: "Understanding Your Thermostat Settings",
    excerpt:
      "Get the most from your thermostat with our guide to the right temperature, scheduling and smart controls.",
    category: "Heating Tips",
    tag: "HEATING TIPS",
    image: "/images/5.jpg",
    author: { name: "Emma Lewis", avatar: "/images/11.jpg" },
    date: "2025-04-10",
    readTime: 4,
    content: [
      "Your thermostat is the control centre of your heating. Setting it up properly keeps you comfortable and saves energy.",
      "Most homes feel comfortable between 18°C and 21°C. Turning your thermostat down by just one degree can noticeably reduce your yearly bill.",
      "Use scheduling to heat your home only when you need it, and consider a smart thermostat that learns your routine and can be controlled from your phone.",
    ],
  },
];

export const formatDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });