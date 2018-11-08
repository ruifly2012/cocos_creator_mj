import { Domain } from "./Domain";
import { TSCommon } from "./TSCommon";
var HallWebRequest = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null
    },

    ctor: function () {
        this.m_checkStatusCount = HallWebRequest.ACTIVE_CHECK_STATUS_COUNT - 1
    },

    //得到根URL+address
    getAddress: function (url) {
        return Domain.WebRoot + url;
    },


    getGameAddress:function(url){
        return Domain.GameWebRoot + url;
    },

    isCheckStatus:function(){
        this.m_checkStatusCount = this.m_checkStatusCount + 1
        if (this.m_checkStatusCount < HallWebRequest.ACTIVE_CHECK_STATUS_COUNT){
            return true
        }
        return this.m_checkStatusCount % HallWebRequest.ACTIVE_CHECK_STATUS_COUNT == 0
    },

    refreshCheckStatus:function(){
        this.m_checkStatusCount = 0
    },

    //http请求
    httpRequest: function (file, data, onRetCallBack, post) {
        if(file != "CheckNewStatus.aspx" && file != "WxNewUserTrace.aspx" && file != "GetHotAndLastPlayGame.aspx"){
            require('HallResources').getInstance().showLoading();
        }
        if(post == null || post == undefined){
            post = true;
        }
        var address = this.getAddress(file);
        TSCommon.log(address);
        var WebRequest = require('WebRequest');
        var webRequest = new WebRequest();
        webRequest.getData(address, data, onRetCallBack, post)

        if(file == "CheckNewStatus.aspx"){
            return;
        }

        var instance = HallWebRequest.getInstance();
        instance.refreshCheckStatus();
    },

    //游戏相关的http请求
    gameHttpRequest:function(file, data, onRetCallBack, post){

        //如果不是轮询获取匹配状态
        if(file != "WaitGetUserInfo.aspx"){
            require('HallResources').getInstance().showLoading();
        }

        if(post == null || post == undefined){
            post = true;
        }
        var address = Domain.PaiWeiRoot + file;
        TSCommon.log(address);
        TSCommon.log(data);
        var WebRequest = require('WebRequest');
        var webRequest = new WebRequest();
        webRequest.getData(address, data, onRetCallBack, post)
    },

    //上报记录日志给服务器
    reportRecordLogToServer:function(traceID){
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&TraceID=" + traceID + "&apptype=1";
        var httpCallback = function(success, data){
            var jsonObject = JSON.parse(data);
            var RetCode = jsonObject.RetCode;
            if(parseInt(RetCode) == 11){
                console.log("the user is not exist");
            }
        };
        this.httpRequest("WxNewUserTrace.aspx", szData, httpCallback);
    },


    //状态轮询
    checkNewStatus:function(){
        var self = this;
        var HallResources = require("HallResources");
        var checkNew = function(){
            var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo()
            var szData = "UserID=" + publicUserInfo.userDBID + "&GameID=24&Pay=0&apptype=1";
            var httpCallback = function(success, data){
                cc.log("success ========" + success);
                if(!success){
                    return;
                }

                var jsonObject = JSON.parse(data).table[0];

                var nNewMail = jsonObject.MailTip;
                var nNewFriend = jsonObject.NewFriendTip;
                var nRank = jsonObject.PayRandkTip;
                var nNewPayment = jsonObject.PayTip;
                var nGold = jsonObject.Amount;
                var bankAmount = jsonObject.BankAmount;
                var nDiamond = jsonObject.DiamondAmount;
                var nFrag = jsonObject.FragNum;
                var nServiceTip = jsonObject.ServiceMessageTip;
                var nClubCard = jsonObject.ClubCard;
                var nPlayerQualifyingScore = jsonObject.sc;

                if(nDiamond != publicUserInfo.nDiamond || nGold != publicUserInfo.nGold){
                    publicUserInfo.nDiamond = nDiamond;
                    publicUserInfo.nGold = nGold
                    //派发金币数量已经改变的消息
                    TSCommon.dispatchEvent(HallResources.onGoldOrDiamondChanged)
                }

                if(nPlayerQualifyingScore != publicUserInfo.nPlayerQualifyingScore ){
                    publicUserInfo.nPlayerQualifyingScore = nPlayerQualifyingScore;
                    //派发当前积分修改的消息
                    TSCommon.dispatchEvent(HallResources.onChangePlayerQualifyingScore)
                }
            }

            if(self.isCheckStatus()){
                self.httpRequest("CheckNewStatus.aspx",szData,httpCallback)
            }

            //停止定时器
            var scheduler = cc.director.getScheduler();
		    scheduler.unscheduleCallbackForTarget(this, checkNew)
            self.checkNewStatus();
        }

        var scheduler = cc.director.getScheduler();
		scheduler.scheduleCallbackForTarget(this, checkNew, 5, false, 0, false)
    },

    //请求通告
    requestNotice: function (onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID;
        this.httpRequest("GetAgentWord.aspx", szData, onRetCallBack);
    },

    //获取道具
    getProperty: function (onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "Gameid=1&AppType=1";
        this.httpRequest("GetToolList.aspx", szData, onRetCallBack);
    },

    //获取是否收藏过了
    getCollectInfo: function (onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID+"&AppType=1";
        this.httpRequest("WxFavAwardGetInfo.aspx", szData, onRetCallBack);
    },

    //获得收藏奖励金币
    getCollectReward:function(onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword="+publicUserInfo.encryptPassword+"&AppType=1";
        this.httpRequest("WxFavAwardGetAward.aspx", szData, onRetCallBack);
    },

     //获取破产奖励次数
    getBankruptInfo: function (onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID+"&AppType=1";
        this.httpRequest("WxBankruptAwardGetInfo.aspx", szData, onRetCallBack);
    },

     //获得破产奖励金币
     getBankruptReward:function(onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword="+publicUserInfo.encryptPassword+"&AppType=1";
        this.httpRequest("WxBankruptAwardGetAward.aspx", szData, onRetCallBack);
    },
    
    //获取每日登陆数据
    getDailyCheckInfo: function (onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID+"&AppType=1";
        this.httpRequest("GetSignInfo.aspx", szData, onRetCallBack);
    },

    //获得每日登陆奖励接口
    sendDailyCheck:function(onRetCallBack) {
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword="+publicUserInfo.encryptPassword+"&AppType=1";
        this.httpRequest("DailySignInfo.aspx", szData, onRetCallBack);
    },

    //获得拉黑数据
    requestIsBeReport: function (userDBID, onRetCallBack) {

        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&pwd=" + publicUserInfo.encryptPassword + "&ToUserID=" + userDBID;
        this.httpRequest("CheatInfo.aspx", szData, onRetCallBack);
    },

    //发送拉黑请求
    requestCheatReport: function (userDBID, nType, onRetCallBack) {

        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&pwd=" + publicUserInfo.encryptPassword + "&ToUserID=" + userDBID + "&type=" + nType;
        this.httpRequest("CheatReport.aspx", szData, onRetCallBack);
    },

    //获得邀请好友活动数据
    getWxInviteActivityInfo:function(onRetCallBack)
    {
        var szData = "apptype=1";
        this.httpRequest("WxInviteAwardGetActivityInfo.aspx", szData, onRetCallBack); 
    },
    
    //获得我邀请的好友的数据
    getWxInviteAwardGetInfo:function(myOpenID,onRetCallBack)
    {
        var szData = "OpenID=" + myOpenID + "&apptype=1";
        this.httpRequest("WxInviteAwardGetInfo.aspx", szData, onRetCallBack); 
    },

    //保存我的微信数据
    setWxUserInfo:function(myOpenID,WxFaceUrl,WxNickName,onRetCallBack)
    {
        //http://netgate.ss2007.com/Platform/WxUserInfoSet.aspx?OpenID=o8LHuws48gtYrc0DFXIAB2M7bGqc&WxFaceUrl=xxx&WxNickName=xxx&apptype=1
        var szData = "OpenID=" + myOpenID + "&WxFaceUrl=" +WxFaceUrl + "&WxNickName=" +WxNickName+"&apptype=1";
        console.log("传参给我们的服务器szData="+szData)
        this.httpRequest("WxUserInfoSet.aspx", szData, onRetCallBack); 
    },

    //通过openid获得微信头像和昵称
    getWxUserInfo:function(playerOpenID,onRetCallBack)
    {
        //http://netgate.ss2007.com/Platform/WxUserInfoGet.aspx?OpenID=o8LHuws48gtYrc0DFXIAB2M7bGqc&apptype=1
        var szData = "OpenID=" + playerOpenID + "&apptype=1";
        this.httpRequest("WxUserInfoGet.aspx", szData, onRetCallBack); 
    },

    //通过userID获取用户信息
    getWxUserInfoByUserID:function(userID, onRetCallBack){
        var szData = "UserID=" + userID + "&apptype=1";
        this.httpRequest("WxUserInfoGetByUserID.aspx", szData, onRetCallBack, false); 
    },

    //获得微信邀请奖励
    getWxInviteAwardGetAward:function(inviterOpenID,inviteeOpenID,onRetCallBack)
    {
        //http://netgate.ss2007.com/Platform/WxInviteAwardGetAward.aspx?InviterOpenID=o8LHuws48gtYrc0DFXIAB2M7bGqc&InviteeOpenID=o8LHuws48gtYrc0DFXIAB2M7bGqc&apptype=1
        var szData = "InviterOpenID=" + inviterOpenID +"&InviteeOpenID="+ inviteeOpenID+"&apptype=1";
        this.httpRequest("WxInviteAwardGetAward.aspx", szData, onRetCallBack); 
    },
    
    //请求玩家数据
    getPlayerData: function (friendsOpenID,onRetCallBack) {
        //http://netgate.ss2007.com/Platform/WxFriendsScoreRank.aspx?FriendsOpenID=o8LHuws48gtYrc0DFXIAB2M7bGqc,o8LHuws48gtYrc0DFXIAB2M7bGqc,o8LHuws48gtYrc0DFXIAB2M7bGqc&apptype=1
        var szData = "FriendsOpenID=" + friendsOpenID + "&apptype=1";
        this.httpRequest("WxFriendsScoreRank.aspx", szData, onRetCallBack);
    },

    //玩家数据
    getPlayerWinState: function (onRetCallBack) {
        //http://netgate.ss2007.com/Platform/WxGetWinStat.aspx?UserID=1817175&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&apptype=1";
        this.httpRequest("WxGetWinStat.aspx", szData, onRetCallBack);
    },
    
    //玩家钻石数目
    getPlayerDiamondCount: function (myOpenID,onRetCallBack) {
        //http://h5cxz.ss2007.com/platform/xcxGetUserBalance.aspx?AppType=1&UserID=94214178&pwd=8b8e3f9ab0c8b2a3ee9323001b6044af&openid=okfMq5DPnFvKc3Le5p_YNd7O0qds
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "AppType=1"+"&UserID=" + publicUserInfo.userDBID + "&pwd="+ publicUserInfo.encryptPassword + "&openid="+myOpenID;
        this.httpRequest("xcxGetUserBalance.aspx", szData, onRetCallBack);
    },

    exchangeMoneyByDiamond: function (needDiamond,myOpenID,onRetCallBack) {
        //http://localhost:23314/xcxDiamondExchangeGold.aspx??AppType=1&UserID=94214178&pwd=8b8e3f9ab0c8b2a3ee9323001b6044af&openid=okfMq5DPnFvKc3Le5p_YNd7O0qds&wda=10
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "AppType=1"+"&UserID=" + publicUserInfo.userDBID + "&pwd="+ publicUserInfo.encryptPassword + "&openid="+myOpenID + "&wda=" + needDiamond;
        this.httpRequest("xcxDiamondExchangeGold.aspx", szData, onRetCallBack);
    },

    //获取群分享得钻石信息查询
    getWxShareDiamondAwardGetInfo: function (onRetCallBack) {
        // http://h5cxz.ss2007.com/Platform/WxShareDiamondAwardGetInfo.aspx?UserID=48643639&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&apptype=1";
        this.httpRequest("WxShareDiamondAwardGetInfo.aspx", szData, onRetCallBack);
    },

    //微信群分享领钻石
    getWxShareDiamondAwardGetAward: function (myOpenID,onRetCallBack) {
        //  http://h5cxz.ss2007.com/Platform/WxShareDiamondAwardGetAward.aspx?UserID=48643639&EPassword=973f6b61cdef4726385367b702237c13&WxGroupID=ABCD&apptype=1
        // 参数说明
        // UserID 用户ID
        // EPassword 密码
        // OpenID --用户openid
        // encryptedData --分享回调参数
        // iv --分享回调参数
        //因为 encryptedData 和 iv 里面含有特殊字符(+ - / 之类的)  在url里面不能不能解析 或者解析出错  所以需要用到下面的方法进行编码
        var encryptedData = require("HallUtils").encodeURIComponent(encryptedData);
        var iv =require("HallUtils").encodeURIComponent(iv);
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&EPassword="+ publicUserInfo.encryptPassword + "&OpenID=" + myOpenID +"&apptype=1";
        this.httpRequest("WxShareDiamondAwardGetAward.aspx", szData, onRetCallBack);
    },

    //获取微信群ID接口
    // getWxAESDecript: function (myOpenID,encryptedData,iv,onRetCallBack) {
    //     //http://h5cxz.ss2007.com/Platform/WxAESDecript.aspx?OpenID=xxx&encryptedData=yk0WAY37Eburvqjgl3MFPjD7kytIBK644WePmuThr0h5MWwsZ5xh5TxYvUtVWWQheQyf6N45eIl3v2DrUcSMz6rIrG/n5m3K+hhzsZk3kDcTdhDJ/ZYbxTDXQVq7wGiYBOAT90I9DzBF00SRMRaZ8A==
    //     // &iv=9TOuEdLgP8P4AqH51qh/4Q==
    //     //因为 encryptedData 和 iv 里面含有特殊字符(+ - / 之类的)  在url里面不能不能解析 或者解析出错  所以需要用到下面的方法进行编码
    //     var encryptedData = require("HallUtils").encodeURIComponent(encryptedData);
    //     var iv =require("HallUtils").encodeURIComponent(iv);
    //     var szData = "OpenID="+myOpenID +"&encryptedData=" + encryptedData + "&iv="+iv;
    //     this.httpRequest("WxAESDecript.aspx", szData, onRetCallBack);
    // },
    //排位赛连胜奖励查询
    getContinuityWinGetInfo: function (onRetCallBack) {
        //http://h5cxz.ss2007.com/Platform/ContinuityWinGetInfo.aspx?userid=48643639&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&apptype=1";
        this.httpRequest("ContinuityWinGetInfo.aspx", szData, onRetCallBack);
    },
    
    //排位赛连胜领奖
    getContinuityWinGetAward: function (winCount,onRetCallBack) {
        //http://h5cxz.ss2007.com/Platform/ContinuityWinGetAward.aspx?UserID=48643639&EPassword=973f6b61cdef4726385367b702237c13&WinCount=7&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID +"&EPassword="+ publicUserInfo.encryptPassword +"&WinCount=" + winCount + "&apptype=1";
        this.httpRequest("ContinuityWinGetAward.aspx", szData, onRetCallBack);
    },

    //排位赛开始匹配
    startMatchPlayer:function(nExt, nBaseScore, onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/WaitUserStart.aspx?UserID=64014&epw=ff7b1165b9479c9f9df839efe556423b&Ext=300000000&BaseScore=1&AppType=1

        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID +"&epw="+ publicUserInfo.encryptPassword + "&Ext=" + nExt + "&BaseScore=" + nBaseScore + "&AppType=1"
        console.log(szData)
        this.gameHttpRequest("WaitUserStart.aspx", szData, onRetCallBack);
    },

    //获取匹配结果
    getMatchResult:function(RWaitId, onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/WaitGetUserInfo.aspx?AppType=1&UserID=64014&RWaitId=3
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&RWaitId=" + RWaitId + "&AppType=1";
        this.gameHttpRequest("WaitGetUserInfo.aspx", szData, onRetCallBack);
    },
   
    //退出匹配
    exitMatchList:function(onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/WaitUserQuit.aspx?UserID=64014&epw=ff7b1165b9479c9f9df839efe556423b&AppType=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID +"&epw="+ publicUserInfo.encryptPassword + "&AppType=1";
        this.gameHttpRequest("WaitUserQuit.aspx", szData, onRetCallBack);
    },

    //获取房间信息
    getPrivateRoomInfo:function(){
        require('HallResources').getInstance().removeLoading();
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&AppType=1";
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data).table[0];      
                var nRoomNo = parseInt(jsonObject.RoomNo);
                if(nRoomNo > 0){
                    var onMathEnd = function(success, data){
                        // require('HallResources').getInstance().removeLoading();
                        if(success){
                            
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
            }
        }
        this.gameHttpRequest("GetPrivateRoomInfo.aspx", szData, httpCallback);
    },

    //查询玩家段位信息
    getDivisionGetInfo: function (onRetCallBack) {
        //http://h5cxz.ss2007.com/Platform/DivisionGetInfo.aspx?userid=78972489&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&apptype=1";
        this.httpRequest("DivisionGetInfo.aspx", szData, onRetCallBack);
    },

    //通过房号进入游戏
    enterGameByRoomNo:function(nRoomNo, onRetCallBack){
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID + "&RoomNo=" + nRoomNo + "&AppType=1";
        this.gameHttpRequest("EnterPrivateRoom.aspx", szData, onRetCallBack);
    },

    //段位升级奖励查询
    getDivisionUpAwardGetInfo: function (onRetCallBack) {
        //http://h5cxz.ss2007.com/Platform/DivisionUpAwardGetInfo.aspx?userid=78972489&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&apptype=1";
        this.httpRequest("DivisionUpAwardGetInfo.aspx", szData, onRetCallBack);
    },

    //段位升级奖励领取
    getDivisionUpAwardGetAward: function (levelUpTo,myOpenId,onRetCallBack) {
        //http://h5cxz.ss2007.com/Platform/DivisionUpAwardGetAward.aspx?UserID=97245805&EPassword=5214a7601aec2027b95b8b79cc9295b8&LevelUpTo=6&OpenId=xxxxxxx&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&EPassword="+ publicUserInfo.encryptPassword+"&LevelUpTo=" + levelUpTo +"&OpenId="+ myOpenId + "&apptype=1";
        this.httpRequest("DivisionUpAwardGetAward.aspx", szData, onRetCallBack);
    },


    //分享保分奖励
    getProtectScoreShareReward:function(sn, score, OpenId, onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/GetKeepScoreAward.aspx?UserID=1&epw=1&sn=1&ks=-10&OpenId=1&encryptedData=1&iv=&AppType=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var encryptedData = require("HallUtils").encodeURIComponent(encryptedData);
        var iv = require("HallUtils").encodeURIComponent(iv);
        
        var szData = "UserID=" + publicUserInfo.userDBID +"&epw="+ publicUserInfo.encryptPassword + "&sn=" + sn + "&ks=" + score + "&OpenId=" + OpenId
        + "&AppType=1";

        this.gameHttpRequest("GetKeepScoreAward.aspx", szData, onRetCallBack);
    },

    //分享保分次数查询
    getProtectScoreNum:function(onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/KeepScoreGetInfo.aspx?userid=97245805&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&AppType=1";
        this.gameHttpRequest("KeepScoreGetInfo.aspx", szData, onRetCallBack);
    },

    //分享翻倍次数查询
    getDoubleScoreGetInfo:function(onRetCallBack){
        //http://h5cxz.ss2007.com/yjly/KeepScoreGetInfo.aspx?userid=97245805&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID + "&appType=1";
        this.gameHttpRequest("DoubleScoreGetInfo.aspx", szData, onRetCallBack);
    },

    //分享翻倍
    getGetDoubleScoreAward:function(onRetCallBack,sn){
        //http://h5cxz.ss2007.com/yjly/KeepScoreGetInfo.aspx?userid=97245805&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID +"&serialnumber="+ sn + "&appType=1";
        this.gameHttpRequest("GetDoubleScoreAward.aspx", szData, onRetCallBack);
    },

    //牌局结束后段位升级奖励
    getUpgradeRewardOnResult:function(levelUpTo, myOpenId, onRetCallBack){
        console.log("getUpgradeRewardOnResult ------- levelUpTo ===== " + levelUpTo);
        //http://h5cxz.ss2007.com/Platform/DivisionUpShareAwardGetAward.aspx?UserID=97245805&EPassword=5214a7601aec2027b95b8b79cc9295b8&LevelUpTo=20&OpenId=xxxxxxx&encryptedData=xxx&iv=xxxxxx&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "UserID=" + publicUserInfo.userDBID +"&EPassword="+ publicUserInfo.encryptPassword+"&LevelUpTo=" + levelUpTo +"&OpenId="+ myOpenId + "&AppType=1";
        this.httpRequest("DivisionUpShareAwardGetAward.aspx", szData, onRetCallBack);
    },

    //查询火爆常玩游戏
    getGetHotAndLastPlayGame:function(onRetCallBack){
        //http://h5cxz.ss2007.com/Platform/GetHotAndLastPlayGame.aspx?userid=97245805&apptype=1
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        var szData = "userid=" + publicUserInfo.userDBID +"&apptype=1";
        this.httpRequest("GetHotAndLastPlayGame.aspx", szData, onRetCallBack);
    },
});

HallWebRequest.ACTIVE_CHECK_STATUS_COUNT = 6

HallWebRequest.getInstance = function () {
    if (HallWebRequest.instance == null) {
        HallWebRequest.instance = new HallWebRequest();
    }
    return HallWebRequest.instance;
};


