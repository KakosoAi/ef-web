import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Equipment information interface
export interface ExtractedEquipmentInfo {
  // Basic Information
  title?: string;
  adType?: 'rent' | 'sell';
  industry?: string;
  category?: string;
  subcategory?: string;

  // Equipment Details
  brand?: string;
  model?: string;
  modelYear?: string;
  condition?: string;
  fuelType?: string;
  serialNumber?: string;

  // Location
  country?: string;
  state?: string;
  city?: string;

  // Pricing
  pricing?: 'negotiable' | 'fixed' | 'on-call';
  pricePerDay?: string;
  pricePerWeek?: string;
  pricePerMonth?: string;
  salePrice?: string;

  // Description & Details
  description?: string;
  specifications?: string;
  features?: string[];

  // Additional Info
  capacity?: string;
  hoursOrKilometer?: string;

  // Confidence scores (0-1)
  confidence: {
    overall: number;
    brand: number;
    model: number;
    condition: number;
    location: number;
    pricing: number;
  };
}

// Available options for mapping
export const EQUIPMENT_OPTIONS = {
  industries: [
    { id: 'construction', name: 'Construction Equipment' },
    { id: 'agriculture', name: 'Agriculture Equipment' },
    { id: 'mining', name: 'Mining And Quarry Equipment' },
    { id: 'forestry', name: 'Forestry Equipment' },
    { id: 'aircraft', name: 'Aircraft Handling Equipment' },
  ],

  categories: {
    construction: [
      'Aerial Platforms',
      'Backhoe Loaders',
      'Compactors',
      'Compressors',
      'Excavators',
      'Dozers',
      'Cranes',
      'Generators',
      'Lifting Equipment',
      'Wheel Loaders',
      'Motor Graders',
      'Trucks',
      'Trailers',
      'Milling Machines',
      'Asphalt Pavers',
      'Concrete Pumps',
      'Drilling Machines & Rigs',
      'Boom Loaders',
      'Skid Steers',
      'Concrete Batching Plants',
      'Other Equipment',
    ],
  },

  subcategories: {
    'Aerial Platforms': ['Boom Lifts', 'Manlifts', 'Scissor Lifts', 'Spider Lifts'],
  },

  brands: [
    'Volvo',
    'Caterpillar',
    'Komatsu',
    'JCB',
    'Liebherr',
    'Hitachi',
    'Kobelco',
    'Hyundai',
    'Doosan',
    'Case',
    'New Holland',
    'Bobcat',
    'Kubota',
    'John Deere',
    'Manitou',
    'Genie',
    'JLG',
    'Skyjack',
    'Haulotte',
    'Terex',
    'Tadano',
    'Grove',
    'Manitowoc',
    'Link-Belt',
    'Liebherr',
    'Sany',
    'XCMG',
    'Zoomlion',
    'Liugong',
    'Lonking',
    'Shantui',
    'SDLG',
    'Yuchai',
    'Weichai',
    'Cummins',
    'Perkins',
    'Deutz',
    'Isuzu',
    'Mitsubishi',
    'Yanmar',
    'Kubota',
    'Kohler',
    'Generac',
    'Atlas Copco',
    'Ingersoll Rand',
    'Sullair',
    'Chicago Pneumatic',
    'Kaeser',
    'Compair',
    'Gardner Denver',
    'Quincy',
    'Elgi',
    'Kirloskar',
  ],

  conditions: ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'Poor', 'For Parts'],

  fuelTypes: ['Diesel', 'Gasoline', 'Electric', 'Hybrid', 'Natural Gas', 'Propane', 'Hydrogen'],

  countries: [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'Oman',
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Belgium',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Australia',
    'New Zealand',
    'Japan',
    'South Korea',
    'Singapore',
    'Malaysia',
    'Thailand',
    'Indonesia',
    'Philippines',
    'India',
    'China',
    'Brazil',
    'Mexico',
  ],
};

/**
 * Analyzes user input and extracts equipment information using OpenAI
 */
