import { Sprout, Palette, Drama, Tv, Users, Handshake, Globe, Home, User, Mail, GraduationCap, Briefcase, Video } from "lucide-react";

export const SITE_NAME = "Homegrown Volunteer Network";
export const SITE_TAGLINE = "From Our Roots, We Rise";
export const SITE_DESCRIPTION = "A Kenyan community-driven movement celebrating local agriculture, arts, and culture.";
export const CONTACT_EMAIL = "info@homegrownnetwork.org";
export const CONTACT_LOCATION = "Meru, Kenya";

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@homegrownnetworktv?si=moy-v5Ri-22gjjaV",
  tiktok: "https://www.tiktok.com/@homegrowntv1?_r=1&_t=ZS-94WcmdEUCO2",
  facebook: "https://www.facebook.com/share/1CHJ2Kveu7/",
  instagram: "https://instagram.com/homegrownnetwork",
  sanaa_facebook: "https://www.facebook.com/share/18KmyG2yJZ/",
};

export const SECTOR_LINKS = [
  { label: "Sanaa Arts", href: "/sanaa-arts", iconComp: Palette },
  { label: "Culture", href: "/culture", iconComp: Drama },
  { label: "Agriculture", href: "/agriculture", iconComp: Sprout },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Homegrown TV", href: "/tv" },
  { label: "Blog", href: "/blog" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Donate", href: "/donate" },
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
    description: "Reflecting the relationship between people and the land — sustainability, food security, indigenous farming practices, and the wisdom of communities living in harmony with their environment.",
    iconComp: Sprout,
    link: "/agriculture",
  },
  {
    title: "Sanaa Arts & Creative Economy",
    description: "Expression, storytelling, and imagination — through visual arts, music, performance, and media, communities tell their stories, inspire new thinking, and build creative economies.",
    iconComp: Palette,
    link: "/sanaa-arts",
  },
  {
    title: "Homegrown TV — From Our Roots, We Rise",
    description: "A storytelling platform documenting and amplifying the voices of communities through video, documentaries, interviews, and digital storytelling.",
    iconComp: Tv,
    link: "/tv",
  },
  {
    title: "Culture & Identity Preservation",
    description: "Identity, tradition, and collective memory — language, customs, heritage, and the values that shape how communities understand themselves and their place in the world.",
    iconComp: Drama,
    link: "/culture",
  },
  {
    title: "Youth & Volunteer Engagement",
    description: "Mobilizing young people and community actors to drive local solutions as Homegrown Enablers — through storytelling, agriculture, cultural documentation, and creative production.",
    iconComp: Users,
    link: "/get-involved",
  },
];

export const TEAM_MEMBERS = [
  { name: "Hon. Eric Mutwiri Mwirigi", role: "Founder & Visionary", bio: "Driving community transformation through local solutions.", avatarComp: User },
  { name: "Amina Wanjiku", role: "Programs Director", bio: "Leading agricultural and arts initiatives across 20+ communities.", avatarComp: User },
  { name: "David Mwenda", role: "Head of Agriculture", bio: "Expert in organic farming and sustainable food systems.", avatarComp: User },
  { name: "Grace Nyambura", role: "Sanaa Arts Coordinator", bio: "Connecting artists and building Kenya's creative economy.", avatarComp: Palette },
  { name: "John Kariuki", role: "Cultural Programs Lead", bio: "Preserving heritage and indigenous knowledge systems.", avatarComp: GraduationCap },
  { name: "Fatima Hassan", role: "Community Engagement", bio: "Mobilizing volunteers and strengthening community bonds.", avatarComp: Briefcase },
  { name: "Peter Otieno", role: "Media & Communications", bio: "Storytelling through Homegrown TV and digital platforms.", avatarComp: Video },
  { name: "Mary Akinyi", role: "Membership & Partnerships", bio: "Growing the network and forging strategic alliances.", avatarComp: Handshake },
];
