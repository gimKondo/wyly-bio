# Tasks Document: Local Development Integration

- [x] 1. docker-compose.yamlの作成
  - File: /docker-compose.yaml
  - PostgreSQL 16-alpineコンテナの定義（ヘルスチェック、ボリューム永続化）
  - app-backendコンテナの定義（depends_on、ポートマッピング）
  - ネットワーク設定
  - Purpose: Docker Composeでバックエンド環境を一括起動可能にする
  - _Leverage: app-backend/Dockerfile_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer specializing in Docker and container orchestration | Task: Create docker-compose.yaml at project root defining PostgreSQL 16-alpine with healthcheck and volume persistence, and app-backend container with depends_on for proper startup order, following Requirement 1 | Restrictions: Do not modify existing Dockerfile, use environment variables for all configuration values, ensure healthcheck waits for PostgreSQL to be ready before starting backend | _Leverage: app-backend/Dockerfile for backend container build | Success: `docker compose up` starts both containers, PostgreSQL healthcheck passes before backend starts, data persists across container restarts | After completing implementation, mark task 1 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 1 as complete in tasks.md_

- [x] 2. ルート用.env.sampleの作成
  - File: /.env.sample
  - PostgreSQL接続情報（POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB）
  - app-backend設定（PORT, DATABASE_URL, CORS_ALLOWED_ORIGINS）
  - Purpose: 開発者が環境変数を簡単にセットアップできるようにする
  - _Leverage: app-backend/.env.sample_
  - _Requirements: 4_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer | Task: Create .env.sample at project root with PostgreSQL credentials (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) and app-backend settings (PORT, DATABASE_URL with docker network hostname, CORS_ALLOWED_ORIGINS=http://localhost:23000), following Requirement 4 | Restrictions: Use secure but development-friendly default values, ensure DATABASE_URL uses 'postgres' as hostname for docker network, add clear comments for each variable | _Leverage: app-backend/.env.sample for reference | Success: Developers can copy to .env and immediately use with docker compose, all required variables are documented | After completing implementation, mark task 2 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 2 as complete in tasks.md_

- [x] 3. app-backendへのCORS設定追加
  - File: app-backend/cmd/server/main.go または app-backend/internal/middleware/cors.go
  - Echo v4のCORSミドルウェア設定
  - CORS_ALLOWED_ORIGINS環境変数からの許可オリジン読み込み
  - Purpose: フロントエンドからのAPIアクセスを許可する
  - _Leverage: Echo v4 middleware.CORS_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Go Backend Developer | Task: Add CORS middleware to app-backend using Echo v4's middleware.CORSWithConfig, reading allowed origins from CORS_ALLOWED_ORIGINS environment variable, following Requirement 1 acceptance criteria 6 | Restrictions: Do not hardcode origins, support comma-separated multiple origins, allow credentials and common HTTP methods (GET, POST, PUT, DELETE, OPTIONS) | _Leverage: Echo v4 middleware package | Success: Frontend at localhost:23000 can make API requests without CORS errors, CORS headers are properly set in responses | After completing implementation, mark task 3 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 3 as complete in tasks.md_

- [x] 4. app-webの.env.local.sample作成
  - File: app-web/.env.local.sample
  - NEXT_PUBLIC_API_URL=http://localhost:8080
  - Purpose: フロントエンドからバックエンドへの接続設定を提供する
  - _Requirements: 2_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer | Task: Create .env.local.sample in app-web directory with NEXT_PUBLIC_API_URL=http://localhost:8080, following Requirement 2 | Restrictions: Use NEXT_PUBLIC_ prefix for client-side environment variables, add comments explaining usage | _Leverage: Next.js environment variable conventions | Success: Developers can copy to .env.local and frontend will connect to local backend | After completing implementation, mark task 4 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 4 as complete in tasks.md_

- [x] 5. .gitignoreの更新
  - File: /.gitignore, /app-web/.gitignore
  - ルートの.envファイルを追加
  - app-webの.env.localを追加（必要に応じて）
  - Purpose: 環境変数ファイルがリポジトリにコミットされないようにする
  - _Requirements: 4_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer | Task: Update .gitignore files to exclude .env files from version control, following Requirement 4 security requirements | Restrictions: Do not remove existing gitignore entries, only add new patterns | _Leverage: Existing .gitignore patterns | Success: .env files are ignored by git, .env.sample files are still tracked | After completing implementation, mark task 5 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 5 as complete in tasks.md_

- [x] 6. 動作確認とドキュメント更新
  - Files: /README.md または開発ガイド
  - `docker compose up -d`でバックエンド環境起動
  - `npm run dev`でフロントエンド起動
  - APIエンドポイントへのアクセス確認
  - 起動手順をドキュメントに追記
  - Purpose: 開発環境が正しく動作することを確認し、手順を文書化する
  - _Requirements: 3_
  - _Prompt: Implement the task for spec local-dev-integration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Technical Writer / DevOps Engineer | Task: Verify the development environment works correctly and document the setup procedure, following Requirement 3 | Restrictions: Do not create new documentation files, update existing README.md or create a section in it, keep instructions concise | _Leverage: Existing README.md | Success: New developers can follow the documented steps to set up and run the local development environment, `docker compose up` and `npm run dev` work together | After completing implementation, mark task 6 as in-progress in tasks.md before starting, use log-implementation tool to record what was implemented, then mark task 6 as complete in tasks.md_
