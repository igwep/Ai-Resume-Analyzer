'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/Store';
import { setActiveItem } from '@/app/Slices/navigationSlice';
import { Button } from '../ui/button';
import { Home, History, Settings, HelpCircle, FileText, X } from 'lucide-react';
import { useUniversalSignOut } from '@/app/hooks/useFirebaseAuth';

const iconMap = {
  Home,
  History,
  Settings,
  HelpCircle,
};

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { sidebarItems, activeItemId } = useSelector(
    (state: RootState) => state.navigation
  );

  const { handleSignOut } = useUniversalSignOut();

  // Automatically update Redux state when pathname changes
 useEffect(() => {
  const matchedItem = sidebarItems.find((item) => pathname === item.path);
  if (matchedItem && matchedItem.id !== activeItemId) {
    dispatch(setActiveItem(matchedItem.id));
  }
}, [pathname, sidebarItems, dispatch, activeItemId]);
  console.log("activeItemId", activeItemId);

  return (
    <div
      className={`w-64 bg-[#1E293B] border-r border-[#334155] fixed z-50 h-screen top-0 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-8 lg:justify-start">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ResumeAI</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeItemId === item.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="w-full pt-4 px-6 absolute bottom-0 space-y-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-red-300 hover:text-red-200 hover:bg-red-900/20 border border-neutral-700 hover:border-red-700/50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sign out</span>
        </button>

        <div className="text-center border-t border-[#334155] pt-4">
          <div className="flex justify-center space-x-1 mb-2">
            <div className="px-1.5 py-0.5 bg-blue-900/30 border border-blue-700/30 rounded text-xs text-blue-300 font-medium">AI</div>
            <div className="px-1.5 py-0.5 bg-green-900/30 border border-green-700/30 rounded text-xs text-green-300 font-medium">ATS</div>
            <div className="px-1.5 py-0.5 bg-purple-900/30 border border-purple-700/30 rounded text-xs text-purple-300 font-medium">ML</div>
          </div>
          <div className="text-xs text-neutral-500">© 2025 ResumeAI™</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
