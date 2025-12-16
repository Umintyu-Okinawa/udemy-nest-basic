import React from 'react';
import { Link } from 'react-router-dom';
import type { Bookmark } from '../types/Bookmark';
import './BookmarkListItem.css';

interface BookmarkListItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  onRowClick: (id: string, event: React.MouseEvent) => void;
}

export const BookmarkListItem: React.FC<BookmarkListItemProps> = ({
  bookmark,
  onDelete,
  onRowClick,
}) => {
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(bookmark.id);
  };

  const truncateUrl = (url: string, maxLength: number = 50): string => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <li
      className="bookmark-item"
      onClick={(e) => onRowClick(bookmark.id, e)}
    >
      <div className="bookmark-content">
        <h3
          className="bookmark-title"
          onClick={handleTitleClick}
        >
          {bookmark.title}
        </h3>
        <p className="bookmark-url">{truncateUrl(bookmark.url)}</p>
        {bookmark.note && (
          <p className="bookmark-note-preview">{bookmark.note}</p>
        )}
      </div>
      <div className="bookmark-actions">
        <Link
          to={`/bookmarks/${bookmark.id}`}
          className="detail-link"
          onClick={(e) => e.stopPropagation()}
        >
          詳細
        </Link>
        <button
          className="delete-btn"
          onClick={handleDeleteClick}
          aria-label="削除"
        >
          削除
        </button>
      </div>
    </li>
  );
};

