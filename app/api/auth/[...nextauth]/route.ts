
/* import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { adminApp } from "@/app/lib/firebaseAdmin";
//import { fetchUserData } from "@/app/lib/fetchUserData";

// Extend session to include custom UID
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    idToken?: string;
  }
}

const db = getFirestore(adminApp); //  get Firestore instance from adminApp

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

          console.log(" New user created:", uid);
        } else {
          uid = docSnap.data()?.uid;
          console.log(" Existing user:", uid);

         

        }

        user.id = uid;
        return true;
      } catch (err) {
        console.error(" signIn error:", err);
        return false;
      }
    },
      async jwt({ token, account }) {
    // Add Google ID token to JWT
    if (account?.id_token) {
      token.idToken = account.id_token;
    }
    return token;
  },

  async session({ session, token }) {
    // Expose ID token to client
    if (token.idToken) {
      session.idToken = token.idToken as string;
    }

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

export { handler as GET, handler as POST };  */


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { adminApp } from "@/app/lib/firebaseAdmin";

// Extend session to include Firebase UID and ID token
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    idToken?: string;
  }
}

const db = getFirestore(adminApp);
const auth = getAuth(adminApp);

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
    // On Google sign-in
 async signIn({ user }) {
  if (!user.email) return false;

  try {
    // 1. Check if Firebase Auth user exists
    let fbUser = await auth.getUserByEmail(user.email).catch(() => null);

    // 2. Create user in Firebase Auth if needed
    if (!fbUser) {
      fbUser = await auth.createUser({
        email: user.email,
        displayName: user.name || undefined,
        photoURL: user.image || undefined,
      });
      console.log("Firebase user created:", fbUser.uid);
    } else {
      console.log("Firebase user found:", fbUser.uid);
    }

    // 3. Create Firestore document only if it doesn't exist
    const userRef = db.collection("users").doc(fbUser.uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      await userRef.set({
        name: user.name || "",
        email: user.email,
        image: user.image || "",
        allowResumeSaving: true,
        isEmailverified: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        history: {}, // only when creating for the first time
      });
    } else {
      await userRef.set(
        {
          name: user.name || "",
          email: user.email,
          image: user.image || "",
          updatedAt: Timestamp.now(),
        },
        { merge: true }
      );
    }

    user.id = fbUser.uid;
    return true;
  } catch (err) {
    console.error("signIn error:", err);
    return false;
  }
},

    // Save Google ID token (from NextAuth account object) to JWT
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      return token;
    },

    // Send idToken and Firebase UID to client session
    async session({ session, token }) {
      if (token.idToken) {
        session.idToken = token.idToken as string;
      }

      if (!session.user?.email) return session;

      try {
        const fbUser = await auth.getUserByEmail(session.user.email);
        session.user.id = fbUser.uid;
      } catch (err) {
        console.error(" session error fetching UID:", err);
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
