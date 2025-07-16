
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import MarkdownEditor from '../components/Admin/MarkdownEditor';
import slugify from '../utils/slugify';

export default function NewArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  const handleSave = async (pub = false) => {
    setStatus('Saving...');
    const docRef = await addDoc(collection(db, 'articles'), {
      title,
      slug,
      content,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: pub,
      views: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    setStatus('Saved');
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">New Article</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter your article title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-semibold border-b border-gray-300 focus:outline-none p-2"
      />
      <p className="text-sm text-gray-500">Slug: /article/{slug}</p>

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