export async function analyzeEquipmentDescription(
  userInput: string
): Promise<ExtractedEquipmentInfo> {
  try {
    const systemPrompt = `You are an expert equipment analyst and sales professional. Analyze the user's equipment description and extract structured information. You MUST always provide comprehensive, professional information for ALL fields.

Available options for mapping:
- Industries: ${EQUIPMENT_OPTIONS.industries.map(i => i.name).join(', ')}
- Construction Categories: ${EQUIPMENT_OPTIONS.categories.construction.join(', ')}
- Brands: ${EQUIPMENT_OPTIONS.brands.join(', ')}
- Conditions: ${EQUIPMENT_OPTIONS.conditions.join(', ')}
- Fuel Types: ${EQUIPMENT_OPTIONS.fuelTypes.join(', ')}
- Countries: ${EQUIPMENT_OPTIONS.countries.join(', ')}

CRITICAL REQUIREMENTS:
1. ALWAYS select an appropriate industry from the available options
2. ALWAYS select an appropriate brand from the available brands list
3. ALWAYS select an appropriate condition from the available conditions
4. ALWAYS select an appropriate fuel type based on the equipment type
5. ALWAYS generate a detailed, professional description (minimum 100 words)
6. ALWAYS provide technical specifications relevant to the equipment
7. ALWAYS suggest a reasonable price range if not mentioned
8. ALWAYS extract or infer location information when mentioned - pay special attention to location keywords like "in Dubai", "from UAE", "located in", "based in", etc.
9. ALWAYS provide comprehensive features list

Equipment-specific fuel type mapping:
- Excavators, Bulldozers, Cranes, Loaders: Diesel
- Forklifts: Electric, Diesel, or LPG
- Generators: Diesel or Gas
- Compressors: Electric or Diesel
- Small tools: Electric or Battery

Location extraction guidelines:
- Look for city names, country names, state/emirate names
- Common location indicators: "in", "from", "located", "based", "Dubai", "Abu Dhabi", "UAE", "Saudi", "Qatar", etc.
- If location is mentioned, ALWAYS populate country, state, and city fields appropriately
- Default to UAE if Middle East context is implied but specific location not clear

Extract and return ONLY a JSON object with the following structure:

{
  "title": "Professional equipment title with brand, model, and key feature",
  "adType": "rent" or "sell" (infer from context, default to "sell" if unclear)",
  "industry": "MUST select from available industries - choose most appropriate",
  "category": "MUST select from available categories - choose most appropriate",
  "subcategory": "Select if applicable from available subcategories",
  "brand": "MUST select from available brands - choose most appropriate if not mentioned",
  "model": "Equipment model if mentioned, or suggest typical model",
  "modelYear": "Year if mentioned, or suggest recent year (2018-2024)",
  "condition": "MUST select from available conditions - choose appropriate",
  "fuelType": "MUST select appropriate fuel type based on equipment",
  "serialNumber": "Serial number if mentioned",
  "country": "Extract country if mentioned, prefer UAE/Middle East if unclear",
  "state": "State/province/emirate if mentioned",
  "city": "City if mentioned",
  "pricing": "negotiable", "fixed", or "on-call" (default to "negotiable")",
  "pricePerDay": "Suggest daily rental price if for rent",
  "pricePerWeek": "Suggest weekly rental price if for rent", 
  "pricePerMonth": "Suggest monthly rental price if for rent",
  "salePrice": "Suggest sale price if for sale",
  "description": "DETAILED professional description (minimum 100 words) including: equipment overview, key features, applications, benefits, condition details, and why it's valuable",
  "specifications": "COMPREHENSIVE technical specifications including: engine details, dimensions, weight, capacity, operating parameters, hydraulic specs, etc.",
  "features": ["Comprehensive array of key features and capabilities"],
  "capacity": "Equipment capacity/lifting capacity/bucket size etc.",
  "hoursOrKilometer": "Operating hours or kilometers if mentioned, or suggest typical range",
  "confidence": {
    "overall": 0.0-1.0,
    "brand": 0.0-1.0,
    "model": 0.0-1.0,
    "condition": 0.0-1.0,
    "location": 0.0-1.0,
    "pricing": 0.0-1.0
  }
}

IMPORTANT: Never leave fields empty or null. Always provide professional, realistic values even if you need to make educated assumptions based on the equipment type. Be comprehensive and detailed in descriptions and specifications.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput },
      ],
      temperature: 0.1,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const extractedInfo: ExtractedEquipmentInfo = JSON.parse(content);

    // Validate and clean the response
    return validateAndCleanExtractedInfo(extractedInfo);
  } catch (error) {
    // console.error('Error analyzing equipment description:', error);

    // Return a basic fallback response
    return {
      description: userInput,
      confidence: {
        overall: 0.1,
        brand: 0.0,
        model: 0.0,
        condition: 0.0,
        location: 0.0,
        pricing: 0.0,
      },
    };
  }
}

/**
 * Validates and cleans the extracted information
 */
function validateAndCleanExtractedInfo(info: ExtractedEquipmentInfo): ExtractedEquipmentInfo {
  const cleaned: ExtractedEquipmentInfo = {
    confidence: {
      overall: 0.0,
      brand: 0.0,
      model: 0.0,
      condition: 0.0,
      location: 0.0,
      pricing: 0.0,
    },
  };

  // Validate adType - default to 'sell' if not provided
  if (info.adType === 'rent' || info.adType === 'sell') {
    cleaned.adType = info.adType;
  } else {
    cleaned.adType = 'sell'; // Default fallback
  }

  // Validate industry - always ensure one is selected
  if (info.industry && EQUIPMENT_OPTIONS.industries.some(i => i.name === info.industry)) {
    cleaned.industry = info.industry;
  } else {
    // Default to Construction if not specified
    cleaned.industry = 'Construction Equipment';
  }

  // Validate category - always ensure one is selected
  if (info.category && EQUIPMENT_OPTIONS.categories.construction.includes(info.category)) {
    cleaned.category = info.category;
  } else {
    // Default to Other Equipment if not specified
    cleaned.category = 'Other Equipment';
  }

  // Validate subcategory
  if (
    info.subcategory &&
    info.category &&
    EQUIPMENT_OPTIONS.subcategories[
      info.category as keyof typeof EQUIPMENT_OPTIONS.subcategories
    ]?.includes(info.subcategory)
  ) {
    cleaned.subcategory = info.subcategory;
  }

  // Validate brand - always ensure one is selected
  if (info.brand && EQUIPMENT_OPTIONS.brands.includes(info.brand)) {
    cleaned.brand = info.brand;
  } else {
    // Default to Caterpillar if not specified (most common brand)
    cleaned.brand = 'Caterpillar';
  }

  // Validate condition - always ensure one is selected
  if (info.condition && EQUIPMENT_OPTIONS.conditions.includes(info.condition)) {
    cleaned.condition = info.condition;
  } else {
    // Default to Good if not specified
    cleaned.condition = 'Good';
  }

  // Validate fuel type - always ensure one is selected
  if (info.fuelType && EQUIPMENT_OPTIONS.fuelTypes.includes(info.fuelType)) {
    cleaned.fuelType = info.fuelType;
  } else {
    // Default to Diesel for most heavy equipment
    cleaned.fuelType = 'Diesel';
  }

  // Validate country - prefer UAE if not specified
  if (info.country && EQUIPMENT_OPTIONS.countries.includes(info.country)) {
    cleaned.country = info.country;
  } else {
    // Default to UAE if not specified
    cleaned.country = 'United Arab Emirates';
  }

  // Validate pricing type - always ensure one is selected
  if (info.pricing && ['negotiable', 'fixed', 'on-call'].includes(info.pricing)) {
    cleaned.pricing = info.pricing;
  } else {
    // Default to negotiable
    cleaned.pricing = 'negotiable';
  }

  // Copy string fields (with basic validation and defaults)
  const stringFields = [
    'title',
    'model',
    'modelYear',
    'serialNumber',
    'state',
    'city',
    'pricePerDay',
    'pricePerWeek',
    'pricePerMonth',
    'salePrice',
    'description',
    'specifications',
    'capacity',
    'hoursOrKilometer',
  ];

  stringFields.forEach(field => {
    const infoAsRecord = info as unknown as Record<string, string | undefined>;
    if (
      infoAsRecord[field] &&
      typeof infoAsRecord[field] === 'string' &&
      (infoAsRecord[field] as string).trim()
    ) {
      (cleaned as unknown as Record<string, string>)[field] = (
        infoAsRecord[field] as string
      ).trim();
    }
  });

  // Ensure minimum description length
  if (!cleaned.description || cleaned.description.length < 50) {
    cleaned.description = `Professional ${cleaned.brand || 'heavy'} equipment available for ${cleaned.adType || 'sale'}. This well-maintained machine offers reliable performance and excellent value for construction, industrial, or commercial applications. Contact us for detailed specifications and pricing information.`;
  }

  // Ensure specifications are provided
  if (!cleaned.specifications || cleaned.specifications.length < 20) {
    cleaned.specifications = `Engine: Diesel powered, Hydraulic system: Advanced hydraulic controls, Operating weight: Professional grade, Dimensions: Standard specifications available upon request, Maintenance: Regular service records available.`;
  }

  // Copy features array - ensure at least some features
  if (Array.isArray(info.features) && info.features.length > 0) {
    cleaned.features = info.features
      .filter((f: string) => typeof f === 'string' && f.trim())
      .map((f: string) => f.trim());
  } else {
    // Default features
    cleaned.features = [
      'Reliable Performance',
      'Professional Grade',
      'Well Maintained',
      'Ready for Operation',
    ];
  }

  // Copy confidence scores
  if (info.confidence && typeof info.confidence === 'object') {
    const confidenceFields = ['overall', 'brand', 'model', 'condition', 'location', 'pricing'];
    const infoConfidence = info.confidence as Record<string, number>;
    confidenceFields.forEach(field => {
      if (
        typeof infoConfidence[field] === 'number' &&
        infoConfidence[field] >= 0 &&
        infoConfidence[field] <= 1
      ) {
        (cleaned.confidence as Record<string, number>)[field] = infoConfidence[field];
      }
    });
  }

  return cleaned;
}

/**
 * Maps extracted information to form data structure
 */
export function mapExtractedInfoToFormData(extractedInfo: ExtractedEquipmentInfo) {
  // Generate a stock image URL based on equipment type
  const generateStockImage = (brand?: string, category?: string) => {
    const equipmentType = category?.toLowerCase().replace(/\s+/g, '-') || 'heavy-equipment';
    const brandName = brand?.toLowerCase() || 'generic';

    // Use a placeholder service that provides equipment images
    return `https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&crop=center&auto=format&q=80`;
  };

  return {
    // Basic Info
    adType: extractedInfo.adType || 'sell',
    industry: extractedInfo.industry || 'Construction Equipment',
    category: extractedInfo.category || 'Other Equipment',
    subcategory: extractedInfo.subcategory || '',
    title:
      extractedInfo.title ||
      `${extractedInfo.brand || 'Professional'} ${extractedInfo.category || 'Equipment'}`,
    brand: extractedInfo.brand || 'Caterpillar',
    model: extractedInfo.model || '',
    modelYear: extractedInfo.modelYear || '',
    condition: extractedInfo.condition || 'Good',
    fuelType: extractedInfo.fuelType || 'Diesel',

    // Location
    country: extractedInfo.country || 'United Arab Emirates',
    state: extractedInfo.state || '',
    city: extractedInfo.city || '',

    // Pricing - ensure at least one price is set
    pricing: extractedInfo.pricing || 'negotiable',
    pricePerDay: extractedInfo.pricePerDay || (extractedInfo.adType === 'rent' ? '500' : ''),
    pricePerWeek: extractedInfo.pricePerWeek || (extractedInfo.adType === 'rent' ? '3000' : ''),
    pricePerMonth: extractedInfo.pricePerMonth || (extractedInfo.adType === 'rent' ? '10000' : ''),
    salePrice: extractedInfo.salePrice || (extractedInfo.adType === 'sell' ? '150000' : ''),

    // Description & Details
    description:
      extractedInfo.description ||
      `Professional ${extractedInfo.brand || 'heavy'} equipment available for ${extractedInfo.adType || 'sale'}. This well-maintained machine offers reliable performance and excellent value for construction, industrial, or commercial applications. Contact us for detailed specifications and pricing information.`,
    features: extractedInfo.features || [
      'Reliable Performance',
      'Professional Grade',
      'Well Maintained',
      'Ready for Operation',
    ],
    specifications:
      extractedInfo.specifications ||
      'Engine: Diesel powered, Hydraulic system: Advanced hydraulic controls, Operating weight: Professional grade, Dimensions: Standard specifications available upon request, Maintenance: Regular service records available.',

    // Add stock image
    images: [generateStockImage(extractedInfo.brand, extractedInfo.category)],
    acceptTerms: false,
  };
}
