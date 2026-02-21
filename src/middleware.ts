import type { MiddlewareHandler } from 'astro';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n';
import type { Locale } from './lib/i18n';

/**
 * 言語判定とリダイレクト処理
 * ルートパス（/）にアクセスした場合、デフォルト言語にリダイレクト
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const urlObj = new URL(request.url);
  const pathname = urlObj.pathname;

  // ルートパス（/）にアクセスした場合、デフォルト言語にリダイレクト
  if (pathname === '/') {
    return new Response(null, {
      status: 307,
      headers: {
        Location: `/${DEFAULT_LOCALE}/`,
      },
    });
  }

  // 言語プレフィックスが含まれているか確認
  const langMatch = pathname.match(/^\/(ja|en)\//);

  const locale = langMatch?.[1] as Locale | undefined;
  if (locale && SUPPORTED_LOCALES.includes(locale)) {
    // 有効な言語プレフィックスが含まれている場合はそのまま処理
    return next();
  }

  // 言語プレフィックスがない場合、デフォルト言語にリダイレクト
  // ただし、静的ファイル（.js, .css, .jpg など）とAstroの内部エンドポイント、APIエンドポイントは除外
  const isStaticFile = /\.(js|css|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|json)$/i.test(pathname);
  const isAstroInternal = pathname.startsWith('/_image') || pathname.startsWith('/_astro') || pathname.startsWith('/@');
  const isApiEndpoint = pathname.startsWith('/api/');

  if (!isStaticFile && !isAstroInternal && !isApiEndpoint) {
    return new Response(null, {
      status: 307,
      headers: {
        Location: `/${DEFAULT_LOCALE}${pathname}`,
      },
    });
  }

  return next();
};
