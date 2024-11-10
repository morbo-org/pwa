import FeedIcon from "../assets/inline/icons/feed.svg";
import FolderIcon from "../assets/inline/icons/folder.svg";

import css from "./FeedItem.css";
import { Feed } from "./FeedsContext";

interface FeedItemProps {
  feed: Feed;
}

export default function FeedItem({ feed }: FeedItemProps) {
  return (
    <li className={css.feedItem}>
      {feed.type == "feed"
        ? <FeedIcon className={css.icon} />
        : <FolderIcon className={css.icon} /> }
      <span className={css.label}>{feed.label}</span>
      {feed.counter > 0 && (
        <div className={css.counter}>
          <span className={css.number}>
            {feed.counter}
          </span>
        </div>
      )}
    </li>
  );
}
