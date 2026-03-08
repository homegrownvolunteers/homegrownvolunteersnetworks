export interface SubcategoryDetail {
  title: string;
  description: string;
  howToGetInvolved: string;
  relatedTV?: string;
  highlights: string[];
}

export const AGRICULTURE_DETAILS: Record<string, SubcategoryDetail> = {
  "Smallholder Farmers": {
    title: "Smallholder Farmers",
    description: "Supporting small-scale farmers who form the backbone of Kenya's food production. We provide training, resources, and market access to help them thrive.",
    howToGetInvolved: "Join our farmer networks, attend field days, or volunteer as a farm mentor in your community.",
    relatedTV: "Watch stories of smallholder success on Homegrown TV.",
    highlights: ["Over 500 farmers trained", "Community seed banks established", "Market linkage programs"],
  },
  "Livestock Keepers": {
    title: "Livestock Keepers",
    description: "Connecting pastoralists and livestock keepers with veterinary support, breed improvement programs, and sustainable grazing practices.",
    howToGetInvolved: "Volunteer with livestock health clinics or help document indigenous animal husbandry techniques.",
    highlights: ["Veterinary outreach programs", "Indigenous breed preservation", "Pasture management training"],
  },
  "Agricultural Experts": {
    title: "Agricultural Experts",
    description: "A network of agronomists, extension officers, and researchers sharing knowledge to improve farming outcomes across communities.",
    howToGetInvolved: "Share your expertise through workshops, mentorship, or contribute to our knowledge base.",
    highlights: ["Expert-led workshops", "Research partnerships", "Knowledge sharing platform"],
  },
  "Crop Specialists": {
    title: "Crop Specialists",
    description: "Experts focused on crop improvement, pest management, and maximizing yields through sustainable practices.",
    howToGetInvolved: "Contribute crop management guides or lead training sessions for local farmers.",
    highlights: ["Integrated pest management", "Crop rotation programs", "Yield optimization"],
  },
  "Organic Farming Advocates": {
    title: "Organic Farming Advocates",
    description: "Promoting chemical-free farming methods that protect soil health, biodiversity, and produce nutritious food for communities.",
    howToGetInvolved: "Start an organic demonstration garden or help certify community farms.",
    highlights: ["Organic certification support", "Composting workshops", "Soil health programs"],
  },
  "Agroforestry Practitioners": {
    title: "Agroforestry Practitioners",
    description: "Integrating trees and crops for sustainable land use, carbon sequestration, and diversified income streams.",
    howToGetInvolved: "Plant trees, design agroforestry systems, or document successful models in your area.",
    highlights: ["Tree planting campaigns", "Carbon offset programs", "Multi-story farming"],
  },
  "Seed Savers & Breeders": {
    title: "Seed Savers & Breeders",
    description: "Preserving indigenous seed varieties and developing locally adapted crops for food security and cultural heritage.",
    howToGetInvolved: "Contribute seeds to community seed banks or participate in seed exchange events.",
    highlights: ["Indigenous seed preservation", "Community seed banks", "Seed exchange networks"],
  },
  "Climate Smart Agriculture": {
    title: "Climate Smart Agriculture",
    description: "Adapting farming practices to climate change through water harvesting, drought-resistant varieties, and conservation agriculture.",
    howToGetInvolved: "Implement climate-smart practices on your farm or train others in adaptation techniques.",
    highlights: ["Rainwater harvesting", "Drought-resistant crops", "Conservation tillage"],
  },
  "Vertical/Kitchen Gardeners": {
    title: "Vertical/Kitchen Gardeners",
    description: "Urban and peri-urban food production using innovative small-space techniques for household food security.",
    howToGetInvolved: "Start a kitchen garden, share techniques, or help set up community vertical gardens.",
    highlights: ["Urban farming guides", "Container gardening", "Household food security"],
  },
  "Permaculture Designers": {
    title: "Permaculture Designers",
    description: "Designing regenerative agricultural systems that mimic natural ecosystems for long-term sustainability.",
    howToGetInvolved: "Design permaculture systems for communities or teach permaculture principles.",
    highlights: ["Regenerative design", "Food forests", "Water management systems"],
  },
};

