
import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Settings
 * DateTime = Sun Oct 16 2022 20:50:32 GMT+0800 (中国标准时间)
 * Author = danthought
 * FileBasename = Settings.ts
 * FileBasenameNoExtension = Settings
 * URL = db://assets/scripts/Settings.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Settings')
export class Settings extends Component {
    @property
    private isDebug: boolean = false;

    start () {
        this.showDebug();
    }

    showDebug() {
        if (this.isDebug) {
            PhysicsSystem2D.instance.debugDrawFlags =
                EPhysics2DDrawFlags.Aabb |
                EPhysics2DDrawFlags.Pair |
                EPhysics2DDrawFlags.CenterOfMass |
                EPhysics2DDrawFlags.Joint |
                EPhysics2DDrawFlags.Shape;
        } else {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
