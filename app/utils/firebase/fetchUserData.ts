// lib/fetchUserData.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { setUser } from "../../Slices/userSlice";
import { AppDispatch } from "../../Store";

export const fetchUserData = async (uid: string, dispatch: AppDispatch) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnap.data();
    const normalizedData = {
      ...userData,
      uid: uid, // Ensure UID is included
      createdAt: userData.createdAt?.toDate().toISOString() ?? null,
      updatedAt: userData.updatedAt?.toDate().toISOString() ?? null,
    };

    console.log(" User data fetched from Firestore:", normalizedData); //  log it here

    dispatch(setUser(normalizedData));
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
