# Design Document: Local Development Integration

## Overview

app-webとapp-backendを接続するローカル開発環境を構築する。Docker Composeを使用してPostgreSQLとapp-backendを一括起動し、app-webはローカルで`npm run dev`で起動してバックエンドAPIに接続する構成とする。

## Steering Document Alignment

### Technical Standards (tech.md)
- **app-backend**: Go 1.23 / Echo v4、既存のDockerfileを活用
- **app-web**: Next.js 15、環境変数`NEXT_PUBLIC_API_URL`でAPI接続先を設定
- **PostgreSQL**: SQLcによるタイプセーフなDB操作、既存のschema.sqlを使用

### Project Structure (structure.md)
- `docker-compose.yaml`はプロジェクトルートに配置
- 各サービスの`.env.sample`は既存の場所を維持
- ルートに統合用の`.env.sample`を新規作成

## Code Reuse Analysis

### Existing Components to Leverage
- **app-backend/Dockerfile**: マルチステージビルド済み、そのまま使用
- **app-backend/.env.sample**: PORT, DATABASE_URL定義済み
- **app-backend/internal/db/schema.sql**: 既存のDBスキーマを使用

### Integration Points
- **app-backend API**: ポート8080でHTTPリクエストを受け付け
- **PostgreSQL**: DATABASE_URL経由で接続
- **app-web → app-backend**: `NEXT_PUBLIC_API_URL`で接続先を指定

## Architecture

Docker Composeでバックエンド環境（PostgreSQL + app-backend）を構築し、フロントエンドはローカル開発サーバーとして動作する。

```mermaid
graph TD
    subgraph "Docker Compose"
        PG[PostgreSQL<br/>:5432]
        BE[app-backend<br/>:8080]
    end

    subgraph "Local"
        FE[app-web<br/>:23000]
    end

    FE -->|HTTP API| BE
    BE -->|DATABASE_URL| PG
```

### Modular Design Principles
- **Single File Responsibility**: docker-compose.yamlはコンテナ定義のみ、環境変数は.envファイルで管理
- **Service Layer Separation**: DB、バックエンド、フロントエンドは独立して起動・停止可能
- **Utility Modularity**: 各サービスの設定は各ディレクトリに分離

## Components and Interfaces

### Component 1: docker-compose.yaml
- **Purpose:** PostgreSQLとapp-backendコンテナを定義・起動
- **Location:** `/docker-compose.yaml`（プロジェクトルート）
- **Interfaces:**
  - `docker compose up`: 全サービス起動
  - `docker compose down`: 全サービス停止
  - `docker compose logs`: ログ確認
- **Dependencies:** Docker, Docker Compose
- **Reuses:** 既存の`app-backend/Dockerfile`

### Component 2: PostgreSQLコンテナ設定
- **Purpose:** ローカル開発用データベース提供
- **Image:** `postgres:16-alpine`
- **Interfaces:**
  - ポート5432でDB接続受付
  - ボリュームマウントでデータ永続化
  - ヘルスチェックで起動完了を通知
- **Dependencies:** なし

### Component 3: app-backendコンテナ設定
- **Purpose:** APIサーバーをコンテナで起動
- **Interfaces:**
  - ポート8080でHTTPリクエスト受付
  - CORS設定でフロントエンドからのアクセスを許可
- **Dependencies:** PostgreSQLコンテナ（depends_on + healthcheck）
- **Reuses:** 既存の`app-backend/Dockerfile`

### Component 4: 環境変数設定ファイル
- **Purpose:** 各サービスの接続情報を管理
- **Files:**
  - `/.env.sample`: Docker Compose用サンプル
  - `/app-web/.env.local.sample`: フロントエンド用サンプル
- **Interfaces:** 環境変数としてアプリケーションに注入

### Component 5: CORS設定
- **Purpose:** フロントエンドからのAPIアクセスを許可
- **Location:** `app-backend/cmd/server/main.go`またはミドルウェア
- **Interfaces:** `Access-Control-Allow-Origin`ヘッダー設定
- **Reuses:** Echo v4のCORSミドルウェア

## Data Models

### 環境変数（Docker Compose用）
```
# PostgreSQL
POSTGRES_USER=wyly
POSTGRES_PASSWORD=wyly_dev_password
POSTGRES_DB=wyly

# app-backend
PORT=8080
DATABASE_URL=postgres://wyly:wyly_dev_password@postgres:5432/wyly?sslmode=disable
CORS_ALLOWED_ORIGINS=http://localhost:23000
```

### 環境変数（app-web用）
```
# API接続先
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Error Handling

### Error Scenarios
1. **PostgreSQL起動失敗**
   - **Handling:** Docker Composeがエラーログを出力、app-backendは起動しない（depends_on）
   - **User Impact:** `docker compose logs postgres`でエラー確認を促す

2. **app-backend起動失敗（DB接続エラー）**
   - **Handling:** ヘルスチェック失敗として検出、コンテナ再起動
   - **User Impact:** `docker compose logs backend`でエラー確認を促す

3. **CORS エラー（フロントエンドからのAPI呼び出し）**
   - **Handling:** ブラウザコンソールにCORSエラー表示
   - **User Impact:** `CORS_ALLOWED_ORIGINS`環境変数の設定確認を促す

4. **環境変数未設定**
   - **Handling:** 各サービスが起動時にエラーメッセージ出力
   - **User Impact:** `.env.sample`を参照して設定するよう促す

## Testing Strategy

### Unit Testing
- 今回のスコープ外（インフラ設定のため）

### Integration Testing
- Docker Compose起動後、`curl http://localhost:8080/health`でバックエンドのヘルスチェック確認
- ブラウザで`http://localhost:23000`を開き、API接続確認

### End-to-End Testing
- 以下のシナリオを手動確認：
  1. `docker compose up -d`で起動
  2. `npm run dev`でフロントエンド起動
  3. フロントエンドからAPI呼び出しが成功する
  4. `docker compose down`で正常終了
