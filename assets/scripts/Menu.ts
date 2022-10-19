
import { _decorator, Component, Node, find, Button, Director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Menu
 * DateTime = Mon Oct 17 2022 21:30:10 GMT+0800 (中国标准时间)
 * Author = danthought
 * FileBasename = Menu.ts
 * FileBasenameNoExtension = Menu
 * URL = db://assets/scripts/Menu.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Menu')
export class Menu extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        let btnNode = find('/Canvas/bg/startBtn');
        console.log("btnNode = " + btnNode);
        btnNode.on(Button.EventType.CLICK, this.gameStart, this);
    }

    gameStart() {
        Director.instance.loadScene('Game');
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
