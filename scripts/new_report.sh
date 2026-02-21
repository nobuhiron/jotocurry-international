#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DATE="${1:-$(date +%Y%m%d)}"
OUT="docs/delivery-quality-report-${DATE}.md"

if [ -f "$OUT" ]; then
  echo "Report already exists: $OUT" >&2
  exit 1
fi

cat > "$OUT" <<'TEMPLATE'
# 納品前品質チェック報告書 (__DATE__)

## 1. 実行情報
- 実行日: 
- 実行者: 
- 対象ブランチ/コミット: 
- 対象環境: 

## 2. コマンド結果
### 2.1 型・静的診断
- コマンド: `scripts/run_local_checks.sh`
- 結果: PASS / FAIL
- 補足ログ:

### 2.2 ビルド
- コマンド: `pnpm build`
- 結果: PASS / FAIL
- 補足ログ:

## 3. 手動機能チェック（主要5ページ x 2言語）
### 3.1 ja
- [ ] /ja/
- [ ] /ja/brand
- [ ] /ja/franchise
- [ ] /ja/contact
- [ ] /ja/privacy

### 3.2 en
- [ ] /en/
- [ ] /en/brand
- [ ] /en/franchise
- [ ] /en/contact
- [ ] /en/privacy

### 3.3 問い合わせフォーム
- [ ] 必須未入力でエラー表示
- [ ] 正常入力で送信成功表示（実送信なしの安全運用）

## 4. 手動Lighthouse（納品直前1回）
- 対象URL:
  - [ ] /ja/
  - [ ] /ja/contact
  - [ ] /en/
- 閾値:
  - Performance >= 90
  - Accessibility >= 95
  - Best Practices >= 95
  - SEO >= 95
- 測定結果:

## 5. 未解決事項・リスク
- なし / あり（詳細記載）

## 6. 最終判定
- 判定: PASS / FAIL
- 判定理由:
TEMPLATE

sed -i '' "s/__DATE__/${DATE}/g" "$OUT"

echo "Created: $OUT"
