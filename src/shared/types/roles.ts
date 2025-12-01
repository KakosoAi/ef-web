export type UserRole =
  | 'super_manager'
  | 'seo'
  | 'accountant'
  | 'manager'
  | 'admin'
  | 'vendor'
  | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

// Helper to check if a role is "internal" (staff)
export const INTERNAL_ROLES: UserRole[] = [
  'super_manager',
  'admin',
  'manager',
  'seo',
  'accountant',
];
