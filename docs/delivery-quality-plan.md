# 単発納品向け 軽量品質チェック計画（CI/E2E除外）

## 1. 目的
- 単発納品の静的サイトに対して、過剰な自動化を避けつつ、再現可能な品質確認を行う。
- コード/機能面の納品判定を、ローカル手動ゲートとして定義する。

## 2. 合格基準
- 不合格条件はエラーのみ（警告・ヒントは記録）。
- `astro check` エラーなし。
- `astro build` 成功。
- 主要5ページ x 2言語の手動確認完了。
- 問い合わせフォームの必須エラー表示と成功表示の確認完了。

## 3. 実施内容

### 3.1 ローカルコマンドチェック
- `pnpm check:delivery` または `scripts/run_local_checks.sh`

### 3.2 手動機能チェック
- 対象ページ（ja/en）
  - `/`
  - `/brand`
  - `/franchise`
  - `/contact`
  - `/privacy`
- 問い合わせフォーム
  - 必須未入力時のエラー表示
  - 正常入力時の成功表示（実送信なしの安全運用）

### 3.3 手動Lighthouse（納品直前1回）
- 対象: `/ja/`, `/ja/contact`, `/en/`
- 推奨閾値
  - Performance >= 90
  - Accessibility >= 95
  - Best Practices >= 95
  - SEO >= 95

## 4. 記録方式
- `scripts/new_report.sh` で `docs/delivery-quality-report-YYYYMMDD.md` を生成。
- 実行結果、未解決事項、最終PASS/FAILを記録する。

## 5. スコープ外
- デザイン品質の評価
- 翻訳品質の評価
- CI/E2E自動化の導入
