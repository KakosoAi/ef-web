export interface StoreRecord {
  id: number;
  name: string | null;
  verified: boolean | null;
  address: string | null;
  isactive: boolean | null;
  isvendor: boolean | null;
  packagecreatedat: string | null;
  banner: string | null;
  logo: string | null;
  tagline: string | null;
  website: string | null;
  description: string | null;
  visits: number | null;
  priority: number | null;
  subscriptionactivatedat: string | null;
  subscriptionexpireat: string | null;
  subscriptionid: string | null;
  subscriptionstatus: string | null;
  subscriptioninterval: string | null;
  stateid: number | null;
  cityid: number | null;
  countryid: number | null;
  packageid: number | null;
  userid: number | null;
  storetypeid: number | null;
  slug: string | null;
}

export interface StoreTypeRecord {
  id: number;
  name: string | null;
}

export interface StoreListItem {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  verified?: boolean;
  logo?: string;
  banner?: string;
  cityName?: string;
  countryName?: string;
  visits?: number;
}

export interface StoreDetail extends StoreListItem {
  address?: string;
  description?: string;
  website?: string;
  isActive?: boolean;
  isVendor?: boolean;
  storeType?: string | null;
}
