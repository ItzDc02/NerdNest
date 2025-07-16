
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import TagChip from './TagChip';
import StatusBadge from './StatusBadge';
import ActionDropdown from './ActionDropdown';
import { useNavigate } from 'react-router-dom';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const q = query(collection(db, 'articles'), orderBy('updatedAt', 'desc'));
    const snap = await getDocs(q);
    setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this article?')) return;
    await deleteDoc(doc(db, 'articles', id));
    fetchArticles();
    toast.success('Deleted');
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Articles</h2>
        <input
          type="text"
          placeholder="Search articles…"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Updated</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No articles
                </td>
              </tr>
            ) : (
              filtered.map((art) => (
                <tr
                  key={art.id}
                  className="odd:bg-gray-50 even:bg-white dark:odd:bg-zinc-800 dark:even:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{art.title}</td>
                  <td className="p-3 space-x-1">
                    {art.tags?.map((t) => (
                      <TagChip key={t} text={t} />
                    ))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={art.published} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {art.updatedAt
                      ? format(art.updatedAt.toDate(), 'PP')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <ActionDropdown
                      onEdit={() => navigate(`/dashboard/articles/edit/${art.id}`)}
                      onDelete={() => handleDelete(art.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}