export const ARTS_DETAILS: Record<string, SubcategoryDetail> = {
  "Fine Arts": {
    title: "Fine Arts",
    description: "Painting, drawing, sculpture, and mixed media — celebrating Kenya's rich visual arts tradition and contemporary expressions.",
    howToGetInvolved: "Submit your artwork for exhibitions, join artist collectives, or mentor emerging artists.",
    highlights: ["Community exhibitions", "Artist residencies", "Public art installations"],
  },
  "Poetry": {
    title: "Poetry",
    description: "Written and performed poetry that captures the African experience, social commentary, and cultural expression.",
    howToGetInvolved: "Submit poems for publication, perform at open mic nights, or lead poetry workshops.",
    highlights: ["Poetry anthologies", "Open mic events", "Youth poetry programs"],
  },
  "Spoken Word": {
    title: "Spoken Word",
    description: "Powerful oral performances blending poetry, storytelling, and social commentary to inspire and educate.",
    howToGetInvolved: "Perform at community events, create content for Homegrown TV, or mentor youth speakers.",
    highlights: ["Performance nights", "Youth mentorship", "Digital content creation"],
  },
  "Dance & Movement": {
    title: "Dance & Movement",
    description: "Traditional and contemporary dance forms preserving cultural movement traditions while creating new artistic expressions.",
    howToGetInvolved: "Join dance troupes, teach traditional dances, or choreograph community performances.",
    highlights: ["Dance festivals", "Traditional preservation", "Youth dance programs"],
  },
  "Theater & Performance": {
    title: "Theater & Performance",
    description: "Community theater bringing stories to life through drama, puppetry, and interactive performances.",
    howToGetInvolved: "Act, direct, write scripts, or help with production for community theater groups.",
    highlights: ["Community plays", "Street theater", "Drama workshops"],
  },
  "Digital Arts": {
    title: "Digital Arts",
    description: "Graphic design, animation, digital illustration, and multimedia art for the modern creative economy.",
    howToGetInvolved: "Create digital content, teach digital skills, or contribute to community media projects.",
    highlights: ["Digital skills training", "Online portfolios", "Creative tech workshops"],
  },
  "Photography": {
    title: "Photography",
    description: "Documentary, artistic, and community photography capturing stories, landscapes, and cultural moments.",
    howToGetInvolved: "Document community stories, exhibit your work, or teach photography to youth.",
    highlights: ["Photo exhibitions", "Documentary projects", "Youth photography clubs"],
  },
  "Fashion & Textile": {
    title: "Fashion & Textile",
    description: "Traditional and contemporary fashion design, textile arts, and wearable cultural expressions.",
    howToGetInvolved: "Showcase designs, teach textile techniques, or collaborate on fashion shows.",
    highlights: ["Fashion showcases", "Textile workshops", "Cultural fashion preservation"],
  },
  "Crafts & Artisanship": {
    title: "Crafts & Artisanship",
    description: "Woodwork, beadwork, basket weaving, pottery, and other traditional crafts sustaining communities and cultures.",
    howToGetInvolved: "Sell crafts through our shop, teach craft-making, or document artisan techniques.",
    highlights: ["Artisan markets", "Craft training", "E-commerce platform"],
  },
};

export const CULTURE_DETAILS: Record<string, SubcategoryDetail> = {
  "Storytelling": {
    title: "Storytelling",
    description: "Oral traditions, folktales, and narrative arts that carry wisdom, history, and cultural values across generations.",
    howToGetInvolved: "Share stories from your community, record elders' narratives, or lead storytelling sessions.",
    highlights: ["Story documentation", "Elder interviews", "Children's storytelling"],
  },
  "Film & Documentary": {
    title: "Film & Documentary",
    description: "Creating films and documentaries that preserve cultural practices and share community stories with the world.",
    howToGetInvolved: "Produce content for Homegrown TV, document cultural events, or train in filmmaking.",
    relatedTV: "Many of our documentaries air on Homegrown TV.",
    highlights: ["Documentary production", "Film workshops", "Cultural film festivals"],
  },
  "Cultural Centers": {
    title: "Cultural Centers",
    description: "Community spaces dedicated to cultural learning, exhibitions, performances, and intergenerational knowledge exchange.",
    howToGetInvolved: "Help establish or run a cultural center, host events, or curate exhibitions.",
    highlights: ["Community spaces", "Cultural exhibitions", "Learning programs"],
  },
  "Language Preservation": {
    title: "Language Preservation",
    description: "Documenting and revitalizing indigenous languages through education, media, and community engagement.",
    howToGetInvolved: "Help document endangered languages, create learning materials, or teach mother tongue classes.",
    highlights: ["Language documentation", "Mother tongue education", "Dictionary projects"],
  },
  "Traditional Music & Song": {
    title: "Traditional Music & Song",
    description: "Preserving and performing traditional musical forms, instruments, and songs that carry cultural identity.",
    howToGetInvolved: "Perform traditional music, teach instruments, or help record traditional songs.",
    highlights: ["Music recordings", "Instrument making", "Youth music programs"],
  },
  "Culinary Heritage": {
    title: "Culinary Heritage",
    description: "Preserving traditional recipes, cooking methods, and food cultures that define community identity.",
    howToGetInvolved: "Share recipes, host cooking demonstrations, or help document food traditions.",
    highlights: ["Recipe documentation", "Food festivals", "Cooking workshops"],
  },
  "Indigenous Knowledge": {
    title: "Indigenous Knowledge",
    description: "Traditional ecological knowledge, medicinal plants, agricultural wisdom, and community governance systems.",
    howToGetInvolved: "Document traditional knowledge, connect with knowledge keepers, or support preservation projects.",
    highlights: ["Knowledge documentation", "Elder wisdom programs", "Research partnerships"],
  },
  "Cultural Festivals": {
    title: "Cultural Festivals",
    description: "Organizing and participating in festivals that celebrate diverse cultural traditions and bring communities together.",
    howToGetInvolved: "Help organize festivals, perform, volunteer, or sponsor cultural events.",
    highlights: ["Annual festivals", "Community celebrations", "Cultural exchanges"],
  },
  "Heritage Documentation": {
    title: "Heritage Documentation",
    description: "Systematically recording cultural practices, sites, artifacts, and histories for future generations.",
    howToGetInvolved: "Join documentation teams, contribute photos/videos, or help digitize cultural archives.",
    highlights: ["Digital archives", "Photo documentation", "Oral history projects"],
  },
};
