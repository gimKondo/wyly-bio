# Technology Stack

## Project Type
野生動物観察を共有するソーシャルネットワーキングWebアプリケーション（PWA対応）

## サービス構成

| サービス | 役割 | 技術 |
|---------|------|------|
| app-web | Webフロントエンド | Next.js 15 / TypeScript |
| app-backend | APIサーバー | Go / Echo |

---

## app-web (フロントエンド)

### Primary Language(s)
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 24.x
- **Package Manager**: npm

### Key Dependencies/Libraries

#### フレームワーク
- **Next.js 15.1.x** (App Router): React フレームワーク、Turbopack による高速開発
- **React 19.x**: UIライブラリ

#### スタイリング
- **Tailwind CSS v4**: ユーティリティファーストCSS
- **@tailwindcss/postcss**: PostCSS統合

#### UIコンポーネント
- **Radix UI**: アクセシブルなヘッドレスUIコンポーネント
  - `@radix-ui/react-avatar`: アバター表示
  - `@radix-ui/react-dropdown-menu`: ドロップダウンメニュー
  - `@radix-ui/react-slot`: コンポーネント合成
  - `@radix-ui/react-tabs`: タブ切り替え
- **Lucide React**: アイコンライブラリ
- **class-variance-authority**: 条件付きクラス管理
- **clsx / tailwind-merge**: クラス名ユーティリティ

#### 地図機能
- **Leaflet 1.9.x**: インタラクティブ地図ライブラリ
- **React Leaflet 5.x**: LeafletのReactラッパー

#### PWA
- **next-pwa**: Next.js用PWAプラグイン

### Application Architecture
- **App Router**: Next.js 15のApp Routerによるファイルベースルーティング
- **Client/Server Components**: React Server Components と Client Components の使い分け
- **コンポーネント駆動**: 再利用可能なUIコンポーネントによる構成
- **モックデータ**: 開発段階ではローカルモックデータを使用

### Data Storage (if applicable)
- **Primary storage**: 現在はモックデータ（将来的にはバックエンドAPI連携予定）
- **Data formats**: TypeScript オブジェクト / JSON

### External Integrations (if applicable)
- **APIs**: 現時点では外部API連携なし（将来的にバックエンド実装予定）
- **地図タイル**: OpenStreetMap

## Development Environment

### Build & Development Tools
- **Build System**: Next.js (Turbopack for development)
- **Package Management**: npm
- **Development workflow**: `npm run dev` (port 23000)

### Code Quality Tools
- **Static Analysis**: ESLint with Next.js config (`eslint-config-next`)
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

### Version Control & Collaboration
- **VCS**: Git
- **Branching Strategy**:
  - `main`: メインブランチ
  - `feat/[機能名]`: フィーチャーブランチ
  - `fix/[修正内容]`: 修正ブランチ
- **Code Review Process**: GitHub Pull Request

## Deployment & Distribution (if applicable)
- **Target Platform(s)**: Web (デスクトップ・モバイルブラウザ)、PWA
- **Distribution Method**: Webホスティング（未定）
- **Installation Requirements**: モダンブラウザ

## Technical Requirements & Constraints

### Performance Requirements
- PWAとしてのオフライン対応（将来実装）
- 地図のスムーズな操作

### Compatibility Requirements
- **Platform Support**: モダンブラウザ（Chrome, Safari, Firefox, Edge）
- **Node.js**: 24.x 以上

### Security & Compliance
- **Security Requirements**:
  - 環境変数による機密情報管理
  - 将来的なユーザー認証実装

## Technical Decisions & Rationale

### Decision Log
1. **Next.js 15 (App Router)**: 最新のReact Server Components対応、Turbopackによる高速開発、SEO対策
2. **Tailwind CSS v4**: 迅速なスタイリング、デザインシステムとの統合性
3. **Radix UI**: アクセシビリティ対応済みのヘッドレスコンポーネント
4. **Leaflet**: 軽量で柔軟な地図ライブラリ、OpenStreetMap無料利用可能
5. **PWA対応**: モバイルでのネイティブアプリ風体験

### Known Limitations
- **リアルタイム更新なし**: WebSocket等のリアルタイム通信は未実装
- **バックエンド連携未実装**: 現在はモックデータを使用

---

## app-backend (バックエンド)

### Primary Language(s)
- **Language**: Go 1.23
- **Framework**: Echo v4

### Key Dependencies/Libraries

#### Webフレームワーク
- **Echo v4.13.x**: 高速・軽量なGoのWebフレームワーク

#### コード生成
- **oapi-codegen**: OpenAPI仕様からGoコードを生成
- **SQLc**: SQLからタイプセーフなGoコードを生成

#### 認証
- **Firebase Auth**: JWT トークンによる認証（予定）

### Application Architecture
- **クリーンアーキテクチャ**: handler → service → db の層構造
- **OpenAPI駆動開発**: API仕様を先に定義し、コードを生成
- **SQLc**: SQLファーストなDB操作、タイプセーフなクエリ

### Data Storage
- **Primary storage**: PostgreSQL
- **Data formats**: JSON (REST API)

### External Integrations
- **Firebase Auth**: JWT認証
- **OpenStreetMap**: 地図タイル（フロントエンド経由）

### Build & Development Tools
- **Build System**: Go build / Makefile
- **Development workflow**: `make dev` (port 8080)
- **Docker**: コンテナ化対応

### Code Quality Tools
- **Static Analysis**: golangci-lint
- **Formatting**: go fmt, goimports

### Development Commands
```bash
make dev            # 開発サーバー起動 (port 8080)
make build          # バイナリビルド
make test           # テスト実行
make lint           # リンター実行
make fmt            # フォーマット
make generate       # コード生成 (API + DB)
make generate-api   # OpenAPIからコード生成
make generate-db    # SQLcでDBコード生成
make docker-build   # Dockerイメージビルド
make tools          # 開発ツールインストール
```

### Known Limitations
- **認証機能未完成**: Firebase Auth連携は実装予定
- **リアルタイム更新なし**: WebSocket等は未実装
