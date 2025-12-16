# ブックマーク管理アプリ（MVP）

React + TypeScriptで実装されたブックマーク管理アプリケーションです。

## 技術スタック

- React 19.2.3
- TypeScript 4.9.5
- React Router (react-router-dom)
- useContext（状態管理、メモリのみ）

## 起動手順

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm start
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 仕様

### データ型

```typescript
type Bookmark = {
  id: string;
  title: string;
  url: string;
  note?: string;
  createdAt: string; // ISO string
};
```

### ルーティング

- `/` → `/bookmarks` にリダイレクト
- `/bookmarks` → ブックマーク一覧
- `/bookmarks/new` → 新規作成
- `/bookmarks/:id` → 詳細表示
- その他 → 404 Not Found

### 機能

#### 1. 新規作成
- タイトル（必須、1-50文字）
- URL（必須、http/https形式）
- ノート（任意、0-300文字）
- バリデーション：送信時＋入力中（一度触れたフィールドのみ）

#### 2. 一覧
- 作成日時降順（新しい順）で表示
- タイトルクリックで外部URLを別タブで安全に開く（`target="_blank" rel="noopener noreferrer"`）
- 削除ボタンで即削除
- 行クリックまたは「詳細」リンクで詳細ページへ遷移

#### 3. 詳細
- ID、タイトル、URL、ノート、作成日時を表示
- 削除可能（削除後は一覧に戻る）

#### 4. グローバルメニュー
- 常時表示のヘッダー
- 「一覧」「新規作成」リンク

### 状態管理

- useContextを使用（メモリのみ、永続化なし）
- ページ遷移しても状態は保持される（SPA内）

### セキュリティ

- 外部リンクは必ず `target="_blank" rel="noopener noreferrer"` を使用

## ディレクトリ構成

```
src/
├── components/
│   ├── BookmarkForm.tsx          # フォーム＋バリデーション
│   ├── BookmarkForm.css
│   ├── BookmarkListItem.tsx      # 一覧アイテム
│   └── BookmarkListItem.css
├── contexts/
│   └── BookmarkContext.tsx       # 状態管理Context
├── layouts/
│   ├── AppLayout.tsx             # レイアウト（Header + Outlet）
│   └── AppLayout.css
├── pages/
│   ├── BookmarksListPage.tsx     # 一覧ページ
│   ├── BookmarksListPage.css
│   ├── NewBookmarkPage.tsx       # 新規作成ページ
│   ├── NewBookmarkPage.css
│   ├── BookmarkDetailPage.tsx   # 詳細ページ
│   ├── BookmarkDetailPage.css
│   ├── NotFoundPage.tsx          # 404ページ
│   └── NotFoundPage.css
├── types/
│   └── Bookmark.ts               # 型定義
├── App.tsx                        # ルーティング設定
└── index.tsx                      # エントリーポイント
```

## 手動テスト手順

1. **新規作成のバリデーション**
   - タイトル未入力で送信 → エラー表示
   - タイトル51文字以上で送信 → エラー表示
   - URL未入力で送信 → エラー表示
   - 無効なURL形式で送信 → エラー表示
   - ノート301文字以上で送信 → エラー表示
   - すべて有効な値で送信 → 一覧ページに遷移

2. **一覧表示**
   - 作成したブックマークが新しい順で表示されることを確認
   - タイトルクリックで外部URLが別タブで開くことを確認
   - 行クリックで詳細ページに遷移することを確認
   - 「詳細」リンクで詳細ページに遷移することを確認

3. **削除機能**
   - 一覧ページで削除ボタンをクリック → 即削除されることを確認
   - 詳細ページで削除ボタンをクリック → 削除され一覧に戻ることを確認

4. **詳細表示**
   - 詳細ページで全情報（ID、タイトル、URL、ノート、作成日時）が表示されることを確認
   - タイトルクリックで外部URLが別タブで開くことを確認

5. **状態保持**
   - ブックマークを作成後、ページ遷移しても状態が保持されることを確認
   - ブラウザをリロードすると状態がリセットされることを確認（メモリのみのため）

6. **ルーティング**
   - `/` にアクセス → `/bookmarks` にリダイレクトされることを確認
   - 存在しないパスにアクセス → 404ページが表示されることを確認

7. **グローバルメニュー**
   - すべてのページでヘッダーが表示されることを確認
   - 「一覧」「新規作成」リンクが機能することを確認

8. **イベント競合の確認**
   - 一覧ページでタイトルをクリック → 外部URLが開き、詳細ページに遷移しないことを確認
   - 一覧ページで行の空白部分をクリック → 詳細ページに遷移することを確認
