export function getSlashCount(str) {
  let count = 0;
  str.split('/').forEach(s => {
    if (s.length > 0)
      count++;
  });

  return count;
}