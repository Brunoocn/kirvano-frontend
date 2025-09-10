

export interface AuthResponse {
  name: string
  email: string
  id: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}