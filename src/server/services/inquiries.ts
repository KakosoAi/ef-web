import 'server-only';
import { getSupabaseServerClient } from '@server/lib/supabase';
import { unstable_cache } from 'next/cache';

export interface InquiryRecord {
  id: number;
  userid: number | null;
  statusid: number;
  inquirytypeid: number;
  name: string | null;
  email: string | null;
  phonenumber: string | null;
  title: string | null;
  details: any | null; // jsonb field
  description: string | null;
  createdat: string;
  updatedat: string;
  published: boolean;
  consent: boolean;
  adtypeid: number | null;
  categoryid: number | null;
  exempt_payment: boolean;
}

export interface InquiryForDisplay {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  budget: string;
  postedDate: string;
  views: number;
  responses: number;
  company: string;
  rating: number;
  verified: boolean;
  promoted?: boolean;
  featured?: boolean;
  projectDetails?: {
    location: string;
    projectType?: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
    status: string;
  };
  stats?: {
    views: number;
    responses: number;
    postedDate: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  equipmentDetails?: {
    category: string;
    subCategory?: string;
    purpose?: string;
    modelsOfInterest?: string[];
    quantity?: number;
    duration?: string;
    startDate?: string;
    workingHours?: string;
    siteConditions?: string;
    budgetRange?: string;
  };
}

/**
 * Fetch inquiries from Supabase database (non-cached version)
 * Maps database fields to display format
 */
export async function getInquiriesUncached(): Promise<InquiryForDisplay[]> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('inquiry')
      .select('*')
      .order('createdat', { ascending: false })
      .limit(100); // Explicitly set limit to 100 records

    if (error) {
      console.error('Supabase inquiries error:', error.message);
      return [];
    }

    const records = (data ?? []) as InquiryRecord[];
    if (!records.length) return [];

    console.log(`Fetched ${records.length} inquiries from database`);
    return records.map(record => {
      // Parse details JSON if it exists
      const details = record.details || {};

      // Map database fields to display format
      return {
        id: record.id.toString(),
        title: record.title ? `${record.title} (ID: ${record.id})` : `Inquiry #${record.id}`,
        description: record.description || 'No description available',
        category: details.category || 'General Equipment',
        location: details.location || 'Location not specified',
        urgency: mapStatusToUrgency(record.statusid),
        budget: details.budget || 'Contact for pricing',
        postedDate: record.createdat.split('T')[0], // Format date
        views: Math.floor(Math.random() * 500) + 50, // Mock data for now
        responses: Math.floor(Math.random() * 20) + 1, // Mock data for now
        company: details.company || record.name || 'Anonymous',
        rating: 4.0 + Math.random() * 1.0, // Mock rating
        verified: record.consent, // Use consent as verification indicator
        promoted: record.adtypeid !== null, // Has ad type = promoted
        featured: record.exempt_payment, // Exempt payment = featured
        contactInfo: {
          name: record.name || 'Contact Person',
          email: record.email || '',
          phone: record.phonenumber || '',
        },
        equipmentDetails: {
          category: details.category || 'General Equipment',
          subCategory: details.subCategory,
          purpose: details.purpose,
          modelsOfInterest: details.modelsOfInterest || [],
          quantity: details.quantity,
          duration: details.duration,
          startDate: details.startDate,
          workingHours: details.workingHours,
          siteConditions: details.siteConditions,
          budgetRange: details.budgetRange || details.budget,
        },
      };
    });
  } catch (e) {
    console.error('Supabase client unavailable:', e);
    return [];
  }
}

/**
 * Get a single inquiry by ID
 */
