import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getCurrentUser } from "../utils/getCurrentUser";
import { AuthService } from "../services/authService";
import type { User, UpdateUserProfile } from "../types/user";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserProfile>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (open) {
      loadUserProfile();
    }
  }, [open, reset]);

  const loadUserProfile = async () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      try {
        setLoading(true);
        const userProfile = await AuthService.getProfileInfo(currentUser.id);
        setUser(userProfile);
        reset({
          name: userProfile.name,
          email: userProfile.email,
        });
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar informações do perfil. Tente novamente.');
        onOpenChange(false);
      } finally {
        setLoading(false);
      }
    }
  };


  const logout = () => {
    localStorage.removeItem('authUser');
    window.location.href = '/auth/login';
  };

  const onSubmit = async (data: UpdateUserProfile) => {
    if (!user) return;

    setLoading(true);
    try {
      await AuthService.updateProfile(user.id, data);
      
      localStorage.setItem('authUser', JSON.stringify({
        ...user,
        name: data.name,
        email: data.email,
      }));

      alert('Perfil atualizado com sucesso! Você será deslogado.');
      logout();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} maxWidth="max-w-md">
      <DialogContent>
        <DialogClose onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações pessoais.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Carregando perfil...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                {...register("name", { required: "Nome é obrigatório" })}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}