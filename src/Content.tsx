import css from "./Content.css";
import FeedsList from "./FeedsList";

export default function Content() {
  return (
    <div id={css.content}>
      <FeedsList />
    </div>
  );
}
