import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '../services/usersService';
import { toast } from '../hooks/use-toast';
import type { CreateUser, UpdateUser } from '../types';

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      toast({
        variant: "success",
        title: "Sucesso!",
        description: `${data.length} usuário(s) criado(s) com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar usuários",
        description: error.message || "Ocorreu um erro ao criar os usuários.",
      });
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
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Usuário atualizado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar usuário",
        description: error.message || "Ocorreu um erro ao atualizar o usuário.",
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UsersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Usuário deletado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao deletar usuário",
        description: error.message || "Ocorreu um erro ao deletar o usuário.",
      });
    },
  });
}