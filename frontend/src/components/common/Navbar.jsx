import { Link, NavLink } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { auth, logout } = useAuth();
  const navClass = ({ isActive }) => `transition ${isActive ? 'text-white' : 'text-white/65 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold tracking-[0.25em] text-white">
          INSUREX
        </Link>
        <nav className="hidden gap-6 md:flex">
          <NavLink className={navClass} to="/">Home</NavLink>
          <a className="text-white/65 hover:text-white" href="#plans">Plans</a>
          <a className="text-white/65 hover:text-white" href="#about">About</a>
          {!auth.user && <NavLink className={navClass} to="/login">Login</NavLink>}
          {!auth.user && <NavLink className={navClass} to="/register">Register</NavLink>}
        </nav>
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-4 py-2 text-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          {auth.user && (
            <>
              <Link className="btn-secondary px-4 py-2 text-sm" to={auth.user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}>
                Dashboard
              </Link>
              <button className="btn-primary px-4 py-2 text-sm" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
