import { MetadataRoute } from 'next';

/**
 * サイトマップ生成（仮実装）
 *
 * TODO: バックエンドAPI連携後、以下を実装する
 * - 投稿詳細ページのURL動的生成
 * - ユーザープロフィールページの追加
 * - lastModifiedをDBの更新日時から取得
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wyly.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
