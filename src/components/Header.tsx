import { useState, useEffect } from 'react';
import { Search, User, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchExpanded(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Classement', path: '/rankings' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'pt-4 px-4' 
          : ''
      }`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-full py-2 px-6' 
            : 'bg-white/80 backdrop-blur-lg border-b border-gray-200 py-4'
        }`}>
          <div className="flex items-center justify-between">
            {/* Barre de recherche étendue */}
            {isSearchExpanded ? (
              <div className="flex-1 flex items-center justify-center">
                <form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Rechercher des quiz..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 bg-white/90 border-gray-200 focus:bg-white transition-all duration-300"
                      autoFocus
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchExpanded(false)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {/* Titre Quizzly à gauche */}
                <div className="flex items-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Quizzly
                  </h1>
                </div>

                {/* Navigation centrale */}
                <nav className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                        location.pathname === item.path 
                          ? 'text-purple-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Contrôles droite */}
                <div className="flex items-center space-x-3">
                  {/* Bouton Search */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchExpanded(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                  >
                    <Search className="h-5 w-5 text-gray-600" />
                  </Button>

                  {/* Auth/User Menu */}
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                              {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-white" align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/rankings" className="flex items-center">
                            <span className="mr-2">🏆</span>
                            Classements
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost"
                        onClick={() => handleAuthClick('login')}
                        className="text-sm font-medium hover:text-purple-600"
                      >
                        Connexion
                      </Button>
                      <Button 
                        onClick={() => handleAuthClick('register')}
                        className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm transition-all duration-500 ${
                          isScrolled ? 'rounded-full' : ''
                        }`}
                      >
                        Inscription
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        defaultTab={authMode}
      />
    </>
  );
};

export default Header;
