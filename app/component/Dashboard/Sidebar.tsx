"use client";
import React from 'react'
import { useState } from 'react';
import { Button } from '../ui/button'
import { Home, History, Settings, HelpCircle, FileText, X } from 'lucide-react';

const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    
  return (
    <div   className={`w-64 bg-[#1E293B] border-r border-[#334155] fixed  z-50 h-screen top-0 transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 lg:justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
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
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-[#2563EB] text-white"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
  )
}

export default Sidebar