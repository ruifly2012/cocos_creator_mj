import { gamelibcommon } from "../../gamelib/gamelibcommon";
import { TSCommon } from "../../TSCommon";
import { WeixinManager } from "../../weixin/WeixinManager";
var HallResources = require('HallResources');

var Resources = require("Resources");
cc.Class({
    extends: cc.Component,

    properties: {
        playerName: {
            default: null,
            type: cc.Node,
        },

        playerFace: {
            default: null,
            type: cc.Node,
        },

        playerScore: {
            default: null,
            type: cc.Node,
        },

        offLine: {
            default: null,
            type: cc.Node,
        },

        ready: {
            default: null,
            type: cc.Node,
        },

        robot: {
            default: null,
            type: cc.Node,
        },

        playerInfoLayer: {
            default: null,
            type: cc.Node,
        },

        personInfoPreView: {
            default: null,
            type: cc.Node,
        },

        winResultFont: {
            default: null,
            type: cc.Font,
        },

        loseResultFont: {
            default: null,
            type: cc.Font,
        },

        selectCardSp:{
            default: null,
            type: cc.Sprite,
        },

        dingqueSp:{
            default: null,
            type: cc.Sprite,
        },

        queWanHeadIconSp:{
            default: null,
            type: cc.Sprite,
        },

        queWanSp:{
            default: null,
            type: cc.Sprite,
        },
        chaDaJiaoSp:{
            default: null,
            type: cc.Sprite,
        },

        huSp:{
            default: null,
            type: cc.Sprite,
        },
        WAN:    0,
        TIAO :  1,
        TONG :  2,
        INVA :  3,
        DINGQUEZHONG : 4, //定缺中
        YIDINGQUE : 5, //已定缺
        XUANPAIZHONG : 6, //选牌中
        YIXUANPAI : 7, //已选牌
        CHADAJIAO : 8, //查大叫
        CHAHUAZHU : 9, //查花猪
    },

    onLoad: function () {

        var self = this;
        cc.loader.loadResDir("animation/dragonBones/biaoqin", function (err, assets) {
            self.biaoqinAssets = assets;
        })

        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);

        this.m_leaveTimerStop = false;
        this.isMoveGold = false;
        this.initUI();
        TSCommon.addEvent(HallResources.onHideSendGiftToPLayer,this.hideSendGiftToPLayer,this);
    },

    onDestroy: function () {
        TSCommon.removeEvent(HallResources.onHideSendGiftToPLayer,this.hideSendGiftToPLayer,this);
        this.stopLeaveTimer();
        this.unscheduleAllCallbacks();
    },

    initUI: function () {

        this.nDingqueType = -1
        this.setIsReady(false);

        this.setIsoffLine(false);

        this.setIsRobot(false);

        this.turnToOutPlayCardIsVis(false);


        var playerNode = this.node.getChildByName("playerNode");

        var chat = playerNode.getChildByName("chat_bg");

        chat.active = false;

        if (this.node.name == "myself")
            this.prePos = cc.p(-300, 0);

        else if (this.node.name == "right")
            this.prePos = cc.p(300, 0);


        else if (this.node.name == "top")
            this.prePos = cc.p(0, 300);

        else if (this.node.name == "left")
            this.prePos = cc.p(-300, 0);

        else
            cc.log("no other player");

        if (this.prePos) {
            this.node.getChildByName("playerNode").x = this.prePos.x;
            this.node.getChildByName("playerNode").y = this.prePos.y;
        }

        this.node.getChildByName("flyScoreBg").active = false;
        this.playerInfoLayer.active = false;
        this.personInfoPreView.active = false;
        this.hideLeaveTimer();
    },

    hideSendGiftToPLayer:function()
    {
        this.personInfoPreView.active = false;
    },

    onTouch: function (event) {
        var pos = event.touch.getLocation();
        var convertPos = this.node.getChildByName("playerNode").getChildByName("player_bg").convertToNodeSpace(pos);
        var size = this.node.getChildByName("playerNode").getChildByName("player_bg").getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);

        if (cc.rectContainsPoint(rect, convertPos)) {
            HallResources.getInstance().playButtonEffect();
            var isSelf = this.node.getChildByName("playerNode").nPos == 1 ? true : false;
            var winSize = cc.director.getWinSize();
            // cc.log(" --------player ----------nPos -----");
            var PersonalInfoFrame = this.playerInfoLayer.getComponent("PersonalInfoFrame")
            PersonalInfoFrame.init(this.userInfo);
            PersonalInfoFrame.setGold(this.userInfo.getGold())
            // this.playerInfoLayer.active = true;
            if(isSelf){
                this.playerInfoLayer.active = true;
                TSCommon.dispatchEvent(require("HallResources").onHideSendGiftToPLayer,true);
            }
            else{
                this.personInfoPreView.active = true;
                var PersonInfoPreView = this.personInfoPreView.getComponent("PersonInfoPreView");
                var nPos = this.node.getChildByName("playerNode").nPos;
                var positionX = 0;
                var positionY = 0;
                var position = cc.Vec2(0, 0);
                //右边
                if(nPos == 2){
                    position = cc.v2(945 - winSize.width / 2, 400 - winSize.height / 2);
                    if (require("HallUtils").isIPhoneX()) {
                        position = cc.v2(1125 - winSize.width / 2, 400 - winSize.height / 2);
                    }
                }
                //上边
                else if(nPos == 3){
                    position = cc.v2(745 - winSize.width / 2, 545 - winSize.height / 2);
                    if (require("HallUtils").isIPhoneX()) {
                        position = cc.v2(865 - winSize.width / 2, 545 - winSize.height / 2);
                    }
                }
                //左边
                else if(nPos == 4){
                    position = cc.v2(335 - winSize.width / 2, 400 - winSize.height / 2);
                    if (require("HallUtils").isIPhoneX()) {
                        position = cc.v2(395 - winSize.width / 2, 400 - winSize.height / 2);
                    }
                }
                PersonInfoPreView.create(this.userInfo.getUserID(), position);
            }
        }
    },

    Come: function (nPos, userInfo) {
        cc.log("call user come  function  nPos = ", nPos);

        this.userInfo = userInfo;

        this.m_nPos = nPos;

        this.node.getComponent("PlayerCardLayer").setPlayerPos(nPos);
        this.node.getComponent("OutCardLayer").setPlayerPos(nPos);
        this.Enter(nPos);
    },

    Leave: function (nPos) {

        //关掉跟player有关联的界面
        this.playerInfoLayer.active = false;

        //准备隐藏
        this.setIsReady(false);

        //定时器设置为隐藏
        this.hideLeaveTimer();

        //清除掉玩家相关显示
        // this.cleanPlayers();
        this.node.getComponent("OutCardLayer").cleanAllMjs();
        
        //让玩家退出
        this.Exit(nPos);

    },

    refreshGold: function (nGold) {
       
        var isPrivateRoom = this.node.parent.getComponent("DeskScene").getIsPrivateRoom();
        if (isPrivateRoom) {
            if(this.userInfo){
                this.m_lGold = this.userInfo.getScore();

                //获取段位  然后显示段位
                var result = require("HallResources").getInstance().getRankAndStarByScore(this.m_lGold)
                this.playerScore.getComponent(cc.Label).string = result.rankName;
            }
            
        }
        else {
            this.m_lGold = nGold;

            var szGold = Resources.formatGold(this.m_lGold, true);
            this.playerScore.getComponent(cc.Label).string = szGold;
        }
    },


    getAvatarUrl: function (userID, onEnd) {
        var httpCallback = function (success, data) {
            require('HallResources').getInstance().removeLoading();
            if (success) {
                var jsonObject = JSON.parse(data).table[0];
                if (onEnd && jsonObject.FaceUrl != "") {
                    onEnd(jsonObject.FaceUrl, jsonObject.NickName);
                }
            }
        }
        require("HallWebRequest").getInstance().getWxUserInfoByUserID(userID, httpCallback);
    },

    getNowScore:function(){
        return this.playerScore.getComponent(cc.Label).string;
    },
    
    setSelectCardSpIsVis:function(bIsVis,nType){
        var self = this;
        self.selectCardSp.node.active = bIsVis;

        if (bIsVis){
            var strImg = "game/xuanpai"
            if (nType == this.XUANPAIZHONG)
                strImg = "game/xuanpai"
            else if (nType == this.YIXUANPAI)
                strImg = "game/yixuanpai"
            
            cc.loader.loadRes(strImg, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.selectCardSp.spriteFrame = spriteFrame;
                }
            })
        }
    },
    setPoChanVis:function(bVis){
        this.node.getChildByName("playerNode").getChildByName("pochan_node").active = bVis;
    },
    // setChaDaJiaoSpIsVis:function(bIsVis,nType){
    //     var self = this;
    //     self.chaDaJiaoSp.node.active = bIsVis;

    //     if (bIsVis){
    //         var strImg = "game/chaDaJiao"
    //         if (nType == this.CHADAJIAO)
    //             strImg = "game/chaDaJiao"
    //         else if (nType == this.CHAHUAZHU)
    //             strImg = "game/chaHuaZhu"
            
    //         cc.loader.loadRes(strImg, cc.SpriteFrame, function (err, spriteFrame) {
    //             if (!err) {
    //                 self.chaDaJiaoSp.spriteFrame = spriteFrame;
    //             }
    //         })
    //     }
    // },

    setHuSpIsVis:function(bIsVis){
        this.huSp.node.active = bIsVis;
    },

    setDingqueSpIsVis:function(bIsVis,nType){
        var self = this;
        self.dingqueSp.node.active = bIsVis;

        if (bIsVis){
            var strImg = "game/dingque"
            if (nType == this.DINGQUEZHONG)
                strImg = "game/dingque"
            else if (nType == this.YIDINGQUE)
                strImg = "game/yidingque"
            
            cc.loader.loadRes(strImg, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.dingqueSp.spriteFrame = spriteFrame;
                }
            })
        }
    },
    setQueWanHeadIconSpIsVis:function(bIsVis,nType){
        var self = this;
        self.nDingqueType = nType;
        self.queWanHeadIconSp.node.active = bIsVis;
        
        if (bIsVis) {
            var strImg = "game/swap/wan2"
            if (nType == this.WAN)
                strImg = "game/swap/wan2"
            else if (nType == this.TIAO)
                strImg = "game/swap/tiao2"
            else if (nType == this.TONG)
                strImg = "game/swap/tong2"

            cc.loader.loadRes(strImg, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.queWanHeadIconSp.spriteFrame = spriteFrame;
                }
            })
        }
    },

    setQueWanSpIsVis:function(bIsVis,nType,bolRun){
        var self = this;
        self.nDingqueType = nType;
        var pPos = self.queWanSp.node.getPosition();
        self.queWanSp.node.active = bIsVis;

        if (bIsVis){ 
            var strImg = "game/swap/wan1"
            if (nType == this.WAN)
                strImg = "game/swap/wan1"
            else if (nType == this.TIAO)
                strImg = "game/swap/tiao1"
            else if (nType == this.TONG)
                strImg = "game/swap/tong1"

            cc.loader.loadRes(strImg, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.queWanSp.spriteFrame = spriteFrame;
                }
            })
            
            var action =  cc.delayTime(0.5);
            var TempPoint = self.queWanHeadIconSp.node.getPosition();
            var action1 = cc.scaleTo(0.2, 1.5, 1.5);
            var action2 = cc.scaleTo(0.2, 1, 1);
            var action3 = cc.moveTo(0.1, TempPoint.x, TempPoint.y + 30);
            var action4 = cc.scaleTo(0.5, 0.3, 0.3);
            var spawn = cc.spawn(action1, action2, action3, action4);
            var callBcak = cc.callFunc(function(){
                self.queWanSp.node.active = false;
                self.queWanSp.node.setScale(1);
                self.queWanSp.node.setPosition(pPos);
                self.setQueWanHeadIconSpIsVis(bIsVis,nType)
                self.dingQueFlyFinishIsVis(true);
                // Resources.playMjSoundEffect(SoundRes.SOUND_XUANQUE)
            });

            var sequence = cc.sequence(action, spawn,callBcak);
            if (bolRun)
                this.queWanSp.node.runAction(sequence);
        }       
    },

    //进入函数
    Enter: function (nPos) {
        cc.log("nPos ==========" + nPos);
        if (this.node.getChildByName("playerNode").getNumberOfRunningActions() > 0) {
            this.node.getChildByName("playerNode").stopAllActions();
        }

        var winSize = cc.director.getWinSize();

        this.node.getChildByName("playerNode").nPos = nPos;

        var Tools = require("Tools");

        //获取机器人信息
        var result = Tools.cutString(this.userInfo.getUserName(), 80, 17, this.node.getChildByName("playerNode"));
        this.playerName.getComponent(cc.Label).string = result;



        this.refreshGold(this.userInfo.getGold());
        if (nPos == 1) {
            this.node.getChildByName("playerNode").x = this.prePos.x;
            this.node.getChildByName("playerNode").y = this.prePos.y;
            var posX = 0;
            var posY = this.node.getChildByName("playerNode").y;
            var isPrivateRoom = this.node.parent.getComponent("DeskScene").getIsPrivateRoom();

            var self = this;
            var moveEnd = function () {
                if (self.userInfo.getUserStatus() == gamelibcommon.USER_READY_STATUS)
                    self.setIsReady(true);
                else {
                    if(isPrivateRoom){
                        var sendCMD = require("sendCMD");
                        sendCMD.sendCMD_PO_RESTART();
                    }
                }
            }

            var wxUserInfo = WeixinManager.getInstance().userInfo;
            if (wxUserInfo && wxUserInfo.avatarUrl) {
                var imgurl = wxUserInfo.avatarUrl //+ "?aaa=aa.jpg";
                this.userInfo.imgurl = imgurl;
                cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                    self.playerFace.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            else {
                var onEnd = function (faceUrl, nickName) {
                    var imgurl = faceUrl // + "?aaa=aa.jpg";
                    self.userInfo.imgurl = imgurl;
                    cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                        self.playerFace.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    });
                };
                this.getAvatarUrl(this.userInfo.getUserDBID(), onEnd);
            }

            var moveTo = cc.moveTo(0.4, posX, posY);
            var callback = cc.callFunc(moveEnd)
            var sequence = cc.sequence(moveTo, callback);
            this.node.getChildByName("playerNode").runAction(sequence);
        }
        else if (nPos == 4) {
            this.node.getChildByName("playerNode").x = this.prePos.x;
            this.node.getChildByName("playerNode").y = this.prePos.y;
            var posX = 0;
            var posY = this.node.getChildByName("playerNode").y;

            var self = this;
            var moveEnd = function () {
                if (self.userInfo.getUserStatus() == gamelibcommon.USER_READY_STATUS)
                    self.setIsReady(true);
            };

            var onEnd = function (faceUrl, nickName) {
                var imgurl = faceUrl // + "?aaa=aa.jpg";
                self.userInfo.imgurl = imgurl;
                cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                    self.playerFace.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            };
            this.getAvatarUrl(this.userInfo.getUserDBID(), onEnd);

            var moveTo = cc.moveTo(0.4, posX, posY);
            var callback = cc.callFunc(moveEnd)
            var sequence = cc.sequence(moveTo, callback);
            this.node.getChildByName("playerNode").runAction(sequence);
        }
        else if (nPos == 3) {
            this.node.getChildByName("playerNode").x = this.prePos.x;
            this.node.getChildByName("playerNode").y = this.prePos.y;
            var posX = this.node.getChildByName("playerNode").x;
            var posY = 0;

            var self = this;
            var moveEnd = function () {
                if (self.userInfo.getUserStatus() == gamelibcommon.USER_READY_STATUS)
                    self.setIsReady(true);
            };

            var onEnd = function (faceUrl, nickName) {
                var imgurl = faceUrl// + "?aaa=aa.jpg";
                self.userInfo.imgurl = imgurl;
                cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                    self.playerFace.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            };
            this.getAvatarUrl(this.userInfo.getUserDBID(), onEnd);

            var moveTo = cc.moveTo(0.4, posX, posY);
            var callback = cc.callFunc(moveEnd)
            var sequence = cc.sequence(moveTo, callback);
            this.node.getChildByName("playerNode").runAction(sequence);
        }
        else if (nPos == 2) {
            this.node.getChildByName("playerNode").x = this.prePos.x;
            this.node.getChildByName("playerNode").y = this.prePos.y;
            var posX = 0;
            var posY = this.node.getChildByName("playerNode").y;

            var self = this;
            var moveEnd = function () {
                if (self.userInfo.getUserStatus() == gamelibcommon.USER_READY_STATUS)
                    self.setIsReady(true);
            };

            var onEnd = function (faceUrl, nickName) {
                var imgurl = faceUrl// + "?aaa=aa.jpeg";
                self.userInfo.imgurl = imgurl;
                cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                    self.playerFace.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            };
            this.getAvatarUrl(this.userInfo.getUserDBID(), onEnd);

            var moveTo = cc.moveTo(0.4, posX, posY);
            var callback = cc.callFunc(moveEnd)
            var sequence = cc.sequence(moveTo, callback);
            this.node.getChildByName("playerNode").runAction(sequence);
        }
    },

    //退出
    Exit: function (nPos) {
        //判断是不是排位赛，是排位赛就不弹出
        var isPrivateRoom = this.node.parent.getComponent("DeskScene").getIsPrivateRoom();
        if (isPrivateRoom) {
            return;
        }
        // var winSize = cc.director.getWinSize();
        if (nPos == 1) {
            var act = cc.moveTo(0.4, this.prePos.x, this.prePos.y);
            this.node.getChildByName("playerNode").runAction(act);
        }
        else if (nPos == 2) {
            var act = cc.moveTo(0.4, this.prePos.x, this.prePos.y);
            this.node.getChildByName("playerNode").runAction(act);
        }
        else if (nPos == 3) {
            var act = cc.moveTo(0.4, this.prePos.x, this.prePos.y);
            this.node.getChildByName("playerNode").runAction(act);
        }
        else if (nPos == 4) {
            var act = cc.moveTo(0.4, this.prePos.x, this.prePos.y);
            this.node.getChildByName("playerNode").runAction(act);
        }
    },

    getPlayerName: function () {
        return this.playerName.getComponent(cc.Label).string;
    },

    getSex: function () {
        if(this.userInfo){
            return this.userInfo.getSex();
        }
        else{
            return gamelibcommon.SX_BOY;
        }
        
    },

    getGold: function () {
        return this.m_lGold;
    },

    setIsReady: function (bIsReady) {
        this.ready.active = bIsReady;
    },

    setIsoffLine: function (bIsOffline) {
        this.offLine.active = bIsOffline;
    },

    //设定是否托管了
    setIsRobot: function (bIsRobot) {
        this.robot.active = bIsRobot;
    },

    setIsWinner: function (bIsWinner) {
        this.m_isWinner = bIsWinner;
    },

    getIsValidPlayer: function () {
        if (this.userInfo) {
            return true;
        }

        return false;
    },

    getIsWinner: function () {
        return this.m_isWinner;
    },

    //获取头像地址
    getFaceUrl: function () {
        if(this.userInfo){
            return this.userInfo.imgurl;
        }
        return "";
    },

    //游戏结束时候设定最后的分数
    setLastGoldOnGameOver: function (nGold) {
        this.m_nLastGold = nGold;
    },

    turnToOutPlayCardIsVis: function (bIsPlaying) {
        var playerNode = this.node.getChildByName("playerNode");
        var whosTurnNode = playerNode.getChildByName("whosturn_act");


        if (bIsPlaying) {
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('Animation2');
        }
        else {
            whosTurnNode.active = false;
        }
    },

    dingQueFlyFinishIsVis: function (bIsPlaying) {
        var playerNode = this.node.getChildByName("playerNode");
        var whosTurnNode = playerNode.getChildByName("queyimen_act");


        if (bIsPlaying) {
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
            var animState = dragonDisplay.playAnimation('Animation1');

            Resources.playCommonEffect("qingQue.mp3");
            var self = this;
            var callback = function () {
                self.dingQueFlyFinishIsVis(false);
                dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
            }
    
            dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
        }
        else {
            whosTurnNode.active = false;
        }
    },

    texiaoIsVis: function (bIsPlaying,texiaoName) {
        // var playerNode = this.node.getChildByName("playerNode");
        var whosTurnNode = this.node.getChildByName("texiao_act");

        if (bIsPlaying) {
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
            var animState = dragonDisplay.playAnimation(texiaoName,1);
            if(animState){
                animState.timeScale = 1.5;
            }
            
            var self = this;
            var callback = function () {
                self.texiaoIsVis(false);
                dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
            }
    
            dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
        }
        else {
            whosTurnNode.active = false;
        }
    },

    stopWinAction: function () {
        var playerNode = this.node.getChildByName("playerNode");
        var winNode = playerNode.getChildByName("win_act");
        winNode.active = false;
    },

    //播放玩家赢牌特效
    playWinAction: function () {
        var playerNode = this.node.getChildByName("playerNode");
        var winNode = playerNode.getChildByName("win_act");
        winNode.active = true;
        var dragonDisplay = winNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation('Animation2');

        var self = this;
        var callback = function () {
            self.stopWinAction();
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },


    //设置临时改变金币
    setTempChangeGold: function (nGold, callback,bolChaDaJiao,bolGameOver) {
        var self = this;
        if (this.isMoveGold)
        {
            var delayTime = cc.delayTime(1.5);
            this.node.runAction(delayTime);
        }
        this.m_lGold += nGold;
        if (this.m_lGold < 0) {
            this.m_lGold = 0;
        }
        
        this.refreshGold(this.m_lGold);
        
        var resultScoreBg = this.node.getChildByName("flyScoreBg");
        var resultScoreNode = resultScoreBg.getChildByName("result_score");
        // if (!bolChaDaJiao){
            resultScoreBg.active = true;
        // }
        resultScoreNode.getComponent(cc.Label).isSystemFontUsed = false;
        if (nGold > 0) {
            resultScoreNode.getComponent(cc.Label).font = this.winResultFont;
            resultScoreNode.getComponent(cc.Label).string = "+" + nGold;
        }
        else {
            resultScoreNode.getComponent(cc.Label).font = this.loseResultFont;
            resultScoreNode.getComponent(cc.Label).string = nGold;
        }

        var prePos = cc.p(resultScoreBg.getPosition());
        this.isMoveGold = true;
        var moveTo = cc.moveTo(1, cc.p(resultScoreBg.x, resultScoreBg.y + 30));
        var delayTime = cc.delayTime(1);

        var playSound = cc.callFunc(() => {
            Resources.playCommonEffect("coin_fly_start_sound.mp3");
        })
        var spawn = cc.spawn(moveTo, playSound);

        var onEnd = cc.callFunc(() => {
            self.isMoveGold = false;
            resultScoreNode.getComponent(cc.Label).string = "";
            resultScoreBg.setPosition(prePos);
            resultScoreBg.active = false;
            if (callback) {
                callback();
            }
        })

        var sequence = null;
        if (bolGameOver){
            if (this.m_nLastGold > 0) {
                resultScoreNode.getComponent(cc.Label).font = this.winResultFont;
                resultScoreNode.getComponent(cc.Label).string = "+" + this.m_nLastGold;
            }
            else {
                resultScoreNode.getComponent(cc.Label).font = this.loseResultFont;
                resultScoreNode.getComponent(cc.Label).string = this.m_nLastGold;
            }
            sequence = cc.sequence(spawn, delayTime, onEnd);
        }
        else{
            sequence = cc.sequence(moveTo, delayTime, onEnd);
        }
        resultScoreBg.runAction(sequence);
    },

    showCharmNumAction:function(num){
        var contentSize = this.node.getContentSize();

        var charmNode = new cc.Node();
        charmNode.setScale(0.6);
        charmNode.setAnchorPoint(cc.v2(1, 0.5));
        this.node.addChild(charmNode);
        charmNode.addComponent(cc.Sprite);
        charmNode.getComponent(cc.Sprite).spriteFrame = this.charmAssets;
        charmNode.setLocalZOrder(100)

        var numNode = new cc.Node();
        numNode.setAnchorPoint(cc.v2(0, 0.5));
        this.node.addChild(numNode);
        numNode.addComponent(cc.Label);
        numNode.setPosition(cc.v2(0, -20))
        numNode.getComponent(cc.Label).isSystemFontUsed = false;
        numNode.getComponent(cc.Label).font = this.charmNumAssets;
        if(num > 0){
            num = "+" + num;
        }
        numNode.getComponent(cc.Label).string = num;
        numNode.setLocalZOrder(100)

        var moveTo1 = cc.moveTo(0.2, 0, contentSize.height / 2 - 17);
        var delay1 = cc.delayTime(1);
        var fadeOut1 = cc.fadeOut(0.2);
        var sequence1 = cc.sequence(moveTo1, delay1, fadeOut1);
        numNode.runAction(sequence1);

        var moveTo2 = cc.moveTo(0.2, 0, contentSize.height / 2);
        var delay2 = cc.delayTime(1);
        var fadeOut2 = cc.fadeOut(0.2);
        var sequence2 = cc.sequence(moveTo2, delay2, fadeOut2);
        charmNode.runAction(sequence2); 
    },

    playGuaFengEffects: function (bIsPlaying,nPos) {
        var playerNode = this.node.getChildByName("playerNode");
        var whosTurnNode = playerNode.getChildByName("guafeng_act");
        if (nPos == 1) {
            whosTurnNode.x = 0;
            whosTurnNode.y = -170;
        }
        else if (nPos == 2) {
            whosTurnNode.x = 345;
            whosTurnNode.y = 30;
        }
        else if (nPos == 3) {
            whosTurnNode.x = 0;
            whosTurnNode.y = 205;
        }
        else if (nPos == 4) {
            whosTurnNode.x = -365;
            whosTurnNode.y = 30;
        }

        if (bIsPlaying) {
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('Animation2');

            var self = this;
            var callback = function () {
                // self.dingQueFlyFinishIsVis(false);
                dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
            }
    
            dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
        }
        else {
            whosTurnNode.active = false;
        }

    },

    playOperateEffects: function (effect, nPos) {

        var spriteFrameName;

        var GameCfg = require("GameCfg");

        //碰
        if (effect == GameCfg.EffectList.No_1pen) {
            spriteFrameName = "No_1pen";
        }
        //吃
        else if (effect == GameCfg.EffectList.No_2chi) {
            spriteFrameName = "No_2chi";
        }
        //杠
        else if (effect == GameCfg.EffectList.No_2gang) {
            spriteFrameName = "No_2gang";
        }
        //胡
        else if (effect == GameCfg.EffectList.No_2hu) {
            spriteFrameName = "No_2hu";
        }
        else if (effect == GameCfg.EffectList.No_2ZiMo) {
            spriteFrameName = "No_2ZiMo";
        }
        //放炮
        else if (effect == GameCfg.EffectList.No_2FanPao) {
            spriteFrameName = "No_2FanPao";
        }
        //流局
        else if (effect == GameCfg.EffectList.No_2LiuJu) {
            spriteFrameName = "No_2LiuJu";
        }
        //癞
        else if (effect == GameCfg.EffectList.No_1lai) {
            spriteFrameName = "No_1lai";
        }
        //查大叫
        else if (effect == GameCfg.EffectList.No_2ChaDaJiao) {
            spriteFrameName = "No_2ChaDaJiao";
        }
        //查花猪
        else if (effect == GameCfg.EffectList.No_2ChaHuaZhu) {
            spriteFrameName = "No_2ChaHuaZhu";
        }
        else if (effect == GameCfg.EffectList.No_2caotian) {
            spriteFrameName = "No_2caotian";
        }

        // var winSize = cc.director.getWinSize();
        // if (nPos == 1) {
        //     texiaoNode.x = 0;
        //     texiaoNode.y = -170;
        // }

        if (spriteFrameName) {
            this.texiaoIsVis(true,spriteFrameName)
        }
    },

    showChatTextInfo: function (chatStr) {
        var wordIndex = -1;
        for (var i in Resources.QUICK_SEND_CHATS) {
            if (chatStr == Resources.QUICK_SEND_CHATS[i]) {
                wordIndex = i;
                break;
            }
        }

        Resources.playQWSoundEffect(this.userInfo.getSex(), parseInt(wordIndex) + 1)

        var playerNode = this.node.getChildByName("playerNode");

        var chat = playerNode.getChildByName("chat_bg");

        chat.stopAllActions();

        chat.setScale(0.5);

        chat.setOpacity(255)

        chat.active = true;

        var chattingNode = chat.getChildByName("chatting_status");

        var animation = chattingNode.getComponent(cc.Animation);

        var animState = animation.play("spot_wait_action");

        animState.speed = 0.3;  //减慢动画播放速度

        animState.wrapMode = cc.WrapMode.Loop;

        animState.repeatCount = Infinity;

        var scale1 = cc.scaleTo(0.2, 1.1);
        var scale2 = cc.scaleTo(0.2, 1);
        var delayTime = cc.delayTime(2);

        var fadeOut = cc.fadeOut(0.2);
        var scale3 = cc.scaleTo(0.2, 0.5);

        var spawn = cc.spawn(fadeOut, scale3);

        var onEnd = cc.callFunc(() => {

            chat.active = false;
        })

        var sequence = cc.sequence(scale1, scale2, delayTime, spawn, onEnd);

        chat.runAction(sequence);

    },

    showChatFaceInfo: function (faceId) {
        var node = new cc.Node();
        node.x = this.playerFace.x;
        node.y = this.playerFace.y
        node.active = true;
        this.node.getChildByName("playerNode").addChild(node, 100);
        var dragonDisplay = node.addComponent(dragonBones.ArmatureDisplay);
        for (var i in this.biaoqinAssets) {
            if (this.biaoqinAssets[i] instanceof dragonBones.DragonBonesAsset) {
                dragonDisplay.dragonAsset = this.biaoqinAssets[i];
            }
            if (this.biaoqinAssets[i] instanceof dragonBones.DragonBonesAtlasAsset) {
                dragonDisplay.dragonAtlasAsset = this.biaoqinAssets[i];
            }
        }

        Resources.playFaceEffect(Resources.FACE_EFFECT[faceId]);

        dragonDisplay.armatureName = 'armatureName';
        dragonDisplay.playAnimation(faceId + 1);
        this.onArmatureFinish = function () {
            node.destroy();
        }
        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onArmatureFinish, this)
        this.faceDragonDisplay = dragonDisplay;
    },


    startLeaveTimerOnGameOver: function () {
        // if (this.m_nPos == 1 || this.node.name == "myself") {
        //     return;
        // }

        var totalTime = 60;

        var playerNode = this.node.getChildByName("playerNode");
        var ready_timer = playerNode.getChildByName("ready_timer");
        ready_timer.active = false;
        ready_timer.getComponent(cc.Label).string = totalTime;

        var self = this;
        var callback = function () {
            if (self.m_leaveTimerStop) {
                return;
            }
            totalTime -= 1;
            ready_timer.getComponent(cc.Label).string = totalTime;

            if (totalTime >= 0) {
                TSCommon.performWithDelay(self, callback, 1);
            }
            else {
                ready_timer.active = false;

                if (self.m_nPos == 1 || self.node.name == "myself") {
                    require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
                    return;
                }
            }
        }

        TSCommon.performWithDelay(this, callback, 1);
    },


    stopLeaveTimer: function () {
        this.m_leaveTimerStop = true;
    },

    //展示玩家离开定时器
    showLeaveTimer: function () {
        // if (this.m_nPos == 1 || this.node.name == "myself") {
        //     return;
        // }
        var playerNode = this.node.getChildByName("playerNode");
        var ready_timer = playerNode.getChildByName("ready_timer");
        ready_timer.active = true;
    },

    //隐藏玩家离开定时器
    hideLeaveTimer: function () {
        // if (this.m_nPos == 1 || this.node.name == "myself") {
        //     return;
        // }
        var playerNode = this.node.getChildByName("playerNode");
        var ready_timer = playerNode.getChildByName("ready_timer");
        ready_timer.active = false;
    },

    //游戏结束
    gameOver: function () {
        this.isMoveGold = false;
        this.nDingqueType = -1;
        this.turnToOutPlayCardIsVis(false);
        // this.setChaDaJiaoSpIsVis(false);
        this.startLeaveTimerOnGameOver();
        this.setHuSpIsVis(false);
        this.setPoChanVis(false);
        // var playerNode = this.node.getChildByName("playerNode");
        // var resultScoreBg = playerNode.getChildByName("flyScoreBg");
        // var resultScoreNode = resultScoreBg.getChildByName("result_score");
        // resultScoreNode.getComponent(cc.Label).isSystemFontUsed = false;
        // if (this.m_nLastGold >= 0) {
        //     resultScoreNode.getComponent(cc.Label).font = this.winResultFont
        //     resultScoreNode.getComponent(cc.Label).string = "+" + this.m_nLastGold;
        // }
        // else {
        //     resultScoreNode.getComponent(cc.Label).font = this.loseResultFont
        //     resultScoreNode.getComponent(cc.Label).string = this.m_nLastGold;
        // }

        // resultScoreBg.active = true;

        if (this.getIsValidPlayer()) {

            if (this.m_isWinner) {
                this.playWinAction();
            }

            this.node.getComponent("PlayerCardLayer").gameOver();

            this.node.getComponent("OutCardLayer").gameOver();

            this.node.getComponent("HuCardLayer").gameOver();
        }
    },

    //游戏重新开始需要清理的东西
    cleanPlayers: function () {

        this.node.getComponent("PlayerCardLayer").cleanAllMjs();

        this.node.getComponent("OutCardLayer").cleanAllMjs();

        this.node.getComponent("HuCardLayer").cleanAllMjs();

        var resultScoreNode = this.node.getChildByName("flyScoreBg");
        resultScoreNode.active = false;
    },

});
