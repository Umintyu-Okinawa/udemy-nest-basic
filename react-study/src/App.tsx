import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PageContent from "./pages/bookmarks";
import New from "./pages/bookmarks/new";

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
          </ul>
        </nav>

        {/* ルーティングの設定 */}
        <Routes>
          <Route path="/bookmarks" element={<PageContent />} />
          <Route path="/bookmarks/new" element={<New />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
