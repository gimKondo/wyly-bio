// Leafletのアイコン設定を修正（Next.jsのパス問題対策）
export const setupLeafletIcons = async () => {
  // ブラウザ環境でのみ実行
  if (typeof window === 'undefined') return;

  try {
    const L = await import('leaflet');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.default.Icon.Default.prototype as any)._getIconUrl;

    L.default.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  } catch (error) {
    console.warn('Failed to setup Leaflet icons:', error);
  }
};

// カスタムマーカーアイコンを作成する関数
export const createCustomIcon = async () => {
  if (typeof window === 'undefined') return null;

  try {
    const L = await import('leaflet');

    return L.default.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  } catch (error) {
    console.warn('Failed to create custom icon:', error);
    return null;
  }
};
