import FeedItem from "./FeedItem";
import { useFeeds } from "./FeedsContext";
import css from "./FeedsList.css";

export default function FeedsList() {
  const feeds = useFeeds();
  return (
    <ul id={css.feedsList}>
      {feeds.map(feed => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </ul>
  );
}