export async function getInquiryById(id: string): Promise<InquiryForDisplay | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('inquiry')
      .select('*')
      .eq('id', parseInt(id))
      .limit(1);

    if (error) {
      console.error('Supabase inquiry by ID error:', error?.message);
      return null;
    }

    if (!data || data.length === 0) {
      console.log(`No inquiry found with ID: ${id}`);
      return null;
    }

    const record = data[0] as InquiryRecord;
    const details = record.details || {};

    return {
      id: record.id.toString(),
      title: record.title ? `${record.title} (ID: ${record.id})` : `Inquiry #${record.id}`,
      description: record.description || 'No description available',
      category: details.category || 'General Equipment',
      location: details.location || 'Location not specified',
      urgency: mapStatusToUrgency(record.statusid),
      budget: details.budget || 'Contact for pricing',
      postedDate: record.createdat.split('T')[0],
      views: Math.floor(Math.random() * 500) + 50,
      responses: Math.floor(Math.random() * 20) + 1,
      company: details.company || record.name || 'Anonymous',
      rating: 4.0 + Math.random() * 1.0,
      verified: record.consent,
      promoted: record.adtypeid !== null,
      featured: record.exempt_payment,
      projectDetails: {
        location: details.location || 'Location not specified',
        projectType: details.projectType || 'General Project',
        urgency: mapStatusToUrgency(record.statusid),
        status: 'Active',
      },
      stats: {
        views: Math.floor(Math.random() * 500) + 50,
        responses: Math.floor(Math.random() * 20) + 1,
        postedDate: record.createdat.split('T')[0],
      },
      contactInfo: {
        name: record.name || 'Contact Person',
        email: record.email || '',
        phone: record.phonenumber || '',
      },
      equipmentDetails: {
        category: details.category || 'General Equipment',
        subCategory: details.subCategory,
        purpose: details.purpose,
        modelsOfInterest: details.modelsOfInterest || [],
        quantity: details.quantity,
        duration: details.duration,
        startDate: details.startDate,
        workingHours: details.workingHours,
        siteConditions: details.siteConditions,
        budgetRange: details.budgetRange || details.budget,
      },
    };
  } catch (e) {
    console.error('Supabase client unavailable:', e);
    return null;
  }
}

/**
 * Map status ID to urgency level
 * This is a basic mapping - you may need to adjust based on your status table
 */
function mapStatusToUrgency(statusId: number): 'Low' | 'Medium' | 'High' | 'Urgent' {
  switch (statusId) {
    case 1:
      return 'Urgent';
    case 2:
      return 'High';
    case 3:
      return 'Medium';
    default:
      return 'Low';
  }
}

/**
 * Fetch inquiries from Supabase database with caching
 * Maps database fields to display format
 */
export const getInquiries = unstable_cache(
  async (): Promise<InquiryForDisplay[]> => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from('inquiry')
        .select('*')
        .order('createdat', { ascending: false })
        .limit(100); // Explicitly set limit to 100 records

      if (error) {
        console.error('Supabase inquiries error:', error.message);
        return [];
      }

      const records = (data ?? []) as InquiryRecord[];
      if (!records.length) return [];

      console.log(`Fetched ${records.length} inquiries from database`);
      return records.map(record => {
        // Parse details JSON if it exists
        const details = record.details || {};

        // Map database fields to display format
        return {
          id: record.id.toString(),
          title: record.title ? `${record.title} (ID: ${record.id})` : `Inquiry #${record.id}`,
          description: record.description || 'No description available',
          category: details.category || 'General Equipment',
          location: details.location || 'Location not specified',
          urgency: mapStatusToUrgency(record.statusid),
          budget: details.budget || 'Contact for pricing',
          postedDate: record.createdat.split('T')[0], // Format date
          views: 0, // Not available in database
          responses: 0, // Not available in database
          company: details.company || record.name || 'Anonymous',
          rating: 0, // Not available in database
          verified: record.consent, // Use consent as verification indicator
          promoted: record.adtypeid !== null, // Has ad type = promoted
          featured: record.exempt_payment, // Exempt payment = featured
          contactInfo: {
            name: record.name || 'Contact Person',
            email: record.email || '',
            phone: record.phonenumber || '',
          },
          equipmentDetails: {
            category: details.category || 'General Equipment',
            subCategory: details.subCategory,
            purpose: details.purpose,
            modelsOfInterest: details.modelsOfInterest || [],
            quantity: details.quantity,
            duration: details.duration,
            startDate: details.startDate,
            workingHours: details.workingHours,
            siteConditions: details.siteConditions,
            budgetRange: details.budgetRange || details.budget,
          },
        };
      });
    } catch (e) {
      console.error('Supabase client unavailable:', e);
      return [];
    }
  },
  ['inquiries'],
  {
    revalidate: 300,
    tags: ['inquiries'],
  }
);

// Cache inquiries for 5 minutes to reduce database load
export const getInquiriesCached = getInquiries;

export const getInquiryByIdCached = (id: string) =>
  unstable_cache(() => getInquiryById(id), [`inquiry-${id}`], {
    revalidate: 300,
    tags: [`inquiry-${id}`],
  })();

/**
 * Debug function to count total inquiries in database
 */
export async function countPublishedInquiries(): Promise<number> {
  try {
    const supabase = getSupabaseServerClient();
    const { count, error } = await supabase
      .from('inquiry')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase count error:', error.message);
      return 0;
    }

    return count || 0;
  } catch (e) {
    console.error('Supabase client unavailable:', e);
    return 0;
  }
}
