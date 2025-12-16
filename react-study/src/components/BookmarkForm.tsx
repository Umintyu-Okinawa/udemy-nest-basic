import React, { useState } from 'react';
import './BookmarkForm.css';

interface BookmarkFormData {
  title: string;
  url: string;
  note?: string;
}

interface BookmarkFormErrors {
  title?: string;
  url?: string;
  note?: string;
}

interface BookmarkFormProps {
  onSubmit: (data: BookmarkFormData) => void;
  initialData?: BookmarkFormData;
}

export const BookmarkForm: React.FC<BookmarkFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<BookmarkFormData>(
    initialData || { title: '', url: '', note: '' }
  );
  const [errors, setErrors] = useState<BookmarkFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateTitle = (title: string): string | undefined => {
    if (!title.trim()) {
      return 'タイトルは必須です';
    }
    if (title.length < 1 || title.length > 50) {
      return 'タイトルは1文字以上50文字以下で入力してください';
    }
    return undefined;
  };

  const validateUrl = (url: string): string | undefined => {
    if (!url.trim()) {
      return 'URLは必須です';
    }
    try {
      const urlObj = new URL(url);
      if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        return 'URLはhttpまたはhttpsで始まる必要があります';
      }
    } catch {
      return '有効なURL形式で入力してください';
    }
    return undefined;
  };

  const validateNote = (note: string): string | undefined => {
    if (note && note.length > 300) {
      return 'ノートは300文字以下で入力してください';
    }
    return undefined;
  };

  const validate = (): boolean => {
    const newErrors: BookmarkFormErrors = {};
    const titleError = validateTitle(formData.title);
    const urlError = validateUrl(formData.url);
    const noteError = validateNote(formData.note || '');

    if (titleError) newErrors.title = titleError;
    if (urlError) newErrors.url = urlError;
    if (noteError) newErrors.note = noteError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 入力中のバリデーション（一度触れたフィールドのみ）
    if (touched[name]) {
      let error: string | undefined;
      if (name === 'title') {
        error = validateTitle(value);
      } else if (name === 'url') {
        error = validateUrl(value);
      } else if (name === 'note') {
        error = validateNote(value);
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // バリデーション実行
    let error: string | undefined;
    if (name === 'title') {
      error = validateTitle(formData.title);
    } else if (name === 'url') {
      error = validateUrl(formData.url);
    } else if (name === 'note') {
      error = validateNote(formData.note || '');
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // すべてのフィールドをtouchedにする
    setTouched({ title: true, url: true, note: true });

    if (validate()) {
      onSubmit({
        title: formData.title.trim(),
        url: formData.url.trim(),
        note: formData.note?.trim() || undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bookmark-form">
      <div className="form-group">
        <label htmlFor="title">
          タイトル <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'error' : ''}
          maxLength={50}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="url">
          URL <span className="required">*</span>
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.url ? 'error' : ''}
        />
        {errors.url && <span className="error-message">{errors.url}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="note">ノート（任意）</label>
        <textarea
          id="note"
          name="note"
          value={formData.note || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.note ? 'error' : ''}
          rows={4}
          maxLength={300}
        />
        <div className="char-count">
          {formData.note?.length || 0} / 300
        </div>
        {errors.note && <span className="error-message">{errors.note}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          作成
        </button>
      </div>
    </form>
  );
};

