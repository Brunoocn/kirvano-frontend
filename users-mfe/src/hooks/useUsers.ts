import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '../services/usersService';
import type { User, CreateUser, UpdateUser } from '../types';

export const QUERY_KEYS = {
  USERS: ['users'] as const,
  USER: (id: number) => ['users', id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: UsersService.getUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => UsersService.getUserById(id),
    enabled: !!id,
  });
}

export function useCreateUsers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (users: CreateUser[]) => UsersService.createUsers(users),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: UpdateUser }) => 
      UsersService.updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => UsersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
}