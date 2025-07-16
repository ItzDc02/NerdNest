
import { useAuth } from "../hooks/useAuth";
import ArticleList from "../components/Admin/ArticleList";
import { StatsBar } from "../components/Admin/StatsBar";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/dashboard/articles/new"
          className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <StatsBar />
      <ArticleList />
    </div>
  );
}
