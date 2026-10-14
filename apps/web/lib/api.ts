import { PaginatedCompaniesResponse, CompanyDto, UserDto } from '@projectm/shared';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
  private isRefreshing = false;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOn401 = true,
  ): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;

    const headers = new Headers(options.headers || {});
    // If not FormData, default to application/json
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // Ensure cookies are sent and received
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 401 && retryOn401 && !endpoint.includes('/auth/login')) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          try {
            await this.refresh();
            this.isRefreshing = false;
            // Retry the original request
            return this.request<T>(endpoint, options, false);
          } catch (refreshErr) {
            this.isRefreshing = false;
            throw new Error('Session expired. Please log in again.');
          }
        }
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg =
          data?.message ||
          (Array.isArray(data?.message) ? data.message.join(', ') : 'An unexpected error occurred');
        throw new Error(errorMsg);
      }

      return data as T;
    } catch (error: any) {
      throw error;
    }
  }

  // Auth Endpoints
  async login(email: string, pass: string): Promise<{ user: UserDto; message: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
    });
  }

  async refresh(): Promise<{ user: UserDto; message: string }> {
    return this.request('/auth/refresh', {
      method: 'POST',
    }, false);
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request('/auth/logout', {
      method: 'POST',
    }, false);
  }

  async getMe(): Promise<{ user: UserDto }> {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // Company Endpoints
  async getCompanies(params: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedCompaniesResponse> {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/companies${qs}`, {
      method: 'GET',
    });
  }

  async getCompany(id: string): Promise<CompanyDto> {
    return this.request(`/companies/${id}`, {
      method: 'GET',
    });
  }

  async createCompany(formData: FormData): Promise<CompanyDto> {
    return this.request('/companies', {
      method: 'POST',
      body: formData,
    });
  }

  async updateCompany(id: string, formData: FormData): Promise<CompanyDto> {
    return this.request(`/companies/${id}`, {
      method: 'PATCH',
      body: formData,
    });
  }

  async deleteCompany(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/companies/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
