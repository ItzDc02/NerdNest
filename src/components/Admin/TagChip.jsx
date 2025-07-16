export default function TagChip({ text, tag }) {
  const label = text || tag;
  const colors = [
    'bg-blue-600/20 text-blue-700 dark:bg-blue-600/30 dark:text-blue-100',
    'bg-green-600/20 text-green-700 dark:bg-green-600/30 dark:text-green-100',
    'bg-purple-600/20 text-purple-700 dark:bg-purple-600/30 dark:text-purple-100',
    'bg-pink-600/20 text-pink-700 dark:bg-pink-600/30 dark:text-pink-100',
    'bg-orange-600/20 text-orange-700 dark:bg-orange-600/30 dark:text-orange-100',
    'bg-yellow-600/20 text-yellow-700 dark:bg-yellow-600/30 dark:text-yellow-100'
  ];

  // Simple hash to pick a color deterministically
  const hash = label?.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) || 0;
  const colorClass = colors[hash % colors.length];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}>
      {label}
    </span>
  );
}