import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from '../ui/button';
import { Plus, Menu } from 'lucide-react';

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen, sidebarOpen }) => {
  
   const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

 /*    const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase(); */

  return (
        <header className="bg-[#1E293B] fixed top-0 w-full md:pl-72 border-b border-[#334155] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile burger menu */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 text-neutral-400 hover:text-white"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-[#2563EB] text-white">
                  AS
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Good morning, Alex! 👋
                </h1>
                <p className="text-sm text-neutral-400">
                  Ready to optimize your resume?
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Analysis</span>
            </Button>
          </div>
        </header>
  )
}

export default Navbar