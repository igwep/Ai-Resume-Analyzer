"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../component/Dashboard/Navbar";
import Sidebar from "../component/Dashboard/Sidebar";
import Loader from "../component/Loader";
import { useSession } from "next-auth/react";
import { fetchUserData } from "../utils/firebase/fetchUserData";
import { useAppDispatch } from "../hooks/useTypedHooks";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { app } from "../lib/Firebase";
import { useUserReady } from "../hooks/useUserReady";
import { listenToUserHistory } from "../utils/firebase/firebaseFunctions";
import GlobalLoader from "../component/GlobarLoader";
import { listenToUserData } from "../utils/firebase/firebaseFunctions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  //  Using your custom hook
  const { user, ready, userLoading, error } = useUserReady();

  // Step 1: Sign in and fetch user data
  useEffect(() => {
    const signInAndFetch = async () => {
      if (session?.idToken && session.user?.id) {
        try {
          const auth = getAuth(app);
          if (!auth.currentUser) {
            const credential = GoogleAuthProvider.credential(session.idToken);
            await signInWithCredential(auth, credential);
          }
          await fetchUserData(session.user.id, dispatch);
        } catch (err) {
          console.error("Firebase sign-in or fetch error:", err);
        }
      }
    };

    signInAndFetch();
  }, [session, dispatch]);

  //  Step 2: Real-time Firestore listener using user.uid from hook
  /* useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | undefined;

    listenToUserHistory(user.uid, dispatch).then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid, dispatch]); */

 useEffect(() => {
  if (!user?.uid) return;

  // Start both listeners
  const unsubscribeUserData = listenToUserData(user.uid, dispatch);

  let unsubscribeHistory: (() => void) | undefined;
  listenToUserHistory(user.uid, dispatch).then((unsub) => {
    unsubscribeHistory = unsub;
  });

  // Cleanup both listeners on unmount
  return () => {
    unsubscribeUserData();
    if (unsubscribeHistory) unsubscribeHistory();
  };
}, [user?.uid, dispatch]);

  // UI States
  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A]" suppressHydrationWarning>
        <Loader />
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-2 md:ml-64 pt-26 overflow-y-auto">
          <GlobalLoader />
          
          {children}
        </main>
      </div>
    </div>
  );
}
