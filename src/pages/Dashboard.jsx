import { useAuth } from "../hooks/useAuth";
import ArticleList from "../components/Admin/ArticleList";

export default function Dashboard() {
    const { user, isAdmin, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!isAdmin) return <p>Access denied</p>;

    return (
        <div className="p-6 w-full  mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <ArticleList />
        </div>
    );
}
