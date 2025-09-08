import { AudioClip, Node } from "cc";
import { SingleObj } from "../singleton/single_obj";
import { SfxPool } from "./sfx_pool";
import { SfxAudio } from "./sfx_audio";

/**
 * 音效模塊
 */
export class SfxModule implements SingleObj {
    /**
     * 名稱
     */
    public get name(): string { return this.constructor.name; }

    /**
     * 音量
     */
    private declare _vol: number;

    /**
     * 音量
     */
    public get vol(): number { return this._vol; }

    /**
     * 音量
     */
    public set vol(value: number) { this._vol = value.limit(0, 1); }

    /**
     * 暫停中
     */
    private declare _paused: boolean;

    /**
     * 暫停中
     */
    public get paused(): boolean { return this._paused; }

    /**
     * 暫停中
     */
    public set paused(value: boolean) { this._paused = value; }

    /**
     * 音效池
     */
    private declare _pool: SfxPool;

    /**
     * 依附的節點
     */
    private _host: Node = null;

    /**
     * 初始化
     * @param owner 音效模塊使用者
     */
    public init(owner: Node) {
        this._host = new Node(this.name);
        owner.addChild(this._host);

        this._pool = new SfxPool();
        this._pool.init(this._host);

        this.vol = 1;
        this._paused = false;
    }

    /**
     * 關閉
     */
    public shutdown(): void {
        this._pool.shutdown();
        this._pool = null;

        this._host.removeFromParent();
        this._host.destroy();
        this._host = null;
    }

    /**
     * 播放
     */
    public async play(clip: AudioClip): Promise<void> {
        if (!clip || this.paused) {
            return;
        }

        let audio = await this._pool.fetch(SfxAudio);
        audio.node.setParent(this._host);
        audio.playOneShot(clip, this._vol);
    }
}
