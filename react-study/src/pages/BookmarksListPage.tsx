import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext';
import { BookmarkListItem } from '../components/BookmarkListItem';
import './BookmarksListPage.css';

export const BookmarksListPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmark();
  const navigate = useNavigate();

  // createdAt降順（新しい順）でソート
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleDelete = (id: string) => {
    removeBookmark(id);
  };

  const handleRowClick = (id: string, event: React.MouseEvent) => {
    // タイトルクリックや削除ボタンクリックの場合は詳細遷移しない
    const target = event.target as HTMLElement;
    if (target.closest('.bookmark-title') || target.closest('.delete-btn')) {
      return;
    }
    navigate(`/bookmarks/${id}`);
  };

  return (
    <div className="bookmarks-list-page">
      <h1>ブックマーク一覧</h1>
      {sortedBookmarks.length === 0 ? (
        <p className="empty-message">ブックマークがありません</p>
      ) : (
        <ul className="bookmark-list">
          {sortedBookmarks.map((bookmark) => (
            <BookmarkListItem
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

