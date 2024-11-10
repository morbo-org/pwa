import ListFilterIcon from "../assets/inline/icons/list_filter.svg";

import css from "./Header.css";

export default function Header() {
  return (
    <div id={css.header}>
      <span className={css.location}>Feeds</span>
      <ListFilterIcon className={css.listFilterIcon} />
    </div>
  );
}
