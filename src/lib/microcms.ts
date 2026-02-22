/**
 * microCMS API クライアント
 */

const MICROCMS_SERVICE_DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = import.meta.env.MICROCMS_API_KEY;

if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY) {
  throw new Error(
    'microCMSの環境変数が設定されていません。.envファイルにMICROCMS_SERVICE_DOMAINとMICROCMS_API_KEYを設定してください。'
  );
}

const API_BASE_URL = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1`;

/**
 * microCMS API リクエスト用のヘッダー
 */
const getHeaders = () => ({
  'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
});

/**
 * microCMSからコンテンツを取得
 * @param endpoint - APIエンドポイント（例: 'hero', 'about'）
 * @param queries - クエリパラメータ（オプション）
 * @returns コンテンツデータ
 */
export async function getContent<T = unknown>(
  endpoint: string,
  queries?: Record<string, string | number | boolean>
): Promise<T> {
  const queryString = queries
    ? '?' +
      Object.entries(queries)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  const url = `${API_BASE_URL}/${endpoint}${queryString}`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `microCMS API エラー: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * microCMSからコンテンツ一覧を取得
 * @param endpoint - APIエンドポイント
 * @param queries - クエリパラメータ（オプション）
 * @returns コンテンツ一覧データ
 */
export async function getContents<T = unknown>(
  endpoint: string,
  queries?: Record<string, string | number | boolean>
): Promise<{
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}> {
  const queryString = queries
    ? '?' +
      Object.entries(queries)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  const url = `${API_BASE_URL}/${endpoint}${queryString}`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `microCMS API エラー: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * microCMS画像URLにimgixパラメータを付与してリサイズ・最適化
 * @param url - microCMS画像URL
 * @param width - リサイズ後の幅
 * @param quality - 画質（デフォルト: 80）
 */
export function optimizeImageUrl(url: string, width: number, quality = 80): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}&q=${quality}&fm=webp`;
}

/**
 * microCMSから特定のIDのコンテンツを取得
 * @param endpoint - APIエンドポイント
 * @param contentId - コンテンツID
 * @param queries - クエリパラメータ（オプション）
 * @returns コンテンツデータ
 */
export async function getContentById<T = unknown>(
  endpoint: string,
  contentId: string,
  queries?: Record<string, string | number | boolean>
): Promise<T> {
  const queryString = queries
    ? '?' +
      Object.entries(queries)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  const url = `${API_BASE_URL}/${endpoint}/${contentId}${queryString}`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `microCMS API エラー: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
