import { _decorator, Component, Node, screen, UITransform, view } from 'cc';

const { ccclass, property, requireComponent, menu } = _decorator;

/**
 * 背景適配
 * @summary 主要是給sprite(背景圖)使用, 讓其可以適應不同螢幕大小
 * @summary 使用此元件須設定成定寬高(show all)模式, 方便元件計算變化
 * @summary https://www.jianshu.com/p/24cba3de1e33
 */
@ccclass
@requireComponent(UITransform)
@menu('cmpts/desktop_adapt')
export class desktop_adapt extends Component {
	/**
	 * 
	 */
	protected onLoad(): void {
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
	private adjust(): void {
		let viewSize = screen.windowSize;
		let viewW = viewSize.width;
		let viewH = viewSize.height;

		let trans = this.node.getComponent(UITransform);

		let scale = Math.min(
			viewW / trans.width,
			viewH / trans.height
		);

		let realW = trans.width * scale;
		let realH = trans.height * scale;

		scale = Math.max(
			viewW / realW,
			viewH / realH
		);

		this.node.setScale(scale, scale);
	}
}
