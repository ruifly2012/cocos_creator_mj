var GameLibSink = require("GameLibSink");
var GameDefs = require("GameDefs");
import { TSCommon } from "../../TSCommon";
var Resources = require("Resources");

cc.Class({
    extends: cc.Component,

    properties: {
        PengGangPrefab: {
            default: null,
            type: cc.Prefab,
        },

        START_TAG: 1000,
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this, true);

        var windowSize=cc.view.getVisibleSize();
        this.node.getChildByName("bg").setContentSize(windowSize);
    },

    onDestroy: function () {
        this.stopLeaveTimer();
    },

    onTouch: function (event) {
        //this.node.stop
    },

    setWinStructInfo(stWinStruct, playersInfo, stPlayerName,  playerAvators, eatParisSpriteFrame, cardSpriteFrame, roomInfo, leftTime) {
        this.m_stWinStruct = stWinStruct;
        this.m_playersInfo = playersInfo;
        this.m_stPlayerName = stPlayerName;
        this.m_playerAvators = playerAvators;
        this.m_spriteFrame = eatParisSpriteFrame;
        this.m_cardSpriteFrame = cardSpriteFrame;
        this.m_roomInfo = roomInfo;

        // this.m_cbLaizi = cbLaizi;

        this.m_leftTime = leftTime;

        this.m_leaveTimerStop = false;
    },


    loadUI: function () {



        this.addAvatarAndName();

        var items = this.node.getChildByName("items");

        for (var i = 0; i < 4; i++) {
            if (i >= this.m_roomInfo.nPlayerCount) {
                items.children[i].active = false;
            }
        }

        for (var i = 0; i < this.m_roomInfo.nPlayerCount; i++) {
            var scoreLabel = items.children[i].getChildByName("player_score");
            scoreLabel.getComponent(cc.Label).isSystemFontUsed = false;
            if (this.m_stWinStruct.nScore[i] >= 0) {
                scoreLabel.getComponent(cc.Label).string = "+" + this.m_stWinStruct.nScore[i];
            }
            else {
                scoreLabel.getComponent(cc.Label).string = this.m_stWinStruct.nScore[i];
            }
        }

        var self = this;
        cc.loader.loadRes("game/gameOver/lose", cc.Atlas, function (error, font) {
            for (var i = 0; i < self.m_roomInfo.nPlayerCount; i++) {
                var scoreLabel = items.children[i].getChildByName("player_score");
                if (self.m_stWinStruct.nScore[i] < 0) {
                    scoreLabel.getComponent(cc.Label).font = font
                }
            }

        })

        cc.loader.loadRes("game/gameOver/win", cc.Atlas, function (error, font) {
            for (var i = 0; i < self.m_roomInfo.nPlayerCount; i++) {
                var scoreLabel = items.children[i].getChildByName("player_score");
                if (self.m_stWinStruct.nScore[i] >= 0) {
                    scoreLabel.getComponent(cc.Label).font = font
                }
            }
        })

        this.addPairsEatAndPeng();

        this.addHuPaiInfo();


        // this.addCardWall();

        this.getIsShare();

        this.startLeaveTimer();
    },

    getSpriteFrameNameByValue: function (value) {
        return Resources.get_frameName("hh_li_", value);
    },

    //增加头像和名字
    addAvatarAndName: function () {
        var items = this.node.getChildByName("items");
        for (var i = 0; i < this.m_roomInfo.nPlayerCount; i++) {
            var nameLabel = items.children[i].getChildByName("player_name");
            nameLabel.getComponent(cc.Label).string = this.m_stPlayerName[i];        
        }    
        

        var self = this;
        var addAvatorFace = function(index){
            if(index >= self.m_roomInfo.nPlayerCount){
                return;
            }
            var imgurl = self.m_playerAvators[index];
            if(imgurl){
                cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                    if(!err){
                        items.children[index].getChildByName("face_icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);                                       
                    }     
                    addAvatorFace(index + 1);               
                });
            }
            else{
                addAvatorFace(index + 1);
            }
        }

        addAvatorFace(0);
    },

    addPairsEatAndPeng: function () {
        var items = this.node.getChildByName("items");

        var startX = -370;
        var startY = 0;
        var distanceX = 100;

        var isHuArray = [0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            if (i == this.m_stWinStruct.cbWinChair) {
                isHuArray[i] = 1;
            }
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < items.children[i].getChildByName("holds").childrenCount; j++) {
                items.children[i].getChildByName("holds").children[j].active = false;
            }
            for (var j = 0; j < GameDefs.MAX_WEAVE; j++) {
                if(items.children[i].getChildByTag(this.START_TAG + i * 10 + j)){
                    items.children[i].removeChildByTag(this.START_TAG + i * 10 + j);
                }               
            }
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < this.m_playersInfo[i].nWeaveCount; j++) {
                var weaveItem = this.m_playersInfo[i].showCardSuits[j];
                var pairsItem = cc.instantiate(this.PengGangPrefab);
                var RangeCardLayer = pairsItem.getComponent('RangeCardLayer');
                RangeCardLayer.init(weaveItem.cbWeaveKind, weaveItem.cbCardData, 1, this.m_spriteFrame);
                pairsItem.x = startX + (j) * distanceX;
                pairsItem.y = startY - 10;
                pairsItem.active = true;
                pairsItem.setScale(0.6)
                items.children[i].addChild(pairsItem, 1, this.START_TAG + i * 10 + j);
            }

            for (var j = 0; j < this.m_playersInfo[i].cbHoldCardCount; j++) {
                items.children[i].getChildByName("holds").children[j].active = true;
                var frameName = this.getSpriteFrameNameByValue(this.m_playersInfo[i].cbHoldCards[j])
                items.children[i].getChildByName("holds").children[j].getComponent(cc.Sprite).spriteFrame = this.m_cardSpriteFrame.getSpriteFrame(frameName);
                items.children[i].getChildByName("holds").children[j].x = startX + (this.m_playersInfo[i].nWeaveCount) * distanceX - distanceX / 2 + (j) * 45;
                items.children[i].getChildByName("holds").children[j].y = 0;

                if (isHuArray[i] == 1 && j == this.m_playersInfo[i].cbHoldCardCount - 1) {
                    items.children[i].getChildByName("holds").children[j].x += 45;
                }
            }
        }

    },


    addHuPaiInfo: function () {

        var items = this.node.getChildByName("items");
        for (var i = 0; i < 4; i++) {
            for(var j=0; j<cbWriteScoreTimes; j++){
                var stSinleScore = stWinStruct.stSingleScore[i][j];
                var huMsg = "";
                for (var k = 0; k < stSinleScore.cbHuTypeCount;k++)
                {
                    if (stSinleScore.cbHuType[k] != 23 && stSinleScore.cbHuType[k]!=24)
                    {
                        if (k > 0)
                            huMsg = huMsg + ",";
                        huMsg = huMsg + GameDefs.HUTYPE_STRING[stSinleScore.cbHuType[k] - 1];
                    }
                }
                // if (i == this.m_stWinStruct.cbWinChair && this.m_stWinStruct.cbHuType > 0) {
                    items.children[i].getChildByName("game_hu_type").getComponent(cc.Label).string = huMsg;
                // }
            }
        }

        // for (var i = 0; i < 4; i++) {
        //     items.children[i].getChildByName("game_over_status").getComponent(cc.Label).string = "";
        //     if (this.m_stWinStruct.cbEndType == GameDefs.EndType.Zimo) {
        //         if (isHuArray[i] == 1) {
        //             items.children[i].getChildByName("game_over_status").getComponent(cc.Label).string = "自摸";
        //             items.children[i].getChildByName("game_over_status").x = items.children[i].getChildByName("holds").children[this.m_playersInfo[i].cbHoldCardCount - 1].x
        //         }
        //     }
        //     else if (this.m_stWinStruct.cbEndType == GameDefs.EndType.Fangpao) {
        //         if (isHuArray[i] == 1) {
        //             items.children[i].getChildByName("game_over_status").getComponent(cc.Label).string = "接炮";
        //         }

        //         if (i == this.m_stWinStruct.cbFangpaoChair) {
        //             items.children[i].getChildByName("game_over_status").getComponent(cc.Label).string = "放炮";
        //         }

        //         items.children[i].getChildByName("game_over_status").x = items.children[i].getChildByName("holds").children[this.m_playersInfo[i].cbHoldCardCount - 1].x
        //     }
        //     else {
        //         items.children[i].getChildByName("game_over_status").getComponent(cc.Label).string = "流局";
        //     }
        // }




        for (var i = 0; i < GameDefs.PLAYER_COUNT; i++) {
            var gangNum = 0;//this.m_playersInfo[i].cbCountLaiziGang + this.m_playersInfo[i].cbCountHZGang;
            if (gangNum <= 0) {
                items.children[i].getChildByName("gangfan_label").active = false;
            }
            else {
                items.children[i].getChildByName("gangfan_label").active = true;
                for (var j = 0; j < items.children[i].getChildByName("gangcards").childrenCount; j++) {
                    if (j < gangNum) {
                        items.children[i].getChildByName("gangcards").children[j].active = true;
                        // var frameName = this.getSpriteFrameNameByValue(this.m_cbLaizi)
                        // items.children[i].getChildByName("gangcards").children[j].getComponent(cc.Sprite).spriteFrame = this.m_cardSpriteFrame.getSpriteFrame(frameName);
                    }
                    else {
                        items.children[i].getChildByName("gangcards").children[j].active = false;
                    }
                }
            }
        }
    },


    //增加牌墙
    addCardWall: function () {
        var MAX_LINE_NUM = 23;
        var scale = 0.6;

        var wallScrollView = this.node.getChildByName("mj_lefts");
        var viewSize = wallScrollView.getChildByName("view").getContentSize();
        var contentNode = wallScrollView.getChildByName("view").getChildByName("content");

        if (this.m_roomInfo.nPlayerCount == 3 && !this.m_fixY) {
            wallScrollView.y += 100;
            this.m_fixY = true;
        }

        contentNode.removeAllChildren();
        var startX = -590;
        var startY = -43;
        for (var i = 0; i < this.m_stWinStruct.cbWall.length; i++) {

            var leftMjNode = new cc.Node();
            leftMjNode.active = true;
            var sprite = leftMjNode.addComponent(cc.Sprite);
            var frameName = this.getSpriteFrameNameByValue(this.m_stWinStruct.cbWall[i]);
            var frame = this.m_cardSpriteFrame.getSpriteFrame(frameName);
            sprite.spriteFrame = frame;
            leftMjNode.setScale(scale);
            leftMjNode.x = startX + (i % 26) * 79 * scale;
            leftMjNode.y = startY - Math.floor((i) / 26) * leftMjNode.getContentSize().height * scale - 10;

            contentNode.addChild(leftMjNode);
        }

        wallScrollView.getComponent(cc.ScrollView).scrollToTop(0.05);
    },


    startLeaveTimer: function () {
        var leavetimerNode = this.node.getChildByName("leave_timer");
        leavetimerNode.getComponent(cc.Label).string = this.m_leftTime;

        var self = this;
        var callback = function () {
            if (self.m_leaveTimerStop) {
                return;
            }
            self.m_leftTime -= 1;
            leavetimerNode.getComponent(cc.Label).string = self.m_leftTime

            if (self.m_leftTime > 0) {
                TSCommon.performWithDelay(self, callback, 1);
            }
            else {
                require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
            }
        }

        TSCommon.performWithDelay(this, callback, 1);
    },

    stopLeaveTimer: function () {
        this.m_leaveTimerStop = true;
    },

    onLeaveGame: function (event) {
        var DeskScene = this.node.parent.getComponent("DeskScene");
        // if(DeskScene.IsCXZ()){
        //     G.goldGameReady = 3;
        // }
        // else{
        //     G.goldGameReady = 4;
        // }
        G.matchGameReady = false;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },


    //获取是否已经分享过奖励
    getIsShare:function(){
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID="+ publicUserInfo.userDBID + "&apptype=1";
        var self = this;
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){            
                var jsonObject = JSON.parse(data).table[0];
                if(parseInt(jsonObject.IsShareAward) == 1){
                    var sharBtn = self.node.getChildByName("share_btn");
                    sharBtn.getChildByName("share_tips").active = false;
                }
            }
        }
        require('HallWebRequest').getInstance().httpRequest("WxDailyShareAwardGetInfo.aspx", szData, httpCallback);
    },

    //分享游戏
    onShareGame: function (event) {
        if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
            var self = this;
            var HallResources = require("HallResources");
            if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
                wx.shareAppMessage({

                    title: "无敌是多么的寂寞，你怎么还不来挑战我？",
                    imageUrl: HallResources.resultShareImgUrl,
                    success(res) {
                        console.log("转发成功!!!")
                        self.onShareFinish();
                    },
                    fail(res) {
                        console.log("转发失败!!!")
                    }
                })
            }
        }
    },

    //直接领取奖励
    onShareFinish: function () {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword=" + publicUserInfo.encryptPassword + "&apptype=1";

        var self = this;
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                if(parseInt(jsonObject.RetCode) == 1){
                    Resources.showRewardTips("+" + jsonObject.AwardAmount, true);
                    self.node.parent.getComponent("DeskScene").getGameLib().refreshGold();
                    var sharBtn = self.node.getChildByName("share_btn");
                    sharBtn.getChildByName("share_tips").active = false;
                }
                
            }
        }

        require('HallWebRequest').getInstance().httpRequest("WxDailyShareAwardGetAward.aspx", szData, httpCallback);
    },


    onStartGame: function (event) {
        var DeskScene = this.node.parent.getComponent("DeskScene");

        if(DeskScene && DeskScene.getIsPrivateRoom()){
            G.matchGameReady = true;
            G.goldGameReady = null;
            require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
        }
        else{

            G.matchGameReady = false;
            this.node.active = false;
            var GameCfg = require("GameCfg");
            TSCommon.dispatchEvent(GameCfg.GAME_RESTART, {isReady : true});
        } 
    },

});
