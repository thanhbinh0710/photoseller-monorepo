import { useFetchUserProfile } from "./useFetchUserProfile";

/**
 * Hook to check if current user is admin
 * @returns boolean - true if user has ADMIN role
 */
export function useIsAdmin(): boolean {
  const { rawUserProfile } = useFetchUserProfile();
  return rawUserProfile?.role === "ADMIN" || false;
}

/**
 * Hook to get user role
 * @returns string | null - user role (ADMIN, USER, etc) or null if not loaded
 */
export function useUserRole(): string | null {
  const { rawUserProfile } = useFetchUserProfile();
  return rawUserProfile?.role || null;
}
