import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import FeedbackForm from "../components/Public_page/FeedbackForm";

export default function ArticleView() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const ref = doc(db, "articles", id);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setArticle(snap.data());
            }
        };
        fetch();
    }, [id]);

    if (!article) return <p className="p-6">Loading article...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <p className="text-gray-500">{article.tags?.join(", ") || ""}</p>
            <p className="whitespace-pre-wrap">{article.content}</p>
            <hr />
            <FeedbackForm articleId={id} />
        </div>
    );
}
