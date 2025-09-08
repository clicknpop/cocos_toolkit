import { SingleObj } from "./single_obj";

/**
 * 單例種類
 * @summary 用來限制單例物件必須具備以下能力
 */
export interface SingleType<T extends SingleObj> {
    /**
     * 名稱
     */
    name: string;

    /**
     * 實例
     * @summary 當已有實體時不另行建構, 通常在cc.component的單例時使用
     */
    inst?: T;

    /**
     * 建構子
     */
    new(): T;
}
