import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

export default function ArticleForm({ fetchArticles, selected, setSelected }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (selected) {
            setTitle(selected.title);
            setContent(selected.content);
            setTags(selected.tags.join(", "));
        }
    }, [selected]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            content,
            tags: tags.split(",").map(t => t.trim()),
            updatedAt: serverTimestamp(),
            createdAt: selected?.createdAt || serverTimestamp(),
            author: "admin@kb.com" // you can pull from auth.currentUser.email
        };

        if (selected) {
            await updateDoc(doc(db, "articles", selected.id), payload);
            setSelected(null);
        } else {
            await addDoc(collection(db, "articles"), payload);
        }

        setTitle("");
        setContent("");
        setTags("");
        fetchArticles();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold">{selected ? "Edit" : "New"} Article</h2>
            <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                className="border p-2 w-full min-h-[150px] form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tags (comma separated)"
                className="border p-2 w-full form-control"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {selected ? "Update" : "Create"} Article
            </button>
        </form>
    );
}
