/**
 * API Service - Frontend to Backend Communication
 *
 * This service handles all HTTP requests to the PhotoSeller backend API.
 * Base URL is configured from environment variables.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://103.172.78.8:8002";

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
  const method = options.method || "GET";
  console.log(`[API] Requesting: ${method} ${url}`);

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
    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 10000); // 10s timeout

    try {
      console.log(`[API] Fetch with headers:`, Object.keys(headers));

      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors",
        credentials: "include",
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      console.log(`[API] Response: ${response.status} ${response.statusText}`);
      console.log(`[API] Content-Type:`, response.headers.get("content-type"));

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data: ApiResponse<T>;

      if (contentType?.includes("application/json")) {
        const responseText = await response.text();
        console.log(`[API] Raw response:`, responseText.substring(0, 300));
        data = JSON.parse(responseText);
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        console.error(`[API] Non-JSON response:`, text.substring(0, 200));
        throw new Error(
          `Backend returned non-JSON response (${response.status}): ${text.substring(0, 100)}`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      console.log(`[API] Success:`, data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          `Request timeout. Backend at ${API_BASE_URL} not responding. Please check if Docker backend is running.`,
        );
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON response from backend: ${error.message}`);
      }
      throw error;
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : String(error) || "Unknown error";
    console.error(`API Error [${endpoint}]: ${errorMsg}`, {
      url: `${API_BASE_URL}${endpoint}`,
      timestamp: new Date().toISOString(),
    });
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
