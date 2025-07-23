import { useEffect, useState, useMemo } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where
} from "firebase/firestore";
import ArticleCard from "../components/Public_page/ArticleCard";
import SkeletonCard from "../components/Public_page/SkeletonCard";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useAuth(); // custom hook already exists

  useEffect(() => {
    const fetch = async () => {
      const base = collection(db, "articles");
      const q = isAdmin
        ? query(base, orderBy("createdAt", "desc"))
        : query(base, where("published", "==", true), orderBy("createdAt", "desc"));

      try {
        const snap = await getDocs(q);
        setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error loading articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return articles.filter(
      (a) =>
        (a.title + a.content).toLowerCase().includes(search.toLowerCase()) &&
        (tag ? a.tags?.includes(tag) : true)
    );
  }, [articles, search, tag]);

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Articles</h1>

      {/* search + tag */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search…"
          className="w-full flex-1 rounded border px-3 py-2 md:max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          id="tag-select"
          className="rounded border px-3 py-2 form-select w-44 pr-8 dark:bg-slate-800 dark:text-slate-100"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">All tags</option>
          <option value="Outlook">Outlook</option>
          <option value="VPN">VPN</option>
          <option value="Teams">Teams</option>
          <option value="Email">Email</option>
        </select>
      </div>

      <div className="flex flex-col gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading &&
          filtered.map((a) => <ArticleCard key={a.id} article={a} />)}

        {!loading && !filtered.length && <p>No articles match.</p>}
      </div>
    </section>
  );
}
