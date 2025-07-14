"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../component/Dashboard/Navbar";
import Sidebar from "../component/Dashboard/Sidebar";
import GlobalLoader from "../component/GlobarLoader";
import { useFirebaseAuthGuard } from "../hooks/useFirebaseAuth";
import { RootState } from "../Store";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchUserData } from "../lib/fetchUserData";
import { useAppDispatch } from "../hooks/useTypedHooks";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { app } from "../lib/Firebase"; // Ensure this imports your Firebase app correctly

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //const user = useSelector((state: RootState) => state.user.data);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  // Fetch user data if uid is available
useEffect(() => {
    const signInAndFetch = async () => {
      if (session?.idToken && session.user?.id) {
        try {
          const auth = getAuth(app);

          // Only sign in if no user is already signed in
          if (!auth.currentUser) {
            const credential = GoogleAuthProvider.credential(session.idToken);
            await signInWithCredential(auth, credential);
            console.log(" Firebase Auth sign-in successful");
            console.log("Session UID:", session.user.id);
console.log("Firebase Auth UID:", auth.currentUser?.uid);
          }

          // Fetch user data from Firestore
          await fetchUserData(session.user.id, dispatch);
        } catch (err) {
          console.error(" Firebase sign-in or fetch error:", err);
        }
      }
    };

    signInAndFetch();
  }, [session, dispatch]);



  
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
