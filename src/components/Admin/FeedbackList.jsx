import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function FeedbackList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-xl font-semibold">User Feedback</h2>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No feedback yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(f => (
            <li key={f.id} className="rounded border border-slate-200 p-3 dark:border-slate-700">
              <p className="text-sm leading-relaxed">{f.message}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(f.createdAt?.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}