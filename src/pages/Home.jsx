import { useEffect, useState, useMemo } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ArticleCard from "../components/Public_page/ArticleCard";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        };
        fetch();
    }, []);

    const filtered = useMemo(() => {
        return articles.filter((a) =>
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
                {filtered.map(a => (
                    <ArticleCard key={a.id} article={a} />
                ))}
                {!filtered.length && <p>No articles match.</p>}
            </div>

        </section>
    );
}
