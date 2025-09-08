import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const getPageTitle = () => {
    if (location.pathname.startsWith('/todos')) return 'Todos'
    if (location.pathname.startsWith('/users')) return 'Users'
    return 'Sistema'
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <nav className="flex space-x-4">
              <Button
                variant={location.pathname.startsWith('/todos') ? 'default' : 'ghost'}
                onClick={() => navigate('/todos')}
                size="sm"
              >
                Todos
              </Button>
            </nav>
            <nav className="flex space-x-4">
              <Button
                variant={location.pathname.startsWith('/users') ? 'default' : 'ghost'}
                onClick={() => navigate('/users')}
                size="sm"
              >
                Users
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm text-gray-700">{user?.name}</span>
            </div>
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
    </header>
  )
}