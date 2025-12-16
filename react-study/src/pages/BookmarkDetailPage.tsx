import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext';
import './BookmarkDetailPage.css';

export const BookmarkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookmarkById, removeBookmark } = useBookmark();
  const navigate = useNavigate();

  const bookmark = id ? getBookmarkById(id) : undefined;

  if (!bookmark) {
    return (
      <div className="bookmark-detail-page">
        <p>ブックマークが見つかりません</p>
        <Link to="/bookmarks">一覧に戻る</Link>
      </div>
    );
  }

  const handleDelete = () => {
    removeBookmark(bookmark.id);
    navigate('/bookmarks');
  };

  const handleTitleClick = () => {
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bookmark-detail-page">
      <h1>ブックマーク詳細</h1>
      <div className="bookmark-detail">
        <div className="detail-item">
          <label>ID</label>
          <div className="detail-value">{bookmark.id}</div>
        </div>
        <div className="detail-item">
          <label>タイトル</label>
          <div className="detail-value">
            <span
              className="detail-title-link"
              onClick={handleTitleClick}
            >
              {bookmark.title}
            </span>
          </div>
        </div>
        <div className="detail-item">
          <label>URL</label>
          <div className="detail-value">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-url-link"
            >
              {bookmark.url}
            </a>
          </div>
        </div>
        <div className="detail-item">
          <label>ノート</label>
          <div className="detail-value">
            {bookmark.note || <span className="no-note">（なし）</span>}
          </div>
        </div>
        <div className="detail-item">
          <label>作成日時</label>
          <div className="detail-value">{formatDate(bookmark.createdAt)}</div>
        </div>
      </div>
      <div className="detail-actions">
        <button onClick={handleDelete} className="delete-btn">
          削除
        </button>
        <Link to="/bookmarks" className="back-link">
          一覧に戻る
        </Link>
      </div>
    </div>
  );
};

