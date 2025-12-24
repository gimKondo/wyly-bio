# Project Structure

## Directory Organization

```
wyly-bio/
├── app-web/                    # Webアプリケーション (Next.js)
│   ├── app/                    # App Router ページ・レイアウト
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   └── globals.css         # グローバルスタイル
│   ├── components/             # UIコンポーネント
│   │   ├── ui/                 # 汎用UIコンポーネント (shadcn/ui)
│   │   ├── Feed.tsx            # フィード表示
│   │   ├── PostCard.tsx        # 投稿カード
│   │   ├── PostForm.tsx        # 投稿フォーム
│   │   ├── MapView.tsx         # マップビュー
│   │   ├── MapViewClient.tsx   # マップビュー（クライアント）
│   │   ├── CalendarView.tsx    # カレンダービュー
│   │   ├── ViewSwitcher.tsx    # ビュー切り替え
│   │   └── Header.tsx          # ヘッダー
│   ├── data/                   # データ
│   │   └── mockPosts.ts        # モックデータ
│   ├── hooks/                  # カスタムフック
│   ├── lib/                    # ユーティリティ
│   │   ├── utils.ts            # 汎用ユーティリティ
│   │   └── leaflet.ts          # Leaflet設定
│   ├── types/                  # 型定義
│   │   └── post.ts             # 投稿関連の型
│   └── public/                 # 静的ファイル
├── .spec-workflow/             # 仕様・設計ドキュメント
│   ├── steering/               # ステアリングドキュメント
│   │   ├── product.md          # プロダクト概要
│   │   ├── tech.md             # 技術スタック
│   │   └── structure.md        # プロジェクト構造
│   └── templates/              # テンプレート
└── CLAUDE.md                   # Claude Code設定
```

## Naming Conventions

### Files
- **Components**: `PascalCase.tsx` (例: `PostCard.tsx`, `MapView.tsx`)
- **Pages**: `page.tsx` (App Router規約)
- **Utilities**: `camelCase.ts` (例: `utils.ts`, `leaflet.ts`)
- **Types**: `camelCase.ts` (例: `post.ts`)
- **Data**: `camelCase.ts` (例: `mockPosts.ts`)

### Code
- **Components**: `PascalCase` (例: `PostCard`, `ViewSwitcher`)
- **Functions**: `camelCase` (例: `getMockPosts`, `handleClick`)
- **Constants**: `UPPER_SNAKE_CASE` または `camelCase`
- **Variables**: `camelCase`
- **Interfaces/Types**: `PascalCase` (例: `Post`, `Author`)

## Import Patterns

### Import Order
1. React/Next.js コア
2. 外部ライブラリ
3. 内部コンポーネント (`@/components/`)
4. ユーティリティ (`@/lib/`)
5. 型定義 (`@/types/`)
6. データ (`@/data/`)
7. スタイル

### Module/Package Organization
```typescript
// パスエイリアス使用 (@/ = app-web/)
import { Post } from '@/types/post';
import { Button } from '@/components/ui/button';
import { mockPosts } from '@/data/mockPosts';
```

## Code Structure Patterns

### Component Organization
```typescript
// 1. imports
import { useState } from 'react';
import { Post } from '@/types/post';

// 2. types/interfaces (コンポーネント固有)
interface Props {
  post: Post;
}

// 3. component definition
export function PostCard({ post }: Props) {
  // hooks
  const [isLiked, setIsLiked] = useState(false);

  // handlers
  const handleLike = () => { ... };

  // render
  return ( ... );
}
```

### Server vs Client Components
- **Server Components**: デフォルト、データフェッチやレイアウト
- **Client Components**: `'use client'` ディレクティブ使用、インタラクティブUI
- **地図コンポーネント**: SSR非対応のため `dynamic import` with `ssr: false`

## Code Organization Principles

1. **Single Responsibility**: 各コンポーネントは単一の責務を持つ
2. **Modularity**: 再利用可能な小さなコンポーネントに分割
3. **Colocation**: 関連するファイルは近くに配置
4. **Type Safety**: すべてのpropsと状態に型定義

## Module Boundaries

### コンポーネント階層
- **Page Components**: `app/` 配下、ルーティングとレイアウト
- **Feature Components**: `components/` 直下、機能単位のコンポーネント
- **UI Components**: `components/ui/` 配下、汎用UIパーツ

### データフロー
```
app/page.tsx (Server Component)
    └── components/Feed.tsx (Client Component)
        └── components/PostCard.tsx (Client Component)
            └── components/ui/Button.tsx (Client Component)
```

## Code Size Guidelines

- **コンポーネント**: 200行以内を目安
- **関数**: 50行以内を目安
- **ファイル**: 300行以内を目安
- **ネスト深度**: 最大4レベル

## Documentation Standards

- コンポーネントのPropsには型定義を必須とする
- 複雑なロジックにはインラインコメントを追加
- 公開APIにはJSDocコメントを推奨
