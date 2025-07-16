
import { useEffect, useState } from 'react';
import { FileText, PenTool, Eye, MessageSquare } from 'lucide-react';
import { collection, getCountFromServer, where, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import StatsCard from './StatsCard';

/**
 * StatsBar – displays four metric cards
 */
function StatsBar() {
  const [stats, setStats] = useState({ published: 0, drafts: 0, views: 0, feedback: 0 });

  useEffect(() => {
    (async () => {
      try {
        const publishedSnap = await getCountFromServer(
          query(collection(db, 'articles'), where('published', '==', true))
        );
        const draftSnap = await getCountFromServer(
          query(collection(db, 'articles'), where('published', '==', false))
        );
        let viewsTotal = 0; // placeholder
        const feedbackSnap = await getCountFromServer(collection(db, 'feedback'));

        setStats({
          published: publishedSnap.data().count,
          drafts: draftSnap.data().count,
          views: viewsTotal,
          feedback: feedbackSnap.data().count
        });
      } catch (err) {
        console.error('Stats fetch error', err);
      }
    })();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Published" value={stats.published} icon={<FileText />} color="from-blue-500 to-blue-700" />
      <StatsCard title="Drafts" value={stats.drafts} icon={<PenTool />} color="from-yellow-500 to-yellow-700" />
      <StatsCard title="Views" value={stats.views} icon={<Eye />} color="from-purple-500 to-purple-700" />
      <StatsCard title="Feedback" value={stats.feedback} icon={<MessageSquare />} color="from-green-500 to-green-700" />
    </section>
  );
}

export default StatsBar;
export { StatsBar };
