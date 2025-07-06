import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
    return (
        <Link to={`/article/${article.id}`}>
            <div
                className="rounded border p-4 shadow-sm transition-colors
             /* BASE ─────────────── */
             bg-white dark:bg-slate-800/60
             border-slate-200 dark:border-slate-700

             /* HOVER ────────────── */
             hover:bg-slate-50
             dark:hover:bg-slate-700"
            >
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{article.title}</h2>
                <p className="text-sm text-gray-500">{article.tags?.join(", ") || ""}</p>
            </div>
        </Link>
    );
}
