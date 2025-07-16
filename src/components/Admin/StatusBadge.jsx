export default function StatusBadge({ status }) {
  const common = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap';
  const publishedClass = 'bg-green-600/20 text-green-700 dark:bg-green-600/30 dark:text-green-100';
  const draftClass = 'bg-yellow-600/20 text-yellow-800 dark:bg-yellow-600/30 dark:text-yellow-100';

  return (
    <span className={`${common} ${status ? publishedClass : draftClass}`}>
      {status ? 'Published' : 'Draft'}
    </span>
  );
}