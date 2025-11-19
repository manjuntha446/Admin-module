// src/layouts/AppSidebar.jsx
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Star,
  Store,
  Bell,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", to: "/customer", icon: Users },
  { title: "Bookings", to: "/booking", icon: Calendar },
  { title: "Services", to: "/index", icon: Package },
  { title: "Reviews", to: "/review", icon: Star },
  { title: "Subscriptions", to: "/subscription", icon: Package },
  { title: "Notifications", to: "/notifications", icon: Bell },
  { title: "Vendors", to: "/vendor", icon: Store },
];

export function AppSidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out border-r border-sidebar-border shadow-lg
        bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] dark:from-[#111827] dark:via-[#0F172A] dark:to-black
        ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              {isOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Admin Portal
                  </span>
                  <span className="text-xs text-gray-400">
                    Service Platform
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-blue-600/20 text-gray-300 hover:text-white transition"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600/40 hover:scrollbar-thumb-gray-500/60">
          <div className="space-y-1">
            {isOpen && (
              <p className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Main Menu
              </p>
            )}
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`
                }
                title={!isOpen ? item.title : undefined}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    isOpen ? "" : "mx-auto"
                  } transition-transform duration-200`}
                />
                {isOpen && <span className="text-sm font-medium">{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors"
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
