import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AppLayout.css';

export const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/bookmarks" className="nav-link">
            一覧
          </Link>
          <Link to="/bookmarks/new" className="nav-link">
            新規作成
          </Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

