import { useState, useMemo } from "react";
import { useUsers, useCreateUsers, useUpdateUser, useDeleteUser } from "../../hooks/useUsers";
import { Button } from "../../components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { UsersTable } from "../../components/usersTable";
import { UsersPagination } from "../../components/usersPagination";
import { usePagination } from "../../hooks/usePagination";
import { getCurrentUser } from "../../utils/getCurrentUser";

import type { User, CreateUser, UpdateUser } from "../../types/user";
import { CreateUsersModal } from "../../components/createUsersModal";
import { UpdateUserModal } from "../../components/updateUserModal";
import { ConfirmationModal } from "../../components/confirmationModal";



export function UsersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [resetCreateForm, setResetCreateForm] = useState(false);

  const { 
    data: allUsers = [], 
    isLoading: loading, 
    error, 
    refetch 
  } = useUsers();

  const createUsersMutation = useCreateUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const filteredUsers = useMemo(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      return allUsers.filter(user => user.id !== currentUser.id);
    }
    return allUsers;
  }, [allUsers]);

  const {
    currentItems: currentUsers,
    totalPages,
    currentPage,
    handlePageChange,
  } = usePagination({ data: filteredUsers, itemsPerPage: 10 });

  const handleCreateUsers = async (users: CreateUser[]) => {
    try {
      await createUsersMutation.mutateAsync(users);
      setResetCreateForm(true);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
    }
  };

  const handleCreateModalClose = (open: boolean) => {
    if (!open) {
      setResetCreateForm(false);
    }
    setCreateModalOpen(open);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleUpdateUser = async (id: number, userData: UpdateUser) => {
    try {
      await updateUserMutation.mutateAsync({ id, user: userData });
      setUpdateModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = (id: number) => {
    const user = filteredUsers.find(u => u.id === id);
    if (user) {
      setUserToDelete(user);
      setConfirmDeleteOpen(true);
    }
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUserMutation.mutateAsync(userToDelete.id);
        setConfirmDeleteOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => refetch()}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Atualizar
              </Button>
            </div>
            
            <Button
              onClick={() => setCreateModalOpen(true)}
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar Usuários
            </Button>
          </div>
        </div>

        <UsersTable
          users={currentUsers}
          allUsers={filteredUsers}
          loading={loading}
          error={error?.message || null}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        
        {!loading && !error && (
          <UsersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <CreateUsersModal
          open={createModalOpen}
          onOpenChange={handleCreateModalClose}
          onSubmit={handleCreateUsers}
          loading={createUsersMutation.isPending}
          onSuccess={resetCreateForm ? () => {} : undefined}
        />

        <UpdateUserModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          onSubmit={handleUpdateUser}
          user={selectedUser}
          loading={updateUserMutation.isPending}
        />

        <ConfirmationModal
          open={confirmDeleteOpen}
          onOpenChange={setConfirmDeleteOpen}
          onConfirm={confirmDeleteUser}
          loading={deleteUserMutation.isPending}
          title="Deletar usuário"
          description={
            userToDelete 
              ? `Tem certeza que deseja deletar o usuário "${userToDelete.name}"? Esta ação não pode ser desfeita.`
              : "Tem certeza que deseja deletar este usuário?"
          }
          confirmText="Deletar"
          cancelText="Cancelar"
          variant="destructive"
        />
      </div>
    </div>
  );
}
