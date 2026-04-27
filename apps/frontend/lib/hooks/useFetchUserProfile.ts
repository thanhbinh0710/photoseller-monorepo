import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  telephoneId?: number;
}

export interface UserRawProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  telephones: Array<{
    id: number;
    phoneNumber: string;
    isPrimary: boolean;
  }>;
  addresses: Array<any>;
}

export function useFetchUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [rawUserProfile, setRawUserProfile] = useState<UserRawProfile | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi tải dữ liệu");
      }

      const data = await response.json();
      if (data.data) {
        setRawUserProfile(data.data);
        const primaryPhone = data.data.telephones?.[0];
        setUserProfile({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          phone: primaryPhone?.phoneNumber || "",
          email: data.data.email || "",
          telephoneId: primaryPhone?.id,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Không thể tải dữ liệu hồ sơ";
      setError(errorMessage);
      console.error("Error fetching user data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userProfile,
    rawUserProfile,
    isLoading,
    error,
    refetch: fetchUserData,
  };
}
