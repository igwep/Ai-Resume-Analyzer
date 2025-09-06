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
import { useAppSelector } from "../hooks/useTypedHooks";
import { closeModal } from "../Slices/modalSLice";
import ServerTimeoutModal from "../component/ServerTimeOutModal";
import ErrorFallback from "../component/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);
  const user = useAppSelector((state) => state.user.data);

  //  Using your custom hook
  const { /* user,  */ ready, /* userLoading, */ /* error */ } = useUserReady();

  // Step 1: Sign in and fetch user data
  useEffect(() => {
    const signInAndFetch = async () => {
      setIsLoading(true)
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
        } finally{
          setIsLoading(false)
        }
      }
    };

    signInAndFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [user?.uid]);

  // UI States
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A]" suppressHydrationWarning>
        <Loader />
      </div>
    );
  }

/*   if (error) return <p className="text-red-500 p-4">Error: {error}</p>;*/
  if (!ready) return null; 

  return (
   <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { dispatch(closeModal()) }}>
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
          {modal.modalType === 'server-timeout' && (
        <ServerTimeoutModal
          isOpen={modal.isOpen}
          onClose={() => dispatch(closeModal())}
          title={modal.modalProps?.title as string}
          description={modal.modalProps?.description as string}
          isRetrying={modal.modalProps?.isRetrying as boolean}
        />
      )}
          
          {children}
        </main>
      </div>
    </div>

   </ErrorBoundary>
  );
}
