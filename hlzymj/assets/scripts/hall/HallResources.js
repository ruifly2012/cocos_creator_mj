import {TSCommon} from "TSCommon";
var HallResources = cc.Class({
    statics: {
        instance: null,
        //增加在场景上的全局 Tag
        Loading_Add_Scene_Tag: 1000,
        Toast_Add_Scene_Tag: 1001,
    },
    
    showDialog: function (strMsg) {
        var sceneNode = cc.director.getScene();
        var winSize = cc.director.getWinSize();
        cc.loader.loadRes("/prefabs/publicDialogPrefab", function (error, prefab) {
            if (!error) {
                var dialogPrefab = cc.instantiate(prefab);
                dialogPrefab.x = winSize.width / 2;
                dialogPrefab.y = winSize.height / 2;
                var dialog = dialogPrefab.getComponent('Dialog');
                dialog.setContentLabelStr(strMsg);
                sceneNode.addChild(dialogPrefab);
            }
        })
    },

    showLoading: function () {
        TSCommon.dispatchEvent(HallResources.onShowLoadingNode, true );
        // var nodeLoading = new cc.Node('loading');
        // nodeLoading.addComponent(cc.LoadingUI);
        // nodeLoading.setTag(HallResources.Loading_Add_Scene_Tag);
        // cc.director.getScene().addChild(nodeLoading);
    },

    removeLoading: function () {
        TSCommon.dispatchEvent(HallResources.onClearLoadingNode, true );
        // var nodeLoading = cc.director.getScene().getChildByTag(HallResources.Loading_Add_Scene_Tag);
        // if (nodeLoading != null) {
        //     nodeLoading.destroy();
        //     nodeLoading = null;
        // }
    },

    showToast: function (strMsg) {
        var nodeToast = new cc.Node('nodeToast');
        var toastNode = nodeToast.addComponent(cc.ToastUI);
        toastNode.setMsg(strMsg);
        nodeToast.setTag(HallResources.Toast_Add_Scene_Tag);
        cc.director.getScene().addChild(nodeToast);
    },
    
    //存储天梯等级数据结构，方便以后调用(按照青铜一，青铜二，白银一排序)
    setQualifyingData:function(rankData){
        this.rankData = rankData;
        //下面一段为了把同一个等阶的数据提出来存在一个表里
        var division = 1;
        var allData = new Array();
        while(division <= 6)  {
            var backData = new Array();
            for (var i = 0;i<rankData.length;i++){
                if (rankData[i].DivisionLevel == division){
                    backData.maxScore = rankData[i].MaxScore;
                    backData.minScore = rankData[i].MinScore;
                }
            }

            for (var i = 0;i<rankData.length;i++){
                if (rankData[i].DivisionLevel == division){
                    backData.diamond = rankData[i].UpgradeAmount
                    backData.rankName = rankData[i].HighName;
                    if (backData.minScore > rankData[i].MinScore){ backData.minScore = rankData[i].MinScore; }
                    if (backData.maxScore < rankData[i].MaxScore){ backData.maxScore = rankData[i].MaxScore; }
                    backData.cupId = division;
                }
            }
            allData.push(backData);
            division = division + 1;
        }
        this.divisionData = allData;
    },

    //返回按照天梯等级排序后的等级数据(按照青铜，白银排序)
    getRankDataById: function (id) {
        return this.rankData[id-1];
    },

    //返回按照天梯等级排序后的等级数据(按照青铜，白银排序)
    getDivisionData: function () {
        return this.divisionData;
    },
    //传入底分和数据结构，拿到当前星级，等阶，细分等阶,细分等阶名称
    getRankAndStarByScore: function (rankScore) {
        var backData = new Array();
        var rankData = this.rankData;
        for (var i = 0;i < rankData.length;i++){
            if (rankScore >= rankData[i].MinScore && rankScore < rankData[i].MaxScore){
                var starCount =Math.floor((rankScore -rankData[i].MinScore) /rankData[i].StartStep)
                backData.minScore =  rankData[i].MinScore;
                backData.maxScore =  rankData[i].MaxScore;
                backData.id =  rankData[i].ConfigID;
                backData.cup = rankData[i].DivisionLevel;
                backData.star = starCount;
                backData.lvStarNextScore = rankData[i].MinScore + rankData[i].StartStep * (backData.star + 1);
                backData.rankName = rankData[i].LittleName + "级";
                return backData;
            }
            if ((i == 19) && (rankScore >= rankData[i].minScore)){
                backData.minScore =  rankData[i].MinScore;
                backData.maxScore =  rankData[i].MaxScore;
                backData.id =  rankData[i].ConfigID;
                backData.cup = rankData[i].DivisionLevel;
                backData.star = 0;
                backData.rankName = rankData[i].LittleName;
                return backData;
            }
        }
    },

    getLianXiChangStation: function (gameId){
        var sortFunction = function (stStation1, stStation2){
            return stStation1.dwRuleID - stStation2.dwRuleID;
        }

        var gameLibSink  =  require('GameLibSink').getInstance();
        var gameLib =  gameLibSink.getGameLib();
        var pStationList = gameLib.getStationList();
        var size = pStationList.length;
        var pLianXiStaionList=[];
        for (var i=0;i < size;i++){
            if(pStationList[i].dwParentID == gameId)
            {
                pLianXiStaionList.push(pStationList[i])
            }
        }
        if (pLianXiStaionList.length > 1) {
            pLianXiStaionList.sort(sortFunction)
        }
        return pLianXiStaionList
    },

    enterGameRoomBeanByStaionName:function(stationName,onCallBack){
        var gameLib =  require('GameLibSink').getInstance().getGameLib();
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var pStationList = gameLib.getStationList();
        var size = pStationList.length;
        var room = null;
        for (var i=0;i <size;i++) {
            var szStationName = pStationList[i].szStationName;
            if (szStationName==stationName) {
                room = pStationList[i];
                break
            }
        }
        this.removeLoading();
        if (room) {
            if ((publicUserInfo.nGold && (publicUserInfo.nGold < 0))||(room.dwMinGold>publicUserInfo.nGold)) {
                if (onCallBack) {
                    onCallBack(room.dwMinGold);
                }
                else{
                    console.log("金币不足");
                    TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["金币不足"]);
                    TSCommon.dispatchEvent(HallResources.onNoEnoughGold, true );
                }
                return;
            }
            this.showLoading();
            console.log("成功执行进入游戏");
            gameLib.autoEnterGameRoom(room.szStationName);
        }
        else{
           console.log("找不到符合的服务器");
        }
    },

    printNowTimes:function()
    {
        var testDate = new Date();
        var mytime=testDate.toLocaleTimeString();//获取当前时间
        return mytime;
    },

    playPropertyEffect : function(nIndex){
        var callback = function (){
            var audioUrl = "resources/sound/game/property/"+nIndex+".mp3";
            cc.audioEngine.play(cc.url.raw(audioUrl));
        }
        TSCommon.performWithDelay(this, callback, 1);
    },

    playButtonEffect : function(){
        if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
            var audioUrl = "resources/sound/button.mp3";
            cc.audioEngine.play(cc.url.raw(audioUrl));
        }
    },

    playCloseEffect : function(){
        if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
            var audioUrl = "resources/sound/close.mp3";
            cc.audioEngine.play(cc.url.raw(audioUrl));
        }
    },

    showGoldTips:function(msg, isFlyUp, isShowIcon, offsetY){
        offsetY = offsetY || 30;
        var scene = cc.director.getScene();
    
        if(scene.getChildByTag(HallResources.COMMON_FLY_TIPS)){
            return;
        }
    
        var winSize = cc.director.getWinSize();
        var toastNode = new cc.Node();
    
        var toastSprite = toastNode.addComponent(cc.Sprite);
        cc.loader.loadRes("texture/commonRes/commontipsBg",cc.SpriteFrame, function (err, spriteFrame){
            if(!err){
                toastSprite.spriteFrame = spriteFrame;
            }
        });
        
        if (isShowIcon) {
            var iconNode = new cc.Node();
            var iconSprite = iconNode.addComponent(cc.Sprite);
            cc.loader.loadRes("texture/commonRes/money/goldCoin", cc.SpriteFrame, function(err, spriteFrame){
                if(!err){
                    iconSprite.spriteFrame = spriteFrame;
                }
            })
        
        iconNode.anchorX = 1;
    
        iconNode.x = -8;
        toastNode.addChild(iconNode);
        }
        var tipsNode = new cc.Node();
        var tipsLabel = tipsNode.addComponent(cc.Label);
        tipsLabel.string = msg;
        tipsLabel.fontSize = 30;

        if(!isShowIcon){
            tipsNode.anchorX = 0.5;
            tipsNode.x = 0;
            tipsNode.y = -5;
        }
        else{
            tipsNode.anchorX = 0;
            tipsNode.x = 8;
            tipsNode.y = -5;
        }
        
    
        
        toastNode.addChild(tipsNode);
    
    
        var delayTime = cc.delayTime(1);
        var fadeOut = cc.fadeOut(2);
        var moveBy = cc.moveBy(1, 0, offsetY);
        var onEnd = cc.callFunc(()=>{
            toastNode.stopAction();
            toastNode.removeFromParent(true);
        })
        var sequence;
        if(isFlyUp){
            var spawn = cc.spawn(fadeOut, moveBy)
            sequence = cc.sequence(delayTime, spawn, onEnd);
        }
        else{
            sequence = cc.sequence(delayTime, fadeOut, onEnd);
        }
        
        toastNode.runAction(sequence);
        toastNode.x = winSize.width / 2;
        toastNode.y = winSize.height / 2;
        scene.addChild(toastNode, 1, HallResources.COMMON_FLY_TIPS);
    },

    getEnterBestRoom:function(gameName){
        var server = null;
        var dwFocusStationID = -1;
        var nMinGold = 0;
        var gameLibSink  =  require('GameLibSink').getInstance();
        var gameLib =  gameLibSink.getGameLib();
        var logonInfo = gameLib.getUserLogonInfo()

        if (logonInfo == null) {
            console.log("----------------------logonInfo = null")
            return;
        }
        var pRoomList = gameLib.getStationList();
        var size = pRoomList.length;
        var sortFunction = function (stStation1, stStation2){
            return stStation1.dwMinGold - stStation2.dwMinGold;
        }
        pRoomList.sort(sortFunction)

        for (var i = 0;i < size;i++) {
            var room = pRoomList[i];
            if ((gameName == "xueliu")|| (gameName == "xuezhan") )
            {
                var bContinues = true;
                if (dwFocusStationID != -1) {
                    if (room.dwStationID != dwFocusStationID) {
                        bContinues = false;
                    }
                }

                if (bContinues == true) { 
                    if ((room.dwMinGold != 0) && (room.dwMinGold > logonInfo.dwGold)) {
                        bContinues = false;
                    }

                    if (bContinues == true) { 
                        if (server == null) {
                            server = room;
                        }

                        var nTempMinGold = room.dwMinGold
                        if (nTempMinGold > nMinGold) {
                            server = room;
                        }
                    }
                }
            }
        }
        return server;
    },
});

