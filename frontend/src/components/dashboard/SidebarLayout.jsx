import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menus = {
  ADMIN: [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/plans', label: 'Plans' },
    { to: '/admin/applications', label: 'Applications' },
    { to: '/admin/users', label: 'Users' }
  ],
  USER: [
    { to: '/user/dashboard', label: 'Dashboard' },
    { to: '/user/apply', label: 'Apply Insurance' },
    { to: '/user/status', label: 'Application Status' },
    { to: '/user/profile', label: 'Profile' }
  ]
};

const SidebarLayout = ({ title, children }) => {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const items = menus[auth.user?.role || 'USER'];

  return (
    <div className="page-shell py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="glass rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">{auth.user?.role} Portal</p>
          <h2 className="mt-3 text-2xl font-semibold">{auth.user?.name}</h2>
          <div className="mt-8 space-y-3">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block rounded-2xl px-4 py-3 transition ${
                  location.pathname === item.to ? 'bg-white text-black' : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button className="btn-secondary mt-8 w-full" onClick={logout}>Logout</button>
        </aside>
        <main className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Insurance Operations</p>
            <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
