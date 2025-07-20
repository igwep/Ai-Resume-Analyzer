export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"]
  ];

  let unitIndex = 0;
  let time = secondsAgo;

  for (let i = 0; i < intervals.length - 1; i++) {
    if (time < intervals[i][0]) break;
    time /= intervals[i][0];
    unitIndex = i + 1;
  }

  time = Math.floor(time);
  const unit = intervals[unitIndex][1];

  return `${time} ${unit}${time !== 1 ? "s" : ""} ago`;
}