HallResources.recordList = {
    register_success : 10,   //完成注册
    main_res_start : 20,     //开始加载资源
    main_res_end : 30,       //完成资源加载
    choose_method : 40,      //选择玩法
    enter_room : 50,         //进入房间
    room_res_start : 60,     //开始加载房间资源
    click_xueliu: 61,        //点击血流成河
    click_xuezhan: 62,       //点击血战到底
    click_paiweisai: 63,     //点击排位赛
    pipei_start: 64,         //开始匹配
    pipei_end: 65,           //结束匹配
    pipei_break: 66,           //取消匹配
    room_res_end : 70,       //完成加载房间资源
    click_ready : 80,        //点击开始准备按钮
    click_card : 90,         //点第一张牌
    click_discard : 100,     //出第一张牌
    count_page : 110,        //弹出结算页面
    
}

//记录玩家流程
HallResources.recordPlayerLogToServer = function(recordID){
    var PublicUserInfo = require('HallControl').getInstance().getPublicUserInfo();
    if(parseInt(PublicUserInfo.isNewUser) == 1){
        require('HallWebRequest').getInstance().reportRecordLogToServer(recordID);
    }
}
HallResources.ChangeOncePlayMusic = false;

HallResources.COMMON_FLY_TIPS = 100
HallResources.onLoginFinish = "onLoginFinish";
HallResources.onGoldOrDiamondChanged = "changeMoney";
HallResources.onNoEnoughGold = "noMoneyEvent";
HallResources.onShowLoadingNode = "showloadingNode";
HallResources.onClearLoadingNode = "clearloadingNode";
HallResources.onClearDailyLoginRedPoint = "clearDailyLoginRedPoint";
HallResources.onGetMoreDeskBg = "getMoreDeskBg";
HallResources.onClearCollectionLoginRedPoint = "clearCollectionLoginRedPoint";
HallResources.onClearConsecutiveRedPoint = "clearConsecutiveRedPoint";
HallResources.onShowFlyMessage = "showFlyMessage";
HallResources.openBgMusic = "OPEN_HALL_BG_MUSIC";
HallResources.closeBgMusic = "CLOSE_HALL_BG_MUSIC";
HallResources.onRefreshPlayerDiamondCount = "refreshPlayerDiamondCount";
HallResources.onChangeShadow = "removeShadow";
HallResources.onChangePlayerQualifyingScore = "changePlayerQualifyingScore";
HallResources.onSeasonLevelUp = "seasonLevelUp";
HallResources.onShowBannerAndMoreGame = "SHOW_BANNER_MOREGAME";
HallResources.onHideBannerAndMoreGame = "HIDE_BANNER_MOREGAME";
HallResources.onHideSendGiftToPLayer = "sendGiftToPlayer";

