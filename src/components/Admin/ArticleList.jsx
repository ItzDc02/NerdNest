import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";
import ArticleForm from "./ArticleForm";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [selected, setSelected] = useState(null); // for editing

    const fetchArticles = async () => {
        const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "articles", id));
        fetchArticles();
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div>
            <ArticleForm fetchArticles={fetchArticles} selected={selected} setSelected={setSelected} />
            <h2 className="text-xl font-semibold mt-10 mb-2">All Articles</h2>
            <table className="w-full table-auto border">
                <thead>
                    <tr>
                        <th className="p-2">Title</th>
                        <th className="p-2">Tags</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((art) => (
                        <tr key={art.id} className="border-t">
                            <td className="p-2">{art.title}</td>
                            <td className="p-2">{art.tags?.join(", ")}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => setSelected(art)} className="text-blue-600">Edit</button>
                                <button onClick={() => handleDelete(art.id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
