import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CheckCircle, Clock } from "lucide-react";
import type { Todo } from "../types";
import { LoadingState } from "./loading";
import { Error } from "./error";

interface TodosTableProps {
  todos: Todo[];
  allTodos: Todo[];
  loading: boolean;
  error: string | null;
}

export function TodosTable({
  todos,
  allTodos,
  loading,
  error,
}: TodosTableProps) {
  const totalCompletedCount = allTodos.filter((t) => t.completed).length;

  if (loading) {
    return <LoadingState message="Carregando todos" />;
  }

  if (error) {
    return <Error error={error} message="Erro ao carregar dados" />;
  }

  return (
    <>
      {todos.length > 0 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Todos</span>
              <div className="flex gap-2">
                <Badge variant="outline">{allTodos.length} total</Badge>
                <Badge variant="success">
                  {totalCompletedCount} concluído
                  {totalCompletedCount !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead>Título</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell className="font-medium">{todo.id}</TableCell>
                    <TableCell>
                      {todo.completed ? (
                        <Badge
                          variant="success"
                          className="flex items-center gap-1 w-fit"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Concluído
                        </Badge>
                      ) : (
                        <Badge
                          variant="warning"
                          className="flex items-center gap-1 w-fit"
                        >
                          <Clock className="h-3 w-3" />
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {todo.title}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between text-sm text-muted-foreground">
            <span>
              {allTodos.length} todo{allTodos.length !== 1 ? "s" : ""} no total
            </span>
            <span>
              {allTodos.length > 0
                ? ((totalCompletedCount / allTodos.length) * 100).toFixed(0)
                : 0}
              % concluído
            </span>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">
              Nenhum todo encontrado
            </h3>
            <p className="text-muted-foreground text-center">
              Não há todos para exibir no momento.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
