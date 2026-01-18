# Wyly

野生生物や自然の観察体験を共有するソーシャルネットワーキングプラットフォーム。

## プロジェクト構成

| サービス | 役割 | 技術 | ポート |
|---------|------|------|--------|
| app-web | Webフロントエンド | Next.js 15 / TypeScript | 23000 |
| app-backend | APIサーバー | Go 1.23 / Echo v4 | 8080 |

## ローカル開発環境のセットアップ

### 前提条件

- Docker / Docker Compose
- Node.js 24.x
- Go 1.23（バックエンド単体開発時）

### 1. 環境変数の設定（オプション）

デフォルト値が設定されているため、設定なしでも動作します。
カスタマイズしたい場合のみ以下を実行してください。

```bash
# ルートディレクトリ（Docker Compose用） - オプション
cp .env.sample .env

# フロントエンド用 - オプション（API接続実装後に使用）
cp app-web/.env.local.sample app-web/.env.local
```

### 2. バックエンド環境の起動（Docker Compose）

```bash
# PostgreSQL + app-backend を起動
docker compose up -d

# ログ確認
docker compose logs -f

# ヘルスチェック
curl http://localhost:8080/health
```

### 3. フロントエンドの起動

```bash
cd app-web
npm install
npm run dev
```

ブラウザで http://localhost:23000 を開く

### 4. 終了

```bash
# フロントエンド: Ctrl+C

# バックエンド環境の停止
docker compose down

# データも削除する場合
docker compose down -v
```

## 開発コマンド

### app-web

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run lint     # リント
npm run format   # フォーマット
```

### app-backend

```bash
make dev         # 開発サーバー起動（Docker不使用時）
make build       # バイナリビルド
make test        # テスト実行
make lint        # リンター実行
make generate    # コード生成（API + DB）
```
