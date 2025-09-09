export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}