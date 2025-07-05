"use client";
import React, { useState } from "react";
import Navbar from "../component/Dashboard/Navbar";
import Sidebar from "../component/Dashboard/Sidebar";
import { Provider } from "react-redux";
import { store } from "../Store";
import GlobalLoader from "../component/GlobarLoader";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Only show content if signed in */}
      <SignedIn>
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
            <Provider store={store}>
              <GlobalLoader />
              {children}
            </Provider>
          </main>
        </div>
      </SignedIn>

      {/* Redirect to sign-in page if not signed in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
