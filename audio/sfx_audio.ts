import { _decorator, AudioSource, Component, Node } from 'cc';
import { CmptPoolObj } from '../pool/cmpt_pool';

const { ccclass, property } = _decorator;

/**
 * 音效元件
 */
@ccclass
export class SfxAudio extends AudioSource {
    /**
     * 編號
     */
    private _pid: number = -1;

    /**
     * 編號
     */
    public get pid(): number { return this._pid; }

    /**
     * 播畢回調
     */
    public onComplete: (cmpt: SfxAudio) => void = null;

    /**
     * 
     */
    public onLoad(): void {
        this.node.on(AudioSource.EventType.ENDED, this.onDone, this);
    }

    /**
     * 
     */
    public onDestroy(): void { 
        this.node.off(AudioSource.EventType.ENDED, this.onDone, this);
    }

    /**
     * 播放完畢
     */
    public onDone(): void {
        this.onComplete && this.onComplete(this);
    }

    /**
     * 初始化
     * @param id 編號
     */
    public init(id: number): void {
        this.node.name = id.toString();
        this._pid = id;
    }
}
