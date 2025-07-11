/* import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/lib/Firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Extend session to include custom UID
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const emailToUidRef = doc(db, "email-to-uid", user.email);
        const emailUidDoc = await getDoc(emailToUidRef);

        let uid: string;

        if (!emailUidDoc.exists()) {
          uid = uuidv4(); //  generate new uid

          await setDoc(emailToUidRef, { uid });
          await setDoc(doc(db, "users", uid), {
            name: user.name || "",
            email: user.email,
            image: user.image || "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          console.log("✅ New user added to Firestore:", uid);
        } else {
          uid = emailUidDoc.data().uid;
          console.log("👤 Existing user:", uid);
        }

        user.id = uid;
        return true;
      } catch (err) {
        console.error("❌ Error in signIn:", err);
        return false;
      }
    },
    async session({ session }) {
      if (!session.user?.email) return session;

      const emailToUidRef = doc(db, "email-to-uid", session.user.email);
      const emailUidDoc = await getDoc(emailToUidRef);

      if (emailUidDoc.exists()) {
        session.user.id = emailUidDoc.data().uid;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
 */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { adminApp } from "@/app/lib/firebaseAdmin";

// Extend session to include custom UID
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const db = getFirestore(adminApp); // ✅ get Firestore instance from adminApp

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const emailToUidDoc = db.collection("email-to-uid").doc(user.email);
        const docSnap = await emailToUidDoc.get();

        let uid: string;

        if (!docSnap.exists) {
          uid = uuidv4();

          await emailToUidDoc.set({ uid });

          await db.collection("users").doc(uid).set({
            name: user.name || "",
            email: user.email,
            image: user.image || "",
            allowResumeSaving: true,
            isEmailverified: true,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            history: {},
            
          });

          console.log("✅ New user created:", uid);
        } else {
          uid = docSnap.data()?.uid;
          console.log("👤 Existing user:", uid);
        }

        user.id = uid;
        return true;
      } catch (err) {
        console.error("❌ signIn error:", err);
        return false;
      }
    },

    async session({ session }) {
      if (!session.user?.email) return session;

      const emailToUidDoc = db.collection("email-to-uid").doc(session.user.email);
      const docSnap = await emailToUidDoc.get();

      if (docSnap.exists) {
        session.user.id = docSnap.data()?.uid;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };

