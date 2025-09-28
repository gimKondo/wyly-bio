---
slug: create-pr
description: 現在のブランチからPRを作成
---

# PR作成コマンド

現在のブランチの変更をpushしてPull Requestを作成します。

## 使用方法
```
/create-pr
```

## 動作内容
1. lint・formatチェックを実行
2. 全ての変更をコミット（必要に応じて複数コミットに分割）
3. リモートにpush
4. issueの内容を参照してPRを作成
5. PR URLを返す

## 前提条件
- `/issue` コマンドでissueベースのブランチが作成済み
- 実装が完了している

## PR内容
- タイトル: issueのタイトルを使用
- 本文:
  - 実装内容の要約
  - 関連issue番号
  - テスト計画（今後追加予定）
