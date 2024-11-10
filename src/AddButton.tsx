import AddIcon from "../assets/inline/icons/add.svg";

import css from "./AddButton.css";
import { FeedsDispatch, useFeedsDispatch } from "./FeedsContext";

function onClick(feedsDispatch: FeedsDispatch): void {
  feedsDispatch({ type: "add", label: "Label" });
}

export default function AddButton() {
  const feedsDispatch = useFeedsDispatch();
  return (
    <button className={css.button} onClick={() => { onClick(feedsDispatch); }}>
      <AddIcon className={css.icon} />
    </button>
  );
}
