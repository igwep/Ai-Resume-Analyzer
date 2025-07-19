import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { AppDispatch } from "@/app/Store";
import { setHistoryCount } from "@/app/Slices/userSlice";

/**
 * Updates or adds an entry to the user's history field in Firestore.
 * 
 * @param uid - The user ID
 * @param key - The key inside the history map (e.g., "resume_1")
 * @param value - The value to store (e.g., { score: 80, timestamp: Date.now() })
 */

export interface HistoryEntry{
  resumeName: string;
  score: {
    title: string;
    value: number;
  };
  missingSkills: {
    title: string;
    value: {
      name: string;
      importance: 'high' | 'medium' | 'low';
      note: string;
    }[];
  };
  suggestions: {
    title: string;
    value: string;
  };
  skills: {
    name: string;
    importance: 'high' | 'medium' | 'low';
    note: string;
  }[];

  detailedSuggestions: {
    title: string;
    status: 'critical' | 'improvement' | 'success';
    note: string;
  }[];

}

/* export interface NamedHistoryEntry extends HistoryEntry {
  name: string;
} */

export const updateUserHistory = async (
  uid: string,
  key: string,
  value: HistoryEntry
) => {
  if (!uid) {
    throw new Error("UID is required to update user history.");
  }

  const userRef = doc(db, "users", uid);
  const historyField = `history.${key}`; // dot notation for nested update

  try {
    await updateDoc(userRef, {
      [historyField]: value,
      updatedAt: new Date(),
    });

    console.log("History entry updated.");
  } catch (error) {
    console.error("Error updating history:", error);
    throw error;
  }
};

export const listenToUserHistory = async (uid: string, dispatch: AppDispatch) => {
  const userRef = doc(db, "users", uid);

  // Step 1: Immediately fetch current history
  try {
    const initialSnap = await getDoc(userRef);
    if (initialSnap.exists()) {
      const data = initialSnap.data();
      const history = data.history || {};
      const count = Object.keys(history).length;
      dispatch(setHistoryCount(count));
    } else {
      dispatch(setHistoryCount(0));
    }
  } catch (err) {
    console.error("Error fetching initial history:", err);
    dispatch(setHistoryCount(0));
  }

  // Step 2: Set up real-time listener
  const unsubscribe = onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const history = data.history || {};
      const count = Object.keys(history).length;
      dispatch(setHistoryCount(count));
    } else {
      dispatch(setHistoryCount(0));
    }
  });

  return unsubscribe;
};



