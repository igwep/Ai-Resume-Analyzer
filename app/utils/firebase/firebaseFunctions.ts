import { doc, updateDoc, onSnapshot, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { AppDispatch } from "@/app/Store";
import { setHistoryCount } from "@/app/Slices/userSlice";
import { setUser } from "@/app/Slices/userSlice";

/**
 * Updates or adds an entry to the user's history field in Firestore.
 * 
 * @param uid - The user ID
 * @param key - The key inside the history map (e.g., "resume_1")
 * @param value - The value to store (e.g., { score: 80, timestamp: Date.now() })
 */

export interface HistoryEntry {
  id: string; // Unique identifier for the entry
  createdAt: string; // ISO timestamp (or use `Date` if not serialized)

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


 export interface NamedHistoryEntry extends HistoryEntry {
  name: string;
} 
/* export const updateUserHistory = async (
  uid: string,
  key: string,
  value: HistoryEntry
) => {
  if (!uid) {
    throw new Error('UID is required to update user history.');
  }

  const userRef = doc(db, 'users', uid);
  const id = uuidv4(); // generate a unique id

  const enrichedEntry = {
    ...value,
    id,
    createdAt: new Date().toISOString(), // or use serverTimestamp() for Firestore native
  };

  const historyField = `history.${key}`;

  try {
    await updateDoc(userRef, {
      [historyField]: enrichedEntry,
      updatedAt: serverTimestamp(), // optional field to track user's last update
    });

    console.log('History entry updated with ID and timestamp.');
  } catch (error) {
    console.error('Error updating history:', error);
    throw error;
  }
}; */
export const updateUserHistory = async (
  uid: string,
  key: string,
  value: Record<string, HistoryEntry> // raw object like your example
) => {
  if (!uid) {
    throw new Error("UID is required to update user history.");
  }

  const now = new Date().toISOString(); // ISO string for Firestore safety

  const historyEntry = {
    ...value,
    id: key,
    createdAt: now,
  };

  const userRef = doc(db, "users", uid);
  const historyField = `history.${key}`; // saves as nested: history -> key

  try {
    await updateDoc(userRef, {
      [historyField]: historyEntry,
     // updatedAt: new Date(), // Optional: update parent `updatedAt`
    });

    console.log(" History updated with id and createdAt.");
  } catch (error) {
    console.error(" Error updating history:", error);
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

/* export const listenToUserData = (
  uid: string,
  dispatch: AppDispatch
): (() => void) => {
  const userDocRef = doc(db, "users", uid);

  const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      dispatch(setUser(data));
    }
  });

  return unsubscribe; // Call this function to stop listening
}; */
export const listenToUserData = (
  uid: string,
  dispatch: AppDispatch
): (() => void) => {
  const userDocRef = doc(db, "users", uid);

  const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();

      const safeData = {
        ...data,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null,
        updatedAt: data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : null,
      };

      dispatch(setUser(safeData));
    }
  });

  return unsubscribe;
};

