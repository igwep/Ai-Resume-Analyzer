interface ResumeScore {
  resumeName: string;
  score: number;
}


export const getResumeNamesWithScoresFromUserData = (
  userData: any
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

    summaries.push({
      resumeName,
      score: latestVersion?.score?.value || 0,
    });
  }

  return summaries;
};