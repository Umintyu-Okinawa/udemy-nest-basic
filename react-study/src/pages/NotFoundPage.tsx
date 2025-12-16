import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>ページが見つかりません</p>
      <Link to="/bookmarks" className="home-link">
        一覧に戻る
      </Link>
    </div>
  );
};

