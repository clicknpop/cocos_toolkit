import { _decorator, Component, Node, screen, UITransform, view } from 'cc';

const { ccclass, property, requireComponent, menu } = _decorator;

/**
 * 內容物適配
 * @summary 主要是給cc.widget使用, 讓其可以適應不同螢幕大小
 * @summary 使用此元件須設定成定寬高(show all)模式, 方便元件計算變化
 * @summary https://www.jianshu.com/p/738a8f6a2ec1
 */
@ccclass
@requireComponent(UITransform)
@menu('客製化/內容物適配')
export class ContainAdapt extends Component {
	/**
	 * 初始寬
	 */
	private _initW: number = 0;

	/**
	 * 初始高
	 */
	private _initH: number = 0;

	/**
	 * 
	 */
	protected onLoad(): void {
		let trans = this.node.getComponent(UITransform);
		this._initW = trans.width;
		this._initH = trans.height;

		this.adjust();

		screen.on(`window-resize`, this.adjust, this);
		screen.on(`orientation-change`, this.adjust, this);
		screen.on(`fullscreen-change`, this.adjust, this);
		view.on(`canvas-resize`, this.adjust, this);
	}

	/**
	 * 
	 */
	protected onDestroy(): void {
		screen.off(`window-resize`, this.adjust, this);
		screen.off(`orientation-change`, this.adjust, this);
		screen.off(`fullscreen-change`, this.adjust, this);
		view.off(`canvas-resize`, this.adjust, this);
	}

	/**
	 * 調整
	 */
	protected adjust(): void {
		let viewSize = screen.windowSize;
		let viewW = viewSize.width;
		let viewH = viewSize.height;

		let scale = Math.min(
			viewW / this._initW, 
			viewH / this._initH
		);

		let realW = this._initW * scale;
		let realH = this._initH * scale;

		let trans = this.node.getComponent(UITransform);
		trans.width = this._initW * (viewW / realW);
		trans.height = this._initH * (viewH / realH);
	}
}