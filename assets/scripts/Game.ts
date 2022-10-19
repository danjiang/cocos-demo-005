
import { _decorator, Component, Node, input, Input, RigidBody2D, Vec2, Collider2D, Contact2DType, Prefab, Vec3, instantiate, Label, Director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Sun Oct 16 2022 21:07:18 GMT+0800 (中国标准时间)
 * Author = danthought
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/scripts/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Game')
export class Game extends Component {

    @property({ type: Node })
    private ballNode: Node = null;

    private bounceSpeed: number = 0;
    private gameState: number = 0;

    @property({ type: Node })
    private blocksNode: Node = null;
    @property({ type: Prefab })
    private blockPrefab: Prefab = null;
    private blockGap: number = 250;
    @property({ type: Label })
    private scoreLabel: Label = null;

    private score: number = 0;

    start () {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

        this.collisionHandler();

        this.ballNode.position = new Vec3(-250, 200, 0);
        this.initBlock();
    }

    update(dt: number) {
        if (this.gameState == 1) {
            this.moveAllBlock(dt);
        }
    }

    moveAllBlock(dt: number) {
        let speed = -300 * dt;

        for (const blockNode of this.blocksNode.children) {
            let pos = blockNode.position.clone();
            pos.x += speed;
            blockNode.position = pos;

            this.checkBlockOut(blockNode);
        }
    }

    getLastBlockPosX() {
        let lastBlockPosX = 0;
        for (const blockNode of this.blocksNode.children) {
            if (blockNode.position.x > lastBlockPosX) {
                lastBlockPosX = blockNode.position.x;
            }
        }
        return lastBlockPosX;
    }

    checkBlockOut(blockNode: Node) {
        if (blockNode.position.x < -400) {
            let nextBlockPosX = this.getLastBlockPosX() + this.blockGap;
            let nextBlockPosY = (Math.random() > .5 ? 1 : -1) * (10 + 40 * Math.random());
            blockNode.position = new Vec3(nextBlockPosX, nextBlockPosY, 0);
            this.incrScore();
        }

        if (this.ballNode.position.y < -700) {
            this.gameState = 2;
            Director.instance.loadScene('Game');
        }
    }

    incrScore() {
        this.score = this.score + 1;
        this.scoreLabel.string = String(this.score);
    }

    collisionHandler() {
        let collider = this.ballNode.getComponent(Collider2D);
        let rigidbody = this.ballNode.getComponent(RigidBody2D);

        collider.on(Contact2DType.BEGIN_CONTACT, () => {
            if (this.bounceSpeed == 0) {
                this.bounceSpeed = Math.abs(rigidbody.linearVelocity.y);
            } else {
                rigidbody.linearVelocity = new Vec2(0, this.bounceSpeed);
            }
        }, this);
    }

    onTouchStart() {
        if (this.bounceSpeed == 0) {
            return;
        }

        let rigidbody = this.ballNode.getComponent(RigidBody2D);
        rigidbody.linearVelocity = new Vec2(0, -this.bounceSpeed *  1.5);
        this.gameState = 1;
    }

    initBlock() {
        let posX: number;

        for (let i = 0; i < 5; i++) {
            if (i == 0) {
                posX = this.ballNode.position.x;
            } else {
                posX = posX + this.blockGap; 
            }
            this.createNewBlock(new Vec3(posX, 0, 0));
        }
    }

    createNewBlock(pos: Vec3) {
        let blockNode = instantiate(this.blockPrefab);
        blockNode.position = pos;
        this.blocksNode.addChild(blockNode);
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
