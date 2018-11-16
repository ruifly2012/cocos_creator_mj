
var GameCfg = require("GameCfg");
import { TSCommon } from "../../TSCommon";
var sendCMD = require("sendCMD");
cc.Class({
    extends: cc.Component,

    properties: {

        moreBtn: {
            default: null,
            type: cc.Button,
        },

        chatBtn: {
            default: null,
            type: cc.Button,
        },

        autoHuBtn: {
            default: null,
            type: cc.Button,
        },

        startGameBtn: {
            default: null,
            type: cc.Button,
        },

        gameInfoToggle: {
            default: null,
            type: cc.Node,
        },

        laiziInfo: {
            default: null,
            type: cc.Node,
        },

        settingLayer: {
            default: null,
            type: cc.Node,
        },

        chattingLayer: {
            default: null,
            type: cc.Node,
        },

        buttonAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        }

    },

    onLoad: function () {

        this.laiziInfo.active = false;

        TSCommon.addEvent(GameCfg.sendChatEnd, this.onSendChatEnd, this);

        this.init();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    init: function () {
        this.m_autoHuPrePos = this.autoHuBtn.node.getPosition();

        this.autoHuBtn.node.setPosition(cc.p(this.m_autoHuPrePos.x + 350, this.m_autoHuPrePos.y));
    },


    onTouch: function (event) {
        var pos = event.touch.getLocation();
        var convertPos = this.laiziInfo.getChildByName("info_bg").convertToNodeSpace(pos);
        var size = this.laiziInfo.getChildByName("info_bg").getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, convertPos)) {
            this.laiziInfo.active = false;
        }
    },

    onDisable: function () {
        TSCommon.removeEvent(GameCfg.sendChatEnd, this.onSendChatEnd, this);
    },

    //点击开始按钮
    onStartBtnClicked: function () {
        
        var startGame =  function(){
            require("sendCMD").sendCMD_PO_RESTART();
        }
        if (this.m_onStartCallBack) {
            this.m_onStartCallBack(startGame);
        }
        else{
            startGame();
        }

        //记录日志
        var HallResources = require("HallResources");
        HallResources.recordPlayerLogToServer(HallResources.recordList.click_ready);
    },

    onMoreBtnClicked: function () {
        TSCommon.dispatchEvent(require("HallResources").onHideSendGiftToPLayer,true);
        var HallResources = require("HallResources");
        HallResources.getInstance().playButtonEffect();
        this.settingLayer.getComponent("MoreSettingLayer").show();
    },

    onChatBtnClicked: function () {
        var HallResources = require("HallResources");
        HallResources.getInstance().playButtonEffect();
        this.chattingLayer.getComponent("Chatting").show();
    },

    onGameInfoBgClicked: function (event) {
        this.gameInfoToggle.getComponent(cc.Toggle).isChecked = !this.gameInfoToggle.getComponent(cc.Toggle).isChecked;

        var parent = this.gameInfoToggle.parent;

        var gameInfoLayer = parent.getChildByName("base_info_bg");

        if (this.gameInfoToggle.getComponent(cc.Toggle).isChecked) {
            this.gameInfoToggle.getChildByName("Background").active = false;
            gameInfoLayer.active = true;
        }
        else {
            this.gameInfoToggle.getChildByName("Background").active = true;
            gameInfoLayer.active = false;
        }
    },


    onShowGameInfoClicked: function (event) {

        var parent = this.gameInfoToggle.parent;

        var gameInfoLayer = parent.getChildByName("base_info_bg");

        if (this.gameInfoToggle.getComponent(cc.Toggle).isChecked) {
            this.gameInfoToggle.getChildByName("Background").active = false;
            gameInfoLayer.active = true;
        }
        else {
            this.gameInfoToggle.getChildByName("Background").active = true;
            gameInfoLayer.active = false;
        }
    },


    //癞子牌点击的情况
    onLaiziImgClicked: function () {
        this.laiziInfo.active = true;
    },

    onCancelRobotClicked: function () {
        if (this.m_onCancelRobotCallBack) {
            this.m_onCancelRobotCallBack();
        }
        sendCMD.sendCMD_PO_ROBOTPLAYCANCEL()
    },

    //过按钮点击
    onGuoBtnClicked: function (event) {
        sendCMD.sendCMD_PO_PASS()
        if (this.m_onGuoCallBack) {
            this.m_onGuoCallBack()
        }
        this.setAllOperateButtonIsVis(false)
    },

    onChiBtnClicked: function (event) {

        if (this.m_onChiCallback) {
            this.m_onChiCallback();
        }
        this.setAllOperateButtonIsVis(false);
    },

    onGangBtnClicked: function (event) {

        if (this.m_onGangCallBack) {
            this.m_onGangCallBack();
        }
        this.setAllOperateButtonIsVis(false);
    },

    onChaoTianBtnClicked: function (event) {
        if (this.m_onChaotianCallBack) {
            this.m_onChaotianCallBack();
        }
        this.setAllOperateButtonIsVis(false);
    },

    onPengBtnClicked: function (event) {
        sendCMD.sendCMD_PO_PENG()
        this.setAllOperateButtonIsVis(false)
    },

    onHuBtnClicked: function (event) {
        var HallResources = require("HallResources");
        console.log("点击胡牌按钮的系统时间："+HallResources.getInstance().printNowTimes());
        // this.stopHuAct();
        sendCMD.sendCMD_PO_HU()
        this.setAllOperateButtonIsVis(false)
    },

    onZiMoBtnClicked: function (event) {
        this.stopZiMoAct();
        sendCMD.sendCMD_PO_HU()
        this.setAllOperateButtonIsVis(false);
    },

    autoHuBtnShow: function () {
        var moveTo = cc.moveTo(0.2, this.m_autoHuPrePos);
        this.autoHuBtn.node.runAction(moveTo);
    },

    //点击自动胡牌
    onAutoHuClicked: function () {

    },

    onSendChatEnd: function () {

        this.chatBtn.interactable = false;
        var animationComponent = this.chatBtn.getComponent(cc.Animation)
        animationComponent.play("quickChatTimer");

        var self = this;
        var onPlayAnimationEnd = function () {
            self.chatBtn.interactable = true;
            cc.log("end");
        };

        animationComponent.on('finished', onPlayAnimationEnd, this);
    },

    //设定所有的操作按钮的可见性
    setAllOperateButtonIsVis: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        for (var i = 0; i < operateNodes.childrenCount; i++) {

            operateNodes.children[i].active = bIsVisible;
        }

    },

    setGuoBtnVisible: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_guo_btn").active = bIsVisible;

        this.autoAdjustPos();
    },

    setChiBtnVisible: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_chi_btn").active = bIsVisible;

        this.autoAdjustPos();
    },

    setPengBtnVisible: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_peng_btn").active = bIsVisible;

        this.autoAdjustPos(4);
    },

    setGangBtnVisible: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_gang_btn").active = bIsVisible;

        this.autoAdjustPos(3);
    },

    setChaoTianBtnVisible: function (bIsVisible) {
        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_chaotian_btn").active = bIsVisible;

        this.autoAdjustPos();
    },

    setHuBtnVisible: function (bIsVisible) {

        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_hu_btn").active = bIsVisible;

        this.autoAdjustPos(1);
        
    },

    startGangAct:function(posX){
        var self = this;
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("gang_act");
        var strAniName = '3gang';
        whosTurnNode.active = true;
        whosTurnNode.x = posX;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    stopGangAct:function(){
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("gang_act");
        whosTurnNode.active = false;

    },

    startPengAct:function(posX){
        var self = this;
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("peng_act");
        var strAniName = '1pen';
        whosTurnNode.active = true;
        whosTurnNode.x = posX;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    stopPengAct:function(){
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("peng_act");
        whosTurnNode.active = false;

    },

    startHuAct:function(posX){
        var self = this;
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("hu_act");
        var strAniName = '1hu';
        whosTurnNode.active = true;
        whosTurnNode.x = posX;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    stopHuAct:function(){
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("hu_act");
        whosTurnNode.active = false;

    },

    startZiMoAct:function(posX){
        console.log("播放自摸动画")
        var self = this;
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("zimo_act");
        var strAniName = '8ZhiMo';
        whosTurnNode.active = true;
        whosTurnNode.x = posX;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    stopZiMoAct:function(){
        var operateNodes = this.node.getChildByName("operate_button_layer");
        var whosTurnNode = operateNodes.getChildByName("zimo_act");
        whosTurnNode.active = false;
    },

    setZiMoBtnVisible: function (bIsVisible) {
        var operateNodes = this.node.getChildByName("operate_button_layer");

        operateNodes.getChildByName("operate_zimo_btn").active = bIsVisible;

        this.autoAdjustPos(2);
    },

    setStartBtnVisible: function (bIsVisible) {

        this.startGameBtn.node.active = bIsVisible;
    },

    setStartClickBtnCallBack: function (callback) {
        this.m_onStartCallBack = callback;
    },

    setGuoClickBtnCallBack: function (callback) {

        this.m_onGuoCallBack = callback;

    },

    setChiClickBtnCallBack: function (callback) {

        this.m_onChiCallback = callback;
    },

    setGangClickBtnCallBack: function (callback) {

        this.m_onGangCallBack = callback
    },

    setChaoTianClickBtnCallBack: function (callback) {
        this.m_onChaotianCallBack = callback;
    },

    setCancelRobotBtnCallBack: function (callback) {

        this.m_onCancelRobotCallBack = callback;
    },

    onClickedDingQue: function (event,data) {
        var HallResources = require("HallResources");
        HallResources.getInstance().playButtonEffect();
        sendCMD.sendCMD_PO_DingQue(parseInt(data));
    },

    //自动修正坐标
    autoAdjustPos: function (flag) {

        //设定好过的坐标  
        this.frontNode = this.frontNode || null;

        var operateNodes = this.node.getChildByName("operate_button_layer");

        var GuoBtn = operateNodes.getChildByName("operate_guo_btn");
        GuoBtn.x = 390;
        this.front = GuoBtn;

        if (operateNodes.getChildByName("operate_peng_btn").active == true) {

            operateNodes.getChildByName("operate_peng_btn").x = this.front.x - 180
            if (flag == 4)
            {
                this.startPengAct(this.front.x - 178)
            }
            this.front = operateNodes.getChildByName("operate_peng_btn");

        }

        if (operateNodes.getChildByName("operate_chi_btn").active == true) {

            operateNodes.getChildByName("operate_chi_btn").x = this.front.x - 180
            this.front = operateNodes.getChildByName("operate_chi_btn");

        }

        if (operateNodes.getChildByName("operate_gang_btn").active == true) {

            operateNodes.getChildByName("operate_gang_btn").x = this.front.x - 180
            if (flag == 3)
            {
                this.startGangAct(this.front.x - 178)
            }
            this.front = operateNodes.getChildByName("operate_gang_btn");

        }

        if (operateNodes.getChildByName("operate_chaotian_btn").active == true) {
            operateNodes.getChildByName("operate_chaotian_btn").x = this.front.x - 180
            this.front = operateNodes.getChildByName("operate_chaotian_btn");
        }

        if (operateNodes.getChildByName("operate_hu_btn").active == true) {

            operateNodes.getChildByName("operate_hu_btn").x = this.front.x - 180
            if (flag == 1)
            {
                this.startHuAct(this.front.x - 180)
            }
            this.front = operateNodes.getChildByName("operate_hu_btn");
            
        }

        if (operateNodes.getChildByName("operate_zimo_btn").active == true) {
            operateNodes.getChildByName("operate_zimo_btn").x = this.front.x - 180
            if (flag == 2)
            {
                this.startZiMoAct(this.front.x - 180)
            }
            this.front = operateNodes.getChildByName("operate_zimo_btn");
        }
    },

});
