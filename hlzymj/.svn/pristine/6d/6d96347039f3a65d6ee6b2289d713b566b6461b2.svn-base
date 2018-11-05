import { CGameLib } from "./gamelib/CGameLib";
import {WeixinManager} from "../hall/weixin/WeixinManager";
//import { Object } from "../../../creator";
import {TSCommon} from "./TSCommon";
import {Domain} from "./Domain";
var HallResources = require("HallResources");
var HallControl = cc.Class({
    publicUserInfo: null,
    m_gameLib: null,
    m_gameList: null,
    statics: {
        instance: null
    },
   

    ctor: function () {
        var PublicUserInfo = require('PublicUserInfo');
        this.publicUserInfo = new PublicUserInfo();

        this.m_gameList = new Array();
        this.m_goodsList = new Array();
        this.m_chargeInfoList = new Array();
    },

    getPublicUserInfo: function () {
        return this.publicUserInfo;
    },

    getWXUserInfo: function () {
        return this.m_wxUserInfo;
    },

    //登录数据返回
    _onLoginDataCallBack: function (isSucceed, data) {
        if (isSucceed == true) {
            //注意如果json数据没有解析字段是默认：undefined 

            // var XmlToJson = require('XmlToJson');
            // var xmlToJson = new XmlToJson();

            // var jsonData = JSON.stringify(xmlToJson.parse(data));
            
            var jsonObject = JSON.parse(data)
            console.log("-----------------LoginByIMei.aspx返回数据-------------------------data---"+data)
            console.log(jsonObject)
            var item = jsonObject[0];

            if (item.UserID <= 0) {
                console.log("_onLoginDataCallBack fail userDBID <= 0");
                require("HallResources").getInstance().showGoldTips("登录失败",true,false,150);
                return
            }

            this.publicUserInfo.userDBID =item.UserID;
            this.publicUserInfo.nDiamond = item.DiamondAmount;
            this.publicUserInfo.email = item.NewEmail;
            this.publicUserInfo.encryptPassword = item.EPassword;
            this.publicUserInfo.faceData = null
            this.publicUserInfo.nFaceID = item.Face;
            this.publicUserInfo.nickName = item.NewNickName;        
            this.publicUserInfo.sex = item.Sex;
            this.publicUserInfo.nGold = item.Money;
            this.publicUserInfo.vipLevel = item.VIPLevel;
            this.publicUserInfo.nFrag = item.FragNum;
            this.publicUserInfo.bankAmount = item.BankAmount;
            this.publicUserInfo.code = item.Code;             
            this.publicUserInfo.myCode = item.MyCode;
            this.publicUserInfo.recommandID = item.HigherUserID;
            this.publicUserInfo.recommandName = item.HigherNickName;
            this.publicUserInfo.bindSendDiamond = item.BindSend;
            this.publicUserInfo.paySendDiamond = item.PaySend;
            this.publicUserInfo.agentPop = item.AgentPop;
            this.publicUserInfo.agentAuth = item.AgentAuth;
            this.publicUserInfo.isNewUser = item.IsNewUser;
            this.publicUserInfo.nPlayerQualifyingScore = 0;
            Domain.ENV = item.env;
            Domain.CURRENCYTYPE = item.currencyType;
            // this.publicUserInfo.userDBID = item.UserID;//item.id;
            // this.publicUserInfo.nDiamond = item.DiamondAmount;//d;
            // this.publicUserInfo.nRoomCard = item.ClubCard;//ca;
            // this.publicUserInfo.email = item.NewEmail;//m;
            // this.publicUserInfo.encryptPassword = item.EPassword;//ep;
            // this.publicUserInfo.faceData = item.f;
            // this.publicUserInfo.nFaceID = item.FaceID;//fid;
            // this.publicUserInfo.nickName = item.NewNickName;//item.n;
            // this.publicUserInfo.sex = item.Sex;//item.s;
            // this.publicUserInfo.nGold = item.Money;//mo;
            // this.publicUserInfo.vipLevel = item.VIPLevel;//vl;
            // this.publicUserInfo.nFrag = item.FragNum;//fr;
            // this.publicUserInfo.bankAmount = item.BankAmount;//ba;
            // this.publicUserInfo.code = item.Code;//code;
            // this.publicUserInfo.myCode = item.MyCode;//mcode;
            // this.publicUserInfo.recommandID = item.huid;
            // this.publicUserInfo.recommandName = item.hname;
            // this.publicUserInfo.bindSendDiamond = item.BindSend;//bs;
            // this.publicUserInfo.paySendDiamond = item.PaySend;//ps;
            // this.publicUserInfo.agentPop = item.AgentPop;//ap;
            // this.publicUserInfo.userWords = item.w;
            // this.publicUserInfo.sBindPhone = item.Tel;
            // this.publicUserInfo.nBeanAmount = item.bean;
            // this.publicUserInfo.nLoveliness = item.cmm;
            console.log("encryptPassword = " + this.publicUserInfo.encryptPassword);
            // this.m_gameLib = CGameLib.getInstance();
            // this.m_gameLib.createByHall(this.publicUserInfo,"dged.ss2007.com",34100);
            //this.m_gameLib.createByHall(this.publicUserInfo,"192.168.0.18",8900);
            require('HallResources').getInstance().removeLoading();
            //this.loginFinsh();
            this.requestGameList();
            this.requestEXchangeList();
            this.requestShoppingList();
            this.requestTableInfo();
            HallResources.recordPlayerLogToServer(HallResources.recordList.register_success);
            require("HallWebRequest").getInstance().checkNewStatus() 
            if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
                this.setMyWxDataToServer();
            }
            
        }
        else {
            console.log("_onLoginDataCallBack fail");
        }
    },

    setMyWxDataToServer:function(){
        var self = this;
        var callBackFunc = function(bolSuccess,data){
            if (bolSuccess) {
                if (bolSuccess) {
                    require('HallResources').getInstance().removeLoading();
                    console.log("-----------------WxUserInfoSet.aspx成功----------------------------")
                }
            }
        };
        var myOpenId = WeixinManager.getInstance().userInfo.openid;
        var wxFaceUrl = WeixinManager.getInstance().userInfo.avatarUrl;
        var wxNickName = WeixinManager.getInstance().userInfo.nickName;
        self.myOpenId = myOpenId;
        require('HallWebRequest').getInstance().setWxUserInfo(myOpenId,wxFaceUrl,wxNickName,callBackFunc);
    },
    loginFinsh: function () {
        require('HallResources').getInstance().removeLoading();
        // cc.director.loadScene('LoadingScene')
        // cc.director.loadScene('HallPlatformScene');
        var HallResources = require('HallResources');
        TSCommon.dispatchEvent(HallResources.onLoginFinish, null)
    },

    //点击按钮 用IMEI登录游戏
    loginByIMEI: function (imei, nickname, headUrl, WxAppID, WxOpenID) {
        require('HallResources').getInstance().showLoading();
        var headUrl = (headUrl == null ? "" : headUrl);
        var WxAppID = (WxAppID == null ? "" : WxAppID);
        var WxOpenID = (WxOpenID == null ? "" : WxOpenID);
        var invitePlayerOpenid = "";
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            
            invitePlayerOpenid = wx.getLaunchOptionsSync().query.inviteOpenId;
            if(invitePlayerOpenid == null || invitePlayerOpenid == undefined)
            {
                invitePlayerOpenid = "";
            } 
            console.log("获得分享玩家的openid"+invitePlayerOpenid)
        }
        var gender = -1;
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            var wxGender = WeixinManager.getInstance().userInfo.gender; //0:未知1男2女
            console.log("获得微信的性别："+wxGender);
            //但是我们后台性别不是这样，0=女 1=男 -1=未知，所以这里转换
            if (wxGender == 2){gender = 0}
            else if(wxGender == 1){gender = 1}
            else if(wxGender == 0){gender = -1}
        }
        // var playerFaceUrl= "https://wx.qlogo.cn/mmopen/vi_32/6ay6OtX1r4lRcLfJUibkhFo09MfCzbO33mAo7ozvZibtYEwG21ESPwbqJ79Cf6mJkAJKdRqbxwmjBWbO5TIiaROMA/132";
        var szData = "IMei=" + imei + "&NickName=" + nickname + "&PartnerID=30001&Version=1&AppID=&OpenID=&AppType=1&InviterOpenID="+invitePlayerOpenid+"&Gender="+gender;
        console.log("登录信息szData===="+szData)
       
        require('HallWebRequest').getInstance().httpRequest("LoginByIMei.aspx", szData, this._onLoginDataCallBack.bind(this));
    },

    //获取游戏列表
    getGameList: function () {
        return this.m_gameList;
    },

    getShoppingList: function () {
        return this.m_goodsList;
    },
    getEXchangeList: function () {
        return this.m_chargeInfoList;
    },

    exchangeGold: function (nDiamond,handle,gameID){
        var self = this;
        gameID = gameID || 0;
        if (this.publicUserInfo.nDiamond < nDiamond) {
            if (handle) { handle(11) } 
            return
        }
        var szData = "userid="+this.publicUserInfo.userDBID+"&diamond="+nDiamond+"&GameID="+gameID+"&pwd="+self.publicUserInfo.encryptPassword+"&UseGoods=0&AppType=1";
        var httpCallback =function (isSucceed,data){
            if(!isSucceed) { 
                console.loglog("HallControl:exchangeGold() failed"); 
                return;
            }
            require('HallResources').getInstance().removeLoading();
            // var XmlToJson = require('XmlToJson');
            // var xmlToJson = new XmlToJson();
            // var jsonData = JSON.stringify(xmlToJson.parse(data));
            // var jsonObject = JSON.parse(jsonData)

            var jsonObject = JSON.parse(data)
            console.log("-----------------DiamondExchangeGold.aspx返回数据----------------------------")
            console.log(jsonObject)

            var result= jsonObject.r //操作结果：1=操作成功  11=钻石不足  12=兑换产品不存在
            self.publicUserInfo.nGold = jsonObject.nm
            self.publicUserInfo.nDiamond = jsonObject.da
            if (handle) { 
                handle(result); 
            }
        }
        console.log("DiamondExchangeGold.aspx"+"------------------------------"+szData);
        require('HallWebRequest').getInstance().httpRequest("DiamondExchangeGold.aspx", szData, httpCallback.bind(this));
    },

    //获取商城产品列表
    requestShoppingList:function (){    
        var self = this; 
        if ((self.m_goodsList!=null) && (self.m_goodsList.length>0)) {
            return;
        }
        var szData = "partnerid=0&version=0&AppType=1";
        var httpCallback = function (isSucceed,data){
            if(!isSucceed) { 
                console.log("HallControl:getShoppingList() failed");
                return;
            }
            require('HallResources').getInstance().removeLoading();
            // var XmlToJson = require('XmlToJson');
            // var xmlToJson = new XmlToJson();
            // var jsonData = JSON.stringify(xmlToJson.parse(data));
            // var jsonObject = JSON.parse(jsonData)
            // var item = jsonObject.items[0];
            var jsonObject = JSON.parse(data)
            console.log("-----------------GetDiamondChargeList.aspx返回数据----------------------------")
            console.log(jsonObject)
            var itemData = jsonObject.table;
            for (var i = 0;i < itemData.length;i++){
                var item = itemData[i];

                var gameInfo = [];
                gameInfo.gm = item.gm;
                gameInfo.mmgm = item.mmgm;
                gameInfo.ic = item.ic;
                gameInfo.mmp = item.mmp;
                gameInfo.mt = item.mt;
                gameInfo.p = item.p;
                gameInfo.pn = item.pn;
                gameInfo.rmb = item.rmb;

                if (gameInfo.mt == 1){
                    self.m_goodsList.push(gameInfo);
                }
            }
        }
        console.log("GetDiamondChargeList.aspx"+"------------------------------"+szData);
        require('HallWebRequest').getInstance().httpRequest("GetDiamondChargeList.aspx", szData, httpCallback.bind(this));
    },

    //获取钻石兑换列表
    requestEXchangeList: function () { 
        var self = this; 
        var httpCallback = function (isSucceed,data){
            if(!isSucceed) {
                console.log("HallControl:requestEXchangeList() failed");
                return;
            }
            require('HallResources').getInstance().removeLoading();
            // var XmlToJson = require('XmlToJson');
            // var xmlToJson = new XmlToJson();
            // var jsonData = JSON.stringify(xmlToJson.parse(data));
            // var jsonObject = JSON.parse(jsonData)
            // var item = jsonObject.items[0];
            var jsonObject = JSON.parse(data)
            console.log("-----------------GetDiamondExchangeList.aspx返回数据----------------------------")
            console.log(jsonObject)
            var itemData = jsonObject.table;

            for (var i = 0;i < itemData.length;i++){
                var item = itemData[i];
                var gameInfo = [];
                gameInfo.gm = item.GoldMoney;
                gameInfo.da = item.DiamondAmount;
                gameInfo.ic = item.IsCommend;
                gameInfo.sgm = item.SendGoldMoney;

                self.m_chargeInfoList.push(gameInfo);
            }  
        }
        require('HallWebRequest').getInstance().httpRequest("GetDiamondExchangeList.aspx", "AppType=1", httpCallback.bind(this));
    },

    //请求游戏列表
    requestGameList: function () {
        var szData = "PartnerID=10&AppType=1";
        var self = this;
        require('HallWebRequest').getInstance().httpRequest("GetGameList.aspx", szData, function (isSucceed, data) {
            self.loginFinsh();
            if (isSucceed == true) {
                // var XmlToJson = require('XmlToJson');
                // var xmlToJson = new XmlToJson();
                // var jsonData = JSON.stringify(xmlToJson.parse(data));
                // var jsonObject = JSON.parse(jsonData)
                // var item = jsonObject.items[0];

                require('HallResources').getInstance().removeLoading();
                var jsonObject = JSON.parse(data)
                console.log("-----------------GetGameList.aspx返回数据----------------------------")
                console.log(jsonObject)
                var itemData = jsonObject.table;


                var firstGame = null;
                for (var i = 0;i < itemData.length;i++){
                    var item = itemData[i];
                    var gameInfo = new cc.GameInfo();
                    gameInfo.m_iId = item.GameID;
                    gameInfo.m_sCn = item.ChineseName;
                    gameInfo.m_sEn = item.EnglishName;
                    gameInfo.m_iIv = item.IconVersion;
                    gameInfo.m_sServeIp = item.ServerIP;
                    gameInfo.m_iPort = item.Port;
                    gameInfo.m_sVersion = item.Version;
                    gameInfo.m_sDir = item.DownloadRoot;
                    gameInfo.m_sWr = item.WebRoot;

                    if (firstGame == null) {
                        firstGame = new cc.GameInfo()
                        firstGame = gameInfo
                    }

                    self.m_gameList.push(gameInfo);
                }
                if (firstGame != null) {
                    console.log("requestAllGameServerList ");
                    self.m_gameLib = CGameLib.getInstance();
                    self.m_gameLib.createByHall(self.publicUserInfo, firstGame.m_sServeIp, firstGame.m_iPort);
                }

            }
            else {
                console.log("requestGameList fail");
            }
        });
    },


    //获取牌桌信息
    requestTableInfo:function(){
        var self = this;
        var szData = "UserID=" + this.publicUserInfo.userDBID + "&appType=1"
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                self.publicUserInfo.tableBoardInfo = jsonObject.table;
            }
        }
        require('HallWebRequest').getInstance().httpRequest("GetUserTableBoard.aspx", szData, httpCallback);
    }
});

HallControl.getInstance = function () {
    if (HallControl.instance == null) {
        HallControl.instance = new HallControl();
    }
    return HallControl.instance;
};

