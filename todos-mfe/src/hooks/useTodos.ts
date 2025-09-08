import { useQuery, } from '@tanstack/react-query';
import { TodosService } from '../services/todosService';

export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
};

export function useTodos() {
  return useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: TodosService.getTodos,
  });
}





