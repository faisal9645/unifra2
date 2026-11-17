import { GalleryItem, ProjectItem, BlogPost, CoreValue, Hotspot } from '../types';
import {
  archInteriorLiving,
  masterSuiteCoastal,
  oceanfrontVillaTwilight,
  coastalHorizonEcr
} from '../assets/archImages';

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'butterfly-roof',
    name: 'Scandinavian Butterfly Roof & Clerestory',
    subtitle: 'Angled Pitch & Gable Glass',
    categoryLabel: 'Roof Architecture',
    position: [0.8, 3.8, 1.2],
    cameraPosition: [2.5, 4.6, 5.0],
    cameraTarget: [0.8, 3.4, 1.0],
    imageUrl: '/images/web/facade.webp',
    description: 'Asymmetrical pitched roofline inspired by Scandinavian coastal architecture, featuring a triangular clerestory window that channels morning sunlight deep into the upper loft.',
    specs: [
      { label: 'Roof Design', value: 'Asymmetrical Butterfly' },
      { label: 'Clerestory', value: 'Acoustic Solar Low-E' },
      { label: 'Soffits', value: 'Recessed 2700K Strip' }
    ]
  },
  {
    id: 'living-atrium',
    name: 'Double-Height Great Room Atrium',
    subtitle: '22-Ft Volume & Floating Stairs',
    categoryLabel: 'Living & Great Room',
    position: [-1.2, 1.4, 1.4],
    cameraPosition: [-1.5, 2.0, 4.5],
    cameraTarget: [-0.8, 1.3, 0.5],
    imageUrl: '/images/web/living.webp',
    description: 'Spectacular 22-foot double-height living room illuminated by architectural ring chandeliers, cantilevered floating wooden stairs, and expansive glass curtain walls.',
    specs: [
      { label: 'Ceiling Height', value: '22 Feet Volume' },
      { label: 'Feature', value: 'Floating Staircase' },
      { label: 'Glazing', value: 'Curtain Wall Low-E' }
    ]
  },
  {
    id: 'granite-balcony',
    name: 'Cantilevered Granite Balcony & Sconces',
    subtitle: 'Terrace with Architectural Sconces',
    categoryLabel: 'Master Deck & Facade',
    position: [2.2, 2.6, 2.2],
    cameraPosition: [4.0, 3.2, 4.2],
    cameraTarget: [2.0, 2.4, 1.8],
    imageUrl: '/images/web/beach-villa.webp',
    description: 'Protruding solid granite stone block featuring up-and-down brass sconce beam fixtures, toughened glass balustrade, and sea-breeze terrace lounge.',
    specs: [
      { label: 'Cladding', value: 'Honed Dark Granite' },
      { label: 'Lighting', value: 'Up/Down Brass Sconces' },
      { label: 'Balustrade', value: '15mm Toughened Glass' }
    ]
  },
  {
    id: 'master-loft',
    name: 'Master Sanctuary Loft Suite',
    subtitle: 'Timber Rafters & Clerestory',
    categoryLabel: 'Master Sanctuary & Suites',
    position: [0.6, 3.1, 0.4],
    cameraPosition: [1.8, 3.5, 3.8],
    cameraTarget: [0.5, 2.9, 0.2],
    imageUrl: '/images/web/master.webp',
    description: 'Cathedral volume master suite with exposed natural wood roof rafters, integrated ambient LED cove glow, and direct views through the clerestory peak.',
    specs: [
      { label: 'Ceiling', value: 'Exposed Cedar Rafters' },
      { label: 'Suite Area', value: '620 Sq.Ft.' },
      { label: 'Walk-In', value: 'Bespoke Dressing Room' }
    ]
  },
  {
    id: 'culinary-studio',
    name: 'Minimalist Culinary Studio',
    subtitle: 'Marble Island & European Modular',
    categoryLabel: 'Dining & Kitchen',
    position: [-1.4, 0.8, -0.6],
    cameraPosition: [-0.6, 1.4, 2.8],
    cameraTarget: [-1.4, 0.9, -0.4],
    imageUrl: '/images/web/kitchen.webp',
    description: 'Custom European-style modular kitchen with seamless quartz island, bookmatched marble backsplash, under-cabinet LED wash, and hidden pantry preparation area.',
    specs: [
      { label: 'Cabinetry', value: 'Blum Touch-to-Open' },
      { label: 'Backsplash', value: 'Bookmatched Marble' },
      { label: 'Appliances', value: 'Concealed Gaggenau' }
    ]
  },
  {
    id: 'lotus-gate',
    name: 'Illuminated Twilight Pavilion & EV Portico',
    subtitle: 'Monolithic Stone Monument & Driveway',
    categoryLabel: 'Gated Enclave & Entry',
    position: [2.0, 0.5, 2.8],
    cameraPosition: [3.2, 1.5, 5.8],
    cameraTarget: [1.6, 0.6, 2.4],
    imageUrl: '/images/web/twilight.webp',
    description: 'Covered dual car portico with warm recessed downlights, paired with the iconic illuminated MYSA lotus stone gate and Belgian cobblestone arrival avenue.',
    specs: [
      { label: 'Portico Parking', value: '2 Full-Size Luxury SUVs' },
      { label: 'EV Station', value: '22kW Dual Superchargers' },
      { label: 'Gate Portal', value: 'Backlit Stone Lotus' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'mysa-facade-scandi',
    title: 'Scandinavian Butterfly Facade & Timber Cladding',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Front Elevation · Unifra Gated Community, ECR',
    imageUrl: '/images/web/facade.webp',
    description: 'Signature Scandinavian butterfly roofline, triangular clerestory gable glass, horizontal cedar cladding, and cantilevered dark granite balcony with architectural lighting.',
    area: '4,150 Sq.Ft. · Signature Elevation',
    heroEyebrow: 'INDEPENDENT HOMES / CHENNAI, INDIA',
    heroHeadlineMain: 'The art of',
    heroHeadlineItalic: 'arriving home.',
    heroSubtitle: 'Considered Scandinavian architecture, tactile materials, and the kind of coastal quiet that endures on Chennai’s East Coast Road.'
  },
  {
    id: 'mysa-panoramic-day',
    title: 'Coastal Daylight Facade & Arrival Courtyard',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Gated Enclave Boulevard · ECR Chennai',
    imageUrl: '/images/web/beach-villa.webp',
    description: 'Crisp architectural daylight study highlighting deep cantilevered stone overhangs, recessed portico downlights, and lush coastal landscaping.',
    area: '3 Levels · Full Enclave Elevation',
    heroEyebrow: 'DAYLIGHT STUDY / ECR, CHENNAI',
    heroHeadlineMain: 'Sanctuary under',
    heroHeadlineItalic: 'coastal skies.',
    heroSubtitle: 'Thoughtful exterior shading, recessed portico lighting, and private rooftop terraces calibrated for coastal living.'
  },
  {
    id: 'mysa-avenue-gate',
    title: 'Twilight Elevation & Illuminated Courtyard',
    category: 'Facade',
    categoryLabel: 'Gated Enclave & Entry',
    location: 'Main Access Portal · Vettuvankeni ECR',
    imageUrl: '/images/web/twilight.webp',
    description: 'Evening architectural facade glowing with warm 2700K interior illumination, framed by manicured greenery and private arrival courts.',
    area: 'Private Access Avenue',
    heroEyebrow: 'PRIVATE ARRIVAL / VETTUVANKENI, ECR',
    heroHeadlineMain: 'Where grand arrival',
    heroHeadlineItalic: 'begins.',
    heroSubtitle: 'An exclusive gated enclave framed by monolithic stone markers, coastal palms, and serene twilight warmth.'
  },
  {
    id: 'mysa-living-atrium',
    title: 'Double-Height Great Room & Floating Staircase',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Heart',
    imageUrl: '/images/web/living.webp',
    description: 'Dramatic 22-foot double-height living room featuring an architectural ring chandelier, cantilevered floating wooden staircase, and full-height glass fenestration.',
    area: '850 Sq.Ft. · 22-Ft Volume',
    heroEyebrow: 'GREAT ROOM ATRIUM / 22-FT VOLUME',
    heroHeadlineMain: 'Light, space &',
    heroHeadlineItalic: 'architectural volume.',
    heroSubtitle: 'A 22-foot double-height living room illuminated by architectural ring chandeliers and full-height curtain walls.'
  },
  {
    id: 'mysa-master-loft',
    title: 'Cathedral Master Loft Suite with Timber Rafters',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'Upper Level Private Sanctuary',
    imageUrl: '/images/web/master.webp',
    description: 'Vaulted Scandinavian ceiling with exposed solid wood rafters, triangular clerestory sun window, bespoke minimalist pendant lamps, and private dressing area.',
    area: '620 Sq.Ft. · Cathedral Ceiling',
    heroEyebrow: 'MASTER SANCTUARY / CATHEDRAL LOFT',
    heroHeadlineMain: 'Rest in quiet',
    heroHeadlineItalic: 'Scandinavian luxury.',
    heroSubtitle: 'Vaulted Scandinavian ceilings with exposed natural cedar rafters and a triangular clerestory peak.'
  },
  {
    id: 'mysa-culinary-studio',
    title: 'Bespoke Designer Kitchen & Marble Splashback',
    category: 'Dining',
    categoryLabel: 'Dining & Kitchen',
    location: 'Ground Level Culinary Wing',
    imageUrl: '/images/web/kitchen.webp',
    description: 'Custom European-style modular cabinetry, integrated warm LED under-cabinet wash, premium bookmatched marble backsplash, and concealed premium appliances.',
    area: '380 Sq.Ft. · Kitchen & Breakfast Bar',
    heroEyebrow: 'CULINARY STUDIO / SCANDINAVIAN INTERIORS',
    heroHeadlineMain: 'The craft of',
    heroHeadlineItalic: 'fine dining.',
    heroSubtitle: 'Custom European modular cabinetry, bookmatched marble backsplashes, and integrated touch-to-open storage.'
  },
  {
    id: 'mysa-mezzanine-lounge',
    title: 'Upper Mezzanine Family Media Lounge',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Level 1 Family Retreat',
    imageUrl: '/images/web/lounge.webp',
    description: 'Intimate family lounge with acoustic wood slatted feature wall, plush low-profile Scandinavian furnishings, and views overlooking the great room atrium.',
    area: '460 Sq.Ft. · Mezzanine Lounge',
    heroEyebrow: 'MEZZANINE LOUNGE / FAMILY RETREAT',
    heroHeadlineMain: 'Intimate family',
    heroHeadlineItalic: 'moments.',
    heroSubtitle: 'An upper-level family retreat featuring acoustic timber slat paneling and open views over the great room atrium.'
  },
  {
    id: 'mysa-first-floor-suite',
    title: 'First Floor Bedroom Suite with Vertical Wood Slats',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level West Wing',
    imageUrl: '/images/web/bedroom-first.webp',
    description: 'Elegantly detailed bedroom suite featuring full-height vertical fluted timber wall paneling, integrated floating bedside consoles, and ambient cove lighting.',
    area: '480 Sq.Ft. · En-Suite',
    heroEyebrow: 'FIRST FLOOR SUITE / CHENNAI, INDIA',
    heroHeadlineMain: 'Tactile woods &',
    heroHeadlineItalic: 'soft ambient glow.',
    heroSubtitle: 'Full-height vertical fluted timber wall paneling meets floating bedside consoles and warm cove lighting.'
  },
  {
    id: 'mysa-ground-suite',
    title: 'Ground Floor Guest Suite & Garden Fenestration',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'Ground Level Garden Wing',
    imageUrl: '/images/web/bedroom-ground.webp',
    description: 'Private barrier-free ground floor bedroom with expansive floor-to-ceiling garden glazing, warm brass sconces, and direct access to the landscaped courtyard.',
    area: '420 Sq.Ft. · Garden Suite',
    heroEyebrow: 'GARDEN SUITE / GROUND LEVEL',
    heroHeadlineMain: 'Seamless indoor &',
    heroHeadlineItalic: 'outdoor living.',
    heroSubtitle: 'A barrier-free ground floor suite framed by floor-to-ceiling garden glazing and step-out courtyard access.'
  },
  {
    id: 'mysa-living-bespoke',
    title: 'Travertine & Burmese Teak Living Pavilion',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Living Wing',
    imageUrl: '/images/web/teak-interior.webp',
    description: 'Sunlit coastal salon pairing honed travertine stone floors with custom Burmese teak fluted joinery and sheer Belgian linen drapery.',
    area: '720 Sq.Ft. · Living Pavilion',
    heroEyebrow: 'FINISHED INTERIORS / TRAVERTINE & TEAK',
    heroHeadlineMain: 'Timeless interior',
    heroHeadlineItalic: 'craftsmanship.',
    heroSubtitle: 'Honed travertine stone floors, clean architectural lines, and warm natural coastal daylight.'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'quality',
    title: 'Uncompromising Quality',
    description: 'We are committed to the highest standards of craftsmanship, using premium natural stone, seasoned timber, and meticulous structural tolerances that endure for generations.',
    iconName: 'Compass'
  },
  {
    id: 'innovation',
    title: 'Pioneering Innovation',
    description: 'From passive coastal airflow engineering to discreet smart-home orchestration and solar-ready power, our residences combine timeless warmth with future-ready intelligence.',
    iconName: 'Zap'
  },
  {
    id: 'trust',
    title: 'Foundation of Trust',
    description: 'Transparent documentation, clear independent land titles, and disciplined milestone delivery form the cornerstone of every relationship we build.',
    iconName: 'Shield'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sustainable-luxury',
    title: 'Sustainable Luxury: Scandinavian Butterfly Roof Architecture in Chennai',
    tag: 'Sustainability',
    readTime: '4 min read',
    date: 'February 2026',
    imageUrl: '/images/web/panorama.webp',
    summary: 'How the angled Scandinavian butterfly roof, clerestory solar harvesting, and passive sea breeze ventilation harmonize in MYSA Villas.',
    content: [
      'True luxury in the modern era is intrinsically tied to sustainability. At MYSA Villas, our architectural philosophy prioritizes ecological harmony without compromising on comfort or indulgence.',
      'The distinctive Scandinavian butterfly pitched roof creates natural air-foil conduits that capture cooling coastal breezes along ECR, while high-efficiency triangular clerestory glass floods the interior with soft ambient light.',
      'From concealed 10kW rooftop photovoltaic arrays to micro-percolation groundwater recharging systems, every MYSA villa development achieves a net-positive environmental footprint.'
    ]
  },
  {
    id: 'art-of-mysa',
    title: "The Art of 'Mysa': Swedish Contentment in Chennai's Coastal Atriums",
    tag: 'Lifestyle',
    readTime: '5 min read',
    date: 'January 2026',
    imageUrl: '/images/web/living.webp',
    summary: 'Double-height volume, warm floating timber stairs, and double-ring gold illumination creating intentional coziness along ECR.',
    content: [
      "The Swedish concept of 'Mysa' encompasses comfort, coziness, and enjoying the present moment with loved ones. It is an intentional sanctuary from the hurried pace of everyday life.",
      'In designing MYSA Villas along Chennai’s East Coast Road, we merged Scandinavian minimalism with warm coastal textures—a 22-foot double-height living room, floating oak treads, and a sculptural gold chandelier.',
      'The result is a living space where every corner invites you to pause, sip your morning coffee, and savor quiet moments of pure contentment.'
    ]
  },
  {
    id: 'vettuvankeni-hotspot',
    title: "Investment Hotspot: Why Vettuvankeni is Chennai's Premier Coastal Enclave",
    tag: 'Real Estate',
    readTime: '6 min read',
    date: 'December 2025',
    imageUrl: '/images/web/coast.webp',
    summary: 'Low-density zoning, coastal proximity, and bespoke architecture driving long-term capital appreciation along East Coast Road.',
    content: [
      'Vettuvankeni has quietly evolved into Chennai’s most prestigious luxury villa enclave. Situated along the East Coast Road yet minutes away from the OMR IT Corridor and Adyar, it offers unrivaled convenience.',
      'Anchored by quiet tree-lined avenues and independent villa zoning, the enclave preserves lush green canopies, clean ocean air, and serene low-rise privacy.',
      'Historical price trends demonstrate steady annual capital appreciation, driven by discerning families seeking coastal peace with city connectivity.'
    ]
  },
  {
    id: 'smart-homes-luxury',
    title: 'The Rise of Smart Homes: Invisible Intelligence in Scandinavian Villas',
    tag: 'Innovation',
    readTime: '4 min read',
    date: 'November 2025',
    imageUrl: '/images/web/kitchen.webp',
    summary: 'From the minimalist culinary studio with Blum touch cabinetry to circadian LED illumination that adapts to coastal twilight.',
    content: [
      'The best technology is invisible. In a MYSA villa, automation is not an overt display of gadgetry, but a silent butler that orchestrates your environment seamlessly.',
      'In the culinary studio, integrated appliances, touch-to-open walnut joinery, and concealed lighting channels deliver an uncluttered gourmet cooking experience.',
      'Smart water sensors, motorized architectural louvers that respond to real-time sea winds, and automated pool filtration ensure absolute peace of mind.'
    ]
  }
];

export const SIGNATURE_PROJECTS: ProjectItem[] = [
  {
    id: 'mysa-villas',
    name: 'MYSA Luxe Villas',
    tagline: 'Scandinavian Butterfly Roof & Beachside Pool Villas',
    location: 'Vettuvankeni, ECR Chennai',
    type: 'Exclusive Gated Enclave of 6 Private Pool Villas',
    units: '6 Bespoke Residences',
    carpetArea: '4,450 – 5,800 Sq.Ft.',
    status: 'Under Construction',
    statusBadge: 'Ongoing',
    badgeDays: 'ONGOING CONSTRUCTION',
    badgeSold: '3 of 6 Reserved',
    imageUrl: '/images/web/facade.webp',
    description: 'Swedish-inspired 4 & 5 BHK architectural villas distinguished by dramatic angled butterfly pitched roofs, front-facing triangular clerestory gable glass, and private reflection lap pools.',
    highlights: [
      'Scandinavian Butterfly Pitched Roof with Dark Bronze Fascia',
      'Front Triangular Clerestory Gable Window with Warm Glow',
      'Double-Height Living Atrium with Floating Timber Stairs',
      'Private Coastal Reflection Pool & Travertine Arrival Walkway'
    ],
    specs: {
      bedrooms: '4 & 5 BHK',
      bathrooms: '5.5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '3 Car Stalls'
    }
  },
  {
    id: 'the-pearl-residences',
    name: 'Azure Enclave Oceanfront',
    tagline: 'Modernist Cantilevered Coastal Mansions',
    location: 'Akkarai, ECR Chennai',
    type: 'Bespoke Oceanfront Private Estates',
    units: '4 Ultra-Luxe Mansions',
    carpetArea: '6,200 Sq.Ft.',
    status: 'Under Construction',
    statusBadge: 'Ongoing',
    badgeDays: 'PRIVATE RELEASE',
    badgeSold: '2 of 4 Reserved',
    imageUrl: '/images/web/oceanfront.webp',
    description: 'Prominent coastal elevation featuring deep cantilevered dark granite balcony blocks with toughened glass balustrades, dual architectural satin brass sconces, and covered double-car porticos.',
    highlights: [
      'Deep Cantilevered Dark Granite Balcony with Glass Balustrade',
      'Dual Architectural Satin Brass Sconces with LED Lenses',
      'Covered Double-Car Portico with Recessed Ceiling Downlights',
      'Horizontal Cedar Slat Facade Cladding with Planter Foliage'
    ],
    specs: {
      bedrooms: '4 BHK Luxury',
      bathrooms: '5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '2 Covered Bays'
    }
  },
  {
    id: 'orchid-gardens',
    name: 'Unifra Crest Urban Sanctuary',
    tagline: 'Artisanal Teak Living & Courtyard Penthouses',
    location: 'Kotturpuram, Chennai',
    type: 'Turnkey Luxury Penthouses',
    units: 'Exclusive 8 Residences',
    carpetArea: '5,100 Sq.Ft.',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    badgeDays: 'PRE-BOOKING OPEN',
    badgeSold: 'Pre-launch Phase',
    imageUrl: '/images/web/salon.webp',
    description: 'Completed interior philosophy showcasing solid Burmese teak artisanal joinery, travertine flooring, floating media consoles, and warm 2700K perimeter illumination.',
    highlights: [
      'Completed Furnished Residence with Solid Teak Finishes',
      'Integrated Media Console with Concealed LED Backlighting',
      'Full Height Sheer Drapes & Recessed Warm Illumination',
      'Open Flow into the Double-Height Dining & Living Atrium'
    ],
    specs: {
      bedrooms: '5 BHK Ultra',
      bathrooms: '5.5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '3 Car Bays'
    }
  },
  {
    id: 'unifra-aurelia',
    name: 'Unifra Sereno Eco Enclave',
    tagline: 'Biophilic Coastal Sanctuary & Private Green Boulevard',
    location: 'Palavakkam, ECR Chennai',
    type: 'Gated Private Community',
    units: '8 Eco-Luxe Homes',
    carpetArea: '4,800 Sq.Ft.',
    status: 'Ready to Move',
    statusBadge: 'Completed',
    badgeDays: 'READY FOR OCCUPANCY',
    badgeSold: 'Final Units Available',
    imageUrl: '/images/web/suite.webp',
    description: 'A serene gated arrival framed by monolithic stone markers, manicured coastal palm canopies, Belgian cobblestone avenues, and 24/7 private security.',
    highlights: [
      'Monolithic Stone Gate Monument with Warm Ground Uplighting',
      '24/7 Monitored Biometric Gated Security Access',
      'Belgian Cobble Arrival Driveway with Landscaped Medians',
      'EV Fast-Charging Infrastructure at Every Villa Portico'
    ],
    specs: {
      bedrooms: '4 BHK Garden',
      bathrooms: '4.5 Ensuite',
      levels: 'G + 2 Floors',
      parking: 'Dedicated Porticos'
    }
  }
];

export { archInteriorLiving, masterSuiteCoastal, oceanfrontVillaTwilight, coastalHorizonEcr };
