import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, LayoutDashboard, Users, ClipboardList, LogOut, Settings } from 'lucide-react';

interface StaffLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export default function StaffLayout({ children, onLogout }: StaffLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/staff/appointments', label: 'Appointments', icon: ClipboardList },
    { path: '/staff/patients', label: 'Patient List', icon: Users },
    { path: '/staff/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/staff/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl text-[#2A91C2]">Doc-Center</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={`nav-${item.label}-${index}`}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2A91C2] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#D32F2F] text-white hover:bg-[#B71C1C] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <nav className="flex justify-around p-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={`mobile-nav-${item.label}-${index}`}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#2A91C2]'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D32F2F] rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-[#2A91C2] rounded-full flex items-center justify-center text-white">
                  DJ
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-900">Dr. Mark James</p>
                  <p className="text-xs text-gray-500">Dentist</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 pb-20 lg:pb-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}