import { useTodos } from "../../hooks/useTodos";
import { Button } from "../../components/ui/button";
import { RefreshCw } from "lucide-react";
import "../../styles/globals.css";
import { TodosTable } from "../../components/todosTable";
import { TodosPagination } from "../../components/todosPagination";
import { usePagination } from "../../hooks/usePagination";


export function TodosPage() {
  const { 
    data: allTodos = [], 
    isLoading: loading, 
    error, 
    refetch 
  } = useTodos();

  const {
    currentItems: currentTodos,
    totalPages,
    currentPage,
    handlePageChange,
  } = usePagination({ data: allTodos, itemsPerPage: 10 });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4 pt-4">
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
        </div>

        <TodosTable
          todos={currentTodos}
          allTodos={allTodos}
          loading={loading}
          error={error?.message || null}
        />

        {!loading && !error && (
          <TodosPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
