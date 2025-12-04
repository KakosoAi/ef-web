'use server';

import { getSupabaseAdminClient } from '@/server/lib/supabase-admin';
import { unstable_noStore as noStore } from 'next/cache';

export interface DashboardStats {
  totalAds: number;
  activeAds: number;
  totalStores: number;
  totalInquiries: number;
  recentAds: any[];
  adsOverTime: { date: string; count: number }[];
  error?: string;
}

export type DateRange = '30d' | '6m' | '1y' | '2y' | '5y';

export async function getAdsGrowthStats(
  range: DateRange = '30d'
): Promise<{ date: string; count: number }[]> {
  noStore();
  const supabase = getSupabaseAdminClient();

  const now = new Date();
  const startDate = new Date();
  let groupBy: 'day' | 'month' = 'day';

  switch (range) {
    case '6m':
      startDate.setMonth(now.getMonth() - 6);
      groupBy = 'month';
      break;
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1);
      groupBy = 'month';
      break;
    case '2y':
      startDate.setFullYear(now.getFullYear() - 2);
      groupBy = 'month';
      break;
    case '5y':
      // User requested fixed start date from Nov 2022
      startDate.setTime(new Date('2022-11-01').getTime());
      groupBy = 'month';
      break;
    case '30d':
    default:
      startDate.setDate(now.getDate() - 30);
      groupBy = 'day';
      break;
  }

  try {
    // 1. Get count of ads BEFORE the start date (baseline)
    const { count: initialCount, error: initialCountError } = await supabase
      .from('ads_with_all_joins')
      .select('*', { count: 'exact', head: true })
      .lt('createdat', startDate.toISOString());

    if (initialCountError) throw initialCountError;

    // 2. Get ads created DURING the period (with pagination to bypass limits)
    let adsDates: { createdat: any }[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from('ads_with_all_joins')
        .select('createdat')
        .gte('createdat', startDate.toISOString())
        .order('createdat', { ascending: true })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) throw error;

      if (data && data.length > 0) {
        adsDates = [...adsDates, ...data];
        if (data.length < pageSize) hasMore = false;
        page++;
      } else {
        hasMore = false;
      }

      // Safety cap at 100k records to prevent timeout
      if (page * pageSize >= 100000) hasMore = false;
    }

    const adsMap = new Map<string, number>();

    // Initialize map with all intervals
    if (groupBy === 'day') {
      for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
        adsMap.set(d.toISOString().split('T')[0], 0);
      }
    } else {
      // Monthly grouping
      const current = new Date(startDate);
      // Set to first day of month to avoid skipping months due to variable days
      current.setDate(1);

      while (current <= now) {
        const key = current.toISOString().slice(0, 7); // YYYY-MM
        adsMap.set(key, 0);
        current.setMonth(current.getMonth() + 1);
      }
    }

    adsDates?.forEach(ad => {
      if (ad.createdat) {
        let key: string;
        if (groupBy === 'day') {
          key = new Date(ad.createdat).toISOString().split('T')[0];
        } else {
          key = new Date(ad.createdat).toISOString().slice(0, 7);
        }

        if (adsMap.has(key)) {
          adsMap.set(key, (adsMap.get(key) || 0) + 1);
        } else if (groupBy === 'month') {
          // Handle case where exact month might be missing from init loop (rare but possible with TZ)
          // Just add it
          adsMap.set(key, (adsMap.get(key) || 0) + 1);
        }
      }
    });

    // Calculate cumulative growth
    let runningTotal = initialCount || 0;

    return Array.from(adsMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => {
        runningTotal += count;
        return { date, count: runningTotal };
      });
  } catch (error) {
    console.error('Error fetching ads growth stats:', error);
    return [];
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  noStore(); // Ensure we get fresh data
  const supabase = getSupabaseAdminClient();

  try {
    // 1. Get Total Ads
    const { count: totalAds, error: totalAdsError } = await supabase
      .from('ads_with_all_joins')
      .select('*', { count: 'exact', head: true });

    if (totalAdsError) throw totalAdsError;

    // 2. Get Active Ads
    const { count: activeAds, error: activeAdsError } = await supabase
      .from('ads_with_all_joins')
      .select('*', { count: 'exact', head: true })
      .eq('isactive', true);

    if (activeAdsError) throw activeAdsError;

    // 3. Get Total Stores
    const { count: totalStores, error: totalStoresError } = await supabase
      .from('stores')
      .select('*', { count: 'exact', head: true });

    if (totalStoresError) throw totalStoresError;

    // 4. Get Total Inquiries
    const { count: totalInquiries, error: totalInquiriesError } = await supabase
      .from('inquiry')
      .select('*', { count: 'exact', head: true });

    if (totalInquiriesError) throw totalInquiriesError;

    // 5. Get Recent Ads (Limit 5)
    // Note: Using 'createdat' as per ads.ts service
    const { data: recentAds, error: recentAdsError } = await supabase
      .from('ads_with_all_joins')
      .select('id, title, price, createdat, status, category_name')
      .order('createdat', { ascending: false })
      .limit(5);

    if (recentAdsError) throw recentAdsError;

    // 6. Get Ads Over Time (Default to 5 Year/All Time as per user request)
    const adsOverTime = await getAdsGrowthStats('5y');

    return {
      totalAds: totalAds || 0,
      activeAds: activeAds || 0,
      totalStores: totalStores || 0,
      totalInquiries: totalInquiries || 0,
      recentAds: recentAds || [],
      adsOverTime,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Return empty stats on error to prevent page crash
    return {
      totalAds: 0,
      activeAds: 0,
      totalStores: 0,
      totalInquiries: 0,
      recentAds: [],
      adsOverTime: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
