export const SITE_NAME = "Homegrown Volunteer Network";
export const SITE_TAGLINE = "From Our Roots, We Rise";
export const SITE_DESCRIPTION = "A Kenyan community-driven movement celebrating local agriculture, arts, and culture.";
export const CONTACT_EMAIL = "info@homegrownnetwork.org";
export const CONTACT_LOCATION = "Meru, Kenya";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@homegrownnetwork",
  tiktok: "https://tiktok.com/@homegrownnetwork",
  facebook: "https://facebook.com/homegrownnetwork",
  instagram: "https://instagram.com/homegrownnetwork",
};

export const SECTOR_LINKS = [
  { label: "Sanaa Arts", href: "/sanaa-arts", icon: "🎨" },
  { label: "Culture", href: "/culture", icon: "🎭" },
  { label: "Agriculture", href: "/agriculture", icon: "🌱" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Homegrown TV", href: "/tv" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export const ARTS_SUBCATEGORIES = [
  "Fine Arts", "Poetry", "Spoken Word", "Instrumentals", "Band",
  "Curators", "Narrators", "Dance & Movement", "Theater & Performance",
  "Digital Arts", "Photography", "Fashion & Textile", "Crafts & Artisanship",
];

export const CULTURE_SUBCATEGORIES = [
  "Storytelling", "Film & Documentary", "Cultural Centers", "Language Preservation",
  "Traditional Music & Song", "Culinary Heritage", "Rites & Rituals",
  "Material Culture", "Indigenous Knowledge", "Cultural Festivals",
  "Elder Wisdom Programs", "Heritage Documentation",
];

export const AGRICULTURE_SUBCATEGORIES = [
  "Smallholder Farmers", "Livestock Keepers", "Agricultural Experts",
  "Crop Specialists", "Animal Specialists", "Organic Farming Advocates",
  "Agroforestry Practitioners", "Irrigation Specialists", "Seed Savers & Breeders",
  "Value Addition Processors", "Farm Input Suppliers", "Agricultural Educators",
  "Climate Smart Agriculture", "Vertical/Kitchen Gardeners", "Permaculture Designers",
];

export const MEMBERSHIP_TIERS = [
  {
    id: "free" as const,
    name: "Free Member",
    price: 0,
    benefits: [
      "Basic network access",
      "Newsletter subscription",
      "Event notifications",
      "Community forum access",
    ],
  },
  {
    id: "supporter" as const,
    name: "Supporter",
    price: 500,
    currency: "KES",
    benefits: [
      "All Free benefits",
      "Training discounts (20%)",
      "Profile featured on site",
      "Shop discounts (15%)",
      "Priority newsletter content",
    ],
  },
  {
    id: "premium" as const,
    name: "Premium Member",
    price: 2000,
    currency: "KES",
    benefits: [
      "All Supporter benefits",
      "1-on-1 mentorship sessions",
      "Priority event access",
      "Grant & funding alerts",
      "Premium resources & guides",
      "Featured artist/farmer spotlight",
    ],
  },
];

export const DONATION_TIERS = [
  { amount: 500, label: "KES 500", impact: "Trains 1 farmer in organic methods" },
  { amount: 1000, label: "KES 1,000", impact: "Sponsors an artist workshop" },
  { amount: 5000, label: "KES 5,000", impact: "Funds a community cultural event" },
  { amount: 10000, label: "KES 10,000", impact: "Supports a full training program" },
];

export const SHOP_CATEGORIES = [
  "Paintings", "Sculptures", "Textiles", "Crafts",
  "Photography", "Digital Art", "Cultural Artifacts",
];

export const PROGRAMS = [
  {
    title: "Sustainable Agriculture & Food Security",
    description: "Empowering smallholder farmers with organic techniques, seed preservation, and market access.",
    icon: "🌱",
    link: "/agriculture",
  },
  {
    title: "Arts, Culture & Creative Economy",
    description: "Building a thriving creative economy through arts training, exhibitions, and market platforms.",
    icon: "🎨",
    link: "/sanaa-arts",
  },
  {
    title: "Mindset Change & Community Empowerment",
    description: "Inspiring pride in local identity and fostering community-driven development.",
    icon: "💡",
    link: "/programs",
  },
  {
    title: "Youth & Volunteer Engagement",
    description: "Mobilizing young people to lead community transformation through volunteerism.",
    icon: "🤝",
    link: "/get-involved",
  },
  {
    title: "Environmental Conservation & Indigenous Knowledge",
    description: "Preserving indigenous knowledge systems and promoting environmental stewardship.",
    icon: "🌍",
    link: "/culture",
  },
];

export const TEAM_MEMBERS = [
  { name: "Hon. Eric Mutwiri Mwirigi", role: "Founder & Visionary", bio: "Driving community transformation through local solutions.", avatar: "👤" },
  { name: "Amina Wanjiku", role: "Programs Director", bio: "Leading agricultural and arts initiatives across 20+ communities.", avatar: "👩🏾" },
  { name: "David Mwenda", role: "Head of Agriculture", bio: "Expert in organic farming and sustainable food systems.", avatar: "👨🏾" },
  { name: "Grace Nyambura", role: "Sanaa Arts Coordinator", bio: "Connecting artists and building Kenya's creative economy.", avatar: "👩🏾‍🎨" },
  { name: "John Kariuki", role: "Cultural Programs Lead", bio: "Preserving heritage and indigenous knowledge systems.", avatar: "👨🏾‍🏫" },
  { name: "Fatima Hassan", role: "Community Engagement", bio: "Mobilizing volunteers and strengthening community bonds.", avatar: "👩🏾‍💼" },
  { name: "Peter Otieno", role: "Media & Communications", bio: "Storytelling through Homegrown TV and digital platforms.", avatar: "🎬" },
  { name: "Mary Akinyi", role: "Membership & Partnerships", bio: "Growing the network and forging strategic alliances.", avatar: "🤝" },
];
