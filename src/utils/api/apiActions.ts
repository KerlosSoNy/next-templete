import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as yup from "yup";
import { getDecryptedToken } from "../functions/bufferedEncryptedToken";
import { getLocale } from "next-intl/server";

export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

interface ApiActionProps {
  endPoint: string;
  method?: HttpMethod;
  version?: string;
  payload?: any;
  validation?: yup.Schema;
  navigateTo?: string;
  page_key?: string;
  params?: string;
  revalidate?: string;
}

interface ApiResponse<T> {
  data?: T;
  errors?: Record<string, string>;
  message?: string;
  success: boolean;
  isLoading?: boolean;
}

export async function apiAction<T>({
  endPoint,
  method = HttpMethod.GET,
  version,
  payload,
  validation,
  navigateTo,
  page_key,
  params,
  revalidate,
}: ApiActionProps): Promise<ApiResponse<T>> {

  try {
    // Validation
    if (validation && payload) {
      try {
        await validation.validate(payload, { abortEarly: false });
      } catch (err: any) {
        const validationErrors: Record<string, string> = {};
        err.inner?.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        return {
          success: false,
          errors: validationErrors,
          message: "Validation failed",
          isLoading: false,
        };
      }
    }

    let token = null;
    try {
      token = await getDecryptedToken();
    } catch (error) {
      console.error("Failed to get token:", error);
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
    const appType = process.env.NEXT_PUBLIC_API_APP_TYPE;
    const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || version;
    const cleanEndpoint = endPoint.replace(/^\//, '');
    const queryParams = params || '';
    const locale = await getLocale();
    const url = `${baseUrl}/api/${appType}/${apiVersion}/${cleanEndpoint}${queryParams}`;
    const headers: Record<string, string> = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Accept-Language": typeof navigator !== 'undefined' ? locale || (navigator.language || "en") : "en",
      "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Platform-Api-Key": process.env.NEXT_PUBLIC_PLATFORM_API_KEY || "",
      "market-scope": "multi",
    };

    if (page_key) {
      headers["page-key"] = page_key;
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Build fetch options
    const options: RequestInit = {
      method: method.toUpperCase(),
      headers,
      cache: 'no-store',
    };

    if (process.env.NEXT_API_AUTH !== "token") {
      options.credentials = 'include'; 
    }

    if (payload && method !== HttpMethod.GET) {
      options.body = JSON.stringify(payload);
    }

    // Make the request
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.replace("/not-authenticated");
      }
      return {
        success: false,
        message: "Unauthorized - please login again",
        errors: {},
        isLoading: false,
      };
    }

    if (response.status === 403) {
      redirect("/forbidden");
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("❌ Non-JSON response received:", textResponse.substring(0, 500));
      
      return {
        success: false,
        message: `Server returned non-JSON response. Status: ${response.status}`,
        errors: { 
          api: `Expected JSON but received ${contentType || "unknown content type"}` 
        },
      };
    }

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response", parseError);
      return {
        success: false,
        message: "Failed to parse server response",
        errors: { api: "Invalid JSON response" },
        isLoading: false,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        errors: responseData.errors || {},
        message: responseData.message || `API Error: ${response.status} ${response.statusText}`,
      };
    }

    if (revalidate) {
      revalidatePath(revalidate);
    }

    if (navigateTo) {
      redirect(navigateTo);
    }
    return {
      success: true,
      data: responseData.data,
      // @ts-expect-error type missing
      pagination: responseData.pagination,
      message: responseData.message,
      isLoading: false,
    };
  } catch (error: any) {
    console.error("💥 API Action Error:", error);
    
    // Check if error is from redirect
    if (error.message?.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }
    
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      errors: {},
      isLoading: false,
    };
  }
}