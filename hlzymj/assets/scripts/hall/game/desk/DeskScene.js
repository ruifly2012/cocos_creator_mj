import { ByteArray } from "../../common/ByteArray"
import { TSCommon } from "../../TSCommon"
import { gamelibcommon } from "../../gamelib/gamelibcommon";
import { WeixinManager } from "../../weixin/WeixinManager";
var GameCfg = require("GameCfg");
var GameLibSink = require("GameLibSink");
var GameDefs = require("GameDefs");
var Tools = require("Tools");
var sendCMD = require("sendCMD");
var Resources = require("Resources");
var HallResources = require("HallResources");
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        myself: {
            default: null,
            type: cc.Node,
        },

        right: {
            default: null,
            type: cc.Node,
        },

        top: {
            default: null,
            type: cc.Node,
        },

        left: {
            default: null,
            type: cc.Node,
        },

        //游戏结束层
        gameOverLayer: {
            default: null,
            type: cc.Node,
        },

        //段位赛结束层
        matchGameOverLayer:{
            default: null,
            type: cc.Node,
        },

        //游戏结算层
        gameResultLayer: {
            default: null,
            type: cc.Node,
        },

        //更多选项层
        moreSettingLayer: {
            default: null,
            type: cc.Node,
        },

        //匹配赛段位晋升界面
        levelUpgradeLayer:{
            default: null,
            type: cc.Node, 
        },

        protectScoreLayer:{
            default: null,
            type: cc.Node, 
        },

        //听牌层
        listenCardLayer: {
            default: null,
            type: cc.Node,
        },

        directAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },

        //公共提示预置体
        commonTipsPrefab: {
            default: null,
            type: cc.Prefab,
        },

        //商城界面
        mallLayer: {
            default: null,
            type: cc.Node,
        },

        //聊天图集
        chatAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },

        bgMusic: {
            default: null,
            url: cc.AudioClip,
        },

        //选牌提示界面
        xuanPaiTipsLayer:{
            default: null,
            type: cc.Node, 
        },

        //换牌提示界面
        huanPaiTipsLayer:{
            default: null,
            type: cc.Node, 
        },

        //缺一门提示界面
        queYiMenTipsLayer:{
            default: null,
            type: cc.Node, 
        },

        //缺一门按钮界面
        queYiMenButtonLayer:{
            default: null,
            type: cc.Node, 
        },

        xuanPaiTipsTimes:{
            default: null,
            type: cc.Label, 
        },

        gameTitle:{
            default: null,
            type: cc.Sprite, 
        },

        //连胜界面
        continueWinLayer: {
            default: null,
            type: cc.Node,
        },

        backToDataMsg: {
            default: null,
            type: cc.Button,
        },

        nextGameBtn2: {
            default: null,
            type: cc.Button,
        },

        huTips: {
            default: null,
            type: cc.Sprite,
        },

        robotTips: {
            default: null,
            type: cc.Sprite,
        },
        GAMETIMER_COUNT: 10,
        CHANGE_THREE_COUNT: 15,
        XUANPAI_COUNT: 8,
    },

    onLoad: function () {
        cc.audioEngine.stopAll();
        //玩家离开游戏，头像延迟消失的处理,这个为了防止金币场游戏开始前就设置为true，必须在场景大于startgame的时候才设置为true。在gameover之后才设置为false
        this.openGmae = false;
        var self = this;
        this.isMyFirstHu = false;

        this.isMeClickRobot = false;

        this.afterHuOutCardTimes = 0;

        this.queyimenTipsTimes = 0;

        if (require("HallUtils").isIPhoneX()) {
            if (!cc.sys.isNative && cc.sys.isMobile) {
                var canvasFit = this.node.getComponent(cc.Canvas);
                canvasFit.fitHeight = true;
                canvasFit.fitWidth = false;
            }

            this.loadIphoneXBgRes();
        }
        else{
            this.loadNomalBgRes();
        }

        cc.loader.loadRes("animation/frameAction/mj_action", function (err, clip) {
            if (!err) {
                self.mj_actionClip = clip;
            }
        })

        cc.loader.loadRes("animation/frameAction/me_action", function (err, clip) {
            if (!err) {
                self.me_actionClip = clip;
            }
        })

        cc.loader.loadRes("animation/frameAction/left_action", function (err, clip) {
            if (!err) {
                self.left_actionClip = clip;
            }
        })

        cc.loader.loadRes("animation/frameAction/right_action", function (err, clip) {
            if (!err) {
                self.right_actionClip = clip;
            }
        })

        cc.loader.loadRes("animation/frameAction/top_action", function (err, clip) {
            if (!err) {
                self.top_actionClip = clip;
            }
        })

        cc.loader.loadResDir("animation/dragonBones/texiao_hupai", function (err, assets) {
            self.hupaiAssets = assets;
        })

        this.node.on("onUserEnterTable", (event) => {
            this.onUserEnterTable(event.detail.chair, event.detail.wUserID, event.detail.isPlayer);
        });

        this.node.on("onUserExitTable", (event) => {
            this.onUserExitTable(event.detail.chair, event.detail.wUserID, event.detail.isPlayer)
        });

        this.node.on("onPlayerStateChanged", (event) => {
            this.onPlayerStateChanged(event.detail.chair, event.detail.nOldState, event.detail.nNewState)
        });

        this.node.on("onSceneChanged", (event) => {
            this.onSceneChanged(event.detail.data);
        }, this);

        this.node.on("onGameMessage", (event) => {
            this.onGameMessage(event.detail.chair, event.detail.cCmdID, event.detail.data);
        }, this);

        this.node.on("onRecvTableChat", (event) => {
            this.onRecvTableChat(event.detail.chatMsg);
        })

        this.node.on("updateUserInfo", (event) => {
            this.updateUserInfo(event.detail.user);
        })

        this.init();

        this.initUI();

        TSCommon.addEvent(GameCfg.changeDeskBg, this.onChangeDeskBg, this);

        TSCommon.addEvent(GameCfg.GAME_RESTART, this.onGameReStart, this);

        TSCommon.addEvent(GameCfg.NOTIFICATION_LISTENCARD, this.judgeIsTingCard, this);

        TSCommon.addEvent(GameCfg.openBgMusic, this.onPlayBgMusic, this);

        TSCommon.addEvent(GameCfg.closeBgMusic, this.onCloseBgMusic, this)

        TSCommon.addEvent(GameCfg.NOTIFICATION_ROBOT, this.onRobot, this)

        if(this.getIsPrivateRoom()){
            this.getGameLib().sitTable(this.getGameLibSink().s_nPrivateRoomTableNo,this.getGameLibSink().s_nPrivateRoomChairNo)
        }
        else{
            this.getGameLib().autoSit();
        }

        
        //设定游戏icon
        if(this.IsCXZ()){
            cc.loader.loadRes("game/cxz_title", cc.SpriteFrame, function (err, spriteFrame) {
                
                if (!err) {
                    self.node.getChildByName("game_icon").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            })
        }

        //播放背景音乐
        var bgMusicOpen = parseInt(cc.sys.localStorage.getItem("bgMusic") || 0);
        if (bgMusicOpen!= 0) {
            this.onPlayBgMusic();
        }


        //由于段位赛结算界面点击准备需要跳转到大厅打开匹配
        G.matchGameReady = false; 
        // G.goldGameReady = null;

        this.moreSettingLayer.getComponent("MoreSettingLayer").setIsPrivateRoom(this.getIsPrivateRoom());
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cc.audioEngine.pauseAll2");
            cc.audioEngine.stopAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cc.audioEngine.rePlay2");
            cc.audioEngine.resumeAll();
            cc.audioEngine.play(self.bgMusic, true);
        });
    },

    onDestroy: function () {

        var scheduler = cc.director.getScheduler();

        scheduler.unscheduleCallbackForTarget(this, this._signalUpdate);

        scheduler.unscheduleCallbackForTarget(this, this._timerUpdate);

        TSCommon.removeEvent(GameCfg.GAME_RESTART, this.onGameReStart, this);

        TSCommon.removeEvent(GameCfg.changeDeskBg, this.onChangeDeskBg, this);

        TSCommon.removeEvent(GameCfg.NOTIFICATION_LISTENCARD, this.judgeIsTingCard, this);

        TSCommon.removeEvent(GameCfg.NOTIFICATION_ROBOT, this.onRobot, this)

        this.onCloseBgMusic();

        this.m_stSaveSceneData = null;

        this.getGameLibSink()._clientFrameSink.m_dataEventHandler = null;
        cc.log("exit scene");
    },


    loadNomalBgRes:function(){
        var self = this;
        var index = cc.sys.localStorage.getItem("deskBg") || 0;
        cc.loader.loadRes("texture/gameDeskButton/background1", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.m_bg1Frame = spriteFrame;

                self.onChangeDeskBg(null, index);
            }
        })

        cc.loader.loadRes("game/background2", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.m_bg2Frame = spriteFrame;
                self.onChangeDeskBg(null, index);
            }
        })

        // cc.loader.loadRes("game/background3", cc.SpriteFrame, function (err, spriteFrame) {
        //     if (!err) {
        //         self.m_bg3Frame = spriteFrame;
        //         self.onChangeDeskBg(null, index);
        //     }
        // })
    },

    loadIphoneXBgRes:function(){
        var self = this;
        var index = cc.sys.localStorage.getItem("deskBg") || 0;
        cc.loader.loadRes("texture/gameDeskButton/background1_x", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.m_bg1Frame = spriteFrame;

                self.onChangeDeskBg(null, index);
            }
        })

        cc.loader.loadRes("game/background2_x", cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.m_bg2Frame = spriteFrame;
                self.onChangeDeskBg(null, index);
            }
        })

        // cc.loader.loadRes("game/background3", cc.SpriteFrame, function (err, spriteFrame) {
        //     if (!err) {
        //         self.m_bg3Frame = spriteFrame;
        //         self.onChangeDeskBg(null, index);
        //     }
        // })
    },


    init: function () {
        this.getGameLibSink()._clientFrameSink.m_dataEventHandler = this.node;
        this.m_bIsOffLine = false;
        this.isClick = false;
        this.pochanFlag = false;
        this.bolTips20Card = false;
    },


    //初始化UI信息
    initUI: function () {
        var self = this;
        if(this.IsXueZhan())
        {
            cc.loader.loadRes("game/xuezhan_title",cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.gameTitle.spriteFrame = spriteFrame;
                }
            });
        }
        var gameInfoNode = this.node.getChildByName("game_base_info");

        if(this.getIsPrivateRoom()){
            gameInfoNode.getChildByName("gold_game_info").active = false;
            gameInfoNode.getChildByName("match_game_info").active = true;
        }
        else{
            gameInfoNode.getChildByName("gold_game_info").active = true;
            gameInfoNode.getChildByName("match_game_info").active = false;
        }

        //将玩家手上的牌都设置为不可见
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            var node = this.getPlayerByPos(nPos);
            var holdCardsNode = node.getChildByName("holds");
            for (var i = 0; i < holdCardsNode.childrenCount; i++) {
                var cardNode = holdCardsNode.children[i];
                cardNode.active = false;
            }

            var outCardsNode = node.getChildByName("outcards");
            for (var i = 0; i < outCardsNode.childrenCount; i++) {
                outCardsNode.children[i].active = false;
            }

            var outLaiziGangNode = node.getChildByName("zhonglaigang");
            for (var i = 0; i < outLaiziGangNode.childrenCount; i++) {
                outLaiziGangNode.children[i].active = false;
            }

            var penggangNodes = node.getChildByName("penggangs");
            for (var i = 0; i < penggangNodes.childrenCount; i++) {
                penggangNodes.children[i].active = false;
            }

            var Player = node.getComponent("Player");
            Player.stopWinAction();
        }

        var arrow = this.node.getChildByName("arrow");
        var diceBg = arrow.getChildByName("dice_bg");
        var timeLabel = arrow.getChildByName("timeLabel");
        diceBg.active = false;
        timeLabel.active = false;

        var laiziNode = this.node.getChildByName("laizi");
        laiziNode.active = false;


        this.listenCardLayer.active = false;
        this.gameOverLayer.active = false;

        this.matchGameOverLayer.active = false;
        this.gameResultLayer.active = false;

        this.levelUpgradeLayer.active = false;

        this.protectScoreLayer.active = false;

        this.mallLayer.active = false;
        
        this.continueWinLayer.active = false;

        this.showSignalUI();
    },

    onChangeDeskBg: function (event, setIndex) {

        var index = 0;

        if (!event) {
            index = setIndex;
        } else {
            index = event.data;
        }

        var spriteFrame;

        // cc.log("index ===========", index);

        if (index == 0) {
            spriteFrame = this.m_bg1Frame
        }
        else if (index == 1) {
            spriteFrame = this.m_bg2Frame
        }
        else if (index == 2) {
            spriteFrame = this.m_bg3Frame
        }
        else {
            console.log("not extra");
        }

        if (!spriteFrame) {
            return;
        }
        this.bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    },

    onPlayBgMusic: function () {
        if (this.bgMusic) {
            this.m_bgMusicAudioID = cc.audioEngine.play(this.bgMusic, true);
        }
    },

    onCloseBgMusic: function () {
        if (this.m_bgMusicAudioID != undefined) {
            cc.audioEngine.stop(this.m_bgMusicAudioID)
        }
    },

    onRobot:function(){
        if( this.m_stSceneData && this.m_stSceneData.cbPhase != GameDefs.GamePhase.PhaseEnd)
        {
            this.isMeClickRobot = true;
            sendCMD.sendCMD_PO_ROBOTPLAYSTART()
        }
        else{
            Resources.ShowToast("游戏还没有开始不能托管");
        }
    
    },

    getGameLibSink: function () {
        return require('GameLibSink').getInstance();
    },

    getGameLib: function () {
        return require('GameLibSink').getInstance().getGameLib();
    },

    PosFromChair: function (cbChair) {
        var gamelib = this.getGameLib();
        var nPos = gamelib.getRelativePos(cbChair) + 1;
        // cc.log("PosFromChair -------------- nPos === " + nPos);

        if(this.getGameLibSink().m_chairCount == 4){
  
            if(this.m_cbMyChair == 0 && this.IsCXZ() && nPos == 3){
                nPos = 4;
            }
            else if(this.m_cbMyChair == 2 && this.IsCXZ() && nPos == 3){
                nPos = 2;
            }
        }
        else if(this.getGameLibSink().m_chairCount == 3){
            if(nPos == 3){
                nPos = 4;
            }
        }

        return nPos;
    },

    ChairFromPos: function (nPos) {
        if (this.IsCXZ() && nPos >= 4) {
            nPos = 3;
        }
        var gamelib = this.getGameLib();
        return gamelib.getRealChair(nPos)
    },

    getIsPrivateRoom: function () {
        // return false;
        return this.getGameLib().isInPrivateRoom();
    },

    sit: function () {
        this.getGameLib().autoSit();
    },

    getPlayerByPos: function (nPos) {
        if (nPos == 1) {
            return this.myself;
        }
        else if (nPos == 2) {
            return this.right;
        }
        else if (nPos == 3) {
            return this.top;
        }
        else if (nPos == 4) {
            return this.left;
        }
    },

    //获取自身的信息
    GetMyInfo: function () {
        var gamelib = this.getGameLib();
        this.m_pMyself = gamelib.getMyself();
        if (this.m_pMyself != null) {
            this.m_cbMyChair = this.m_pMyself.getUserChair();

            //刷新相应的金币
        }
        else {

        }
    },
    IsXueZhan:function(){
        if (this.getIsPrivateRoom())
            return false;
        return this.getGameLibSink().getGameId() == 44;
    },

    IsGuangDong:function(){
        if (this.getIsPrivateRoom())
            return false;
        return this.getGameLibSink().getGameId() == 97;
    },

    //表示是否是戳虾子游戏
    IsCXZ: function () {

        var ret = false;
        var curRoom = this.getGameLib().getCurrentGameRoom();
        
        if(curRoom){
            if (curRoom.szGameRoomName && curRoom.szGameRoomName.indexOf("三人场") >= 0) {
                ret = true;
            }
        }
        else{
            //表示通过好友场
            if( this.getGameLibSink().m_nChairCount == 3){
                ret = true;
            }
        }

        return ret;
    },

    //获取自己的状态
    MyState: function () {
        if (!this.m_pMyself) {
            return gamelibcommon.USER_NO_STATUS;
        }

        return this.m_pMyself.getUserStatus();
    },

    getTotalMjCount: function () {
        var total = GameDefs.MAJIANG_COUNT;
        if (this.IsCXZ()) {
            total = 72;       //去掉万字
        }
        else {
            total = 108;
        }

        return total;
    },

    //获取剩余麻将数量
    getRestMjCount: function () {
        if (!this.m_stSceneData || !this.m_stSceneData.cbPhase)
            return 0;

        return this.getTotalMjCount() - (this.m_stSceneData.cbCurrentIndex + this.m_stSceneData.cbLastIndex);
    },

    onUserEnterTable: function (nChair, wUserID, bIsPlayer) {
        // cc.log("----- DeskScene onUserEnterTable ------");
        if (bIsPlayer == false) {
            cc.log("bIsPlayer == false return");
            return;
        }

        this.GetMyInfo();

        var userInfo = this.getGameLib().getUser(wUserID);
        if (userInfo == null) {
            cc.log("userInfo is null");
            return;
        }

        Resources.playCommonEffect("enter.mp3");

        this.initAddDirection(this.PosFromChair(0) - 1)

        if (nChair == this.m_cbMyChair) {
            if (this.MyState() == gamelibcommon.USER_PLAY_GAME || this.MyState() == gamelibcommon.USER_OFF_LINE) {
                this.m_bIsOffLine = true;
            }
        }

        
        var nPos = this.PosFromChair(nChair);
        var node = this.getPlayerByPos(nPos);
        var player = node.getComponent('Player');

        player.Come(nPos, userInfo);
    },


    onUserExitTable: function (nChair, wUserID, bIsPlayer) {
        if (bIsPlayer == false) {
            return;
        }

        var nPos = this.PosFromChair(nChair);
        var node = this.getPlayerByPos(nPos);
        var player = node.getComponent('Player');
        player.Leave(nPos);

        Resources.playCommonEffect("exit.mp3");

        //表示如果是自己离开了
        if (nChair == this.m_cbMyChair) {

        }
        else {

            //其他人离开了
        }

        // if (bIsPlayer == false) {
        //     return;
        // }
        // var self = this;
        // self.n_Chair = nChair;
        // var callback = function(){
        //     var nPos = self.PosFromChair(self.n_Chair);
        //     var node = self.getPlayerByPos(nPos);
        //     var player = node.getComponent('Player');
        //     player.Leave(nPos);
        //     Resources.playCommonEffect("exit.mp3");
        // }

        // if(this.openGmae){
        //     TSCommon.performWithDelay(this, callback, 3);
        // }
        // else{
        //     callback();
        // }
        // //表示如果是自己离开了
        // if (nChair == this.m_cbMyChair) {

        // }
        // else {
        //     //其他人离开了
        // }
    },


    updateUserInfo: function (user) {
        if (user) {
            this.m_pMyself = this.getGameLib().getMyself();
            if (this.m_pMyself && user.getUserDBID() == this.m_pMyself.getUserDBID()) {
                this.getPlayerByPos(1).getComponent("Player").refreshGold(user.getGold());
                return;
            }

            var cbChair = user.getUserChair();
            if (GameCfg.Pub_IsValidChair(cbChair)) {
                this.getPlayerByPos(this.PosFromChair(cbChair)).getComponent("Player").refreshGold(user.getGold());
            }
        }
    },

    //判定游戏是否正在进行中  游戏结束和游戏开始时都会返回false
    getIsGameRunning: function () {
        if (this.m_stSceneData) {
            return this.m_stSceneData.cbPhase > GameDefs.GamePhase.PhasePlayDingque && this.m_stSceneData.cbPhase < GameDefs.GamePhase.PhaseEnd;
        }

        return false;
    },

    getIsDingQue: function () {
        if (this.m_stSceneData) {
            return this.m_stSceneData.cbPhase >= GameDefs.GamePhase.PhasePlayDingque;
        }

        return false;
    },

    //判定游戏是否是换牌状态
    getIsGameChangeMjing: function () {
        if (this.m_stSceneData) {
            return this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseExchange;
        }

        return false;
    },

    initAddDirection: function (nMyChair) {
        var directTable = [
            [
                ["dong_down"], ["nan_right"], ["xi_top"], ["bei_left"]
            ],
            [
                ["bei_down"], ["dong_right"], ["nan_top"], ["xi_left"]
            ],
            [
                ["xi_down"], ["bei_right"], ["dong_top"], ["nan_left"]
            ],
            [
                ["nan_down"], ["xi_right"], ["bei_top"], ["dong_left"]
            ]
        ];

        this.directTable = directTable;

        var nListSize = directTable[nMyChair].length;

        var arrowNode = this.node.getChildByName("arrow");

        var directNode = arrowNode.getChildByName("direction");

        for (var i = 0; i < nListSize; i++) {
            var OneTable = directTable[nMyChair][i];
            var strBgImgName = OneTable[0] + "_bg";
            var strForeImgName = OneTable[0];

            var bgFrame = this.directAtlas.getSpriteFrame(strBgImgName);

            var foreImgFrame = this.directAtlas.getSpriteFrame(strForeImgName);

            directNode.children[i].active = true;
            directNode.children[i].getComponent(cc.Sprite).spriteFrame = bgFrame;
            directNode.children[i + 4].getComponent(cc.Sprite).spriteFrame = foreImgFrame;
        }
    },

    //玩家状态发生改变
    onPlayerStateChanged: function (nChair, nOldState, nNewState) {
        this.GetMyInfo();

        if (nChair >= GameDefs.PLAYER_COUNT)
            return;


        //如果是处于准备状态
        if (nNewState == gamelibcommon.USER_READY_STATUS) {
            if (!this.m_stSaveSceneData) {
                this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsReady(true);
            }
            else {
                this.m_playerStatus = this.m_playerStatus || new Array();
                var nPos = this.PosFromChair(nChair);
                this.m_playerStatus[nPos] = true;

                //判定如果之前定时器已经显示  则隐藏  如果之前定时器没有显示 则直接
                if (this.MyState() == gamelibcommon.USER_READY_STATUS) {
                    this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').hideLeaveTimer();
                    this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsReady(true);
                }
            }

            //如果是我自己的椅子号  则将开始按钮隐藏
            if (nChair == this.m_cbMyChair) {

                var gamebuttonLayer = this.node.getComponent('GameButtonLayer');
                gamebuttonLayer.setStartBtnVisible(false);
            }

        } else if (nNewState == gamelibcommon.USER_SIT_TABLE) {

            this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsReady(false);
            // sendCMD.sendCMD_PO_RESTART();
            // var gamebuttonLayer = this.node.getComponent('GameButtonLayer');
            // gamebuttonLayer.setStartBtnVisible(false);
        }
        else {
            this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsReady(false);
        }

        //如果是处理掉线状态
        if (nNewState == gamelibcommon.USER_OFF_LINE) {

            this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsoffLine(true);
        }
        else {
            this.getPlayerByPos(this.PosFromChair(nChair)).getComponent('Player').setIsoffLine(false);
        }

        //如果是处于游戏中的状态
        if (nNewState == gamelibcommon.USER_PLAY_GAME) {

            var gamebuttonLayer = this.node.getComponent('GameButtonLayer');
            gamebuttonLayer.setStartBtnVisible(false);

            for (var chair = 0; chair < GameDefs.PLAYER_COUNT; chair++) {
                this.getPlayerByPos(this.PosFromChair(chair)).getComponent('Player').setIsReady(false);
            }
        }
    },

    //游戏过程中设定剩余麻将显示  因为开始动画时候 不能够精确计算剩余牌数 所以次函数只适用于游戏中状态
    setRestMjCount: function () {
        var gameSystemNode = this.node.getChildByName("game_system_info");

        var restMjNum = this.getRestMjCount();
        if(restMjNum < 0)
            restMjNum = 108
        if (restMjNum == 19){
            if (!this.bolTips20Card){
                this.bolTips20Card = true;
                Resources.ShowToast("当前牌数不足20张啦");
            }
        }
        gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string = restMjNum;
    },


    showSignalUI: function () {

        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleCallbackForTarget(this, this._signalUpdate)

        var gameSystemNode = this.node.getChildByName("game_system_info");

        var timeLabel = gameSystemNode.getChildByName("time_label");

        var signalProgress = gameSystemNode.getChildByName("singal_progress_bar");

        gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string = 0;

        var myDate = new Date();

        var update = function (dt) {
            var hours = myDate.getHours();
            var minutes = myDate.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var formatTime = hours + ":" + minutes;
            timeLabel.getComponent(cc.Label).string = formatTime;

            var netLagValue = this.getGameLib().getNetLag();

            var nProgress = 1;
            if (netLagValue <= 50) {
                nProgress = 1;
            }
            else if (netLagValue > 50 && netLagValue <= 150) {
                nProgress = 0.8;
            }
            else if (netLagValue > 150 && netLagValue <= 250) {
                nProgress = 0.6;
            }
            else if (netLagValue > 250 && netLagValue <= 350) {
                nProgress = 0.4;
            }
            else if (netLagValue > 350 && netLagValue <= 450) {
                nProgress = 0.2;
            }
            else {
                nProgress = 0;
            }
            signalProgress.getComponent(cc.ProgressBar).progress = nProgress;
        }

        this._signalUpdate = update;

        scheduler.scheduleCallbackForTarget(this, update, 1, cc.macro.REPEAT_FOREVER, 0, false);
    },


    setRoomInfo: function () {

        if (!this.m_roomInfo) {
            return;
        }
        var gameInfoNode = this.node.getChildByName("game_base_info");

        var roomScoreLabel = gameInfoNode.getChildByName("gold_game_info").getChildByName("room_score_label");
        roomScoreLabel.getComponent(cc.Label).string = this.m_roomInfo.nTurnBasicGold + "分";


        var roomLevelLabel = gameInfoNode.getChildByName("gold_game_info").getChildByName("room_level_label");

        var roomLevel = "新手场";

        var curRoom = this.getGameLib().getCurrentGameRoom();

        if (curRoom) {
            var dwRuleID = curRoom.dwRuleID % 10;

            if (dwRuleID == 2) {
                roomLevel = "中级场";
            }
            else if (dwRuleID == 3) {
                roomLevel = "高级场";
            }
            else if (dwRuleID == 4) {
                roomLevel = "富豪场";
            }
        }

        roomLevelLabel.getComponent(cc.Label).string = roomLevel

        var baseInfoBg = gameInfoNode.getChildByName("base_info_bg");

        var gameInfo = baseInfoBg.getChildByName("game_play_info");

        var gameInfoStr = "4人场 ";

        if (this.m_roomInfo.nPlayerCount == 3) {
            gameInfoStr = "3人场 ";
        }

        //加上玩法信息;
        // if (this.m_roomInfo.cbZimoJiafan == 0) {
        //     gameInfoStr += " 自摸加底";
        // }
        // else {
        //     gameInfoStr += " 自摸加番";
        // }
        // if (this.m_roomInfo.cbHuanSanZhang == 1) {
            gameInfoStr += " 换三张";
        // }
        if (this.m_roomInfo.cbMenQing == 1) {
            gameInfoStr += " 门清中张";
        }
        if (this.m_roomInfo.cbWith19 == 1) {
            gameInfoStr += " 带幺九,将对";
        }
        if (this.m_roomInfo.cbTianDiHu == 1) {
            gameInfoStr += " 天地胡";
        }

        gameInfo.getComponent(cc.RichText).string = gameInfoStr;
    },

    addLaiziInfo:function(){
        var laizNode = this.node.getChildByName("laizi");
        var laiziInfoNode = laizNode.getChildByName("laizi_info");
        var laiziMj = laiziInfoNode.getChildByName("laizi_mj");
        var mjValue = this.m_stSceneData.cbLaizi
        laiziMj.getComponent(cc.Sprite).spriteFrame = this.node.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", mjValue);
    },

    //增加游戏等待开始的动画
    addGameWaitStartAction:function(){
        this.waitStartArary = new Array();
        for(var i = 1; i <= 15; i++){
            
        }
    },

    onSceneChanged: function (lpData) {
        
        this.m_stSaveSceneData = this.m_stSceneData || {};

        var ba = lpData;
        this.m_stSceneData = GameDefs.GameScene(ba);

        this.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(false);
        this.moreSettingLayer.getComponent("MoreSettingLayer").setChangedDeskBtnEnabled(false);
        var gamebuttonLayer = this.node.getComponent('GameButtonLayer');
        gamebuttonLayer.setAllOperateButtonIsVis(false);


        var isSetInfo = [];
        for (var cbChair = 0; cbChair < GameDefs.PLAYER_COUNT; cbChair++) {
            var nPos = this.PosFromChair(cbChair);
            if (this.getPlayerByPos(nPos).getComponent("Player").getIsValidPlayer() && !isSetInfo[nPos]) {
                var playerCardLayer = this.getPlayerByPos(nPos).getComponent('PlayerCardLayer');
                // playerCardLayer.setmjLaiziValue(this.m_stSceneData.cbLaizi);
                // playerCardLayer.setmjLaizipiValue(this.m_stSceneData.cbLaizipi);
                playerCardLayer.setPlayerPos(nPos);
                playerCardLayer.setPlayerMj(this.m_stSceneData.players[cbChair]);

                //移除多种吃杠的牌的选择
                if (nPos == 1) {
                    playerCardLayer.removeEatOrGangMoresCardToast();
                }

                var outCardLayer = this.getPlayerByPos(nPos).getComponent("OutCardLayer");
                outCardLayer.setPlayerPos(nPos);
                outCardLayer.setPlayerMj(this.m_stSceneData.players[cbChair]);
                // outCardLayer.setmjLaiziValue(this.m_stSceneData.cbLaizi);
                // outCardLayer.setmjLaizipiValue(this.m_stSceneData.cbLaizipi);

                var huCardLayer = this.getPlayerByPos(nPos).getComponent("HuCardLayer");
                huCardLayer.setPlayerPos(nPos);
                huCardLayer.setPlayerMj(this.m_stSceneData.players[cbChair]);

                // this.getPlayerByPos(nPos).getComponent('Player').setIsRobot(this.m_stSceneData.players[cbChair].cbAutoOutCard == 1);

                if (cbChair == this.m_cbMyChair) {
                    var cancelRobotNode = this.node.getChildByName("cancel_robot");
                    var isRobot = this.m_stSceneData.players[cbChair].cbAutoOutCard == 1;
                    cancelRobotNode.active = isRobot ? true : false;

                    if (!this.isMeClickRobot)
                    {
                        //判断不是我点击的托管
                        this.robotTips.node.active =  isRobot ? true : false;
                    }

                    if (require("HallUtils").isIPhoneX()) {
                        cancelRobotNode.setScale(1.2);
                    }

                    var onCancelRobot = function () {
                        cancelRobotNode.active = false;
                    }

                    this.node.getComponent('GameButtonLayer').setCancelRobotBtnCallBack(onCancelRobot)
                }

                isSetInfo[nPos] = true;
            }
            //金币场破产显示
            if(!this.getIsPrivateRoom()){
                var nGold = this.getPlayerByPos(nPos).getComponent("Player").getNowScore()
                this.getPlayerByPos(nPos).getComponent("Player").setPoChanVis(nGold <= 300)
            }
        }
        if(!this.getIsPrivateRoom()){
            var myPos = this.PosFromChair(this.m_cbMyChair);
            var nGold = this.getPlayerByPos(myPos).getComponent("Player").getNowScore()
            var cancelPoChanNode = this.node.getChildByName("cancel_pochan");
            if(nGold <= 300){
                cancelPoChanNode.active = true;
                this.pochanFlag = true;
                this.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(true);
            }else{
                cancelPoChanNode.active = false;
                this.pochanFlag = false;
                this.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(false);
            }
        }
        else{
            this.moreSettingLayer.getComponent("MoreSettingLayer").setIsPrivateRoom(true);
        }
        if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseEnd) {

            //上传记录给wx服务器
            this.reportResultToWx();
            this.gameOver();
            return;
        }

        var bolHu =(this.m_stSceneData.players[this.m_cbMyChair].cbIsHu == 1);
        this.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(bolHu);
        this.moreSettingLayer.getComponent("MoreSettingLayer").setChangedDeskBtnEnabled(bolHu);

        if (this.m_stSceneData.cbWhosTurn == this.m_cbMyChair && this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseOutCard) {
            this.getPlayerByPos(1).getComponent('PlayerCardLayer').setCanOutCard(true);
        }
        else {
            this.getPlayerByPos(1).getComponent('PlayerCardLayer').setCanOutCard(false);
        }

        //当游戏状态大于开始状态  也就是游戏已经开始
        if (this.m_stSceneData.cbPhase > GameDefs.GamePhase.PhaseStart) {
            this.openGmae = true;
            this.m_playerStatus = new Array();
            var arrowNode = this.node.getChildByName("arrow");
            var diceBg = arrowNode.getChildByName("dice_bg");
            diceBg.active = true;

            //确定癞子
            // this.quedingLaizi();

            // this.addLaiziInfo();

            this.setRestMjCount();
            //表示是断线了
            if (Tools.isEmptyObject(this.m_stSaveSceneData) && this.m_bIsOffLine) {
                //this.onReConnected();

                if(this.m_stSceneData.LastAction.nAction != GameDefs.PlayerAction.paHu){
                    this.setAllOutData();
                }                
            }

        }
        if (this.m_stSceneData.cbPhase > GameDefs.GamePhase.PhasePlayDingque) {
        //     //防止掉线重连后定缺不显示
            for (var chair = 0; chair < GameDefs.PLAYER_COUNT; chair++) {
                var nPos = this.PosFromChair(chair)
                var mjPlayerDingque = this.m_stSceneData.players[chair].cbDingque; 
                this.getPlayerByPos(nPos).getComponent('Player').setQueWanHeadIconSpIsVis(true,mjPlayerDingque);
            }

            //防止被我拿出的三张牌出现
            var node = this.getPlayerByPos(1);
            var changeCardsNode = node.getChildByName("changecards");
            changeCardsNode.active = false;
            if (!bolHu)
                this.dingQueYiMenAniation(true);
        }

        if (this.m_stSceneData.LastAction.nAction == GameDefs.PlayerAction.paOutCard) {   //表示上一个场景是出牌

            this.setAllOutData();
            var nPos = this.PosFromChair(this.m_stSceneData.LastAction.nChair)
            this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paOutCard);
            for (var i = 1;i < 5;i++)
            {
                this.getPlayerByPos(i).getComponent("OutCardLayer").hideOutCard()
            }
            this.getPlayerByPos(nPos).getComponent("OutCardLayer").putOutMj(this.m_stSceneData.LastAction.nParam);

            var nCardValue = this.m_stSceneData.LastAction.nParam;

            Resources.playMjSoundEffect(this.getPlayerByPos(nPos).getComponent("Player").getSex(), nCardValue)

            Resources.playCommonEffect("outcard.mp3");
            
            //听牌处理
            if (this.m_stSceneData.cbWhosTurn == this.m_cbMyChair) {
                this.m_nClickCardTing = nCardValue
            }
            this.setTingCardLeftNum(nCardValue, 1)
            this.refreshTingCard()

        }
        else if (this.m_stSceneData.LastAction.nAction == GameDefs.PlayerAction.paPeng) { //表示上一个场景是碰牌
            for (var i = 1;i < 5;i++)
            {
                this.getPlayerByPos(i).getComponent("OutCardLayer").hideOutCard()
            }
            this.setAllOutData();
            var nPos = this.PosFromChair(this.m_stSceneData.LastAction.nChair);
            this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paPeng);

            this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_1pen, nPos);

            Resources.playCommonEffect("effectword.mp3");
            // var randIndex = Math.floor(Math.random() * 3)
            var randIndex = 1
            Resources.playPengEffect(this.getPlayerByPos(nPos).getComponent("Player").getSex(), randIndex);

            this.setTingCardLeftNum(this.m_stSceneData.cbCurrentCard, 2)
            this.refreshTingCard()
            this.operationChangeData();
        }
        else if (this.m_stSceneData.LastAction.nAction == GameDefs.PlayerAction.paGang) { //表示上一个场景是杠牌
            for (var i = 1;i < 5;i++)
            {
                this.getPlayerByPos(i).getComponent("OutCardLayer").hideOutCard()
            }
            this.setAllOutData();
            var nPos = this.PosFromChair(this.m_stSceneData.LastAction.nChair);
            this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paGang);

            if ((this.m_stSaveSceneData.cbLastIndex != undefined && this.m_stSceneData.cbLastIndex === this.m_stSaveSceneData.cbLastIndex) &&
                this.m_stSceneData.cbPhase != GameDefs.GamePhase.PhaseEnd) {

                var mjPlayer = this.m_stSceneData.players[this.m_stSceneData.LastAction.nChair];
                var nWeaveType = GameDefs.WeaveType.MingGang;
                for (var i = 0; i < GameDefs.MAX_WEAVE; i++) {
                    if (mjPlayer.showCardSuits[i].cbWeaveKind != GameDefs.WeaveType.InvalidType) {
                        nWeaveType = mjPlayer.showCardSuits[i].cbWeaveKind;
                    }
                }

                // if (this.m_stSceneData.cbCurrentCard == GameDefs.HONG_ZHONG) {
                //     this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_1zhong, nPos);
                // }
                // else if (this.m_stSceneData.cbCurrentCard == this.m_stSceneData.cbLaizi) {
                //     this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_1lai, nPos);
                // }
                // else if (nWeaveType == GameDefs.WeaveType.ChaoTianMingGang || nWeaveType == GameDefs.WeaveType.ChaoTianAnGang) {
                //     this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2caotian, nPos);
                // }
                // else {
                    this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2gang, nPos);
                    this.getPlayerByPos(nPos).getComponent('Player').playGuaFengEffects(true,nPos);
                // }

                Resources.playCommonEffect("effectword.mp3");
                Resources.playGangEffect(this.getPlayerByPos(nPos).getComponent("Player").getSex(), 0);

                for (var i = GameDefs.MAX_WEAVE - 1; i >= 0; i--) {
                    var revealSuit = this.m_stSceneData.players[this.ChairFromPos(nPos - 1)].showCardSuits[i];
                    var stRevealGang = revealSuit.cbCardData;
                    if (revealSuit.cbWeaveKind == GameDefs.WeaveType.MingGang) {
                        if (stRevealGang && stRevealGang.length > 0) {
                            this.setTingCardLeftNum(stRevealGang[0], 3)
                            this.refreshTingCard();
                            break;
                        }
                    }
                    else if (revealSuit.cbWeaveKind == GameDefs.WeaveType.XuGang) {
                        if (stRevealGang && stRevealGang.length > 0) {
                            this.setTingCardLeftNum(stRevealGang[0], 1)
                            this.refreshTingCard();
                            break;
                        }
                    }
                    else if (revealSuit.cbWeaveKind == GameDefs.WeaveType.AnGang) {
                        if (stRevealGang && stRevealGang.length > 0) {
                            this.setTingCardLeftNum(stRevealGang[0], 4)
                            this.refreshTingCard();
                            break;
                        }
                    }
                }
            }
            // this.operationChangeData();
        }
        else if (this.m_stSceneData.LastAction.nAction == GameDefs.PlayerAction.paEat) {  //表示上一个场景是吃牌
            for (var i = 1;i < 5;i++)
            {
                this.getPlayerByPos(i).getComponent("OutCardLayer").hideOutCard()
            }
            this.setAllOutData();
            var nPos = this.PosFromChair(this.m_stSceneData.LastAction.nChair);
            this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paEat);
            this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2chi, nPos);
        }
        else if (this.m_stSceneData.LastAction.nAction == GameDefs.PlayerAction.paHu) {  //表示上一个场景是胡牌
            // console.log("客户端接收到胡牌场景下发时间："+HallResources.getInstance().printNowTimes());
            for (var i = 1;i < 5;i++)
            {
                this.getPlayerByPos(i).getComponent("OutCardLayer").hideOutCard()
            }
            Resources.playCommonEffect("effectword.mp3");
            var self = this;
            var nGetPos = this.PosFromChair(this.m_stSceneData.LastAction.nChair);
            var nHuCount = this.m_stSceneData.LastAction.nChair%10
            var nFangPaoChair = Math.floor(self.m_stSceneData.LastAction.nChair/10) //0是放炮，1是自摸
            var vHuChair = []
            var nHuParam = self.m_stSceneData.LastAction.nParam
            var nFangPaoReal = Math.floor(nHuParam/1000)
            var nHuMoreParam = nHuParam%1000
            if (nHuCount ==1){
                vHuChair[0] =  nHuMoreParam%10;
            }
            if (nHuCount ==2){ 

                vHuChair[0] =  Math.floor(nHuMoreParam/10);
                vHuChair[1] =  nHuMoreParam%10;
            }
            if (nHuCount ==3){
                vHuChair[0] =  Math.floor(nHuMoreParam/100);
                vHuChair[1] =  nHuMoreParam%100%10;
                vHuChair[2] =  Math.floor(nHuMoreParam%100/10);
            }
            this.operationChangeData();
            // console.log("准备播放胡牌特效的系统时间："+HallResources.getInstance().printNowTimes());
            for (var i=0;i < vHuChair.length;i++){
                var nPos = this.PosFromChair(vHuChair[i]);
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paHu);

                if (this.IsXueZhan())
                    this.getPlayerByPos(nPos).getComponent('Player').setHuSpIsVis(true);
                if (nFangPaoChair == 0){
                    Resources.playHuEffect(this.getPlayerByPos(nPos).getComponent("Player").getSex(), 0);

                    //直接播放胡牌动画
                    this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2hu, nPos);
                    this.playHuEffect(vHuChair[i], false,()=>{ this.setAllOutData(); },nFangPaoReal);
                }
                else{
                    // var randIndex = Math.floor(Math.random() * 2);
                    var randIndex = 0;
                    Resources.PlayZiMoEffect(this.getPlayerByPos(nPos).getComponent("Player").getSex(), randIndex);

                    this.setAllOutData();
                    // this.playHuEffect(vHuChair[i], true);
                    this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2ZiMo, nPos);
                    var playerData = this.m_stSceneData.players[vHuChair[i]]
                    this.getPlayerByPos(nPos).getComponent("HuCardLayer").putHuMj(true);
                } 

                if (vHuChair[i] == this.m_cbMyChair) {
                    if (this.node.getChildByName("cancel_robot").active){
                        this.node.getChildByName("cancel_robot").active = false;
                        sendCMD.sendCMD_PO_ROBOTPLAYCANCEL()
                    }
                    if (!this.isMyFirstHu)
                    {
                        this.huTips.node.active = true;
                        this.isMyFirstHu = true;
                    }
                    this.getPlayerByPos(1).getComponent("PlayerCardLayer").setGrayForCannotUpCard(false);
                    if (this.IsXueZhan())
                    {
                        this.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(true);
                    }
                }
            
            }

        }   

        if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseStart) {
            // for (var nPos = 1; cbChair <= GameDefs.PLAYER_COUNT; cbChair++) {
            //     this.getPlayerByPos(nPos).getComponent('Player').setChaDaJiaoSpIsVis(false)
            // }
            if (Tools.isEmptyObject(this.m_stSaveSceneData) && this.m_bIsOffLine) {    //表示之前确实是掉线了

            }
            else {
                var nBankerPos = this.PosFromChair(this.m_stSceneData.cbBanker);
                this.startGameAction(this.m_stSceneData.cbFirstDice, this.m_stSceneData.cbSecondDice, nBankerPos);
            }
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseOutCard) {
            cc.log("轮到当前的椅子号为" + this.PosFromChair(this.m_stSceneData.cbWhosTurn));
            var nPos = this.PosFromChair(this.m_stSceneData.cbWhosTurn);

            var bolHu = (this.m_cbMyChair == this.m_stSceneData.cbWhosTurn) &&(this.m_stSceneData.players[this.m_cbMyChair].cbIsHu == 1);
            if (bolHu){
                //胡牌提示文字放入手牌位置并居中， 文字显示俩回合（自己出牌俩次）
                if(this.afterHuOutCardTimes < 2)
                    this.afterHuOutCardTimes = this.afterHuOutCardTimes + 1;
                else
                    this.huTips.node.active = false;
            }
            //表示从牌墙开始处拿了一张牌
            if (this.m_stSceneData.cbCurrentIndex != this.m_stSaveSceneData.cbCurrentIndex) {
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paGet1CardFromHeader);
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").getOneMj(this.m_stSceneData.cbCurrentCard,bolHu);
            }
            else if (this.m_stSceneData.cbLastIndex != this.m_stSaveSceneData.cbLastIndex) {
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paGet1CardFromTail);
                
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").getOneMj(this.m_stSceneData.cbCurrentCard,bolHu);
            }
            else {
                //表示游戏开始时候
                if (this.m_stSceneData.LastAction.nAction != GameDefs.PlayerAction.paEat &&
                    this.m_stSceneData.LastAction.nAction != GameDefs.PlayerAction.paGang &&
                    this.m_stSceneData.LastAction.nAction != GameDefs.PlayerAction.paPeng) {
                    //为了首出手打牌,第一张牌能够能够拉开距离                  
                    this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").setActionState(GameDefs.PlayerAction.paPatchFlower)
                }
                this.operationChangeData();
            }

            if (Tools.isEmptyObject(this.m_stSaveSceneData) && this.m_bIsOffLine) {    //表示之前确实是掉线了
                this.operationChangeData();
            }

            this.setIsDirectionVis(nPos);

            for (var pos = 1; pos <= GameDefs.PLAYER_COUNT; pos++) {
                this.getPlayerByPos(pos).getComponent('Player').turnToOutPlayCardIsVis(false);
            }

            this.getPlayerByPos(nPos).getComponent('Player').turnToOutPlayCardIsVis(true);

            this.startTimer(null, this.GAMETIMER_COUNT)

            this.showChoiceButton();

            this.setRestMjCount();

            if (this.m_stSceneData.cbWhosTurn == this.m_cbMyChair) {
                var mjPlayer = this.m_stSceneData.players[this.m_cbMyChair]
                this.m_nClickCardTing = mjPlayer.cbHoldCards[mjPlayer.cbHoldCardCount - 1];
                this.m_saveTingCardList = this.m_stSceneData.vTingList;
                this.refreshTingCard();
            }

            //当是我出牌阶段，判断手牌有没有三种花色
            if (this.m_cbMyChair == this.m_stSceneData.cbWhosTurn){
                
                if (this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").getHasQueYiMenMj())
                {
                    if (this.queyimenTipsTimes < 3){
                        this.queYiMenTipsLayer.active = true;
                        this.queyimenTipsTimes = this.queyimenTipsTimes + 1;
                    }
                }
            
            }
            else{
                this.queYiMenTipsLayer.active = false;
            }
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseWaitChoice) {
            this.operationChangeData();

            this.setRestMjCount();

            //设定方向选择为没有方向
            this.setIsDirectionVis(0);

            this.showChoiceButton();

            this.startTimer(null, this.GAMETIMER_COUNT - 5)

            // if (this.m_stSceneData.cbWhosTurn == this.m_cbMyChair) {
            //     var mjPlayer = this.m_stSceneData.players[this.m_cbMyChair]
            //     this.m_nClickCardTing = mjPlayer.cbHoldCards[mjPlayer.cbHoldCardCount - 1];
            //     this.m_saveTingCardList = this.m_stSceneData.vTingList;
            //     this.refreshTingCard();
            // }
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseExchange){
            //等待换牌
            var self = this;
            var callBackFunc = function(){
                self.startTimer(null, self.CHANGE_THREE_COUNT - 2)
                self.operationChangeData(true);
                self.addThreeSelectCardUI(true,6,true);
            }
            //这里做延迟一秒是因为在开始游戏的时候增加了一段动画，占用了2s的时间，但是PhaseExchange还是同一时间下发，所以会影响到提起三张牌的功能
            TSCommon.performWithDelay(this, callBackFunc, 1);
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhasePlayExchange){
            // if (!this.isClick){
            //     console.log("没有主动选牌，依赖服务器选择")
            //     //删除手牌中选择的那三张
            //     this.getPlayerByPos(1).getComponent("PlayerCardLayer").deleteThreeMjRefresh();
            // }
            //播放换牌动画
            this.stopTimer();
            this.addThreeSelectCardUI(false,7,false);
            this.changeMjAction();
            this.exchangeCardAniation();
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhaseDingque){
            //定下缺少哪一门
            this.startTimer(null, this.XUANPAI_COUNT);
            this.operationChangeData();
            this.addDingQueYiMenUI(true,4,true);
        }
        else if (this.m_stSceneData.cbPhase == GameDefs.GamePhase.PhasePlayDingque){
            //播放定缺动画
            this.stopTimer();
            this.addDingQueYiMenUI(false,5,false)
            this.dingQueYiMenAniation()
            this.operationChangeData(true)
        }
    },

    stopDingQueAnimation: function () {
        var playerNode1 = this.queYiMenButtonLayer.getChildByName("wan_node");
        var winNode1 = playerNode1.getChildByName("wan_act");
        winNode1.active = false;
        var playerNode2 = this.queYiMenButtonLayer.getChildByName("tiao_node");
        var winNode2 = playerNode2.getChildByName("tiao_act");
        winNode2.active = false;
        var playerNode3 = this.queYiMenButtonLayer.getChildByName("tong_node");
        var winNode3 = playerNode3.getChildByName("tong_act");
        winNode3.active = false;
    },

    onGameMessage: function (chair, cCmdID, lpBuf) {
        //cc.log("DeskScene --------onGameMessage =============cCmdID ==========", cCmdID);
        var self = this;
        if (cCmdID == GameDefs.MJ_CMD_GANG || cCmdID == GameDefs.MJ_CMD_SHOW_HU_SCORE) {        //杠
            self.l_pBuf = lpBuf; 
            var gangScoreArray = new Array();
            var callback = function(){
                for (nChair = 0; nChair < GameDefs.PLAYER_COUNT; nChair++) {
                    if (self.l_pBuf.bytesAvailable > 0) {
                        var nGangScore = self.l_pBuf.readInt();
                        var nPos = self.PosFromChair(nChair);
                        if (nGangScore != 0) {
                            self.n_Pos = nPos;
                            self.n_GangScore = nGangScore;
                            
                            self.getPlayerByPos(self.n_Pos).getComponent("Player").setTempChangeGold(self.n_GangScore, null);
                        }
                            
                    }
                }
            }
            TSCommon.performWithDelay(this, callback, 1)
        }

        else if (cCmdID == GameDefs.MJ_CMD_ROOMINFO) {
            this.m_roomInfo = GameDefs.ST_RoomInfo(lpBuf);

            this.setRoomInfo();
        }

        else if (cCmdID == GameDefs.MJ_CMD_Set_XueFei) {

        }
        else if (cCmdID == GameDefs.MJ_CMD_PoChan) { //破产
            // this.showGoldNotEnoughTips();
            
            var myPos = this.PosFromChair(this.m_cbMyChair);
            var nGold = this.getPlayerByPos(myPos).getComponent("Player").getNowScore()

            var cancelPoChanNode = this.node.getChildByName("cancel_pochan");
            if(parseInt(nGold) <= 300){
                cancelPoChanNode.active = true;
                this.pochanFlag = true;
            }else{
                cancelPoChanNode.active = false;
                this.pochanFlag = false;
            }
        }   

        else if (cCmdID == GameDefs.MJ_CMD_AutoOut) {     //托管
            var nChair = lpBuf.readUnsignedByte();
            var nPos = this.PosFromChair(nChair);
            this.getPlayerByPos(nPos).getComponent("Player").setIsRobot(true);

            if (nChair == this.m_cbMyChair) {
                var cancelRobotNode = this.node.getChildByName("cancel_robot");

                cancelRobotNode.active = true;
                if (!this.isMeClickRobot)
                {
                    //判断不是我点击的托管
                    this.robotTips.node.active = true;
                }

                if (require("HallUtils").isIPhoneX()) {
                    cancelRobotNode.setScale(1.2);
                }
                var onCancelRobot = function () {
                    cancelRobotNode.active = false;
                }

                this.node.getComponent('GameButtonLayer').setCancelRobotBtnCallBack(onCancelRobot)
            }
        }

        else if (cCmdID == GameDefs.MJ_CMD_Cancel_AutoOut) {  //取消托管
            var nChair = lpBuf.readUnsignedByte();
            var nPos = this.PosFromChair(nChair);
            this.robotTips.node.active = false;
            this.isMeClickRobot = false;

            this.getPlayerByPos(nPos).getComponent("Player").setIsRobot(false);
            if (nChair == this.m_cbMyChair) {
                var cancelRobotNode = this.node.getChildByName("cancel_robot");

                cancelRobotNode.active = false;
            }
        }

        else if (cCmdID == GameDefs.MSG_ROBOT_ACTIVE) {

        }

        else if (cCmdID == GameDefs.MJ_DISSOLVE_ROOM) {

        }

        else if (cCmdID == GameDefs.MJ_DISSOLVE_RESULT) {

        }

        else if (cCmdID == GameDefs.MJ_CMD_SETINFO) {
            this.m_roomSetInfo = GameDefs.ST_SetInfo(lpBuf);

           
        }

        else if(cCmdID == GameDefs.CMD_PROPERTY){   //道具命令
            console.log("接收到下发的道具消息")
            this.propertyReSultDeal(chair, lpBuf);
        }

        else if(cCmdID == GameDefs.CMD_Notify_UpGrade){ //升段通知
            this.m_nNewLevel = lpBuf.readInt();
        }

        else if (cCmdID == GameDefs.MJ_CMD_DissINFO) {

        }

        else if (cCmdID == GameDefs.MJ_CMD_Exchange) {
            var nPos = this.PosFromChair(chair)
            if (chair != this.m_cbMyChair){
                this.getPlayerByPos(nPos).getComponent("Player").setSelectCardSpIsVis(true,7);
            }
        }
        else if (cCmdID == GameDefs.MJ_CMD_DingQue) {
            var nQueMen = lpBuf.readUnsignedByte();
            if (chair == this.m_cbMyChair){
                // console.log("命令下发下来我的定缺是：+++++"+nQueMen)
                this.getPlayerByPos(1).getComponent("Player").setQueWanSpIsVis(true,nQueMen)
                this.queYiMenTipsLayer.active = false;
                this.queYiMenButtonLayer.active = false;
                this.stopDingQueAnimation()
            }

            else{
                var nPos = this.PosFromChair(chair)
                this.getPlayerByPos(nPos).getComponent("Player").setDingqueSpIsVis(true,5)
            }
        }
        
    },

    //开始游戏  玩家拿牌
    startGameAction: function (firstDice, secondDice, nBankerPos) {
        var self = this;

        var gameSystemNode = this.node.getChildByName("game_system_info");

        //初始化麻将数量
        // gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string = this.getTotalMjCount();

        //将玩家手上的牌都设置为不可见
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            var node = self.getPlayerByPos(nPos);
            // node.getComponent("PlayerCardLayer").resetAllHandCardPosWithNoDiff();
            var holdCardsNode = node.getChildByName("holds");
            for (var i = 0; i < holdCardsNode.childrenCount; i++) {
                var cardNode = holdCardsNode.children[i];
                cardNode.getComponent(cc.Sprite).spriteFrame = null;
                cardNode.active = true;
                cardNode.setScale(1.0);
            }
        }

        var playStartActionEnd = function (nPos) {
            var holds = self.getPlayerByPos(nPos).getChildByName("holds");
            if (nPos == 1) {

                //播一遍整理牌的动画
                for (var i = 0; i < self.m_stSceneData.players[self.m_cbMyChair].cbHoldCardCount; i++) {

                    var cardNode = holds.children[i];
                    var animation = cardNode.addComponent(cc.Animation);

                    animation.addClip(self.mj_actionClip, "mj_action");
                    var animState = animation.play("mj_action");
                    if(animState){
                        animState.speed = 0.9;
                    }
                    

                    Resources.playCommonEffect("cleancard.mp3");

                    if (i == self.m_stSceneData.players[self.m_cbMyChair].cbHoldCardCount - 1) {
                        self.getPlayerByPos(nPos).getComponent("PlayerCardLayer").resetAllHandCardPosWithNoDiff();
                        var onEnd = function () {
                            self.getPlayerByPos(nPos).getComponent("PlayerCardLayer").putSelfHandCards();
                        };
                        animation.on("finished", onEnd, cardNode);
                    }
                }


            }
            else {
                var chair = self.ChairFromPos(nPos - 1)

                var spriteFrame;

                if (nPos == 2) {
                    spriteFrame = self.node.getComponent("MjResourceMgr").m_mj1_back_right_frame;
                }
                else if (nPos == 3) {
                    spriteFrame = self.node.getComponent("MjResourceMgr").m_mj1_back_top_frame;
                }
                else if (nPos == 4) {
                    spriteFrame = self.node.getComponent("MjResourceMgr").m_mj1_back_left_frame;
                }
                else {
                    console.log("check  the  nPos");
                }
                for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
                    holds.children[i].active = false;
                    holds.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }

                var cardCount = 13;
                if (nPos != 2) {
                    for (var i = 0; i < cardCount; i++) {
                        holds.children[i].active = true;
                    }
                }
                else {
                    for (var i = GameDefs.MAX_HOLD_CARD - 1; i >= GameDefs.MAX_HOLD_CARD - cardCount; i--) {
                        holds.children[i].active = true;
                    }
                }

                // self.quedingLaizi();

                // self.addLaiziInfo();
            }


            //然后将筛子蒙板蒙住
            // var arrowNode = self.node.getChildByName("arrow");
            // var diceBg = arrowNode.getChildByName("dice_bg");
            // diceBg.active = true;

            var nPlayerCount = 4;//self.m_roomInfo.nPlayerCount || 4;
            gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string = self.getTotalMjCount() - (nPlayerCount - 1) * 13 - 14;

        }


        var playStartAction = function (nPos) {
            var holds = self.getPlayerByPos(nPos).getChildByName("holds");
            var groupIndex = 0;
            var playGetOneGroupCardAction = function () {     //播放拿一组牌的动画

                if (groupIndex >= 3) {

                    //将排序过后的牌重新设定一遍                   
                    playStartActionEnd(nPos);
                    return;
                }

                var playNextGroup = false;
                for (var j = 0; j < 4; j++) {
                    var cardNode;
                    if (nPos == 2) {
                        cardNode = holds.children[13 - (groupIndex * 4 + j)];
                    }
                    else {
                        cardNode = holds.children[groupIndex * 4 + j];
                    }

                    if (cardNode) {
                        var animation = cardNode.addComponent(cc.Animation);


                        if (nPos == 1) {
                            animation.addClip(self.me_actionClip, "me_action");
                            var animState = animation.play("me_action");
                            if(animState){
                                animState.speed = 1.5;
                            }
                        }
                        else if (nPos == 2) {
                            animation.addClip(self.right_actionClip, "right_action");
                            animation.play("right_action");
                        }
                        else if (nPos == 3) {
                            animation.addClip(self.top_actionClip, "top_action");
                            animation.play("top_action");
                        }
                        else {
                            animation.addClip(self.left_actionClip, "left_action");
                            animation.play("left_action");
                        }

                        Resources.playCommonEffect("getcard.mp3");

                        var onPlayAnimatiEnd = function (event) {
                            if (!playNextGroup) {

                                var strCount = gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string
                                var restMjNum = (strCount <= 0)?108:strCount;
                                restMjNum = restMjNum - 4;
                                gameSystemNode.getChildByName("leftMj_label").getComponent(cc.Label).string = restMjNum;
                                if (nPos == 1) {
                                    for (var index = 0; index < 4; index++) {
                                        var mjValue = self.m_stSceneData.players[self.m_cbMyChair].cbHoldCards[groupIndex * 4 + index];
                                        var spriteFrame = self.node.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", mjValue);
                                        holds.children[groupIndex * 4 + index].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                                    }
                                }

                                groupIndex += 1;

                                playNextGroup = true;
                                playGetOneGroupCardAction(groupIndex);
                            }
                        }
                        animation.on('finished', onPlayAnimatiEnd, cardNode);
                    }
                }
            }
            playGetOneGroupCardAction(groupIndex);
        }

        var delayCallBackFunc = function(){
            for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
                if (self.getPlayerByPos(nPos).getComponent("Player").getIsValidPlayer()) {
                    playStartAction(nPos);
                }
            }
        }
        this.playStartGameAct();
        TSCommon.performWithDelay(this, delayCallBackFunc, 1.5);
        Resources.playCommonEffect("startgame.mp3");
    },

    playStartGameAct:function(){
        var self = this;
        var whosTurnNode = this.node.getChildByName("start_game_act");
        var strAniName = 'Animation1';
        whosTurnNode.active = true;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        var animState = dragonDisplay.playAnimation(strAniName,1);
        if(animState){
            animState.timeScale = 1.6;
        }
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    playOverGameAct:function(){
        var self = this;
        var whosTurnNode = this.node.getChildByName("over_game_act");
        var strAniName = 'newAnimation';
        whosTurnNode.active = true;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName,1);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    propertyReSultDeal:function(chair, data){
        var pProperty = GameDefs.ST_Property.new(data);
        console.log(pProperty)
        if(pProperty.bSuccess){
            var userInfo = this.getGameLib().getUserByChair(pProperty.cbSendChair);
            if(userInfo){
                var curPlayer = this.getPlayerByPos(this.PosFromChair(pProperty.cbSendChair));
                var nPos = this.PosFromChair(pProperty.cbToChair)
                var toPlayer = this.getPlayerByPos(nPos);

                var nPropertyID = pProperty.nPropertyID % 10
                
                if(curPlayer && toPlayer){
                    console.log("发送道具成功");
                    var PropertyAnimationLayer = this.node.getComponent("PropertyAnimationLayer");

                    var onEnd = function(){
                        // toPlayer.getComponent("Player").showCharmNumAction(pProperty.nChairNum);
                    };
                    var curPosNode = curPlayer.getChildByName("playerNode").getChildByName("playerAvatar")
                    var toPosNode = toPlayer.getChildByName("playerNode").getChildByName("playerAvatar")
                    PropertyAnimationLayer.create(cc.p(curPosNode.x, curPosNode.y), cc.p(toPosNode.x, toPosNode.y), nPropertyID, onEnd);
                }
            }
        }
        else{
            //显示发送道具失败的消息
            if(pProperty.cbSendChair == this.m_cbMyChair){
                console.log("发送道具失败");
                require("Resources").ShowToast("您当前的金币不足啦")
            }
        }
    },

    quedingLaizi: function () {
        if (this.m_stSceneData) {
            var laiziNode = this.node.getChildByName("laizi");
            laiziNode.active = true;
            var spriteFrame = this.node.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", this.m_stSceneData.cbLaizi);
            laiziNode.getChildByName("laizi_img").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
    },

    setIsDirectionVis: function (nPos) {
        this.GetMyInfo();
        if (this.m_cbMyChair == null) {
            return;
        }

        var arrowNode = this.node.getChildByName("arrow");

        var directNode = arrowNode.getChildByName("direction");


        for (var i = 4; i < directNode.childrenCount; i++) {
            directNode.children[i].active = false;
            directNode.children[i].stopAllActions();

        }

        if (nPos == 0) {
            return 0;
        }

        var direct = directNode.children[4 + nPos - 1];

        direct.stopAllActions();
        var act1 = cc.fadeOut(1);
        var act2 = cc.fadeIn(1);
        var seq = cc.sequence(act1, act2)
        direct.active = true;
        direct.runAction(cc.repeatForever(seq))

    },

    showChoiceButton: function () {
        var choice = this.m_stSceneData.ChoiceAction[this.m_cbMyChair];

        var myMJPlayer = this.m_stSceneData.players[this.m_cbMyChair];

        var vUpCards = new Array();     //表示应该抬起的牌

        var gamebuttonLayer = this.node.getComponent('GameButtonLayer');

        var GameJudge = require("GameJudge");

        //表示能吃
        if (GameDefs.PlayerAction.paEat == (choice & GameDefs.PlayerAction.paEat)) {

            var nValidLen = 0;
            var pEatCase = new Array();
            var bIsLeft = GameJudge.CanShunLeft(this.m_stSceneData.cbCurrentCard, myMJPlayer.cbHoldCards, myMJPlayer.cbHoldCardCount, this.m_stSceneData.cbLaizi)
            var bIsMiddle = GameJudge.CanShunMid(this.m_stSceneData.cbCurrentCard, myMJPlayer.cbHoldCards, myMJPlayer.cbHoldCardCount, this.m_stSceneData.cbLaizi)
            var bIsRight = GameJudge.CanShunRight(this.m_stSceneData.cbCurrentCard, myMJPlayer.cbHoldCards, myMJPlayer.cbHoldCardCount, this.m_stSceneData.cbLaizi)

            if (bIsLeft) {
                nValidLen = nValidLen + 1
                var stEat = new Array();
                stEat.push(this.m_stSceneData.cbCurrentCard)
                stEat.push(this.m_stSceneData.cbCurrentCard + 1)
                stEat.push(this.m_stSceneData.cbCurrentCard + 2)
                stEat.push(GameDefs.MJ_CMD_EATLEFT)
                pEatCase.push(stEat);


                vUpCards.push(this.m_stSceneData.cbCurrentCard + 1)
                vUpCards.push(this.m_stSceneData.cbCurrentCard + 2)
            }

            if (bIsMiddle) {
                nValidLen = nValidLen + 1
                var stEat = new Array();
                stEat.push(this.m_stSceneData.cbCurrentCard - 1)
                stEat.push(this.m_stSceneData.cbCurrentCard)
                stEat.push(this.m_stSceneData.cbCurrentCard + 1)
                stEat.push(GameDefs.MJ_CMD_EATMID)
                pEatCase.push(stEat);

                vUpCards.push(this.m_stSceneData.cbCurrentCard - 1)
                vUpCards.push(this.m_stSceneData.cbCurrentCard + 1)
            }

            if (bIsRight) {
                nValidLen = nValidLen + 1
                var stEat = new Array();
                stEat.push(this.m_stSceneData.cbCurrentCard - 2)
                stEat.push(this.m_stSceneData.cbCurrentCard - 1)
                stEat.push(this.m_stSceneData.cbCurrentCard)
                stEat.push(GameDefs.MJ_CMD_EATRIGHT)
                pEatCase.push(stEat);

                vUpCards.push(this.m_stSceneData.cbCurrentCard - 2)
                vUpCards.push(this.m_stSceneData.cbCurrentCard - 1)
            }

            var self = this;
            var onChiClickCallBack = function () {
                if (nValidLen == 0) {
                    return;
                }
                else if (nValidLen == 1) {
                    sendCMD.sendCMD_PO_EAT(pEatCase[0][3])  //表明只有一种吃的选择 
                }
                else {
                    //表明有多钟吃的选择
                    self.getPlayerByPos(1).getComponent("PlayerCardLayer").eatMoresCardToast(nValidLen, pEatCase, self.m_stSceneData.cbCurrentCard);
                }
            }
            gamebuttonLayer.setChiClickBtnCallBack(onChiClickCallBack);
            gamebuttonLayer.setGuoBtnVisible(true);
            gamebuttonLayer.setChiBtnVisible(true);
        }

        //表示能碰
        if (GameDefs.PlayerAction.paPeng == (choice & GameDefs.PlayerAction.paPeng)) {

            gamebuttonLayer.setGuoBtnVisible(true);
            gamebuttonLayer.setPengBtnVisible(true);
            vUpCards.push(this.m_stSceneData.cbCurrentCard)
        }

        //表示能杠
        if (GameDefs.PlayerAction.paGang == (choice & GameDefs.PlayerAction.paGang)) {
            var nWeaveType = GameDefs.WeaveType.MingGang
            var nV = -1;    //表示杠的麻将的牌值

            // var chaoTianMingGangResult = GameJudge.handCardIsHaveTwoLaiZiPi(myMJPlayer, this.m_stSceneData.cbLaizipi, this.m_stSceneData.cbCurrentCard);
            // var bIsChaoTianMingGang = chaoTianMingGangResult.bIsExist;
            // var chaotianMingGangCard = chaoTianMingGangResult.vCardValue;


            // var chaoTianAnGangResult = GameJudge.handCardIsHaveThreeLaiZiPi(myMJPlayer, this.m_stSceneData.cbLaizipi);
            // var bIsChaoTianAnGang = chaoTianAnGangResult.bIsExist;
            // var chaotianAnGangCard = chaoTianAnGangResult.vCardValue;

            var fourSameResult = GameJudge.handCardIsHaveFourSame(myMJPlayer);
            var bIsExistAnGang = fourSameResult.bIsExist;
            var anGangArray = fourSameResult.vCardArray;

            var threeSameResult = GameJudge.handCardIsHaveThreeSame(myMJPlayer, this.m_stSceneData.cbCurrentCard);
            var bIsExistMingGang = threeSameResult.bIsExist;
            var nVCard = threeSameResult.vCardValue;


            var oneSameResult = GameJudge.handCardIsHaveOneSameToWave(myMJPlayer);
            var bIsExistXuGang = oneSameResult.bIsExist;
            var xuGangArray = oneSameResult.vCardArray;

            var gangTable = new Array();
            if (this.m_cbMyChair == this.m_stSceneData.cbWhosTurn) {  //当前轮到我出牌  则不可能是明杠  只有可能是暗杠和续杠
                if (bIsExistAnGang) {
                    nWeaveType = GameDefs.WeaveType.AnGang;
                    nV = anGangArray[0]
                    for (var i = 0; i < anGangArray.length; i++) {
                        var anGangInfo = {};
                        anGangInfo.nGangCard = anGangArray[i];
                        anGangInfo.nGangType = nWeaveType;
                        gangTable.push(anGangInfo);
                    }
                }


                if (bIsExistXuGang) {
                    nWeaveType = GameDefs.WeaveType.XuGang
                    nV = xuGangArray[0];
                    for (var i = 0; i < xuGangArray.length; i++) {
                        var xuGangInfo = {};
                        xuGangInfo.nGangCard = xuGangArray[i];
                        xuGangInfo.nGangType = nWeaveType;
                        gangTable.push(xuGangInfo);
                    }
                }

                // if (bIsChaoTianAnGang) {
                //     nWeaveType = GameDefs.WeaveType.ChaoTianAnGang
                //     nV = chaotianAnGangCard;
                //     gangTable.push(nV);
                // }

            }
            else {

                if (bIsExistMingGang) {
                    nWeaveType = GameDefs.WeaveType.MingGang
                    nV = nVCard
                }

                // if (bIsChaoTianMingGang) {
                //     nWeaveType = GameDefs.WeaveType.ChaoTianMingGang
                //     nV = chaotianMingGangCard
                // }
            }



            var self = this;
            var onGangClickCallBack = function () {
                if (bIsExistMingGang && gangTable.length <= 1) {
                    sendCMD.sendCMD_PO_GANG(nV, nWeaveType)
                }
                else if (gangTable.length <= 1) {
                    sendCMD.sendCMD_PO_GANG(nV, nWeaveType)
                }
                else {
                    //表示同时有多个牌可以杠
                    self.getPlayerByPos(1).getComponent("PlayerCardLayer").gangMoresCardToast(gangTable);
                }
            }

            var onChaoTianClickCallBack = function () {
                sendCMD.sendCMD_PO_GANG(nV, nWeaveType)
            }

            //用于多个杠的时候选择过的
            var onGuoClickCallBack = function () {
                var mySelectGangNode = self.getPlayerByPos(1).getChildByName("select_penggangs");

                //表示最开始的时候没有点过 
                if (mySelectGangNode.childrenCount > 0) {
                    self.getPlayerByPos(1).getComponent("PlayerCardLayer").gangMoresCardToast(gangTable);
                }
                else {
                    sendCMD.sendCMD_PO_PASS();
                    var gamebuttonLayer = self.node.getComponent('GameButtonLayer');
                    gamebuttonLayer.setAllOperateButtonIsVis(false);
                }
            }
            gamebuttonLayer.setGangClickBtnCallBack(onGangClickCallBack);
            gamebuttonLayer.setGuoClickBtnCallBack(onGuoClickCallBack);
            gamebuttonLayer.setChaoTianClickBtnCallBack(onChaoTianClickCallBack);
            gamebuttonLayer.setGuoBtnVisible(true);
            // if (nWeaveType == GameDefs.WeaveType.ChaoTianAnGang || nWeaveType == GameDefs.WeaveType.ChaoTianMingGang) {
            //     gamebuttonLayer.setChaoTianBtnVisible(true);
            // }
            // else {
                gamebuttonLayer.setGangBtnVisible(true);
            // }
            vUpCards.push(nV)
        }

        //表示能胡
        if (GameDefs.PlayerAction.paHu == (choice & GameDefs.PlayerAction.paHu)) {

            // cc.log("---------------------can  hu-------------------");
            gamebuttonLayer.setGuoBtnVisible(true);
            if (this.m_stSceneData.cbWhosTurn == this.m_cbMyChair) {
                gamebuttonLayer.setZiMoBtnVisible(true);
            }
            else {
                gamebuttonLayer.setHuBtnVisible(true);
            }

        }

        //将相应的牌给提起
        if (vUpCards.length > 0) {

        }
    },

    getIsPoChan:function()
    {
        return this.pochanFlag;
    },
    operationChangeData: function (bFreshPutCard) {
        // var nStyle = nil
        // if ((self.m_stSceneData.cbPhase >= GameDefs.GamePhase.PhaseOutCard) || 
        //     (self.m_stSceneData.cbPhase == GameDefs.GamePhase.PhasePlayDingque)) {
        //     var mjPlayer = this.m_stSceneData.players[this.m_cbMyChair]
        //     nStyle = mjPlayer.cbDingque
        // }

        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            if (this.getPlayerByPos(nPos).getComponent("Player").getIsValidPlayer()) {
                var bolHu = this.m_stSceneData.players[this.ChairFromPos(nPos - 1)].cbIsHu == 1;
                this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").doCards(bFreshPutCard,bolHu);
            }

        }
    },

    setAllOutData: function () {
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            if (this.getPlayerByPos(nPos).getComponent("Player").getIsValidPlayer()) {
                this.getPlayerByPos(nPos).getComponent("OutCardLayer").doCards();
                this.getPlayerByPos(nPos).getComponent("HuCardLayer").doCards();
            }
        }
    },



    startTimer: function (overTimeFunc, nDowntime) {
        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleCallbackForTarget(this, this._timerUpdate)
        var timeLabel = this.node.getChildByName("arrow").getChildByName("timeLabel");
        timeLabel.getComponent(cc.Label).string = "";
        timeLabel.active = true;
        var strLeftTime = "";
        var update = function () {
            if (nDowntime < 0) {
                timeLabel.getComponent(cc.Label).string = "";
                if (overTimeFunc) {
                    overTimeFunc();
                }
                scheduler.unscheduleCallbackForTarget(this, update)
                return;
            }

            strLeftTime = strLeftTime = nDowntime;
            if (nDowntime < 10) {
                strLeftTime = "0" + strLeftTime;
            }
            timeLabel.getComponent(cc.Label).string = strLeftTime;
            nDowntime = nDowntime - 1;
        };
        update();
        this._timerUpdate = update;
        scheduler.scheduleCallbackForTarget(this, update, 1, cc.macro.REPEAT_FOREVER, 0, false);
    },

    stopTimer: function () {
        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleCallbackForTarget(this, this._timerUpdate)
        var timeLabel = this.node.getChildByName("arrow").getChildByName("timeLabel");
        timeLabel.getComponent(cc.Label).string = "";
    },

    setTingCardLeftNum: function (nOutCard, nCount) {
        var vTingList = this.m_saveTingCardList;
        if (!vTingList || vTingList.length == 0)
            return;
        for (var i = 0; i < vTingList.length; i++) {
            var nTingCount = vTingList[i].cbTingCount;
            for (var j = 0; j < nTingCount; j++) {
                if (nOutCard == vTingList[i].cbTingCard[j]) {
                    vTingList[i].cbLeftCount[j] -= nCount;
                    if (vTingList[i].cbLeftCount[j] <= 0) {
                        vTingList[i].cbLeftCount[j] = 0;
                    }
                    break;
                }
            }
        }
    },

    //处理换牌动画
    exchangeCardAniation:function(){
        var self = this;
        var swapCardFinshcallBack = function(){
            //处理换牌后插牌动作
            self.huanPaiTipsLayer.active = false;
            self.operationChangeData(true)
            var mjPlayer = self.m_stSceneData.players[self.m_cbMyChair];
            var runActionFun = function(nPos){
                if(nPos > GameDefs.PLAYER_COUNT){
                    return;
                }
                var tb = mjPlayer.cbBeExchange;
                self.getPlayerByPos(nPos).getComponent("PlayerCardLayer").insertThreeCard(mjPlayer.cbBeExchange,nPos);
                runActionFun(1+nPos);
            }
            runActionFun(1);
            
        }
        self.huanPaiTipsLayer.active = true;
        // console.log("换牌的方式：AAAAAAAAAAAAAAAAAAAAAAAA"+this.m_stSceneData.cbSecondDice)
        if (this.m_stSceneData.cbSecondDice == 1 || this.m_stSceneData.cbSecondDice == 2)
            self.huanPaiTipsLayer.getComponent("ChangeCardAction").showShunRotateAction(swapCardFinshcallBack);
        else if (this.m_stSceneData.cbSecondDice == 3 || this.m_stSceneData.cbSecondDice == 4)
            self.huanPaiTipsLayer.getComponent("ChangeCardAction").showUpDownMoveAction(swapCardFinshcallBack);
        else if (this.m_stSceneData.cbSecondDice == 5 || this.m_stSceneData.cbSecondDice == 6)
            self.huanPaiTipsLayer.getComponent("ChangeCardAction").showNiRotateAction(swapCardFinshcallBack);
    },  

    //播放换牌动画
    changeMjAction:function(){
        var self = this;
        // for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {

        var PlayerAction = function(nPos){
            if(nPos > GameDefs.PLAYER_COUNT){
                return;
            }
            var node = self.getPlayerByPos(nPos);
            var changeCardsNode = node.getChildByName("changecards");
            changeCardsNode.active = true;
            var action = null;
            var action1 = null;
            var action2 = null;
            var action3 = null;
            if (nPos == 1)
            {
                action1 = cc.spawn(cc.scaleTo(0.8,0,0), cc.moveBy(0.8,0, 50));
                action2 = cc.spawn(cc.scaleTo(0.7,1,1), cc.moveBy(0.7,0, -50));
                action3 = cc.callFunc(()=>{
                    changeCardsNode.active = false;           
                });
                action = cc.sequence(cc.delayTime(0.2),action1,cc.delayTime(0.2),action2,action3);
            }else if (nPos == 2)
            {
                action1 = cc.spawn(cc.scaleTo(0.8,0,0), cc.moveBy(0.8, -140,0));
                action2 = cc.spawn(cc.scaleTo(0.7,1,1), cc.moveBy(0.7, 140,0));
                action3 = cc.callFunc(()=>{
                    changeCardsNode.active = false;
                });
                action = cc.sequence(cc.delayTime(0.2),action1,cc.delayTime(0.2),action2,action3);
            }else if (nPos == 3)
            {
                action1 = cc.spawn(cc.scaleTo(0.8,0,0), cc.moveBy(0.8, 0,-50));
                action2 = cc.spawn(cc.scaleTo(0.7,1,1), cc.moveBy(0.7, 0,50));
                action3 = cc.callFunc(()=>{
                    changeCardsNode.active = false;
                });
                action = cc.sequence(cc.delayTime(0.2),action1,cc.delayTime(0.2),action2,action3);
            }
            else if (nPos == 4)
            {
                action1 = cc.spawn(cc.scaleTo(0.8,0,0), cc.moveBy(0.8, 160,0));
                action2 = cc.spawn(cc.scaleTo(0.7,1,1), cc.moveBy(0.7, -160,0));
                action3 = cc.callFunc(()=>{
                    changeCardsNode.active = false;
                });
                action = cc.sequence(cc.delayTime(0.2),action1,cc.delayTime(0.2),action2,action3);
            }
            changeCardsNode.runAction(action);
            PlayerAction(nPos + 1);
        // }
        }

        PlayerAction(1);
    },
    
    //设置确认定缺动画播放，顺便为自己手牌的定缺进行变灰处理
    dingQueYiMenAniation:function(bolFly){
        var self = this;

        var mjPlayer = this.m_stSceneData.players[this.m_cbMyChair];

        this.getPlayerByPos(1).getComponent("PlayerCardLayer").setQueYiMenStyleType(mjPlayer.cbDingque)
        this.getPlayerByPos(1).getComponent("PlayerCardLayer").setQueYiMenMjGray()

        
        var PlayerAction = function(chair){
            
            if(chair > (GameDefs.PLAYER_COUNT - 1)){
                return;
            }
            var nPos = self.PosFromChair(chair)
            var mjPlayer = self.m_stSceneData.players[chair];
            self.getPlayerByPos(nPos).getComponent("Player").setQueWanSpIsVis(true,mjPlayer.cbDingque,true)
            PlayerAction(chair + 1);
        }
        if(!bolFly)
            PlayerAction(0);
    },

    addDingQueYiMenUI:function(bIsVis,nType,bShow){
        var self = this;
        var nType = nType || 4;
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            if (nPos !=1) {
                this.getPlayerByPos(nPos).getComponent("Player").setDingqueSpIsVis(bShow,nType);
            }else
            {
                self.queYiMenTipsLayer.active = bIsVis;
                self.queYiMenButtonLayer.active = bIsVis;

                var nQueMen = this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").getChooseMjTypeByCount(true)
                var playerNode;
                var whosTurnNode;
                var strAniName;
                if(nQueMen == 0){
                    playerNode = this.queYiMenButtonLayer.getChildByName("wan_node");
                    whosTurnNode = playerNode.getChildByName("wan_act");
                    strAniName = '6wan';
                }else if(nQueMen == 1){
                    playerNode = this.queYiMenButtonLayer.getChildByName("tiao_node");
                    whosTurnNode = playerNode.getChildByName("tiao_act");
                    strAniName = '7tiao';
                }else if(nQueMen == 2){
                    playerNode = this.queYiMenButtonLayer.getChildByName("tong_node");
                    whosTurnNode = playerNode.getChildByName("tong_act");  
                    strAniName = '8tong';
                }
                whosTurnNode.active = true;
                var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
                dragonDisplay.playAnimation(strAniName);
                var callback = function () {
                    dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
                }
        
                dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
            }
        }
    },

    addThreeSelectCardUI:function(bIsVis,nType,bShow){
        var self = this;
        var nType = nType || 7;
        this.waitTimer = this.CHANGE_THREE_COUNT - 2;
        
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            if (nPos != 1) {
                this.getPlayerByPos(nPos).getComponent("Player").setSelectCardSpIsVis(bShow,nType)
            }else
            {
                self.xuanPaiTipsLayer.active = bIsVis;
            }
        }

        if (!bIsVis){
            return
        }
        
        //提起三张牌（客户端指定）
        this.getPlayerByPos(1).getComponent("PlayerCardLayer").upThreeCardByType();

        this.startXuanPaiTime = function () {
            self.waitTimer -= 1;
            if (self.waitTimer >= 0) {
                self.xuanPaiTipsTimes.string = self.waitTimer;
                if (self.waitTimer == 0)
                    this.onXuanPaiButtonClick(null,2)
            }
            else {
                if (!this.isClick)
                    this.getPlayerByPos(1).getComponent("PlayerCardLayer").deleteThreeMjRefresh();
            }

        }
        this.schedule(this.startXuanPaiTime, 1, this.XUANPAI_COUNT, 0);
        
    },

    //点击选牌按钮,把指定的三张牌传给服务器
    onXuanPaiButtonClick:function (event,data) {
        HallResources.getInstance().playButtonEffect();
        var self = this;
        
        var dealComfirm = function(){
            if (self.waitTimer <= 0) {
                self.unschedule(self.startXuanPaiTime);
            }
            self.xuanPaiTipsLayer.active = false;
        }
        //发送选三张牌给服务器
        var vCardSpList = this.getPlayerByPos(1).getComponent("PlayerCardLayer").getThreeUpCradList()
        if (data == 2)
            vCardSpList = this.getPlayerByPos(1).getComponent("PlayerCardLayer").getUpThreeCardValue()
        // console.log("下面是选择的手牌---------------------------------------")
        // console.log(vCardSpList)
        if (vCardSpList.length!=3) {
            Resources.ShowToast("必须选择同花色的三张牌")
            return;
        }
        if ((GameCfg.getMjColor(vCardSpList[0])!=GameCfg.getMjColor(vCardSpList[1]))||(GameCfg.getMjColor(vCardSpList[0])!=GameCfg.getMjColor(vCardSpList[2])))
        {
            Resources.ShowToast("必须选择同花色的三张牌")
            return;
        }
        this.isClick = true;
        sendCMD.sendCMD_PO_Exchange(vCardSpList)
        dealComfirm()     
        //删除手牌中选择的那三张
        this.getPlayerByPos(1).getComponent("PlayerCardLayer").deleteThreeMjRefresh(vCardSpList);

        var node = this.getPlayerByPos(1);
        var changeCardsNode = node.getChildByName("changecards");
        changeCardsNode.y =-200;
        changeCardsNode.active = true;
        changeCardsNode.runAction(cc.moveBy(0.5,0,195));
    },

    //刷新听牌显示
    refreshTingCard: function () {

        var vTingList = this.m_saveTingCardList;
        if (!vTingList || vTingList.length == 0)
            return;
        var nTingCount = 0;
        var vTingCard;
        var vTingFan;
        var vTingLeft;
        for (var i = 0; i < vTingList.length; i++) {
            if (this.m_nClickCardTing == vTingList[i].cbOutCard) {
                nTingCount = vTingList[i].cbTingCount
                vTingCard = vTingList[i].cbTingCard
                vTingFan = vTingList[i].cbFan
                vTingLeft = vTingList[i].cbLeftCount
                break
            }
        }

        //如果听牌数目大于0
        if (nTingCount > 0 && this.listenCardLayer.active) {
            var ListenCardLayer = this.listenCardLayer.getComponent("ListenCardLayer");
            // ListenCardLayer.setlaiziValue(this.m_stSceneData.cbLaizi);
            ListenCardLayer.init(vTingCard, vTingFan, vTingLeft)
        }

    },

    judgeIsTingCard: function (event) {
        var vCardList = event.data;
        var vTingList = this.m_stSceneData.vTingList;
        if (!vTingList || vTingList.length == 0)
            return;
        if (this.m_cbMyChair != this.m_stSceneData.cbWhosTurn) {
            return;
        }

        var nTingCount = 0;
        var vTingCard = null;
        var vTingFan= null;
        var vTingLeft= null;
        for (var i = 0; i < vTingList.length; i++) {
            if (vTingList[i] && vCardList.cardValue == vTingList[i].cbOutCard) {
                nTingCount = vTingList[i].cbTingCount;
                vTingCard = vTingList[i].cbTingCard;
                vTingFan = vTingList[i].cbFan;
                vTingLeft = vTingList[i].cbLeftCount;
                break;
            }
        }

        if (nTingCount > 0) {
            var ListenCardLayer = this.listenCardLayer.getComponent("ListenCardLayer");
            ListenCardLayer.setlaiziValue(this.m_stSceneData.cbLaizi);
            ListenCardLayer.init(vTingCard, vTingFan, vTingLeft)
            this.listenCardLayer.active = true;
        }
        else {

            this.listenCardLayer.active = false;
        }
    },

    //收到表情和快捷聊天的消息
    onRecvTableChat: function (chat) {
        var chatChair = -1;
        var gamelib = this.getGameLib();
        var tableUser = gamelib.getUser((chat._dwSpeaker % 0x10000));
        if (!tableUser) {
            return;     //无此用户
        }

        //发送聊天的椅子号
        var iChair = tableUser.getUserChair();
        if (iChair < 0 || iChair >= 4) {  //判定是否是无效的椅子号
            return;
        }

        var playerNode = this.getPlayerByPos(this.PosFromChair(iChair))
        if (playerNode.active == true) {
            var stChat = {}
            stChat.szNickname = tableUser.getUserName()
            var sysHead = "--:"
            var vipHead = "v--:"
            var speakContent = chat.getChatMsg()
            var szHead = speakContent.substr(0, 3)
            var szHead2 = speakContent.substr(0, 4)
            if (szHead == sysHead) {  //显示表情
                var faceIndex = speakContent.substring(3);
                var face = Number(faceIndex);
                stChat.cbType = 0;
                stChat.cbFace = face;
                if (face >= 0 && face < require("Resources").FACE_CHAT_MAX_NUM) {
                    playerNode.getComponent("Player").showChatFaceInfo(face);
                }
            }
            else if (szHead2 == vipHead) {    //显示vip表情
                var faceIndex = speakContent.substring(4);
                var face = Number(faceIndex);
            }
            else {   //显示文字

                playerNode.getComponent("Player").showChatTextInfo(speakContent);
                stChat.cbType = 2;
                stChat.szChatContent = speakContent
                var wordIndex = -1;
                for (var i in Resources.QUICK_SEND_CHATS) {
                    if (speakContent == Resources.QUICK_SEND_CHATS[i]) {
                        wordIndex = i;
                        break;
                    }
                }

                var index = -1;
                var effectFile = "";

                var posY = [326, 280, 214, 234, 192, 118];
                var moveTime = [1.5, 2.5, 2, 2.5, 1, 2];

                for (var i = 0; i < 6; i++) {
                    var posX = -640 + Math.random() * (-1920);
                    this.showScrollWords(posX, posY[i], moveTime[i], i, wordIndex);
                }
            }
        }
    },

    //展示弹幕信息
    showScrollWords: function (moveToX, moveToY, moveTime, index, wordIndex) {
        wordIndex = parseInt(wordIndex);
        var bgRandom = Math.random() * 10;

        var winSize = cc.director.getWinSize();
        var bgNode = new cc.Node();
        bgNode.active = true;
        var sprite = bgNode.addComponent(cc.Sprite);
        //取深颜色背景
        if (bgRandom <= 5) {
            var frame = this.node.getComponent("DeskScene").chatAtlas.getSpriteFrame("deepBg");
            sprite.spriteFrame = frame;
        }
        else {
            var frame = this.node.getComponent("DeskScene").chatAtlas.getSpriteFrame("shallowBg")
            sprite.spriteFrame = frame;
        }

        this.node.addChild(bgNode, 100);
        bgNode.setScale(0.85);
        bgNode.x = winSize.width / 2 + bgNode.getContentSize().width / 2 + 20;
        bgNode.y = moveToY;

        // cc.log("-------- bg create finish --------");
        wordIndex += 1;
        var textWord = "text_word" + (wordIndex);
        var wordsNode = new cc.Node();
        wordsNode.active = true;
        var wordsSprite = wordsNode.addComponent(cc.Sprite);
        wordsSprite.spriteFrame = this.node.getComponent("DeskScene").chatAtlas.getSpriteFrame(textWord)
        wordsSprite.node.setScale(0.7)
        wordsNode.x = 0;
        wordsNode.y = 0;
        bgNode.addChild(wordsNode);

        if (index == 1 || index == 4) {
            bgNode.setScale(0.7);
        }
        else if (index == 5) {
            bgNode.setScale(1);
            moveToX = -280;
        }

        var moveTo = cc.moveTo(moveTime, cc.p(moveToX, moveToY));
        var delayTime = cc.delayTime(0.8);
        var clean = cc.removeSelf();
        var sequence = cc.sequence(moveTo, delayTime, clean);
        bgNode.runAction(sequence);

    },

    //播放胡牌特效
    playHuEffect: function (nChair, bIsZimo, onPlayEnd,nFangPaoChair) {

        if (this.hupaiAssets.length <= 0) {
            return;
        }
        
        
        var nPos = this.PosFromChair(nChair);
        var nFangPaoPos = null;
        var mjNode = null;
        if (bIsZimo) {
            // mjNode = this.getPlayerByPos(nPos).getComponent("PlayerCardLayer").getLastHandCard();
        }
        else {
            nFangPaoPos = this.PosFromChair(nFangPaoChair);
            mjNode = this.getPlayerByPos(nFangPaoPos).getComponent("OutCardLayer").getLastOutCard();
        }
        // console.log("播放放炮闪电和胡牌发光的系统时间："+HallResources.getInstance().printNowTimes());
        if(mjNode){
            var offset = cc.p(0, 0)
            if (bIsZimo && nPos == 1) {

                //因为自己面前的牌的anchorPoint为cc.p(0, 0.5);
                offset = cc.p(mjNode.getContentSize().width, 0);
            }

            var hupaiNode = new cc.Node();
            this.node.addChild(hupaiNode, 100);

            var convetPos = this.node.convertToNodeSpace(cc.p(mjNode.getPosition()));
            hupaiNode.x = convetPos.x + offset.x / 2;
            hupaiNode.y = convetPos.y + offset.y / 2;
            hupaiNode.active = true;
            var dragonDisplay = hupaiNode.addComponent(dragonBones.ArmatureDisplay);

            for (var i in this.hupaiAssets) {
                if (this.hupaiAssets[i] instanceof dragonBones.DragonBonesAsset) {
                    dragonDisplay.dragonAsset = this.hupaiAssets[i];
                }
                if (this.hupaiAssets[i] instanceof dragonBones.DragonBonesAtlasAsset) {
                    dragonDisplay.dragonAtlasAsset = this.hupaiAssets[i];
                }
            }

            dragonDisplay.armatureName = 'armatureName';
            dragonDisplay.playAnimation('Animation2');
            Resources.playCommonEffect("shandian.mp3");
            this.m_hupaiActionmature = dragonDisplay;

            var self = this;
            var callback = () => {

                hupaiNode.removeFromParent(true);
                //点炮之后在我胡牌位置出现一张新的牌
                self.getPlayerByPos(nPos).getComponent("HuCardLayer").putHuMj(true);
                if (onPlayEnd) {
                    onPlayEnd();
                }
            };
            this.m_hupaiActionmature.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
        }
    },

    //上传游戏结果给微信服务器
    reportResultToWx:function(){
        var callBackFunc = function(success, data){
            if (success)  {
                HallResources.getInstance().removeLoading();
                var jsonObject = JSON.parse(data)
                console.log("打印上报给微信服务器的胜局数数据-----------------WxFriendsScoreRank.aspx返回数据----------------------------")
                console.log(jsonObject)
                var data = jsonObject.table[0]
                var playerRankNum = data.RankNum;
                var playerOpenID = data.OpenID
                // var playerUserId = data.UserID
                var playerScore = data.Score
				// 这里去将用户数据上报（排行榜要用）
                var kvDataList = new Array();
                kvDataList.push(
                {
                    key: "playerScore",
                    value:"" + playerScore
                });
                wx.setUserCloudStorage({
                    KVDataList: kvDataList
                })
            }
        };

        var wxUserInfo = WeixinManager.getInstance().userInfo;
        if(wxUserInfo) {
            var myOpenId = wxUserInfo.openid;
            require('HallWebRequest').getInstance().getPlayerData(myOpenId,callBackFunc);
        }
    },

    //游戏结束
    gameOver: function () {
        this.bolTips20Card = false;
        this.queYiMenTipsLayer.active = false;
        this.queyimenTipsTimes = 0;
        this.robotTips.node.active = false;
        this.isMeClickRobot = false;
        this.huTips.node.active = false;
        this.afterHuOutCardTimes = 0;
        this.isMyFirstHu = false;
        this.pochanFlag = false;
        var cancelPoChanNode = this.node.getChildByName("cancel_pochan");
        cancelPoChanNode.active = false;
        this.setIsDirectionVis(0);
        this.stopDingQueAnimation();
        this.stopTimer();

        this.listenCardLayer.active = false;

        this.node.getChildByName("cancel_robot").active = false;

        this.node.getChildByName("laizi").active = false;

        for (var i = 1; i <= GameDefs.PLAYER_COUNT; i++) {
            var stPlayer = this.m_stSceneData.players[i];
            this.getPlayerByPos(i).getComponent('Player').setQueWanHeadIconSpIsVis(false,0);
        }
        var stWinStruct = this.m_stSceneData.stWinStruct
        var self = this;
        var playHuEffectEnd = function () {

            // var bIsLiuju = self.m_stSceneData.stWinStruct.cbEndType == GameDefs.EndType.Liuju;
            var cbHuType = self.m_stSceneData.stWinStruct.cbHuType;
            // var cbFan = (bIsLiuju) ? 0 : self.m_stSceneData.stWinStruct.cbFan[self.m_stSceneData.stWinStruct.cbWinChair];
            var laiyouCardValue = null;
    
            for (var i = 0; i < GameDefs.PLAYER_COUNT; i++) {
                for (var j = 0; j < self.m_stSceneData.players[i].nWeaveCount; j++) {
                    var weaveItem = self.m_stSceneData.players[i].showCardSuits[j];
                    if (weaveItem.cbWeaveKind == GameDefs.WeaveType.MingGang) {
                        var stPlayer = self.m_stSceneData.players[weaveItem.cbChair];
                        var tWeaveItem = {};
                        tWeaveItem.cbWeaveKind = GameDefs.WeaveType.FangGang;
                        stPlayer.showCardSuits.push(tWeaveItem);
                    }
                }
            }
    
            var playersName = new Array();
            var playerPoChan = new Array();
            var playerAvatorUrls = new Array();
            for (var i = 0; i < GameDefs.PLAYER_COUNT; i++) {
                var player = self.getPlayerByPos(self.PosFromChair(i)).getComponent('Player');
                var name = player.getPlayerName();
                var faceUrl = player.getFaceUrl();
                playersName.push(name);
                playerAvatorUrls.push(faceUrl);

                var playerPos = self.PosFromChair(i);
                var nGold = self.getPlayerByPos(playerPos).getComponent("Player").getNowScore()
                if (nGold <= 0)
                    playerPoChan[i] = 1;
                else
                    playerPoChan[i] = 0;
            }

            //本来是金币场和私人场都执行显示详细内容，现在改为金币场不显示，私人场点击按钮显示金币场的结算
            // var showDetailResult = function () {
            //     // self.showResultLayer();
            //     self.matchGameOverLayer.active = false;
            //     var gameOverLayer = self.gameOverLayer.getComponent("XueLiuGameOverLayer");
            //     gameOverLayer.init(self.m_stSceneData.stWinStruct, self.m_stSceneData.players, playersName, playerAvatorUrls,self.m_cbMyChair,null,self.m_roomInfo.nCost,playerPoChan,true);
            //     self.gameOverLayer.active = true;
            //     // self.gameOverLayer.getComponent("XueLiuGameOverLayer").stopLeftTimer();
            //     self.gameOverLayer.getComponent("XueLiuGameOverLayer").setIsPrivateRoom(true);
            // }
            // }
            if(self.getIsPrivateRoom()){
                
                var httpCallback = function(success, data){
                    require('HallResources').getInstance().removeLoading();
                    if(success){

                        var jsonObject = JSON.parse(data);
                        var myselfWinOrLoseScore =  self.m_stSceneData.stWinStruct.nFinalScore[self.m_cbMyChair];
                        console.log("连胜的次数为：" + jsonObject.ContinuityWin);
                        console.log("最终的分数为："+myselfWinOrLoseScore);
                        var showMatchResultLayer = function(){
                            var matchGameOverLayer = self.matchGameOverLayer.getComponent("MatchGameOverLayer");
                            var matchLevel = self.m_nNewLevel ? self.m_nNewLevel : self.m_roomSetInfo.cbGradeIndex[self.m_cbMyChair]
                            matchGameOverLayer.init(false, null, null, laiyouCardValue, null, matchLevel, self.m_pMyself.getScore(), myselfWinOrLoseScore, jsonObject.ContinuityWin, self.m_roomSetInfo.szBatchID);

                            if(myselfWinOrLoseScore < 0){                           
                                // var onRetCallback = function(success, data){
                                //     require('HallResources').getInstance().removeLoading();
                                //     if(success){
                                //         var jsonObject = JSON.parse(data);
                                //         if(parseInt(jsonObject.CurTimes) >= parseInt(jsonObject.TotalTimes)){
                                //             self.matchGameOverLayer.active = true;
                                //         }
                                //         else{

                                            var onProtectScoreLayerClosed = function(){
                                                self.matchGameOverLayer.active = true;
                                            }
                                            var protectScoreLayer =  self.protectScoreLayer.getComponent("ProtectScoreLayer");
                                            protectScoreLayer.init(self.m_roomSetInfo.szBatchID, myselfWinOrLoseScore,  onProtectScoreLayerClosed, matchLevel, self.m_pMyself.getScore(),myselfWinOrLoseScore);
                                            self.protectScoreLayer.active = true;
                                //         }
                                //     }
                                // }
                                // require('HallWebRequest').getInstance().getProtectScoreNum(onRetCallback)
                            }
                            else{

                                //表示升段了
                                if(self.m_nNewLevel){
                                    var showLevelUpgrade = function(onLevelUpgradeClosed){
                                        var upgradelevelLayer = self.levelUpgradeLayer.getComponent("UpgradeLevelLayer");
                                        upgradelevelLayer.init(self.m_nNewLevel, self.m_pMyself.getScore(), myselfWinOrLoseScore, onLevelUpgradeClosed);
                                        self.levelUpgradeLayer.active = true;
                                    }
                                    
                                    matchGameOverLayer.setShowLevelUpgrade(showLevelUpgrade);
                                    self.matchGameOverLayer.active = true;
                                }
                                else{
                                    self.matchGameOverLayer.active = true;
                                }    
                            }
                        }

                        if(parseInt(jsonObject.ContinuityWin) == 3 || parseInt(jsonObject.ContinuityWin) == 5 || 
                            parseInt(jsonObject.ContinuityWin) == 7 || parseInt(jsonObject.ContinuityWin) == 9){

                            var continueWinLayer = self.continueWinLayer.getComponent("ContinueWinLayer");
                            continueWinLayer.init(parseInt(jsonObject.ContinuityWin), showMatchResultLayer);
                            self.continueWinLayer.active = true;
                        }
                        else{

                            showMatchResultLayer(); 
                        }
                         
                    }
                }

                var privateRoomGameOverLayerCallFunc = function(){
                    var gameOverLayer = self.gameOverLayer.getComponent("XueLiuGameOverLayer");
                    gameOverLayer.node.active = false;
                    require('HallWebRequest').getInstance().getContinuityWinGetInfo(httpCallback);
                }
                
                var backToDeskCallFunc = function(){
                    var gameOverLayer = self.gameOverLayer.getComponent("XueLiuGameOverLayer");
                    gameOverLayer.node.active = false;
                    self.backToDataMsg.node.active = true;
                    self.nextGameBtn2.node.active = true;
                }

                self.matchGameOverLayer.active = false;
                var gameOverLayer = self.gameOverLayer.getComponent("XueLiuGameOverLayer");
                gameOverLayer.init(self.m_stSceneData.stWinStruct, self.m_stSceneData.players, playersName, playerAvatorUrls,self.m_cbMyChair,null,self.m_roomInfo.nCost,playerPoChan,true);
                self.gameOverLayer.active = true;
                self.gameOverLayer.getComponent("XueLiuGameOverLayer").setIsPrivateRoom(true);
                self.gameOverLayer.getComponent("XueLiuGameOverLayer").setContinueBtn(privateRoomGameOverLayerCallFunc);
                self.gameOverLayer.getComponent("XueLiuGameOverLayer").setBackToDeskBtn(backToDeskCallFunc);

                self.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(true);
                self.moreSettingLayer.getComponent("MoreSettingLayer").setChangedDeskBtnEnabled(true);
            }
            else{
                var gameOverLayer = self.gameOverLayer.getComponent("XueLiuGameOverLayer");
                gameOverLayer.init(self.m_stSceneData.stWinStruct, self.m_stSceneData.players, playersName, playerAvatorUrls,self.m_cbMyChair,null,self.m_roomInfo.nCost,playerPoChan);
                self.gameOverLayer.active = true;

                self.moreSettingLayer.getComponent("MoreSettingLayer").setLeaveBtnEnabled(true);
                self.moreSettingLayer.getComponent("MoreSettingLayer").setChangedDeskBtnEnabled(true);
            }  
        };

        var chaDaJiaoAndHuaZhu = function(){
            for (var i = 0; i < GameDefs.PLAYER_COUNT; i++) {
                var vSinleScore = stWinStruct.stSingleScore[i]
                var nChaDaJiao = 0
                var nChaHuaZhu = 0
                var nScore = 0
                for (var j = 0; j < stWinStruct.cbWriteScoreTimes[i]; j++) {
                    var stSinleScore = vSinleScore[j];
                    if (stSinleScore.cbScoreType == GameDefs.scoreType.scoreChaDaJiao){
                        
                        nChaDaJiao = 1;
                        nScore = stSinleScore.nScore;
                        if (nScore >=0){
                            nChaDaJiao = 0;
                            break;
                        }
                    }
                    if (stSinleScore.cbScoreType == GameDefs.scoreType.ScoreChaHuaZhu){
                        nChaHuaZhu = 1;
                        nScore = stSinleScore.nScore;
                        if (nScore >=0){
                            nChaHuaZhu = 0;
                            break;
                        }
                    }
                }
                var player = self.getPlayerByPos(self.PosFromChair(i)).getComponent('Player');
                var nPos = self.PosFromChair(i);
                if (nChaDaJiao== 1) {
                    // player.setChaDaJiaoSpIsVis(true,8)
                    this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2ChaDaJiao, nPos);
                }
                else if (nChaHuaZhu==1) 
                {
                    // player.setChaDaJiaoSpIsVis(true,9)
                    this.getPlayerByPos(nPos).getComponent('Player').playOperateEffects(GameCfg.EffectList.No_2ChaHuaZhu, nPos);
                }
                if (nScore!=0) {
                    player.setTempChangeGold(nScore,null,true)
                }
            }
        };

        var gameOverCallback = function () {
            var whosTurnNode = self.node.getChildByName("over_game_act");
            whosTurnNode.active = false;

            var isSetting = new Array();
            for (var cbChair = 0; cbChair < GameDefs.PLAYER_COUNT; cbChair++) {
                var nPos = self.PosFromChair(cbChair);
                if (!isSetting[nPos]) {
                    if (self.getPlayerByPos(nPos).getComponent('Player').getIsValidPlayer()) {
                        self.getPlayerByPos(nPos).getComponent('Player').setIsWinner(false);
                        if (nPos == self.PosFromChair(stWinStruct.cbWinChair) && stWinStruct.cbEndType != GameDefs.EndType.Liuju) {
                            self.getPlayerByPos(nPos).getComponent('Player').setIsWinner(true);
                        }
                        var finalScore = stWinStruct.nFinalScore[cbChair]
                        if(!self.getIsPrivateRoom()){
                            finalScore = finalScore + self.m_roomInfo.nCost
                        }
                        else{
                            finalScore = stWinStruct.nSrcScore[cbChair]
                        }
                        self.getPlayerByPos(nPos).getComponent('Player').setLastGoldOnGameOver(finalScore);
                        self.getPlayerByPos(nPos).getComponent('Player').gameOver();
                        self.getPlayerByPos(nPos).getComponent('Player').setTempChangeGold(0,null,false,true);
                    }
                    isSetting[nPos] = true;
                }
            }
            self.openGmae = false;

            TSCommon.performWithDelay(this, playHuEffectEnd, 2);
        }
        
        TSCommon.performWithDelay(this, chaDaJiaoAndHuaZhu, 0.1);
        TSCommon.performWithDelay(this, this.playOverGameAct, 2);
        TSCommon.performWithDelay(this, gameOverCallback, 3);

    },

    backToDataMsgFunc: function () {
        var gameOverLayer = this.gameOverLayer.getComponent("XueLiuGameOverLayer");
        gameOverLayer.node.active = true;
        this.backToDataMsg.node.active = false;
        this.nextGameBtn2.node.active = false;
    },

    nextGameFunc: function () {
        G.matchGameReady = true;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

    //展示游戏结算界面
    showResultLayer: function () {

        
        // var playersName = new Array();
    
        // var playerAvatorUrls = new Array();
        // for (var i = 0; i < GameDefs.PLAYER_COUNT; i++) {
        //     var player = this.getPlayerByPos(this.PosFromChair(i)).getComponent('Player');
        //     var name = player.getPlayerName();
        //     var faceUrl = player.getFaceUrl();
        //     playersName.push(name);
        //     playerAvatorUrls.push(faceUrl);
        // }
        // var leftTime; 
        // if(this.getIsPrivateRoom()){
        //     leftTime = this.matchGameOverLayer.getComponent("MatchGameOverLayer").getLeftLeaveTime();
        // }
        // else{
        //     leftTime = this.gameOverLayer.getComponent("XueLiuGameOverLayer").getLeftLeaveTime();
        // }
        
        // var gameOverView = this.gameResultLayer.getComponent("XueLiuGameResultLayer");
        // gameOverView.setWinStructInfo(this.m_stSceneData.stWinStruct, this.m_stSceneData.players, playersName, playerAvatorUrls, this.node.getComponent('MjResourceMgr').mj1_face_dao,
        //     this.node.getComponent('MjResourceMgr').mj1_face_li, this.m_roomInfo, leftTime);
        // gameOverView.loadUI();
        // this.gameResultLayer.active = true;
    },


    //游戏重新开始
    onGameReStart: function (event) {
        var data = event.data;
        var bIsReady = data.isReady;
        this.m_nNewLevel = null;
        this.m_playerStatus = this.m_playerStatus || new Array();

        // 清除桌面上的东西 然后重新部分初始化
        for (var nPos = 1; nPos <= GameDefs.PLAYER_COUNT; nPos++) {
            if (this.getPlayerByPos(nPos).getComponent("Player").getIsValidPlayer()) {
                this.getPlayerByPos(nPos).getComponent("Player").cleanPlayers();
                
                if(bIsReady){   //是否需要准备  需要准备则说明是游戏结束后点击开始按钮  不需要准备则说明只是换桌
                    if (this.m_playerStatus[nPos]) {
                        this.getPlayerByPos(nPos).getComponent("Player").setIsReady(true);
                    }
                    else {
                        if(nPos != 1){
                            this.getPlayerByPos(nPos).getComponent("Player").showLeaveTimer();
                        }                    
                    }
                }
            }
        }

        this.gameOverLayer.getComponent("XueLiuGameOverLayer").stopLeftTimer();
        this.matchGameOverLayer.getComponent("MatchGameOverLayer").stopLeftTimer();
        // this.gameResultLayer.getComponent("XueLiuGameResultLayer").stopLeaveTimer();

        this.gameOverLayer.active = false;
        this.matchGameOverLayer.active = false;
        this.gameResultLayer.active = false;

        var nGold = this.m_pMyself.getGold();
        var pCurrentRoom = this.getGameLib().getCurrentGameRoom()
        if(bIsReady){
            if ((pCurrentRoom && nGold >= pCurrentRoom.dwMinGold) || this.getIsPrivateRoom()) {
                sendCMD.sendCMD_PO_RESTART();
                this.getPlayerByPos(1).getComponent("Player").stopLeaveTimer();
            }
            else {
                this.showGoldNotEnoughTips();
    
                var self = this;
    
                this.node.getComponent("GameButtonLayer").setStartBtnVisible(true);
                this.getPlayerByPos(1).getComponent("Player").showLeaveTimer();
    
                var startClickedCallback = function(fun){

                    console.log("测试破产数据：nGold = "+nGold)
                    console.log("测试破产数据：pCurrentRoom.dwMinGold = "+pCurrentRoom.dwMinGold)
                    var nGold2 = self.m_pMyself.getGold();
                    console.log("测试破产数据：nGold2 = "+nGold2)
                    if(pCurrentRoom && nGold2 < pCurrentRoom.dwMinGold){
                        self.showGoldNotEnoughTips();
                    }
                    else{
                        fun();
                        self.getPlayerByPos(1).getComponent("Player").stopLeaveTimer();
                        self.getPlayerByPos(1).getComponent("Player").hideLeaveTimer();
                    }
                };
    
                this.node.getComponent("GameButtonLayer").setStartClickBtnCallBack(startClickedCallback);
            }
        }
        else{

            this.getPlayerByPos(1).getComponent("Player").setIsReady(false);
            var gamebuttonLayer = this.node.getComponent('GameButtonLayer');
            gamebuttonLayer.setStartBtnVisible(true);
        }
        
    },

    showMallLayer:function(){
        this.mallLayer.active = true;
        this.mallLayer.getComponent("MallLayer").showGoldNode();
    },


    //弹出金币不足的提示
    showGoldNotEnoughTips: function () {

        var self = this;
        var getReward = function (leftReward) {

            //如果剩余奖励
            if (leftReward) {
                self.showRuptRewardTips();
            }
            else {
                var goldNotEnoughLayer = cc.instantiate(self.commonTipsPrefab);
                var data = {};
                data.titleIcon = "texture/commonRes/frameTips/coinNoEnoughTitle";
                data.msg = "您的金币已不足以继续游戏，请前往商城购买。";
                data.showIcon = "texture/commonRes/frameTips/jinbi";
                data.buttonIcon1 = "texture/commonRes/frameTips/goToMallBtn";
                data.button1Func = function () {
                    goldNotEnoughLayer.getComponent("commonTipsLayer").clickCloseBtn();
                    self.showMallLayer();
                };
                goldNotEnoughLayer.getComponent("commonTipsLayer").initData(data);
                goldNotEnoughLayer.setPosition(cc.p(0, 0));
                self.node.addChild(goldNotEnoughLayer);
            }
        }

        this.requestRuptRewardInfo(getReward)
    },

    //弹出破产奖励提示界面
    showRuptRewardTips: function () {
        var self = this;
        var ruptRewardLayer = cc.instantiate(this.commonTipsPrefab);
        var data = {};
        data.titleIcon = "texture/commonRes/frameTips/friendHelpTitle";
        data.msg = "不好了！破产了！快点请求好友接济！分享给任意好友，立即领取" + this.bankruptAwardAmount + "金币！";
        data.showIcon = "texture/commonRes/frameTips/jinbi";
        data.showIconLabel = "*" + this.bankruptAwardAmount;
        data.buttonIcon2 = "texture/commonRes/frameTips/mallBuyBtn";
        data.womenThink = "不好了，破产了！快点请求好友接济！\n分享给任意好友，立即领取" + this.bankruptAwardAmount +"金币！";
        data.button2Func = function () {
            ruptRewardLayer.getComponent("commonTipsLayer").clickCloseBtn();
            self.showMallLayer();
        };
        data.buttonIcon3 = "texture/commonRes/frameTips/quickShareBtn";
        data.button3Func = function () {
            ruptRewardLayer.getComponent("commonTipsLayer").clickCloseBtn();
            
            if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
                self.getRuptReward();
                //主动拉起分享接口
                wx.shareAppMessage({

                    title: "不好了！我在人人麻将里裤衩都快输掉了，求接济啊！",
                    imageUrl: HallResources.rupShareImgUrl,
                    // success(res) {
                    //     console.log("转发成功!!!")
                    //     self.getRuptReward();
                    // },
                    // fail(res) {
                    //     console.log("转发失败!!!")
                    // }
                })
            }

        };
        data.otherText1 = "今日次数：";
        data.otherText2 = "" + (this.totalAwardTimes - this.curAwardTimes);
        data.otherText3 = "/" + this.totalAwardTimes;

        ruptRewardLayer.getComponent("commonTipsLayer").initData(data);
        ruptRewardLayer.setPosition(cc.p(0, 0));
        this.node.addChild(ruptRewardLayer);
    },



    //请求破产的奖励信息
    requestRuptRewardInfo: function (onEnd) {
        var self = this;
        var callBackFunc = function (success, data) {
            require('HallResources').getInstance().removeLoading();
            if (success) {                
                var jsonObject = JSON.parse(data)
                self.totalAwardTimes = jsonObject.TotalAwardTimes;
                self.bankruptAwardAmount = jsonObject.AwardAmount;
                self.curAwardTimes = jsonObject.CurAwardTimes;
                onEnd(self.curAwardTimes < self.totalAwardTimes);
            }
        };
        require('HallWebRequest').getInstance().getBankruptInfo(callBackFunc);
    },

    //获取破产奖励
    getRuptReward:function(){
        var self = this;
        var callBackFunc = function(success,data){
            require('HallResources').getInstance().removeLoading();
            if (success) {
                var jsonObject = JSON.parse(data)
                var backMsg = jsonObject.RetCode;  //(0=失败 1=领取成功 11=密码错误 12=已达到领取次数上限)
                
                if (backMsg == 0){
                    Resources.ShowToast("领取失败");
                }
                else if (backMsg == 1){
                    var nPreGold = require("HallControl").getInstance().getPublicUserInfo().nGold
                    var nNewGold = parseInt(self.bankruptAwardAmount) + parseInt(nPreGold);
                    require("HallControl").getInstance().getPublicUserInfo().nGold = nNewGold
                    // self.getPlayerByPos(1).getComponent("Player").refreshGold(nNewGold);
                    self.getGameLib().refreshGold();
                }
                else if (backMsg == 11){
                    Resources.ShowToast("密码错误");
                }
                else if (backMsg == 12){
                    Resources.ShowToast("已达到领取次数上限");
                }
            }
        };
        require('HallWebRequest').getInstance().getBankruptReward(callBackFunc);
    },

    //update
    update: function (dt) {

    },
});
