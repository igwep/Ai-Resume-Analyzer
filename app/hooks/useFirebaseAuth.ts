/* "use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export function useFirebaseAuthGuard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/SignIn"); // ⬅ Use replace instead of push
      } else {
        setLoading(false); //  Only stop loading if user exists
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { loading };
}
export const useFirebaseSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/SignIn"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { handleSignOut };
}; */


"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { useRouter } from "next/navigation";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export function useFirebaseAuthGuard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession(); //  from next-auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Case 1: Firebase Auth
      if (user) {
        setLoading(false);
        return;
      }

      // Case 2: Google Auth (NextAuth)
      if (status === "authenticated") {
        setLoading(false);
        return;
      }

      // Not logged in via either method
      if (status === "unauthenticated") {
        router.replace("/SignIn");
      }
    });

    return () => unsubscribe();
  }, [router, status]);

  return { loading };
}

export const useUniversalSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Firebase user?
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        await firebaseSignOut(auth);
        router.replace("/SignIn");
        return;
      }

      // NextAuth user?
      await nextAuthSignOut({ callbackUrl: "/SignIn" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { handleSignOut };
};
