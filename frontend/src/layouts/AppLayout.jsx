import { Link, Outlet, useLocation } from 'react-router-dom';
import { BriefcaseBusiness, FileText, LayoutDashboard, LogOut, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/quotes', label: 'Quotes', icon: FileText },
  { to: '/jobs-invoices', label: 'Jobs & Invoices', icon: BriefcaseBusiness },
];

const AppLayout = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-[#0a1230] to-bg p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[240px_1fr]">
        <aside className="card h-fit">
          <h1 className="text-xl font-bold">WhiteLabel CRM</h1>
          <p className="mt-1 text-sm text-slate-400">{user?.role?.toUpperCase()}</p>
          <nav className="mt-8 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                  pathname === to ? 'bg-accent/20 text-accent' : 'hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
          <button onClick={logout} className="mt-8 flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">
            <LogOut size={16} /> Logout
          </button>
        </aside>
        <main className="space-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
