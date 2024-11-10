import css from "./App.css";
import Content from "./Content";
import { FeedsProvider } from "./FeedsContext";
import Footer from "./Footer";
import Header from "./Header";

export default function App() {
  return (
    <div id={css.app}>
      <FeedsProvider>
        <Header />
        <Content />
        <Footer />
      </FeedsProvider>
    </div>
  );
}
