/**
 * 資源加載參數
 */
export interface AssetLoadOpt {
    /**
     * 資源路徑
     */
    assetPath: string;

    /**
     * bundle名稱
     */
    bundleName?: string;

    /**
     * 是否常駐內存不釋放
     */
    hold?: boolean;
}
