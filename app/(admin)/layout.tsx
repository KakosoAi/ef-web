import { INTERNAL_ROLES, UserRole } from '@/shared/types/roles';
import AdminLayoutClient from './AdminLayoutClient';

// Mock auth function - Replace with your actual auth later
const getUser = async () => {
  // For development, we simulate a logged-in Admin
  // Change this to 'customer' to test protection
  return {
    id: '1',
    email: 'admin@ef.com',
    role: 'admin' as UserRole,
    fullName: 'System Admin',
  };
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  // 1. Security Check: Only allow internal staff
  if (!INTERNAL_ROLES.includes(user.role)) {
    // In a real app, redirect to login or 403 page
    // redirect('/login?error=unauthorized');
    // For now, we just let it pass or mock it, but logic is here.
  }

  return <AdminLayoutClient userRole={user.role}>{children}</AdminLayoutClient>;
}
