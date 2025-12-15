import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Page1 from "./pages/bookmarks";
import Page2 from "./pages/bookmarks/new";
import Page3 from "./pages/page3";

function App() {
  return (
    <div>
      <Router>
        {/* ナビゲーションメニュー */}
        <nav>
          <ul>
            <li>
              <Link to="/bookmarks">bookmarks</Link>
            </li>
            <li>
              <Link to="/bookmarks/new">new</Link>
            </li>
            <li>
              <Link to="/page3">Page3</Link>
            </li>
          </ul>
        </nav>

        {/* ルーティングの設定 */}
        <Routes>
          <Route path="/bookmarks" element={<Page1 />} />
          <Route path="/bookmarks/new" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
