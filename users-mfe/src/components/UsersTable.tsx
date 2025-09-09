import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Edit, Trash2, User } from "lucide-react";
import type { User as UserType } from "../types/user";
import { LoadingState } from "./loading";
import { Error } from "./error";

interface UsersTableProps {
  users: UserType[];
  allUsers: UserType[];
  loading: boolean;
  error: string | null;
  onEdit: (user: UserType) => void;
  onDelete: (id: number) => void;
}

export function UsersTable({
  users,
  allUsers,
  loading,
  error,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (loading) {
    return <LoadingState message="Carregando usuários" />;
  }

  if (error) {
    return <Error error={error} message="Erro ao carregar dados" />;
  }

  return (
    <>
      {users.length > 0 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Usuários</span>
              <div className="flex gap-2">
                <Badge variant="outline">{allUsers.length} total</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-32">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-muted-foreground text-center">
              Não há usuários para exibir no momento.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}