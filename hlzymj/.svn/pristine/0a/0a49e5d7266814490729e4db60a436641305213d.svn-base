
import {WeixinManager} from "../../../hall/weixin/WeixinManager";
import {TSCommon} from "../../TSCommon";
var HallResources = require("HallResources");
var freeDiamondLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        
        shareTimes: {
            default: null,
            type: cc.Label,
        },
        shareAllTimes: {
            default: null,
            type: cc.Label,
        },
        shareGetDiamond: {
            default: null,
            type: cc.Label,
        },
        shareMax: {
            default: null,
            type: cc.Label,
        },
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.inviteCount = 0;
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

    initData:function(totalTimes,curTimes,awardAmount)
    {   
        this.canShare = (totalTimes == curTimes);
        this.awardAmount = awardAmount;
        this.shareTimes.string = curTimes;
        this.shareAllTimes.string = "/"+totalTimes;
        this.shareGetDiamond.string = "*"+awardAmount;
        if (curTimes == totalTimes){
            this.shareMax.node.active = true;
        }
    },

    onClickShareToGroup:function(){
        this.closeAndChangeScaleAction();
        this.node.parent.getComponent("HallPlatformInfo").iosShareAddArward(this.awardAmount);
        if (this.canShare)
            TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["分享次数已经达到上限"]);
    },

    clickCloseBtn: function () {
        HallResources.getInstance().playCloseEffect();
        // this.node.active = false;
        this.closeAndChangeScaleAction();
    },

    closeAndChangeScaleAction(){
        var self = this;
        // self.node.active = false;
        var action1 = cc.scaleTo(0.2, 0.3, 0.3);
        var action2 =cc.fadeOut(0.01);
        
        var action3 = cc.callFunc(function(){
            self.node.active = false;
            TSCommon.dispatchEvent(HallResources.onChangeShadow,false);
        });
        var sequence = cc.sequence(action1, action2, action3);
        this.node.runAction(sequence);
    },

    // update (dt) {},
});

module.exports = freeDiamondLayer;