import { useState } from "react";
import { useUsers, useCreateUsers, useUpdateUser, useDeleteUser } from "../../hooks/useUsers";
import { Button } from "../../components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import "../../styles/globals.css";
import { UsersTable } from "../../components/UsersTable";
import { UsersPagination } from "../../components/UsersPagination";
import { usePagination } from "../../hooks/usePagination";
import { CreateUsersModal } from "../../components/CreateUsersModal";
import { UpdateUserModal } from "../../components/UpdateUserModal";
import type { User, CreateUser, UpdateUser } from "../../types";

export function UsersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { 
    data: allUsers = [], 
    isLoading: loading, 
    error, 
    refetch 
  } = useUsers();

  const createUsersMutation = useCreateUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const {
    currentItems: currentUsers,
    totalPages,
    currentPage,
    handlePageChange,
  } = usePagination({ data: allUsers, itemsPerPage: 10 });

  const handleCreateUsers = async (users: CreateUser[]) => {
    try {
      await createUsersMutation.mutateAsync(users);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
    }
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

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUserMutation.mutateAsync(id);
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
          allUsers={allUsers}
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
          onOpenChange={setCreateModalOpen}
          onSubmit={handleCreateUsers}
          loading={createUsersMutation.isPending}
        />

        <UpdateUserModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          onSubmit={handleUpdateUser}
          user={selectedUser}
          loading={updateUserMutation.isPending}
        />
      </div>
    </div>
  );
}
