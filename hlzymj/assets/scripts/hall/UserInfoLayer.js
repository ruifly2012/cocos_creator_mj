import {WeixinManager} from "../hall/weixin/WeixinManager";
import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var UserInfoLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        headIcon: {
            default: null,
            type: cc.Sprite
        },

        nameText: {
            default: null,
            type: cc.Label
        },

        id: {
            default: null,
            type: cc.Label
        },

        totalMatch: {
            default: null,
            type: cc.Label
        },

        highestWinningStreak: {
            default: null,
            type: cc.Label
        },

        winningrate: {
            default: null,
            type: cc.Label
        },

        playerId:{
            default: null,
            type: cc.Label,
        },
        playerName:{
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var self = this;

        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        this.playerId.string = "ID："+publicUserInfo.userDBID;
        this.playerName.string = "昵称："+publicUserInfo.nickName;

       //if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            var weixinUserInfo = WeixinManager.getInstance().userInfo;
            if(weixinUserInfo && weixinUserInfo.avatarUrl){
                var imgurl=weixinUserInfo.avatarUrl+"?aaa=aa.jpg";
                cc.loader.load(imgurl, function(err, texture){
                    self.headIcon.spriteFrame = new cc.SpriteFrame(texture);
                    // self.headIcon.node.setScale(0.9);
                
                });
            }
        },
   
   // },

    onTouch: function (event) {
        var poisition = event.touch.getLocation();
        var locationInNode = this.bg.convertToNodeSpace(poisition);
        var s = this.bg.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            // this.node.active = true;
        }
        else {
            event.stopPropagation();
            // this.node.active = false;
            this.closeAndChangeScaleAction();
        }
    },

    start: function () {

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

    clickCloseBtn: function () {
        HallResources.getInstance().playCloseEffect();
        this.closeAndChangeScaleAction();
        // this.node.active = false;
    },

    initData: function (totalCount,continueWinCount,winRate) {
        this.totalMatch.string = totalCount;
        this.highestWinningStreak.string = continueWinCount;
        this.winningrate.string = winRate + "%";
    },

    clickShowRankBtn: function () {
        this.node.active = false;
        
        // TSCommon.dispatchEvent(HallResources.onChangeShadow,false);
        this.node.parent.getComponent("HallPlatformInfo").onClicShrinkBtn();
    },
    // update (dt) {},
});

module.exports = UserInfoLayer;