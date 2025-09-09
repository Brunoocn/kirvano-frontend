import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import type { CreateUser } from "../types/user";
import { formSchema, type FormData } from "../schemas/createUserSchema";

interface CreateUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (users: CreateUser[]) => void;
  loading?: boolean;
  onSuccess?: () => void;
}

export function CreateUsersModal({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
  onSuccess,
}: CreateUsersModalProps) {
  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ name: "", email: "", password: "" }],
    },
  });

  const watchedUsers = watch("users");

  useEffect(() => {
    if (onSuccess) {
      reset();
    }
  }, [onSuccess, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const addUser = () => {
    append({ name: "", email: "", password: "" });
  };

  const removeUser = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit(data.users);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} maxWidth="max-w-6xl">
      <DialogContent>
        <DialogClose onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>Criar Usuários</DialogTitle>
          <DialogDescription>
            Adicione um ou mais usuários preenchendo os campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {watchedUsers[index]?.name?.trim() 
                      ? watchedUsers[index].name 
                      : `Usuário ${index + 1}`
                    }
                  </h4>
                  {fields.length > 1 && (
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`name-${index}`}>Nome</Label>
                    <Input
                      id={`name-${index}`}
                      type="text"
                      {...register(`users.${index}.name`)}
                      placeholder="Nome completo"
                    />
                    {errors.users?.[index]?.name && (
                      <span className="text-sm text-red-500">
                        {errors.users[index]?.name?.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      {...register(`users.${index}.email`)}
                      placeholder="email@exemplo.com"
                    />
                    {errors.users?.[index]?.email && (
                      <span className="text-sm text-red-500">
                        {errors.users[index]?.email?.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`password-${index}`}>Senha</Label>
                    <Input
                      id={`password-${index}`}
                      type="password"
                      {...register(`users.${index}.password`)}
                      placeholder="••••••••"
                    />
                    {errors.users?.[index]?.password && (
                      <span className="text-sm text-red-500">
                        {errors.users[index]?.password?.message}
                      </span>
                    )}
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