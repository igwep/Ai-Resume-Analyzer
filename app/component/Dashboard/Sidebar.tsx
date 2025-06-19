"use client";
import React from 'react'
import { useState } from 'react';
import { Home, History, Settings, HelpCircle, FileText } from 'lucide-react';

const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="w-64 bg-[#1E293B] fixed left-0 top-0 border-r h-screen border-[#334155] hidden lg:block">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ResumeAI</span>
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