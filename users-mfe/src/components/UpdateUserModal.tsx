import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import type { User, UpdateUser } from "../types/user";
import { updateUserFormSchema, type UpdateUserFormOnlyData } from "../schemas/userSchema";

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, user: UpdateUser) => void;
  user: User | null;
  loading?: boolean;
}

export function UpdateUserModal({
  open,
  onOpenChange,
  onSubmit,
  user,
  loading = false,
}: UpdateUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormOnlyData>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, open, reset]);

  const onFormSubmit = (data: UpdateUserFormOnlyData) => {
    if (user) {
      const updateData: UpdateUser = {
        name: data.name,
        email: data.email,
      };
      onSubmit(user.id, updateData);
    }
  };

  const handleClose = () => {
    reset({ name: "", email: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogClose onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Nome completo"
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
                {...register("email")}
                placeholder="email@exemplo.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
