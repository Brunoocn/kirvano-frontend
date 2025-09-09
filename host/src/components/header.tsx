import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { ProfileModal } from "./profileModal";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <Button
                variant={
                  location.pathname.startsWith("/todos") ? "default" : "ghost"
                }
                onClick={() => navigate("/todos")}
                size="sm"
              >
                Todos
              </Button>
            </nav>
            <nav className="flex space-x-4">
              <Button
                variant={
                  location.pathname.startsWith("/users") ? "default" : "ghost"
                }
                onClick={() => navigate("/users")}
                size="sm"
              >
                Users
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">{user?.name}</span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
      />
    </header>
  );
}
