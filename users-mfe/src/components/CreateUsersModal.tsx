import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import type { CreateUser } from "../types";

interface CreateUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (users: CreateUser[]) => void;
  loading?: boolean;
}

export function CreateUsersModal({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: CreateUsersModalProps) {
  const [users, setUsers] = useState<CreateUser[]>([
    { name: "", email: "", password: "" },
  ]);

  const addUser = () => {
    setUsers([...users, { name: "", email: "", password: "" }]);
  };

  const removeUser = (index: number) => {
    if (users.length > 1) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const updateUser = (index: number, field: keyof CreateUser, value: string) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = users.filter(
      (user) => user.name.trim() && user.email.trim() && user.password.trim()
    );
    if (validUsers.length > 0) {
      onSubmit(validUsers);
      setUsers([{ name: "", email: "", password: "" }]);
    }
  };

  const handleClose = () => {
    setUsers([{ name: "", email: "", password: "" }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogClose onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>Criar Usuários</DialogTitle>
          <DialogDescription>
            Adicione um ou mais usuários preenchendo os campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-4">
            {users.map((user, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Usuário {index + 1}</h4>
                  {users.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeUser(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label htmlFor={`name-${index}`}>Nome</Label>
                    <Input
                      id={`name-${index}`}
                      type="text"
                      value={user.name}
                      onChange={(e) => updateUser(index, "name", e.target.value)}
                      placeholder="Nome completo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={user.email}
                      onChange={(e) => updateUser(index, "email", e.target.value)}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`password-${index}`}>Senha</Label>
                    <Input
                      id={`password-${index}`}
                      type="password"
                      value={user.password}
                      onChange={(e) => updateUser(index, "password", e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addUser}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar outro usuário
          </Button>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Usuários"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}