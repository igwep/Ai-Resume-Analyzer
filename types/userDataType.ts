
export interface HistoryEntry {
  id: string; // Unique identifier for the entry
  createdAt: string; // ISO timestamp (or use `Date` if not serialized)

  resumeName: string;
   fileHash?: string; 
  scoreImprovement?: number; 

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

export interface UserData {
  uid: string;
  name: string;
  email: string;
  image?: string;
    history?: Record<string, Record<string, HistoryEntry>>; // Nested object for history
  isEmailverified: boolean;
  allowResumeSaving: boolean;
  createdAt: string | Date;   // Firestore timestamp can be converted to string or Date
  updatedAt: string | Date;
}