HallResources.groupShareImgUrl = "http://h5cxz.ss2007.com/cxzImg/qun_rank_share.jpg";
HallResources.shareImgUrl = "http://h5cxz.ss2007.com/cxzImg/deskbg_share.jpg";
HallResources.rupShareImgUrl = "http://h5cxz.ss2007.com/cxzImg/bankRupt_share.png";
HallResources.resultShareImgUrl = "http://h5cxz.ss2007.com/cxzImg/game_result_share.jpg";
HallResources.protectScoreShareImgUrl = "http://h5cxz.ss2007.com/cxzImg/protect_score_share.png";
HallResources.upgradeShareImgUrl = "http://h5cxz.ss2007.com/cxzImg/match_upgrade_share.png";

HallResources.shareWin_3 = "http://h5cxz.ss2007.com/cxzImg/shareCount_3.jpg";
HallResources.shareWin_5 = "http://h5cxz.ss2007.com/cxzImg/shareCount_5.jpg";
HallResources.shareWin_7 = "http://h5cxz.ss2007.com/cxzImg/shareCount_7.jpg";
HallResources.shareWin_9 = "http://h5cxz.ss2007.com/cxzImg/shareCount_9.jpg";

HallResources.getInstance = function () {
    if (HallResources.instance == null) {
        HallResources.instance = new HallResources();
    }
    return HallResources.instance;
};

module.exports = HallResources;