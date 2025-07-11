"use client";
import React, { useState } from "react";
import Navbar from "../component/Dashboard/Navbar";
import Sidebar from "../component/Dashboard/Sidebar";
import GlobalLoader from "../component/GlobarLoader";
import { useFirebaseAuthGuard } from "../hooks/useFirebaseAuth";
import { RootState } from "../Store";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //const user = useSelector((state: RootState) => state.user.data);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);


  
 const { loading } = useFirebaseAuthGuard();
if (loading) return null; // or a loader

if (userLoading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <div className="min-h-screen bg-[#0F172A]">
      
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Optional overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 p-6 md:ml-64 pt-26 overflow-y-auto">
              <GlobalLoader />
              {children}
          </main>
        </div>
    </div>
  );
}
