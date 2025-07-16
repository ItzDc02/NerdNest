
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import MarkdownEditor from '../components/Admin/MarkdownEditor';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    async function fetchArticle() {
      const ref = doc(db, "articles", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags?.join(', ') || '');
        setPublished(data.published || false);
      } else {
        alert("Article not found");
        navigate('/dashboard');
      }
    }
    fetchArticle();
  }, [id]);

  const handleUpdate = async () => {
    setStatus("Saving...");
    const ref = doc(db, "articles", id);
    await updateDoc(ref, {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      published,
      updatedAt: serverTimestamp()
    });
    setStatus("Saved");
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit Article</h2>
        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter your article title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-semibold border-b border-gray-300 focus:outline-none p-2"
      />
      <MarkdownEditor value={content} setValue={setContent} />
      <input
        type="text"
        placeholder="tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>
      <p className="text-sm text-gray-500">Status: {status}</p>
    </div>
  );
}
