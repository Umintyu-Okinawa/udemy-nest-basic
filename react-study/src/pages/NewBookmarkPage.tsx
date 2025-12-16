import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext';
import { BookmarkForm } from '../components/BookmarkForm';
import './NewBookmarkPage.css';

export const NewBookmarkPage: React.FC = () => {
  const { addBookmark } = useBookmark();
  const navigate = useNavigate();

  const handleSubmit = (data: { title: string; url: string; note?: string }) => {
    addBookmark(data);
    navigate('/bookmarks');
  };

  return (
    <div className="new-bookmark-page">
      <h1>新規ブックマーク作成</h1>
      <BookmarkForm onSubmit={handleSubmit} />
    </div>
  );
};

