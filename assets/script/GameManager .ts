import MenuController from './Menu/MenuController';
import MainMenuController from './Menu/MainMenuController';
import TransitionController from './TransitionController';
import CameraController from './CameraController';
import PlayerManager from './Player/PlayerManager';
import SceneManager from './Scene/SceneManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    @property(cc.Node)
    private gameStage: cc.Node = null;

    @property(MainMenuController)
    private mainMenu: MainMenuController = null;

    @property(MenuController)
    private menu: MenuController = null;

    @property(PlayerManager)
    private player: PlayerManager = null;

    @property(CameraController)
    private camera: CameraController = null;

    @property(SceneManager)
    private scene: SceneManager = null;

    @property(TransitionController)
    private transition: TransitionController = null;

    private playerPosition: cc.Vec2[] = [new cc.Vec2(-517, -168)];

    onLoad() {
        this.menu.node.on('back', () => {
            this.initStage();
            this.mainMenu.node.active = true;
        });
        this.transition.node.on('back', () => {
            this.initStage();
            this.mainMenu.node.active = true;
        });
        this.player.node.on('dead', () => {
            this.transition.showGameResult(false);
        });
        this.player.node.on('success', () => {
            this.transition.showGameResult(true);
        });
    }

    private initStage(idx: number = 0) {
        this.player.reset(this.playerPosition[idx]);
        this.camera.reset();
        this.scene.reset();
        // monster reset
    }
}
