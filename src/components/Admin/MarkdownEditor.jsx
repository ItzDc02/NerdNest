
import { useState } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function MarkdownEditor({ value, setValue, onChange }) {
  const [selectedTab, setSelectedTab] = useState('write');
  // Support either prop name
  const handleChange = setValue || onChange;

  return (
    <div className="border rounded-md shadow-sm bg-white dark:bg-zinc-900">
      <ReactMde
        value={value}
        placeholder="Write your article here… (Markdown supported)"
        onChange={handleChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown className="prose dark:prose-invert max-w-none">{markdown}</ReactMarkdown>
          )
        }
        minEditorHeight={400}
        heightUnits="px"
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  );
}
