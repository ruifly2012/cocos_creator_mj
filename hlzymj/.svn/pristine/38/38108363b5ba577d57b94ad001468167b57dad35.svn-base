// 客服小界面
import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var NativeManager = require("NativeManager");
cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default:null,
            type:cc.Node,
        },
    },

    start () {

    },

    //界面载入
    onLoad: function(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onTouch: function (event) {
        var poisition = event.touch.getLocation();
        var locationInNode = this.bg.convertToNodeSpace(poisition);
        var s = this.bg.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
        }
        else {
            this.closeAndChangeScaleAction();
        }
    },

    closeAndChangeScaleAction(){
        var self = this;
        var action1 = cc.scaleTo(0.2, 0.3, 0.3);
        var action2 =cc.fadeOut(0.01);
        
        var action3 = cc.callFunc(function(){
            self.node.active = false;
        });
        var sequence = cc.sequence(action1, action2, action3);
        this.bg.runAction(sequence);
    },

    // 退出按钮点击
    onClickCloseBtn: function(){
        HallResources.getInstance().playCloseEffect();
        this.closeAndChangeScaleAction();
    },

    // 进入微信界面按钮
    onClickGoWxBtn: function(){
        HallResources.getInstance().playCloseEffect();
        if(NativeManager.getInstance().isWeChatPlatform()){
            wx.exitMiniProgram();
        }
    },
});
