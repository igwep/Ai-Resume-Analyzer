import { getDoc, doc } from "firebase/firestore";
import { db } from "../lib/Firebase";
import { HistoryEntry } from "@/types/userDataType";

export const isFileAlreadyUploaded = async (uid: string, fileHash: string): Promise<boolean> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const history = userData.history || {};

    console.log("User found:", uid);
    console.log("Retrieved history:", history);
    console.log("File hash to compare:", fileHash);

    const result = Object.values(history).some((entry, index) => {
      const storedHash = (entry as HistoryEntry).fileHash;
      console.log(`Comparing with history entry ${index}:`, storedHash);
      return storedHash === fileHash;
    });

    console.log("Match found?", result);
    return result;
  } else {
    console.warn("User not found:", uid);
  }

  return false;
};
