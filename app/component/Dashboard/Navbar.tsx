import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const Navbar = () => {
 /*    const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase(); */

  return (
        <header className="bg-[#1E293B] border-b border-[#334155] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
              New Analysis
            </Button>
          </div>
        </header>
  )
}

export default Navbar