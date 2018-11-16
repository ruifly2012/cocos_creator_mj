// 客服界面
import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var NativeManager = require("NativeManager");
cc.Class({
    extends: cc.Component,

    properties: {
        weixinLabel1:{
            default:null,
            type:cc.Label,
        },
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
        var color = cc.color(253,255,78,255);
        this.weixinLabel1.node.color = color;
    },

    onTouch: function (event) {
        var poisition = event.touch.getLocation();
        var locationInNode = this.bg.convertToNodeSpace(poisition);
        var s = this.bg.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            // this.node.active = true;
        }
        else {
            // this.node.active = false;
            this.closeAndChangeScaleAction();
        }
    },

    closeAndChangeScaleAction(){
        var self = this;
        // self.node.active = false;
        var action1 = cc.scaleTo(0.2, 0.3, 0.3);
        var action2 =cc.fadeOut(0.01);
        
        var action3 = cc.callFunc(function(){
            self.node.active = false;
            // TSCommon.dispatchEvent(HallResources.onChangeShadow,false);
        });
        var sequence = cc.sequence(action1, action2, action3);
        this.bg.runAction(sequence);
    },

    // 退出按钮点击
    onClickCloseBtn: function(){
        HallResources.getInstance().playCloseEffect();
        this.closeAndChangeScaleAction();
    },

    // 复制按钮1
    onClickCopyBtn1: function(){
        HallResources.getInstance().playCloseEffect();
        var isCopy = NativeManager.getInstance().copyToClipBoard(this.weixinLabel1.string);
        
        // if(isCopy){
        //     HallResources.getInstance().showToast("复制成功");
        // }else{
        //     HallResources.getInstance().showToast("复制失败");
        // }
    },
});
