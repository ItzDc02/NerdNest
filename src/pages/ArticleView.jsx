import { useParams, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "../lib/firebase";
import ReactMarkdown from "react-markdown";
import slugify from "../utils/slugify";
import FeedbackForm from "../components/Public_page/FeedbackForm";
import { useAuth } from "../hooks/useAuth";

export default function ArticleView() {
  const { id } = useParams();
  const { hash } = useLocation();

  const [article, setArticle] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  // Fetch article
  useEffect(() => {
    (async () => {
      try {
        const ref = doc(db, "articles", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setArticle(data);

          // build TOC
          const headings = [];
          const lines = data.content.split('\n');
          lines.forEach((line) => {
            const match = /^(#{1,6})\s+(.*)/.exec(line);
            if (match && match[1].length <= 3) {
              headings.push({
                level: match[1].length,
                text: match[2],
                slug: slugify(match[2])
              });
            }
          });
          setToc(headings);
        }
      } catch (err) {
        console.error("Error loading article:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Fetch feedback
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const q = query(
          collection(db, "feedback"),
          where("articleId", "==", id),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setFeedback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error loading feedback:", e);
      }
    })();
  }, [id]);

  // Scroll to anchor if hash present after article loads
  useEffect(() => {
    if (!loading && hash) {
      const el = document.getElementById(decodeURIComponent(hash.substring(1)));
      if (el) {
        // slight delay ensures images/fonts don't shift scroll
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [loading, hash]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-10 bg-slate-300 dark:bg-slate-700 mb-4 rounded"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 mb-2 rounded"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 mb-2 rounded"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4">404</h1>
        <p>This article does not exist or is no longer available.</p>
        <Link
          to="/"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  // Reading time
  const words = article.content.split(/\s+/g).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const createdDate = article.createdAt?.seconds
    ? new Date(article.createdAt.seconds * 1000)
    : null;
  const updatedDate = article.updatedAt?.seconds
    ? new Date(article.updatedAt.seconds * 1000)
    : null;

  const Heading = ({ level, children }) => {

    const flatten = (nodes) =>
      React.Children.toArray(nodes)                    // ← converts anything to an array
        .map((n) =>
          typeof n === "string" ? n : flatten(n.props?.children)
        )
        .join("");
    const text = flatten(children);
    const slug = slugify(text);

    const Tag = `h${level}`;
    return (
      <Tag id={slug} className="group scroll-mt-24">
        {children}
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              window.location.href.split("#")[0] + "#" + slug
            )
          }
          className="ml-2 text-xs opacity-0 group-hover:opacity-100"
          aria-label="Copy link"
        >
          🔗
        </button>
      </Tag>
    );
  };

  const components = {
    h1: ({ node, ...props }) => <Heading level={1} {...props} />,
    h2: ({ node, ...props }) => <Heading level={2} {...props} />,
    h3: ({ node, ...props }) => <Heading level={3} {...props} />
  };

  // Helpful vote
  const handleHelpful = async (field) => {
    try {
      const ref = doc(db, "articles", id);
      await updateDoc(ref, {
        [field]: increment(1)
      });
      setArticle((prev) => ({
        ...prev,
        [field]: (prev?.[field] || 0) + 1
      }));
    } catch (err) {
      console.error("Failed to record helpful vote:", err);
    }
  };



  return (
    <div className="grid lg:grid-cols-[auto_250px] gap-12 max-w-5xl mx-auto">
      <article className="prose dark:prose-invert max-w-none">
        <h1>{article.title}</h1>

        <p className="text-sm text-slate-500">
          {createdDate && createdDate.toLocaleDateString()} • {minutes} min read
          {updatedDate &&
            " • Updated " + updatedDate.toLocaleDateString()}
        </p>

        <ReactMarkdown components={components}>{article.content}</ReactMarkdown>

        {/* Helpful toggle */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm font-medium">Was this helpful?</span>
          <button
            onClick={() => handleHelpful("helpfulYes")}
            className="px-3 py-1 rounded border text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            👍 {article.helpfulYes || 0}
          </button>
          <button
            onClick={() => handleHelpful("helpfulNo")}
            className="px-3 py-1 rounded border text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            👎 {article.helpfulNo || 0}
          </button>
        </div>

        {/* Feedback list */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Feedback</h2>
          {feedback.length === 0 ? (
            <p className="text-sm text-slate-500">No feedback yet.</p>
          ) : (
            <ul className="space-y-3">
              {feedback.map((f) => (
                <li key={f.id} className="border rounded p-3">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {f.message}
                  </p>
                  {f.createdAt?.seconds && (
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(f.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Feedback form */}
        <FeedbackForm articleId={id} />
      </article>

      {/* Table of contents */}
      {toc.length > 1 && (
        <aside className="hidden lg:block space-y-2 sticky top-24 self-start">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            On this page
          </h2>
          <ul className="space-y-1">
            {toc.map((h) => (
              <li key={h.slug} className={`ml-${(h.level - 1) * 4}`}>
                <a
                  href={"#" + h.slug}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
