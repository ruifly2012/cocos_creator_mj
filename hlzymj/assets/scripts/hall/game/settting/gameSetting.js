
import { TSCommon } from "../../TSCommon";

var GameCfg = require("GameCfg");
var setting = {
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        music_open: {
            default: null,
            type: cc.Node,
        },

        music_close: {
            default: null,
            type: cc.Node,
        },

        effect_open: {
            default: null,
            type: cc.Node,
        },

        effect_close: {
            default: null,
            type: cc.Node,
        },

        shock_open: {
            default: null,
            type: cc.Node,
        },

        shock_close: {
            default: null,
            type: cc.Node,
        },

        deskBgTableView: {
            default: null,
            type: cc.Node,
        },

        settingAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
    },

    start() {

    },

    //界面载入
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);

        var windowSize=cc.view.getVisibleSize();
        
        //主界面不显示
        // if (this.node.getChildByName("shadow_bg"))
        // {
        //     this.node.getChildByName("shadow_bg").setContentSize(windowSize);
        // }
    },

    onEnable: function () {
        var index = cc.sys.localStorage.getItem("deskBg", index) || 0;

        var bgPageView = this.bg.getChildByName("deskBg_select_scrollView").getComponent(cc.PageView);

        /*
        index = parseInt(index);

        if (index < 0) {
            index = 0;
        }

        if (index > 2) {
            index = 2;
        }

        bgPageView.scrollToPage(index, 0.1);
        */
        bgPageView.removeAllPages();


        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();

        var tableInfo = publicUserInfo.tableBoardInfo;

        var selectIndex = 0;

        for (var i = 0; i < tableInfo.length; i++) {
            var bgNode = new cc.Node();
            var bgSprite = bgNode.addComponent(cc.Sprite);
            var frameName = "bg" + (parseInt(tableInfo[i].TableBoardNo) + 1);
            bgSprite.spriteFrame = this.settingAtlas.getSpriteFrame(frameName)

            if (parseInt(tableInfo[i].IsUsed) == 1) {
                selectIndex = i;
            }
            bgPageView.addPage(bgNode);
        }

        bgPageView.scrollToPage(selectIndex, 0.1);

        this.bg.getChildByName("deskBg_mask").active = false;
        this.bg.getChildByName("get_deskbg_btn").active = false;
        var bgMusicOpen = parseInt(cc.sys.localStorage.getItem("bgMusic") || 0);
        if (bgMusicOpen) {
            this.music_open.active = true;
            this.music_close.active = false;
        }
        else {
            this.music_open.active = false;
            this.music_close.active = true;
        }

        var voiceEffectOpen = parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0);
        if (voiceEffectOpen) {
            this.effect_open.active = true;
            this.effect_close.active = false;
        }
        else {
            this.effect_open.active = false;
            this.effect_close.active = true;
        }
    },

    onTouch: function (event) {
        cc.log("onTouch");
        var point = event.touch.getLocation();
        var convertPoint = this.bg.convertToNodeSpace(point);
        var size = this.bg.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, convertPoint)) {
            this.hide();
        }
    },

    hide: function () {
        // this.node.active = false;
        this.closeAndChangeScaleAction();
    },

    closeAndChangeScaleAction(){
        var self = this;
        // self.node.active = false;
        var HallResources = require("HallResources");
        // TSCommon.dispatchEvent(HallResources.onChangeShadow,false);
        var action1 = cc.scaleTo(0.2, 0.3, 0.3);
        var action2 =cc.fadeOut(0.01);
        
        var action3 = cc.callFunc(function(){
            self.node.active = false;
        });
        var sequence = cc.sequence(action1, action2, action3);
        this.bg.runAction(sequence);
    },

    onCloseClicked: function () {
        require('HallResources').getInstance().playCloseEffect();
        this.hide();
    },

    onPageChanged: function (event) {

        var index = event.getCurrentPageIndex();

        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();

        var tableInfo = publicUserInfo.tableBoardInfo;

        this.bg.getChildByName("deskBg_mask").active = parseInt(tableInfo[index].IsGet) == 1 ? false : true;
        this.bg.getChildByName("get_deskbg_btn").active = parseInt(tableInfo[index].IsGet) == 1 ? false : true;

        var self = this;

        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword=" +  publicUserInfo.encryptPassword + "&TableBoardNo=" + index + "&apptype=1";
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                var retCode = jsonObject.RetCode;
                if(parseInt(retCode) == 1){
                    TSCommon.dispatchEvent(GameCfg.changeDeskBg, index);
                    self.changeDeskBg(index);
                }
            }
        }

        require('HallWebRequest').getInstance().httpRequest("SetUserTableBoard.aspx", szData, httpCallback);
    },


    
    onGetMoreDeskBgBtnClicked:function(event){
        var scene = cc.director.getScene();
        if(scene.name == "XueLiuGameScene"){
            require("Resources").ShowToast("您正在游戏中,无法进行此操作,请先返回大厅!")
        }
        else{
            var HallResources = require("HallResources");
            TSCommon.dispatchEvent(HallResources.onGetMoreDeskBg, null);
            this.node.active = false;
        }
    },

    //关闭背景音乐
    closeMusic: function () {
        //cc.log("open music")
        var HallResources = require("HallResources");
        this.music_open.active = false;
        this.music_close.active = true;

        cc.sys.localStorage.setItem("bgMusic", 0);
        TSCommon.dispatchEvent(GameCfg.closeBgMusic, null);
        TSCommon.dispatchEvent(HallResources.closeBgMusic, null);
    },

    //打开背景音乐
    openMusic: function () {
        var HallResources = require("HallResources");
        this.music_open.active = true;
        this.music_close.active = false;

        cc.sys.localStorage.setItem("bgMusic", 1);
        TSCommon.dispatchEvent(GameCfg.openBgMusic, null);
        TSCommon.dispatchEvent(HallResources.openBgMusic, null);
    },

    
    //关闭音效
    closeEffect: function () {

        cc.sys.localStorage.setItem("voiceEffect", 0);
        this.effect_open.active = false;
        this.effect_close.active = true;
    },

    //打开音效
    openEffect: function () {

        cc.sys.localStorage.setItem("voiceEffect", 1);
        this.effect_open.active = true;
        this.effect_close.active = false;
    },

    //打开震动
    openShock: function () {
        this.shock_open.active = false;
        this.shock_close.active = true;
    },

    //关闭震动
    closeShock: function () {
        this.shock_open.active = true;
        this.shock_close.active = false;
    },

    //切换桌面背景
    changeDeskBg: function (index) {
        
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();

        var tableInfo = publicUserInfo.tableBoardInfo;

        for (var i = 0; i < tableInfo.length; i++) {
        
            if(parseInt(tableInfo[i].TableBoardNo) == index){
                tableInfo[i].IsUsed = 1;
            }
            else{
               tableInfo[i].IsUsed = 0
            }
        }

        cc.sys.localStorage.setItem("deskBg", index);
    },

    //麻将改变时调用
    changeMajiang: function () {

    },
}

cc.Class(setting);
