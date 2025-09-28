---
slug: issue
description: GitHub issueを読み取って開発ブランチを作成
param: issue番号
---

# Issue読み取りコマンド

指定されたissue番号からGitHub issueの内容を読み取り、開発用ブランチを作成します。

## 使用方法
```
/issue {issue番号}
```

## 動作内容
1. GitHub issueの内容を取得
2. issueのタイトルからブランチ名を生成（feat/issue-{番号}-{簡潔な説明}）
3. mainブランチから新しいブランチを作成してチェックアウト
4. issueの内容を解析して開発タスクを理解

## 例
```
/issue 5
```
→ issue #5の内容を読み取り、`feat/issue-5-xxx`ブランチを作成