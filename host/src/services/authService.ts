import axios from 'axios'
import { api } from './api'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth'
import type { User } from '../types/user'




export class AuthService {
  private static readonly ENDPOINTS = {
    LOGIN: '/authentication/login',
    REGISTER: '/authentication/register',
    TOKEN_VALID: '/authentication/token-valid',
  } as const

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(this.ENDPOINTS.LOGIN, credentials)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Credenciais inválidas'
        throw new Error(message)
      }
      throw new Error('Erro ao fazer login')
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(this.ENDPOINTS.REGISTER, userData)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao criar conta'
        throw new Error(message)
      }
      throw new Error('Erro ao criar conta')
    }
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      const response = await api.get(this.ENDPOINTS.TOKEN_VALID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  static async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${userId}`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao atualizar perfil'
        throw new Error(message)
      }
      throw new Error('Erro ao atualizar perfil')
    }
  }
}

