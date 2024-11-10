import SettingsIcon from "../assets/inline/icons/settings.svg";

import AddButton from "./AddButton";
import css from "./Footer.css";

export default function Footer() {
  return (
    <div id={css.footer}>
      <SettingsIcon className={css.settingsIcon} />
      <span className={css.updateStatus}>
        Updated 6 hours ago
      </span>
      <AddButton />
    </div>
  );
}
