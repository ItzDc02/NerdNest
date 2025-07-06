import { useState } from "react";
import { db } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function FeedbackForm({ articleId }) {
    const [text, setText] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        await addDoc(collection(db, "feedback"), {
            articleId,
            message: text,
            createdAt: serverTimestamp()
        });

        setText("");
        alert("Feedback submitted!");
    };

    return (
        <form onSubmit={submit} className="space-y-2">
            <label className="block font-semibold">Leave Feedback</label>
            <textarea aria-label="Feedback text"
                className="border p-2 w-full form-control"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Was this article helpful?"
            />
            <button className="btn-sky text-sm">
                Submit
            </button>
        </form>
    );
}
