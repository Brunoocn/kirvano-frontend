import axios from 'axios';

import type { Todo } from '../types';
import api from './api';

export class TodosService {
    private static readonly ENDPOINTS = {
        TODOS: '/todos',
    } as const;

    static async getTodos(): Promise<Todo[]> {
        try {
            const response = await api.get<Todo[]>(TodosService.ENDPOINTS.TODOS);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'Erro ao carregar todos';
                throw new Error(message);
            }
            throw new Error('Erro ao carregar todos');
        }
    }

    static async getTodoById(id: number): Promise<Todo> {
        try {
            const response = await api.get<Todo>(`${TodosService.ENDPOINTS.TODOS}/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'Todo n�o encontrado';
                throw new Error(message);
            }
            throw new Error('Erro ao carregar todo');
        }
    }


}