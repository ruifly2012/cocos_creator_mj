import {ByteArray} from "../hall/common/ByteArray";
import {Domain} from "../hall/Domain";
import {WeixinManager} from "../hall/weixin/WeixinManager";
import { TSCommon } from "../hall/TSCommon";
var HallResources = require('HallResources');
var AladinSDK = require("../aladinSDK");
cc.Class({
    extends: cc.Component,
    m_onWxGameLoginCallBack:null,
    properties: {

        loginLayer:{
            default: null,
            type: cc.Node,
        },

        loadingLayer:{
            default: null,
            type: cc.Node,
        },

        guestBtn: {
            default: null,
            type: cc.Button
        },
        weixinBtn: {
            default: null,
            type: cc.Button
        },

        loading_label: {
            default: null,
            type: cc.Node,
        },

        loading_bar:{
            default: null,
            type: cc.Node,
        },

        ver_label:{
            default: null,
            type: cc.Label,
        },
        pregress: 0.0,
        isLoading: false,

        m_timer_ping:0,
        
    },

    onLoad:function() {

        TSCommon.addEvent(HallResources.onLoginFinish, this.onLoginFinished, this);
        this.ver_label.string = Domain.Gversion;
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){

            //上报aladinSDK需要的相应参数
            AladinSDK.reportWithAppId(Domain.WEIXIN_APPID, AladinSDK.ReportTypes.LOGIN, null);

            AladinSDK.init(Domain.WEIXIN_APPID, '1.0.0',{
                /**
                 * 初始化时可以操作广点通（微信广告）位置及大小 宽度最小值为300，高度不能设置  会根据宽度自动调整
                */
                // gdt_left : 0,
                // gdt_bottom : 0,
                // gdt_top : 20
                // gdt_right : 20
                // gdt_widht : 350

            },function(){
                /**
                 * 此处用于初始化隐藏 更好好玩或者底部banner 初始化不需要调用show，相应广告会根据后台返回数据进行显示
                */

                // AladinSDK.HideMore()
                // AladinSDK.HideBanner()

                /**
                 * 修改位置 大小都可以在回调这里处理，确保第一次没加载出节点时就能改变好位置大小
                */
                AladinSDK.getMoreNode().scaleX = 0.65;
                AladinSDK.getMoreNode().scaleY = 0.65;
                AladinSDK.getMoreNode().x = -45;

                
                if(cc.sys.os == cc.sys. OS_IOS){
                    AladinSDK.getMoreNode().y = -105;
                }
                else{
                    AladinSDK.getMoreNode().y = 0;
                }
                
            });
        }

        this.loading_bar.getComponent(cc.ProgressBar).progress = 0.0;

        this.loadingLayer.active = false;

        this.loginLayer.active = false;

        var self = this;
        if(require("HallUtils").isIPhoneX())
        {   
            if(!cc.sys.isNative && cc.sys.isMobile){
                var canvasFit = this.node.getComponent(cc.Canvas);
                canvasFit.fitHeight = true;
                canvasFit.fitWidth = false;
            }

            cc.loader.loadRes("texture/loginRes/loginbg_x", cc.SpriteFrame,function (error, spriteframe)
            {
                var bgSp = self.node.getChildByName('login_bg_sp').getComponent(cc.Sprite);
                if (!error) {
                    bgSp.spriteFrame = spriteframe;
                }
            });
        }
        

        var DEBUG = true;
        this.guestBtn.node.active = false;
        if(DEBUG)
        {
            this.guestBtn.node.active = true;
            this.loginLayer.active = true;
        }
        else
        {
            this.weixinBtn.node.x=0;
        }

        TSCommon.log("LoginButtonMenu.onLoad");
        if(!cc.sys.isNative && require("HallUtils").judeIsPhoneWXGameBrowser())    //在微信小游戏的环境
        {
            this.loginLayer.active = false;
            this.node.getChildByName("tips_laebl").active = true;
            var onWxGameLoginCallBack = function()
            {
                var weixinUserInfo = WeixinManager.getInstance().userInfo;
                if(!weixinUserInfo)
                    return;
                require('HallControl').getInstance().loginByIMEI(weixinUserInfo.openid,weixinUserInfo.nickName,weixinUserInfo.avatarUrl,Domain.WEIXIN_APPID,weixinUserInfo.openid);
            }
            this.m_onWxGameLoginCallBack = onWxGameLoginCallBack;
            TSCommon.addEvent(TSCommon.onGeWXtUserInfoLogin, onWxGameLoginCallBack,this);

            WeixinManager.getInstance().checkLogin(false);
            var weixinUserInfo = WeixinManager.getInstance().userInfo;
            if(!weixinUserInfo)
                return;

            require('HallControl').getInstance().loginByIMEI(weixinUserInfo.unionid,weixinUserInfo.nickname,weixinUserInfo.avatarUrl,"","");
        }
        else{
            this.loginLayer.active = true;

            var self = this;
            var imei = null;
            // var imei = "AfneS1YkaPCAf4zOMqtLhcPGIUm45"+cc.sys.localStorage.getItem("imei");
            // var imei = "ofneS1YkaPCAf3zOMqtLhcPGIUm45666999"//cc.sys.localStorage.getItem("imei");
            if(!imei){
                var lastNumber = "";
                for(var i = 0; i < 6; i++){
                    lastNumber += Math.floor(Math.random() * 10)
                }

                imei = "ofneS1YkaPCAf3zOMqtLhcPGIUm45"
                imei += lastNumber;
                cc.sys.localStorage.setItem("imei", imei);
            }
            require('HallControl').getInstance().loginByIMEI(imei,"Ok","","","");
        }
    },

    onLoginFinished:function(){
        this.node.getChildByName("tips_laebl").active = false;
        this.loginLayer.active = false;
        this.loadingLayer.active = true;
        this.startPreloading();
    },

    startPreloading: function () {
        this.isLoading = true

        //记录日志
        HallResources.recordPlayerLogToServer(HallResources.recordList.main_res_start);
        var self = this;
        cc.loader.loadResDir("texture", function (completedCount, totalCount, item) {
            // console.log("completedCount:" + completedCount + ",totalCount:" + totalCount );
            if (self.isLoading) {
                self.pregress = completedCount / totalCount;         
            }
        }, 
        function (err, assets) {
            self.onLoadComplete();
            cc.loader.onComplete = null;
            self.isLoading = false;
        });
    },

    onLoadComplete: function () {
        cc.director.loadScene('HallPlatformScene');
        HallResources.recordPlayerLogToServer(HallResources.recordList.main_res_end);
    },

    onDestroy:function()
    {   
        if(this.m_onWxGameLoginCallBack)
        {
            TSCommon.removeEvent(TSCommon.onGeWXtUserInfoLogin, this.m_onWxGameLoginCallBack,this);
        }
        
        TSCommon.removeEvent(HallResources.onLoginFinish, this.onLoginFinished, this);
    },

    update: function (dt) {
        if (this.isLoading) {
            this.loading_bar.getComponent(cc.ProgressBar).progress = this.pregress;
            this.loading_label.getComponent(cc.Label).string = Math.floor(this.pregress * 100) + "%";
        }
    },

    //点击游客登录按钮
    guestButton:function(event)
    {
        
    },

    //点击微信登录按钮
    weiXinButton:function(event)
    {
        if (!WeixinManager.getInstance().checkLogin(true))
            return;
    },
});
