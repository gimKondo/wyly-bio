# Requirements Document: Local Development Integration

## Introduction

app-webとapp-backendを接続するローカル開発環境を構築する。現在app-webはモックデータを使用しているが、app-backendのAPIと連携できるようにすることで、フロントエンド・バックエンド間の統合開発を可能にする。

## Alignment with Product Vision

Wylyは野生生物観察を共有するソーシャルネットワーキングプラットフォームであり、フロントエンドとバックエンドが連携して動作することが必須である。ローカル開発環境での統合開発を可能にすることで、以下を実現する：

- 開発者が実際のAPIを使った機能開発・デバッグを効率的に行える
- フロントエンド・バックエンド間のインテグレーションテストが可能になる
- 本番環境に近い状態での動作確認ができる

## Requirements

### Requirement 1: バックエンド環境の一括起動（Docker Compose）

**User Story:** 開発者として、ローカル環境でPostgreSQLとバックエンドAPIサーバーをdocker composeで一括起動したい。それにより、環境構築の手間を減らし、すぐに開発を開始できる。

#### Acceptance Criteria

1. WHEN 開発者がdocker composeコマンドを実行する THEN システムはPostgreSQLコンテナとapp-backendコンテナを起動する
2. IF データベーススキーマが存在しない THEN システムは初期スキーマを自動適用する
3. WHEN コンテナを停止・再起動する THEN データは永続化され保持される
4. WHEN app-backendコンテナが起動する THEN PostgreSQLコンテナの起動を待ってから接続する（depends_on + healthcheck）
5. WHEN app-backendコンテナが起動する THEN ポート8080でAPIリクエストを受け付ける
6. WHEN フロントエンドからAPIリクエストを受信する THEN システムはCORSを許可し、適切なレスポンスを返す

### Requirement 2: フロントエンドからバックエンドへの接続

**User Story:** 開発者として、フロントエンド（app-web）からバックエンド（app-backend）のAPIを呼び出したい。それにより、実際のデータフローを確認しながら開発できるようになる。

#### Acceptance Criteria

1. WHEN app-webが起動時にAPIベースURLの環境変数が設定されている THEN システムはその環境変数を使ってAPIリクエストを送信する
2. IF 環境変数 `NEXT_PUBLIC_API_URL` が `http://localhost:8080` に設定されている THEN フロントエンドはローカルのバックエンドにリクエストを送信する
3. WHEN APIリクエストを送信する THEN CORSエラーが発生せずレスポンスを受信できる

### Requirement 3: 開発環境の起動手順

**User Story:** 開発者として、シンプルな手順で開発環境全体を起動したい。それにより、開発開始時の手順を簡略化できる。

#### Acceptance Criteria

1. WHEN 開発者がルートディレクトリで `docker compose up` を実行する THEN PostgreSQLとapp-backendが起動する
2. WHEN 開発者がapp-webディレクトリで `npm run dev` を実行する THEN フロントエンドが起動しバックエンドに接続できる
3. WHEN 終了シグナルを受け取る THEN docker composeは全コンテナを適切にシャットダウンする

### Requirement 4: 環境変数の管理

**User Story:** 開発者として、ローカル開発用の環境変数を簡単にセットアップしたい。それにより、設定ミスを減らし、すぐに開発を開始できる。

#### Acceptance Criteria

1. WHEN 新しい開発者がプロジェクトをクローンする THEN `.env.sample` ファイルを参照して環境変数を設定できる
2. IF `.env` ファイルが存在する THEN システムはその値を読み込んで使用する
3. WHEN 必須の環境変数が未設定の場合 THEN システムは明確なエラーメッセージを表示する

## Non-Functional Requirements

### Code Architecture and Modularity
- **Single Responsibility Principle**: 各設定ファイル（docker-compose.yaml、.env.sample等）は単一の目的を持つ
- **Modular Design**: バックエンド、フロントエンド、データベースの設定は独立して管理可能
- **Clear Interfaces**: 環境変数を通じてサービス間の接続情報を明確に定義

### Performance
- ローカル開発環境の起動は30秒以内に完了する
- ホットリロードが有効で、コード変更は即座に反映される

### Security
- 環境変数ファイル（.env）はgitignoreに含まれ、リポジトリにコミットされない
- データベース接続情報は環境変数で管理し、ハードコードしない

### Reliability
- サービスの再起動後もデータが保持される
- ネットワークエラー時に適切なエラーメッセージを表示する

### Usability
- README または開発ガイドに起動手順を明記する
- コマンド一つで開発環境を起動できる
