import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";

function App() {
  return (
    <div>
      <Router>
        {/* ナビゲーションメニュー */}
        <nav>
          <ul>
            <li>
              <Link to="/page1">Page1</Link>
            </li>
            <li>
              <Link to="/page2">Page2</Link>
            </li>
            <li>
              <Link to="/page3">Page3</Link>
            </li>
          </ul>
        </nav>

        {/* ルーティングの設定 */}
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
