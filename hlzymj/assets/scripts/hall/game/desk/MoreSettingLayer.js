import {TSCommon} from "../../TSCommon";
var GameCfg = require("GameCfg");
var HallResources = require("HallResources");

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        settingLayer: {
            default: null,
            type: cc.Node,
        },

        helperLayer: {
            default: null,
            type: cc.Node,
        }
    },

    //界面载入
    onLoad: function () {
        this.init();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    init: function () {

        var size = this.bg.getContentSize();

        this.prePos = this.node.getPosition();

        this.node.setPosition(cc.p(this.prePos.x - size.width, this.prePos.y))

        this.settingLayer.active = false;

        this.helperLayer.active = false;
    },

    onTouch: function (event) {
        var point = event.touch.getLocation();
        var convertPoint = this.bg.convertToNodeSpace(point);
        var size = this.bg.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, convertPoint)) {
            this.hide();
        }
    },

    start: function () {

    },


    show: function () {

        this.node.active = true;

        this.node.stopAllActions();

        var self = this;

        //运行动画
        var size = this.bg.getContentSize();

        var destPos = cc.p(this.prePos.x, this.prePos.y);

        var moveTo = cc.moveTo(0.2, destPos);

        this.node.runAction(moveTo);
    },

    hide: function () {
        //运行隐藏动画
        this.node.stopAllActions();

        var self = this;

        var size = this.bg.getContentSize();

        var destPos = cc.p(this.prePos.x - size.width, this.prePos.y);

        var moveTo = cc.moveTo(0.2, destPos);

        var onMoveEnd = function () {
            self.node.active = false;
        }
        var callFunc = cc.callFunc(onMoveEnd, this)

        var sequence = cc.sequence(moveTo, callFunc);

        this.node.runAction(sequence);
    },


    onLeaveClicked: function () {
        HallResources.getInstance().playButtonEffect();
        var DeskScene = this.node.parent.getComponent("DeskScene");
        
        if(DeskScene.getIsPrivateRoom()){
            G.matchGameReady = true;
            G.goldGameReady = null;
        }
        else{
            G.matchGameReady = false;
            // if(DeskScene.IsCXZ()){
            //     G.goldGameReady = 3;
            // }
            // else{
            //     G.goldGameReady = 4;
            // }
        }
        
        // cc.log("onLeaveClicked -----");
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
        this.hide();
    },

    onChangedDeskClicked: function () {
        HallResources.getInstance().playButtonEffect();
        this.hide();
        require('GameLibSink').getInstance().getGameLib().autoSit();
        TSCommon.dispatchEvent(GameCfg.GAME_RESTART, {isReady : false});
    },

    onHelpClicekd: function () {
        HallResources.getInstance().playButtonEffect();
        this.helperLayer.active = true;

        this.hide();
    },

    onRobotClicked: function () {
        HallResources.getInstance().playButtonEffect();
        //如果游戏未开始 则不能托管

        // var sendCMD = require("sendCMD");
        // sendCMD.sendCMD_PO_ROBOTPLAYSTART()
        TSCommon.dispatchEvent(GameCfg.NOTIFICATION_ROBOT, null);
        this.hide();
    },

    onSettingClicked: function () {
        HallResources.getInstance().playButtonEffect();
        this.settingLayer.active = true;
        var action =cc.fadeIn(0.01);
        var action2 = cc.scaleTo(0.2, 1, 1);
        var sequence = cc.sequence(action, action2);
        this.settingLayer.getComponent("gameSetting").bg.runAction(sequence);
        this.hide();
    },

    //设置离开按钮enable属性
    setLeaveBtnEnabled:function(bEnabled){
        this.node.getChildByName("leave_game_btn").getComponent(cc.Button).interactable = bEnabled;
    },

    //设置换桌按enable属性
    setChangedDeskBtnEnabled:function(bEnabled){
        this.node.getChildByName("change_desk_btn").getComponent(cc.Button).interactable = bEnabled;
    },

    //排位赛隐藏按钮，移动按钮
    setIsPrivateRoom:function(bEnabled){
        this.node.getChildByName("leave_game_btn").getComponent(cc.Button).node.active = !bEnabled;
        this.node.getChildByName("change_desk_btn").getComponent(cc.Button).node.active = !bEnabled;
        
        if (bEnabled)
        {
            this.bg.setScaleY(0.4)
            this.node.getChildByName("robot_btn").getComponent(cc.Button).node.y = 213;
            this.node.getChildByName("set_btn").getComponent(cc.Button).node.y = 128;
        }else{
            this.bg.setScaleY(0.8)
        }
    },

});
