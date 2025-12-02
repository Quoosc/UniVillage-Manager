import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

// Component ImageWithFallback đơn giản để xử lý ảnh lỗi (nếu bạn chưa có file riêng)
const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" : src}
      alt={alt}
      onError={() => setError(true)}
      className={`transition-opacity duration-300 ${className}`}
    />
  );
};

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/80 h-16 transition-all duration-200">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        
        {/* 1. Left Section: Mobile Menu & Search */}
        <div className="flex items-center flex-1 gap-4">
          <button className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu size={20} />
          </button>

          <div className="relative w-full max-w-md group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 group-focus-within:text-blue-500 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-sm transition-all duration-200 
                placeholder:text-gray-400
                focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* 2. Right Section: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Notification Bell */}
          <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 rounded-xl transition-all duration-200 group">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Profile Dropdown Trigger */}
          <button className="flex items-center gap-3 pl-1 sm:pl-2 pr-1 py-1 rounded-xl hover:bg-gray-50 transition-colors group text-left">
            <div className="relative">
              <Avatar
                src="https://photo.znews.vn/w660/Uploaded/xbhunku/2017_07_03/16.jpg"
                alt="Quốc Pro"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className="hidden md:block pr-2">
              <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors leading-none mb-1">
                Quốc Pro
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                Quocpro@gm.uit.edu.vn
              </p>
            </div>
            
            <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-transform duration-200 group-hover:translate-y-0.5 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}