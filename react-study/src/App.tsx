import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { AppLayout } from './layouts/AppLayout';
import { BookmarksListPage } from './pages/BookmarksListPage';
import { NewBookmarkPage } from './pages/NewBookmarkPage';
import { BookmarkDetailPage } from './pages/BookmarkDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/bookmarks" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/bookmarks" element={<BookmarksListPage />} />
            <Route path="/bookmarks/new" element={<NewBookmarkPage />} />
            <Route path="/bookmarks/:id" element={<BookmarkDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
