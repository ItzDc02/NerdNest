import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  // estimate reading time
  const words = article.content?.split(/\s+/g).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));

  const createdDate = article.createdAt?.seconds
    ? new Date(article.createdAt.seconds * 1000).toLocaleDateString()
    : "";

  return (
    <Link to={`/article/${article.id}`}>
      <div
        className="rounded border p-4 shadow-sm transition-colors
         bg-white dark:bg-slate-800/60
         border-slate-200 dark:border-slate-700
         hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {article.title}
        </h2>
        <p className="text-sm text-gray-500">
          {createdDate} • {minutes} min read
        </p>
        <p className="text-sm text-gray-500">
          {article.tags?.join(", ") || ""}
        </p>
      </div>
    </Link>
  );
}
