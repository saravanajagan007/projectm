export interface CompanyImageDto {
  id: string;
  url: string;
  companyId: string;
  createdAt: string;
}

export interface CompanyDto {
  id: string;
  name: string;
  contactPerson: string;
  contactNumber: string;
  alternateContactNumber?: string | null;
  email?: string | null;
  createdById: string;
  createdBy?: {
    id: string;
    email: string;
    role: string;
  };
  images: CompanyImageDto[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedCompaniesResponse {
  data: CompanyDto[];
  meta: PaginationMeta;
}
