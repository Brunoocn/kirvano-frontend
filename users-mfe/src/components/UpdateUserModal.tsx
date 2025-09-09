import { useState, useEffect } from "react";
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
import type { User, UpdateUser } from "../types";

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
  const [formData, setFormData] = useState<UpdateUser>({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && formData.name?.trim() && formData.email?.trim()) {
      onSubmit(user.id, formData);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "" });
    onOpenChange(false);
  };

  const updateField = (field: keyof UpdateUser, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogClose onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário. A senha não pode ser alterada.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                value={formData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="user-id">ID do Usuário</Label>
              <Input
                id="user-id"
                type="text"
                value={user?.id || ""}
                disabled
                className="bg-muted"
              />
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