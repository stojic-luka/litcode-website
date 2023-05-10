import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Editor from "./pages/editor";

export default function App() {
  const [title, setNewTitle] = useState("Ideal Development");

  const setTitle = (newTitle: string) => {
    setNewTitle(newTitle);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)" });
  const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)" });
  const isLaptop = useMediaQuery({ query: "(min-device-width: 1024px)" });
  const isDesktop = useMediaQuery({ query: "(min-device-width: 1200px)" });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1201px )" });

  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<Editor setTitleEvent={setTitle} />} />
      </Routes>
    </Router>
  );
}
