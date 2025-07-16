
import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';

export default function ActionDropdown({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function clickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-gray-800 border border-gray-700 rounded shadow-lg z-20">
          <button
            className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-700"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            <Edit size={14} /> Edit
          </button>
          <button
            className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <Trash size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
