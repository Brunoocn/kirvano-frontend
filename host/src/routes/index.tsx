import { Routes, Route, Navigate } from "react-router-dom";

import { TodosPage } from "../pages/todo";
import { UsersPage } from "../pages/users";

import { useAuth } from "../contexts/AuthContext";
import { LoginPage } from "../pages/auth/loginPage";
import { RegisterPage } from "../pages/auth/registerPage";
import { ProtectedRoute } from "../components/protectedRoute";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route 
        path="/auth/login" 
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <LoginPage />
        } 
      />
      <Route 
        path="/auth/register" 
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <RegisterPage />
        } 
      />


      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />


      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/todos" : "/auth/login"} replace />} 
      />

      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/todos" : "/auth/login"} replace />} 
      />
    </Routes>
  );
}
