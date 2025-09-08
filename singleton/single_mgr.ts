import { SingleObj } from "./single_obj";
import { SingleType } from "./single_type";

/**
 * 單例管理
 */
export class SingleMgr {
    /**
     * 單例物件列表
     */
    private static _items = new Map<string, SingleObj>();

    /**
     * 生成實例
     * @param type 單例類型 
     * @param params 初始化參數
     */
    static create<T extends SingleObj>(type: SingleType<T>, ...params: any[]): T {
        if (this._items.has(type.name)) {
            console.warn(`single mgr create failed, inst already created.`, type.name);
            return this._items.get(type.name) as T;
        }

        let inst = type.inst ?? new type();
        inst.init && inst.init();
        this._items.set(type.name, inst);
        return inst;
    }

    /**
     * 取得實例
     * @param type 單例種類 
     */
    static get<T extends SingleObj>(type: SingleType<T>): T {
        if (!this._items.has(type.name)) {
            console.warn(`single mgr get failed, inst not create.`, type.name);
            this.create(type);
        }

        return this._items.get(type.name) as T;
    }

    /**
     * 關閉系統
     */
    static shutdown(): void {
        Array.from(this._items.keys()).forEach(name => {
            this.doClose(name);
        }, this);
    }

    /**
     * 關閉單例
     * @param type 單例種類 
     */
    static close<T extends SingleObj>(type: SingleType<T>): void {
        this.doClose(type.name);
    }

    /**
     * 實作關閉單例
     * @param name 單例名稱
     */
    private static doClose(name: string): void {
        let inst = this._items.get(name);

        if (!inst) {
            console.warn(`single mgr do close failed, inst not found.`, name);
            return;
        }

        inst.shutdown && inst.shutdown();
        inst = null;
        this._items.delete(name);
    }
}
