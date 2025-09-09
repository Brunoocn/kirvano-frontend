import axios from 'axios';
import { api } from './api';
import type { CreateUser, UpdateUser, User } from '../types/user';


export class UsersService {
  private static readonly ENDPOINTS = {
    USERS: '/users',
  } as const;

  static async getUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>(UsersService.ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      console.log('Error in getUsers:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao carregar usuários';
        throw new Error(message);
      }
      throw new Error('Erro ao carregar usuários');
    }
  }

  static async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`${UsersService.ENDPOINTS.USERS}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Usuário não encontrado';
        throw new Error(message);
      }
      throw new Error('Erro ao carregar usuário');
    }
  }

  static async createUsers(users: CreateUser[]): Promise<User[]> {
    try {
      const response = await api.post<User[]>(UsersService.ENDPOINTS.USERS, users);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao criar usuários';
        throw new Error(message);
      }
      throw new Error('Erro ao criar usuários');
    }
  }

  static async updateUser(id: number, user: UpdateUser): Promise<User> {
    try {
      const response = await api.put<User>(`${UsersService.ENDPOINTS.USERS}/${id}`, user);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao atualizar usuário';
        throw new Error(message);
      }
      throw new Error('Erro ao atualizar usuário');
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`${UsersService.ENDPOINTS.USERS}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao deletar usuário';
        throw new Error(message);
      }
      throw new Error('Erro ao deletar usuário');
    }
  }
}