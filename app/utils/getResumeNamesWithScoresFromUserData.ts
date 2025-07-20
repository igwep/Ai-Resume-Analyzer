import { UserData } from "@/types/userDataType";
interface ResumeScore {
  resumeName: string;
  score: number;
   createdAt: string; 
}


export const getResumeNamesWithScoresFromUserData = (
  userData: UserData | null
): ResumeScore[] => {
  if (!userData || !userData.history) return [];

  const history = userData.history;
  const summaries: ResumeScore[] = [];

  for (const resumeName in history) {
    const versions = history[resumeName];
    const fileKeys = Object.keys(versions);
    if (fileKeys.length === 0) continue;

    const latestKey = fileKeys[fileKeys.length - 1];
    const latestVersion = versions[latestKey];

    let isoCreatedAt = new Date().toISOString(); // fallback

    if (latestVersion?.createdAt) {
      const parsed = new Date(latestVersion.createdAt);
      if (!isNaN(parsed.getTime())) {
        isoCreatedAt = parsed.toISOString();
      }
    }

    summaries.push({
      resumeName,
      score: latestVersion?.score?.value || 0,
      createdAt: isoCreatedAt,
    });
  }

  return summaries;
};