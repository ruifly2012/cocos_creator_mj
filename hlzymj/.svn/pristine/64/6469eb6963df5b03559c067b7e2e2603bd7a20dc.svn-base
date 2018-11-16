import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var ChangeCardAction = cc.Class({
    extends: cc.Component,

    properties: {
        shunRotateSprite: {
            default: null,
            type: cc.Sprite,
        },
        niRotateSprite: {
            default: null,
            type: cc.Sprite,
        },
        upMoveSprite: {
            default: null,
            type: cc.Sprite,
        },
        downMoveSprite: {
            default: null,
            type: cc.Sprite,
        },
        huanType:{
            default: null,
            type: cc.Sprite,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.showShunRotateAction();
        // this.showNiRotateAction();
        // this.showUpDownMoveAction();
    },
    removeAllRunAction:function()
    {
        this.shunRotateSprite.node.active = false;
        this.niRotateSprite.node.active = false;
        this.upMoveSprite.node.active = false;
        this.downMoveSprite.node.active = false;
    },

    showShunRotateAction:function(func){
        this.removeAllRunAction();
        var self = this;
        this.shunRotateSprite.node.active = true;
        cc.loader.loadRes("game/swap/shunhuaipai", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.huanType.spriteFrame = spriteFrame;
            }
        })

        var action1 =  cc.rotateBy(2, 90);//cc.repeatForever(cc.rotateBy(2, 90));
        var action2 = cc.callFunc(function(){
            func();
        });
        var sequence = cc.sequence(action1, action2);
        this.shunRotateSprite.node.runAction(sequence);
        // this.shunRotateSprite.node.runAction(action1);
    },

    showNiRotateAction:function(func){
        var self = this;
        this.removeAllRunAction();
        this.niRotateSprite.node.active = true;
        cc.loader.loadRes("game/swap/nihuaipai", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.huanType.spriteFrame = spriteFrame;
            }
        })

        var action1 = cc.rotateBy(2, -90);//cc.repeatForever(cc.rotateBy(2, -90));
        var action2 = cc.callFunc(function(){
            func();
        });
        var sequence = cc.sequence(action1, action2);
        this.niRotateSprite.node.runAction(sequence);
        // this.niRotateSprite.node.runAction(action1);
    },

    showUpDownMoveAction:function(func){
        var self = this;
        this.removeAllRunAction();
        this.upMoveSprite.node.active = true;
        this.downMoveSprite.node.active = true;
        cc.loader.loadRes("game/swap/duijia", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.huanType.spriteFrame = spriteFrame;
            }
        })

        var action1 = cc.moveBy(0.5,0,-30);
        var action2 = cc.moveBy(0.5,0,30);
        var sequence = cc.sequence(action1, action2);
        var sequence1 = cc.repeat(sequence,3);
        var action3 = cc.callFunc(function(){
            func();
        });
        var sequence2 = cc.sequence(sequence1, action3);
        this.downMoveSprite.node.runAction(sequence2);

        var action3 = cc.moveBy(0.5,0,30);
        var action4 = cc.moveBy(0.5,0,-30);
        var sequence3 = cc.sequence(action3, action4);
        // var sequence2 = cc.sequence(action3, action4);
        var sequence4 = cc.repeat(sequence3,3);
        this.upMoveSprite.node.runAction(sequence4);
    },
});

module.exports = ChangeCardAction;