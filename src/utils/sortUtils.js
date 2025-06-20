export function classSort(a, b) {
  const normalize = (className) => {
    if (!className) return [Infinity, ''];
    const trimmed = className.trim().toUpperCase();
    const match = trimmed.match(/^(\d{1,2})([A-Z]*)$/);
    if (!match) return [Infinity, ''];
    return [parseInt(match[1]), match[2] || ''];
  };

  const [numA, suffixA] = normalize(a.className);
  const [numB, suffixB] = normalize(b.className);

  if (numA !== numB) return numA - numB;

  return suffixA.localeCompare(suffixB, undefined, { sensitivity: 'base' });
}
