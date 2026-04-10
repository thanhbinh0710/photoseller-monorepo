/**
 * API Service - Frontend to Backend Communication
 *
 * This service handles all HTTP requests to the PhotoSeller backend API.
 * Base URL is configured from environment variables.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T = any> {
  statusCode: number;
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    createdAt?: string;
  };
  access_token: string;
  token_type: string;
}

/**
 * Generic API request function
 * Handles error responses and token management
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Add default headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add auth token if available
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
      credentials: 'include',
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Register a new user
 * POST /auth/register
 */
export async function registerUser(
  userData: RegisterRequest,
): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (response.data) {
    // Store auth token for future requests
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("user_logged_in", "true");
    return response.data;
  }

  throw new Error(response.message || "Registration failed");
}

/**
 * Login user
 * POST /auth/login
 */
export async function loginUser(
  credentials: LoginRequest,
): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.data) {
    // Store auth token for future requests
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("user_logged_in", "true");
    return response.data;
  }

  throw new Error(response.message || "Login failed");
}

/**
 * Logout user
 * Clears stored tokens and user data
 */
export function logoutUser(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("user_logged_in");
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("access_token");
}
