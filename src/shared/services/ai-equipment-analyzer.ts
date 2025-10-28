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
    const systemPrompt = `You are an expert equipment analyst. Analyze the user's equipment description and extract structured information.

Available options for mapping:
- Industries: ${EQUIPMENT_OPTIONS.industries.map(i => i.name).join(', ')}
- Construction Categories: ${EQUIPMENT_OPTIONS.categories.construction.join(', ')}
- Brands: ${EQUIPMENT_OPTIONS.brands.join(', ')}
- Conditions: ${EQUIPMENT_OPTIONS.conditions.join(', ')}
- Fuel Types: ${EQUIPMENT_OPTIONS.fuelTypes.join(', ')}
- Countries: ${EQUIPMENT_OPTIONS.countries.join(', ')}

Extract and return ONLY a JSON object with the following structure. Use null for unknown values:

{
  "title": "Generated title for the equipment",
  "adType": "rent" or "sell" (infer from context),
  "industry": "Best matching industry",
  "category": "Best matching category",
  "subcategory": "Best matching subcategory if applicable",
  "brand": "Equipment brand if mentioned",
  "model": "Equipment model if mentioned",
  "modelYear": "Year if mentioned",
  "condition": "Equipment condition if mentioned",
  "fuelType": "Fuel type if mentioned",
  "serialNumber": "Serial number if mentioned",
  "country": "Country if mentioned",
  "state": "State/province if mentioned",
  "city": "City if mentioned",
  "pricing": "negotiable", "fixed", or "on-call" (infer from context),
  "pricePerDay": "Daily price if mentioned",
  "pricePerWeek": "Weekly price if mentioned", 
  "pricePerMonth": "Monthly price if mentioned",
  "salePrice": "Sale price if mentioned",
  "description": "Clean, professional description",
  "specifications": "Technical specifications if mentioned",
  "features": ["Array of key features"],
  "capacity": "Equipment capacity if mentioned",
  "hoursOrKilometer": "Operating hours or kilometers if mentioned",
  "confidence": {
    "overall": 0.0-1.0,
    "brand": 0.0-1.0,
    "model": 0.0-1.0,
    "condition": 0.0-1.0,
    "location": 0.0-1.0,
    "pricing": 0.0-1.0
  }
}

Be conservative with confidence scores. Only use high confidence (>0.8) when information is explicitly stated.`;

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

  // Validate adType
  if (info.adType === 'rent' || info.adType === 'sell') {
    cleaned.adType = info.adType;
  }

  // Validate industry
  if (info.industry && EQUIPMENT_OPTIONS.industries.some(i => i.name === info.industry)) {
    cleaned.industry = info.industry;
  }

  // Validate category
  if (info.category && EQUIPMENT_OPTIONS.categories.construction.includes(info.category)) {
    cleaned.category = info.category;
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

  // Validate brand
  if (info.brand && EQUIPMENT_OPTIONS.brands.includes(info.brand)) {
    cleaned.brand = info.brand;
  }

  // Validate condition
  if (info.condition && EQUIPMENT_OPTIONS.conditions.includes(info.condition)) {
    cleaned.condition = info.condition;
  }

  // Validate fuel type
  if (info.fuelType && EQUIPMENT_OPTIONS.fuelTypes.includes(info.fuelType)) {
    cleaned.fuelType = info.fuelType;
  }

  // Validate country
  if (info.country && EQUIPMENT_OPTIONS.countries.includes(info.country)) {
    cleaned.country = info.country;
  }

  // Validate pricing type
  if (info.pricing && ['negotiable', 'fixed', 'on-call'].includes(info.pricing)) {
    cleaned.pricing = info.pricing;
  }

  // Copy string fields (with basic validation)
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

  // Copy features array
  if (Array.isArray(info.features)) {
    cleaned.features = info.features
      .filter((f: string) => typeof f === 'string' && f.trim())
      .map((f: string) => f.trim());
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
  return {
    // Basic Info
    adType: extractedInfo.adType || '',
    industry: extractedInfo.industry || '',
    category: extractedInfo.category || '',
    subcategory: extractedInfo.subcategory || '',
    title: extractedInfo.title || '',
    brand: extractedInfo.brand || '',
    model: extractedInfo.model || '',
    modelYear: extractedInfo.modelYear || '',
    condition: extractedInfo.condition || '',
    fuelType: extractedInfo.fuelType || '',

    // Location
    country: extractedInfo.country || '',
    state: extractedInfo.state || '',
    city: extractedInfo.city || '',

    // Pricing
    pricing: extractedInfo.pricing || 'negotiable',
    pricePerDay: extractedInfo.pricePerDay || '',
    pricePerWeek: extractedInfo.pricePerWeek || '',
    pricePerMonth: extractedInfo.pricePerMonth || '',
    salePrice: extractedInfo.salePrice || '',

    // Description & Details
    description: extractedInfo.description || '',
    features: extractedInfo.features || [],
    specifications: extractedInfo.specifications || '',

    // Keep existing form fields that aren't AI-populated
    images: [],
    acceptTerms: false,
  };
}
