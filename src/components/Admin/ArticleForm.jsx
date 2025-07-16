
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import MarkdownEditor from './MarkdownEditor';

export default function ArticleForm({ fetchArticles, selected, setSelected, currentUser }) {
  // UI refactor for alignment

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setContent(selected.content);
      setTags(selected.tags?.join(', ') ?? '');
      setPublished(selected.published ?? false);
    } else {
      reset();
    }
  }, [selected]);

  const reset = () => {
    setTitle('');
    setContent('');
    setTags('');
    setPublished(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required.');
      return;
    }

    const payload = {
      title,
      content,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      published,
      updatedAt: serverTimestamp(),
      createdAt: selected?.createdAt || serverTimestamp(),
      author: currentUser?.email ?? 'admin@kb.com'
    };

    try {
      if (selected) {
        // save previous version
        const prevSnap = await getDoc(doc(db, 'articles', selected.id));
        if (prevSnap.exists()) {
          await addDoc(collection(db, 'articles', selected.id, 'revisions'), {
            ...prevSnap.data(),
            savedAt: serverTimestamp(),
            editor: currentUser?.email ?? 'admin@kb.com'
          });
        }

        await updateDoc(doc(db, 'articles', selected.id), payload);
        toast.success('Article updated 👍');
      } else {
        await addDoc(collection(db, 'articles'), payload);
        toast.success('Article created 🚀');
      }
      fetchArticles();
      setSelected(null);
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileRef = ref(storage, `uploads/${uuidv4()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setContent((prev) => prev + `\n![image](${url})\n`);
      toast.success('Image uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const isValid = title.trim() && content.trim();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">

    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{selected ? 'Edit' : 'New'} Article</h2>

      <input
        type="text"
        required
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <MarkdownEditor value={content} setValue={setContent} />

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Upload image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {uploading && <span className="text-xs text-gray-500">Uploading...</span>}
      </div>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <span>Published</span>
      </label>

      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-2 rounded text-white \${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {selected ? 'Update' : 'Create'}
      </button>
    </form>
  </div>
);
}
