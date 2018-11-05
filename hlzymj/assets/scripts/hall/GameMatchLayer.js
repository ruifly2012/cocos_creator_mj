var HallResources = require("HallResources");
import {TSCommon} from "../hall/TSCommon";
cc.Class({
    extends: cc.Component,

    properties: {
        match_status: {
            default: null,
            type: cc.Sprite,
        },

        match_timer: {
            default: null,
            type: cc.Label,
        },

        //已经匹配成功的人数
        matched_num: {
            default: null,
            type: cc.Label,
        },

        match_players: {
            default: null,
            type: cc.Node,
        },

        match_success: cc.SpriteFrame,

        player_avator: cc.SpriteFrame,

        unkown_avator: cc.SpriteFrame,
    },

    onLoad: function () {
        this.init();

        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;

        var self = this;
        if(require("HallUtils").isIPhoneX()){
            cc.loader.loadRes("texture/hallRes/iphonex_bg", cc.SpriteFrame,function (error, spriteframe)
            {
                var bgSp = self.node.getChildByName('hall_bg').getComponent(cc.Sprite);
                if (!error) {
                    bgSp.spriteFrame = spriteframe;
                   
                }
            });
        }
       
    },

    init: function () {
        this.m_waitTimer = 20;
        this.match_timer.string = this.m_waitTimer;
        this.matched_num.string = 0;
    },

    onEnable: function () {

        var self = this;
        if (this.m_waitID) {
            this.init();

            this.repeatRequest = function () {
                var callback = function (success, data) {
                    if (success) {
                        var jsonObject = JSON.parse(data);
                        console.log("jsonObject ===========");
                        console.log(jsonObject);

                        self.refreshMatchPlayer(jsonObject.table);
                        self.matched_num.string = jsonObject.table.length;
                        if (parseInt(jsonObject.RetCode) == 1) {

                            require('HallResources').getInstance().showLoading();

                            //进入游戏
                            self.match_status.spriteFrame = self.match_success;

                            var nRoomNo = jsonObject.RoomNo;

                            var onMathEnd = function(success, data){
                                // require('HallResources').getInstance().removeLoading();
                                self.unschedule(self.repeatRequest);
                                self.unschedule(self.waitTimerCallback);
                                if(success){
                                    
                                    //记录日志
                                    HallResources.recordPlayerLogToServer(HallResources.recordList.pipei_end);
                                    var jsonObject = JSON.parse(data).table[0];

                                    var szServerIP = jsonObject.ServerIP;

                                    var nPort = parseInt(jsonObject.Port);

                                    var nChairCount = parseInt(jsonObject.ChairNum);

                                    var gameLibSink = require('GameLibSink').getInstance();

                                    gameLibSink.m_nChairCount = nChairCount;

                                    gameLibSink.s_nPrivateRoomTableNo = parseInt(jsonObject.TableNo) //无效私人房桌子号
					                gameLibSink.s_nPrivateRoomChairNo = parseInt(jsonObject.ChairNo) //无效私人房椅子号

                                    gameLibSink.getGameLib().enterGameRoomByIP(szServerIP, nPort);
                                }
                            }

                            require('HallWebRequest').getInstance().enterGameByRoomNo(nRoomNo, onMathEnd)
                        }
                        else if (parseInt(jsonObject.RetCode) == 11) {  //还没开始点击匹配
                            
                            TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["还没开始点击匹配"]);
                        }
                        else if (parseInt(jsonObject.RetCode) == 12) {  //继续等待
                            
                        }
                        else if (parseInt(jsonObject.RetCode) == 13) {    //房间生成失败
                            TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["房间生成失败"]);
                        }
                        else {

                        }
                    }
                }
                require('HallWebRequest').getInstance().getMatchResult(self.m_waitID, callback);
            }.bind(self);

            this.repeatRequest();

            this.schedule(this.repeatRequest, 2, cc.macro.REPEAT_FOREVER, 0);

            this.waitTimerCallback = function () {
                self.m_waitTimer -= 1;
                if (self.m_waitTimer >= 0) {
                    self.match_timer.string = self.m_waitTimer;
                }
                else {
                    self.onMatchCloseClicked();
                }

            }
            this.schedule(this.waitTimerCallback, 1, this.m_waitTimer, 0);
        }

    },


    onDisable: function () {
        this.unschedule(this.repeatRequest);
        this.unschedule(this.waitTimerCallback);

        for(var i = 0; i < this.match_players.childrenCount; i++){
            var playerSprite = this.match_players.children[i].getChildByName("player").getComponent(cc.Sprite);
            playerSprite.spriteFrame = this.unkown_avator;
        }
    },

    setWaitID: function (waitID) {
        this.m_waitID = waitID;
    },

    refreshMatchPlayer: function (playersArray) {
        for(var i = playersArray.length; i < this.match_players.childrenCount; i++){
            var playerSprite = this.match_players.children[i].getChildByName("player").getComponent(cc.Sprite);
            playerSprite.spriteFrame = this.unkown_avator;
        }

       var self = this;
        var showFace = function(i){
            if (i >= self.match_players.childrenCount || i >= playersArray.length) {
                return;
            }

            var imgUrl = playersArray[i].WxFaceUrl;

            if (imgUrl && imgUrl != "") {
                var playerSprite = self.match_players.children[i].getChildByName("player").getComponent(cc.Sprite);
                cc.loader.load({ url: imgUrl, type: "jpg" }, function (err, texture) {
                    if (!err && cc.isValid(playerSprite.node)) {
                        playerSprite.spriteFrame = new cc.SpriteFrame(texture);
                        showFace(i + 1);
                    }
                });
            }
            else {
                var playerSprite = self.match_players.children[i].getChildByName("player").getComponent(cc.Sprite);
                playerSprite.spriteFrame = self.player_avator
                showFace(i + 1);
            }  
        }

        showFace(0);
    },

    //关闭匹配
    onMatchCloseClicked: function () {
        var self = this;
        var callback = function (success, data) {
            require('HallResources').getInstance().removeLoading();
            var jsonObject = JSON.parse(data);
            if (parseInt(jsonObject.RetCode) == 1) {
                //记录日志
                HallResources.recordPlayerLogToServer(HallResources.recordList.pipei_break);
                self.node.active = false;
            }
        }
        require('HallWebRequest').getInstance().exitMatchList(callback)
    },

    // update (dt) {},
});
