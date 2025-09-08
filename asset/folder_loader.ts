import { Asset, assetManager, resources } from "cc";
import { AssetLoadOpt } from "./asset_load_opt";

/**
 * 資料夾加載器
 */
export class FolderLoader {
    /**
     * 加載資料夾
     * @param type 資源種類
     * @param opt 加載參數
     */
    async load<T extends Asset>(type: typeof Asset, opt: AssetLoadOpt): Promise<{ path: string, asset: T }[]> {
        return new Promise(resolve => {
            let loader = opt.bundleName ? assetManager.getBundle(opt.bundleName) : resources;

            if (!loader) {
                console.warn(`load folder failed, loader is null.`, type.name, opt.assetPath, opt.bundleName);
                return null;
            }

            loader.loadDir(opt.assetPath, type, (e, assets) => {
                if (e) {
                    console.error(`load folder failed.`, type.name, opt.assetPath, opt.bundleName, e.message);
                    return null;
                }

                let info = loader.getDirWithPath(opt.assetPath, type);
                let res = [];

                assets.forEach((asset, idx) => {
                    res.push({ path: info[idx].path, asset: asset as T });
                });

                resolve(res);
            });
        });
    }
}
