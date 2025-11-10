export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: { slug: string; name: string };
  date: string;
  readTime: string;
  image: string;
  body: Array<{ heading: string; paragraphs: string[] }>;
};

export const NEWS_CATEGORIES = [
  { slug: 'heavy-equipment', name: 'Heavy Equipment' },
  { slug: 'safety', name: 'Safety' },
  { slug: 'maintenance', name: 'Maintenance' },
  { slug: 'rentals', name: 'Rentals' },
  { slug: 'finance', name: 'Finance' },
  { slug: 'attachments', name: 'Attachments' },
  { slug: 'transport-logistics', name: 'Transport & Logistics' },
  { slug: 'industry-trends', name: 'Industry Trends' },
];

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: 'forklift-types',
    title: 'Forklift Types: Choosing the Right Model for Your Warehouse',
    excerpt:
      'Understand the differences between electric, diesel, and LPG forklifts, plus mast and tire options.',
    tag: { slug: 'heavy-equipment', name: 'Heavy Equipment' },
    date: 'Jan 2025',
    readTime: '6 min',
    image: '/assets/categories/forklifts.png',
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'Selecting a forklift starts with understanding power source, lift requirements, aisle width, and duty cycle.',
          'Electric models suit indoor operations with low emissions, while diesel/LPG handle heavier outdoor tasks.',
        ],
      },
      {
        heading: 'Key Considerations',
        paragraphs: [
          'Mast type, tire configuration, and capacity rating directly impact stability and operational safety.',
          'Plan for charging/fueling infrastructure and preventative maintenance cadence to minimize downtime.',
        ],
      },
    ],
  },
  {
    slug: 'excavator-selection',
    title: 'Excavator Selection: Size, Attachments, and Site Conditions',
    excerpt:
      'Key factors when picking between mini, midi, and standard excavators with the right attachments.',
    tag: { slug: 'heavy-equipment', name: 'Heavy Equipment' },
    date: 'Jan 2025',
    readTime: '7 min',
    image: '/assets/equipment/cat-320d-excavator-1.jpg',
    body: [
      {
        heading: 'Sizing and Tasks',
        paragraphs: [
          'Match machine size to trenching depth, material type, and access constraints.',
          'Mini excavators excel in tight urban sites; standard sizes deliver productivity in open areas.',
        ],
      },
      {
        heading: 'Attachments',
        paragraphs: [
          'Quick couplers enable fast swaps between buckets, breakers, and compactors.',
          'Right tool selection improves cycle times and reduces wear on the machine.',
        ],
      },
    ],
  },
  {
    slug: 'crane-safety-checklist',
    title: 'Crane Safety Checklist: Daily Inspections and Best Practices',
    excerpt:
      'A practical checklist to improve lifting safety and minimize risk on busy construction sites.',
    tag: { slug: 'safety', name: 'Safety' },
    date: 'Jan 2025',
    readTime: '5 min',
    image: '/assets/equipment/liebherr-crane.jpg',
    body: [
      {
        heading: 'Daily Inspections',
        paragraphs: [
          'Verify rigging integrity, counterweight setup, and boom condition before operations.',
          'Confirm load charts and ground conditions; review wind limits and communication protocols.',
        ],
      },
    ],
  },
  {
    slug: 'skidsteer-vs-track-loader',
    title: 'Skid-Steer vs Track Loader: Which One Should You Rent?',
    excerpt:
      'Compare traction, ground pressure, and maintenance costs to pick the best machine for the job.',
    tag: { slug: 'rentals', name: 'Rentals' },
    date: 'Jan 2025',
    readTime: '4 min',
    image: '/assets/categories/skid-steers.png',
    body: [
      {
        heading: 'Traction and Terrain',
        paragraphs: [
          'Track loaders provide lower ground pressure for soft surfaces; skid-steers are agile on firm ground.',
        ],
      },
    ],
  },
  {
    slug: 'attachment-guide',
    title: 'Attachment Guide: Buckets, Breakers, Forks, and More',
    excerpt:
      'Boost machine versatility with the right attachments for material handling and earthmoving tasks.',
    tag: { slug: 'attachments', name: 'Attachments' },
    date: 'Jan 2025',
    readTime: '6 min',
    image: '/assets/categories/attachments.png',
    body: [
      {
        heading: 'Versatility Wins',
        paragraphs: [
          'Attachments extend fleet capability; invest in common tools to increase utilization across projects.',
        ],
      },
    ],
  },
  {
    slug: 'maintenance-schedule-basics',
    title: 'Maintenance Schedule Basics: Keep Your Fleet Running Smoothly',
    excerpt:
      'Oil changes, filters, and inspection intervals to extend equipment lifespan and reduce downtime.',
    tag: { slug: 'maintenance', name: 'Maintenance' },
    date: 'Jan 2025',
    readTime: '5 min',
    image: '/assets/equipment/scissor-lift.jpg',
    body: [
      {
        heading: 'Preventative Approach',
        paragraphs: [
          'Standardize checklists and intervals; use telematics to catch issues before failures.',
        ],
      },
    ],
  },
  {
    slug: 'renting-vs-buying',
    title: 'Renting vs Buying: Financial Considerations for Contractors',
    excerpt:
      'Analyze total cost of ownership, utilization, and cash flow to make smart equipment decisions.',
    tag: { slug: 'finance', name: 'Finance' },
    date: 'Jan 2025',
    readTime: '8 min',
    image: '/assets/hero-equipment.jpg',
    body: [
      {
        heading: 'Cost Model',
        paragraphs: [
          'Compare rental rates against ownership costs: depreciation, maintenance, and storage.',
        ],
      },
    ],
  },
  {
    slug: 'transport-best-practices',
    title: 'Transport Best Practices: Move Heavy Equipment Safely',
    excerpt:
      'Permits, route planning, loading, and securement tips for safe and efficient transport.',
    tag: { slug: 'transport-logistics', name: 'Transport & Logistics' },
    date: 'Jan 2025',
    readTime: '6 min',
    image: '/assets/equipment/dump-truck.jpg',
    body: [
      {
        heading: 'Planning and Permits',
        paragraphs: [
          'Coordinate oversize permits and escorts; validate bridge limits and route restrictions ahead of time.',
        ],
      },
    ],
  },
];
