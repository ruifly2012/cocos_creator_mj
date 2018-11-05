var GameDefs = require("GameDefs");

import { TSCommon } from "../../TSCommon";
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {

        this.init();

    },

    onDestroy: function () {
    },


    init: function () {
        this.m_outMjs = new Array();
        this.m_playerMj = new Array();
    },

    playFaGuangEffects: function (bIsPlaying) {
        var playerNode = this.node.getChildByName("hupai_eff_node");
        var whosTurnNode = playerNode.getChildByName("hupai_light_act");
        // var mjNode = this.getLastHuCard();
        // var convetPos = this.node.convertToNodeSpace(cc.p(mjNode.getPosition()));
        // whosTurnNode.x = convetPos.x;
        // whosTurnNode.y = convetPos.y;
        // console.log("胡牌的坐标："+whosTurnNode.x+"=============="+whosTurnNode.y)
        var nCount = this.m_playerMj.cbHuCount;
        if (this.m_nPos == 1) {
            if (nCount == 1){
                whosTurnNode.x = 241;
                whosTurnNode.y = -221;
            }else if (nCount == 2){
                whosTurnNode.x = 289;
                whosTurnNode.y = -221;
            }else if (nCount == 3){
                whosTurnNode.x = 337;
                whosTurnNode.y = -221;
            }else if (nCount == 4){
                whosTurnNode.x = 381;
                whosTurnNode.y = -221;
            }else if (nCount == 5){
                whosTurnNode.x = 428;
                whosTurnNode.y = -221;
            }else if (nCount == 6){
                whosTurnNode.x = 475;
                whosTurnNode.y = -221;
            }else if (nCount == 7){
                whosTurnNode.x = 241;
                whosTurnNode.y = -199;
            }else if (nCount == 8){
                whosTurnNode.x = 289;
                whosTurnNode.y = -199;
            }else if (nCount == 9){
                whosTurnNode.x = 337;
                whosTurnNode.y = -199;
            }else if (nCount == 10){
                whosTurnNode.x = 381;
                whosTurnNode.y = -199;
            }else if (nCount == 11){
                whosTurnNode.x = 428;
                whosTurnNode.y = -199;
            }else if (nCount == 12){
                whosTurnNode.x = 475;
                whosTurnNode.y = -199;
            }

        }
        else if (this.m_nPos == 2) {
            if (nCount == 1){
                whosTurnNode.x = 419;
                whosTurnNode.y = 305;
            }else if (nCount == 2){
                whosTurnNode.x = 421;
                whosTurnNode.y = 283;
            }else if (nCount == 3){
                whosTurnNode.x = 423;
                whosTurnNode.y = 260;
            }else if (nCount == 4){
                whosTurnNode.x = 384;
                whosTurnNode.y = 305;
            }else if (nCount == 5){
                whosTurnNode.x = 386;
                whosTurnNode.y = 283;
            }else if (nCount == 6){
                whosTurnNode.x = 387;
                whosTurnNode.y = 259;
            }else if (nCount == 7){
                whosTurnNode.x = 421;
                whosTurnNode.y = 315;
            }else if (nCount == 8){
                whosTurnNode.x = 423;
                whosTurnNode.y = 292;
            }else if (nCount == 9){
                whosTurnNode.x = 425;
                whosTurnNode.y = 269;
            }else if (nCount == 10){
                whosTurnNode.x = 385;
                whosTurnNode.y = 316;
            }else if (nCount == 11){
                whosTurnNode.x = 387;
                whosTurnNode.y = 293;
            }else if (nCount == 12){
                whosTurnNode.x = 389;
                whosTurnNode.y = 270;
            }
        }
        else if (this.m_nPos == 3) {
            if (nCount == 1){
                whosTurnNode.x = -359;
                whosTurnNode.y = 270;
            }else if (nCount == 2){
                whosTurnNode.x = -331;
                whosTurnNode.y = 270;
            }else if (nCount == 3){
                whosTurnNode.x = -302;
                whosTurnNode.y = 270;
            }else if (nCount == 4){
                whosTurnNode.x = -273;
                whosTurnNode.y = 270;
            }else if (nCount == 5){
                whosTurnNode.x = -245;
                whosTurnNode.y = 270;
            }else if (nCount == 6){
                whosTurnNode.x = -217;
                whosTurnNode.y = 270;
            }else if (nCount == 7){
                whosTurnNode.x = -359;
                whosTurnNode.y = 282;
            }else if (nCount == 8){
                whosTurnNode.x = -331;
                whosTurnNode.y = 282;
            }else if (nCount == 9){
                whosTurnNode.x = -302;
                whosTurnNode.y = 282;
            }else if (nCount == 10){
                whosTurnNode.x = -273;
                whosTurnNode.y = 282;
            }else if (nCount == 11){
                whosTurnNode.x = -245;
                whosTurnNode.y = 282;
            }else if (nCount == 12){
                whosTurnNode.x = -217;
                whosTurnNode.y = 282;
            }
        }
        else if (this.m_nPos == 4) {
            if (nCount == 1){
                whosTurnNode.x = -448;
                whosTurnNode.y = -142;
            }else if (nCount == 2){
                whosTurnNode.x = -450;
                whosTurnNode.y = -172;
            }else if (nCount == 3){
                whosTurnNode.x = -453;
                whosTurnNode.y = -204;
            }else if (nCount == 4){
                whosTurnNode.x = -399;
                whosTurnNode.y = -142;
            }else if (nCount == 5){
                whosTurnNode.x = -401;
                whosTurnNode.y = -172;
            }else if (nCount == 6){
                whosTurnNode.x = -404;
                whosTurnNode.y = -204;
            }else if (nCount == 7){
                whosTurnNode.x = -452;
                whosTurnNode.y = -126;
            }else if (nCount == 8){
                whosTurnNode.x = -454;
                whosTurnNode.y = -156;
            }else if (nCount == 9){
                whosTurnNode.x = -456;
                whosTurnNode.y = -188;
            }else if (nCount == 10){
                whosTurnNode.x = -403;
                whosTurnNode.y = -126;
            }else if (nCount == 11){
                whosTurnNode.x = -406;
                whosTurnNode.y = -156;
            }else if (nCount == 12){
                whosTurnNode.x = -408;
                whosTurnNode.y = -188;
            }
        }

        if (bIsPlaying) {
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('Animation1');
            var Resources = require("Resources");
            Resources.playCommonEffect("huLight.mp3");
            // console.log("胡牌特效播放完成！！！")
            var self = this;
            var callback = function () {
                self.playFaGuangEffects(false);
                dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
            }
    
            dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
        }
        else {
            // whosTurnNode.removeComponent(dragonBones.ArmatureDisplay);
            whosTurnNode.active = false;
        }

    },

    setPlayerMj:function (playerMj) {
        this.m_playerMj = playerMj;
    },

    setPlayerPos: function (nPos) {
        this.m_nPos = nPos;
    },

    putHuMj: function (outMjValue) {
        if (this.m_nPos == 1) {
            this.addSelfHuCard(outMjValue);
        }
        else if (this.m_nPos == 2) {
            this.addRightHuCard(outMjValue);
        }
        else if (this.m_nPos == 3) {
            this.addTopHuCard(outMjValue);
        }
        else if (this.m_nPos == 4) {
            this.addLeftHuCard(outMjValue);
        }
    },

    getLastHuCard: function () {
        var huCardsNode = this.node.getChildByName("hucards");
        return huCardsNode.children[this.m_playerMj.cbHuCount - 1];
    },

    addSelfHuCard: function (outMjValue) {
        var outCardCount = this.m_playerMj.cbHuCount;
        var huCardsNode = this.node.getChildByName("hucards");

        for (var i = 0; i < huCardsNode.childrenCount; i++) {
            huCardsNode.children[i].active = false;
        }

        for (var i = 0; i < outCardCount; i++) {
            if (huCardsNode.children[i]) {
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1, this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].removeAllChildren();
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_dao_spriteFrame("mj1", this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                huCardsNode.children[i].active = true;
                huCardsNode.children[i].cardValue = this.m_playerMj.cbHuCards[i];
                if (outMjValue) {
                    // 
                    this.playFaGuangEffects(true)
                }
            }
        }
    },

    addLeftHuCard: function (outMjValue) {
        var outCardCount = this.m_playerMj.cbHuCount;
        var huCardsNode = this.node.getChildByName("hucards");

        for (var i = 0; i < huCardsNode.childrenCount; i++) {
            huCardsNode.children[i].active = false;
        }


        for (var i = 0; i < outCardCount; i++) {
            if (huCardsNode.children[i]) {
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1, this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].removeAllChildren();
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_z_SpriteFrame("mj1", this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                huCardsNode.children[i].active = true;
                huCardsNode.children[i].cardValue = this.m_playerMj.cbHuCards[i];
                if (outMjValue) {
                    
                    this.playFaGuangEffects(true)
                }
            }
        }
    },

    addTopHuCard: function (outMjValue) {
        var outCardCount = this.m_playerMj.cbHuCount;
        var huCardsNode = this.node.getChildByName("hucards");

        for (var i = 0; i < huCardsNode.childrenCount; i++) {
            huCardsNode.children[i].active = false;
        }


        for (var i = 0; i < outCardCount; i++) {
            if (huCardsNode.children[i]) {
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1, this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].removeAllChildren();
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_dao_spriteFrame("mj1", this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                huCardsNode.children[i].active = true;
                huCardsNode.children[i].cardValue = this.m_playerMj.cbHuCards[i];
                if (outMjValue) {
                    
                    this.playFaGuangEffects(true)
                }
            }
        }
    },

    addRightHuCard: function (outMjValue) {
        var outCardCount = this.m_playerMj.cbHuCount;
        var huCardsNode = this.node.getChildByName("hucards");

        for (var i = 0; i < huCardsNode.childrenCount; i++) {
            huCardsNode.children[i].active = false;
        }


        for (var i = 0; i < outCardCount; i++) {
            if (huCardsNode.children[i]) {
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1, this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].removeAllChildren();
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_y_SpriteFrame("mj1", this.m_playerMj.cbHuCards[i]);
                huCardsNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                huCardsNode.children[i].active = true;
                huCardsNode.children[i].cardValue = this.m_playerMj.cbHuCards[i];
                if (outMjValue) {
                    
                    this.playFaGuangEffects(true)
                }
            }
        }
    },

    doCards: function () {
        if (this.m_nPos == 1) {
            this.addSelfHuCard();
        }
        else if (this.m_nPos == 2) {
            this.addRightHuCard();
        }
        else if (this.m_nPos == 3) {
            this.addTopHuCard();
        }
        else if (this.m_nPos == 4) {
            this.addLeftHuCard();
        }
    },

    //设定所有出的牌的可见性
    setAllOutCardIsVis: function (bIsVis) {
        var outCardCount = this.m_playerMj.cbHuCount;

        var huCardsNode = this.node.getChildByName("hucards");

        for (var i = 0; i < huCardsNode.childrenCount; i++) {
            huCardsNode.children[i].active = false;
        }

        for (var i = 0; i < outCardCount; i++) {
            huCardsNode.children[i].active = bIsVis;
        }
    },

    gameOver: function () {
        this.setAllOutCardIsVis();
    },

    cleanAllMjs: function () {
        this.setAllOutCardIsVis(false);
    }
});
