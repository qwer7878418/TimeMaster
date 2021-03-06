const { ccclass, property } = cc._decorator;

@ccclass
export default class TransitionController extends cc.Component {
    @property(cc.Label)
    private message: cc.Label = null;

    @property(cc.Label)
    private hint: cc.Label = null;

    private tween: cc.Tween = null;

    public showGameResult(isWin: boolean) {
        this.node.active = true;
        if (isWin) {
            this.message.string = 'CONGRATULATION';
            this.message.node.color = new cc.Color(255, 153, 0);
        } else {
            this.message.string = 'GAME OVER';
            this.message.node.color = new cc.Color(255, 0, 0);
        }
        cc.tween(this.node)
            .to(2, { opacity: 255 })
            .call(() => {
                this.tween = cc
                    .tween(this.hint.node)
                    .then(cc.tween().to(0.5, { opacity: 255 }).to(0.5, { opacity: 0 }))
                    .repeatForever()
                    .start();
                this.node.once(cc.Node.EventType.TOUCH_END, () => {
                    this.node.opacity = 0;
                    this.node.active = false;
                    this.hint.node.opacity = 0;
                    this.tween.stop();
                    this.node.emit('back');
                });
            })
            .start();
    }
}
