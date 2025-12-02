import {
  LayoutDashboard,
  Users,
  MapPin,
  FileText,
  Settings,
  Database,
  LifeBuoy,
  LogOut,
  Map as MapIcon,
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
        active
          ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {/* Active Indicator Bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
      )}

      <Icon
        size={20}
        className={`transition-colors duration-200 ${
          active
            ? "text-blue-600"
            : "text-gray-400 group-hover:text-gray-600"
        }`}
      />
      <span>{label}</span>
    </button>
  );
}

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: Users,
      label: "User Management",
    },
    {
      icon: MapPin,
      label: "Place Management",
    },
    {
      icon: Database,
      label: "Master Data",
    },
    {
      icon: FileText,
      label: "Reports",
    },
    {
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50 border-r border-gray-200 flex flex-col h-screen sticky top-0 z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      {/* 1. Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <MapIcon size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">
              UniTravel
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Main Menu */}
        <div>
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activePage === item.label}
                onClick={() => setActivePage(item.label)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Footer / Support Section */}
      <div className="p-4 border-t border-gray-100 space-y-4">
        {/* Support Card */}
        <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-4 text-white shadow-xl">
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>

          <div className="relative z-10 flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <LifeBuoy size={18} className="text-blue-200" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">
                Need Help?
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Check our docs or contact support.
              </p>
              <button className="text-xs font-semibold bg-white text-slate-900 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors w-full">
                Open Documentation
              </button>
            </div>
          </div>
        </div>

        {/* User / Logout */}
        <button className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group">
          <LogOut
            size={20}
            className="group-hover:text-red-500 transition-colors"
          />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}