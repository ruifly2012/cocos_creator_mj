import {Domain} from "../Domain";
import WebRequest = require("../common/WebRequest");
import { TSCommon } from "../TSCommon";
import HallUtils = require("../HallUtils");
import HallResources = require("../HallResources");
var AladinSDK = require("../../aladinSDK");
declare function webWeixinLogin(appid: string, redirect_uri: string);
interface SignPackage {
    nonceStr: string;
    timestamp: number;
    signature: string;
}

interface PaySign {
    retult: number;
    nonceStr: string;
    timestamp: number;
    signature: string;
    prepayid: string;
}

export class WeixinUserInfo {
    openid: string;
    nickname: string;
    sex: string;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: string;
    unionid: string;
    avatarUrl:string;
    constructor() {
        this.unionid = "test";
        this.nickname = "test";
    }
}

export class WeixinManager {
    private static _instance: WeixinManager;
    public static getInstance(): WeixinManager {
        if (this._instance == null)
            this._instance = new WeixinManager();
        return this._instance;
    }


    private signPackage: SignPackage;
    public userInfo: WeixinUserInfo;

    private constructor() {
        this.userInfo = null;
        this.openid = null;
        this.uinionid = null;
        this.js_code = null;
        this.init();
    }

    private init() {
        //获取签名        
        //this.getSignPackage();
    }

    /**
     * 获取签名分享
     */
    private getSignPackage() {
        var signUrl: string = Domain.WEIXIN_URL + "/genWeixinSign.aspx?appid=" + Domain.WEIXIN_APPID + "&url=" + 
            location.href.split("#")[0];
        var webRequest = new WebRequest();
        webRequest.getData(signUrl, "", (succeeded:boolean,data:string) => {
            this.signPackage = <SignPackage>JSON.parse(data);
            //........................................................
            //基本配置
            this.getWeiXinConfig();

        }, false);
    }

    /**
     * 获取微信配置
     */
    private getWeiXinConfig() {
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = Domain.WEIXIN_APPID;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
    }

    public shareAppMessage(title: string, desc: string, link: string, imgUrl: string) {
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            trigger: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    public shareTimeline(title: string, link: string, imgUrl: string) {
        wx.onMenuShareTimeline({
            title: title, // 分享标题           
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标           
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            trigger: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    public shareQQ(title: string, desc: string, link: string, imgUrl: string) {
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标  
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            trigger: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function () {
                // 用户取消分享后执行的回调函数
            },
            complete: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

    public pay(productID: string, price: number) {
        var genorderURL: string = Domain.PAY_GENORDER_URL + "?appid=" + Domain.WEIXIN_APPID +
            "&userid=" + PublicUserInfo.userDBID + "&gameid=0&partnerID=10101&price=" + price + "&productid=" + productID;
        var webRequest = new WebRequest();
        webRequest.getData(genorderURL, "", (succeeded:boolean,data:string) => {
            var pay = <PaySign>JSON.parse(data);
            if (pay.retult != 1) {
                // 生成订单失败
                TSCommon.dispatchEvent(TSCommon.onPayFailed, "生成订单失败");
                return;
            }
            wx.chooseWXPay({
                timestamp: pay.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: pay.nonceStr, // 支付签名随机串，不长于 32 位
                package: 'prepay_id=' + pay.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: pay.signature, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    TSCommon.dispatchEvent(TSCommon.onPaySucceeded, "");
                }
            });

        }, false);

    }

    private weixinLoginByWeb() {
        webWeixinLogin("wx9077e9fe86b5ae1b", "http://weixin.ss2007.com/weixinauth.aspx");
    }

    public checkLogin(doLogin:boolean): boolean {
        var ua = navigator.userAgent.toLowerCase();
        TSCommon.log(ua);
        var isweixin = false;
        if (ua.indexOf("micromessenger") > 0)
            isweixin = true;

        if(HallUtils.judeIsPhoneWXGameBrowser()){
            this.wxGameLogin();
            return;
        }

        /*if (!isweixin) {
            //this.userInfo = new WeixinUserInfo();            
            this.weixinLoginByWeb();
            return false;
        }*/

        var params: string = window.location.href;

        var paramBegin: number = params.indexOf("?");
        var paramJson: string;
        if (paramBegin > 0) {
            params = params.slice(paramBegin + 1);
            var p: string[] = params.split("&");
            for (var key in p) {
                var param1: string[] = p[key].split("=");
                if (param1[0] == "param")
                    paramJson = decodeURI(param1[1]);
            }
            console.log("paramJson = " + paramJson);
            WeixinManager.getInstance().userInfo = <WeixinUserInfo>JSON.parse(paramJson);
            WeixinManager.getInstance().userInfo.avatarUrl = WeixinManager.getInstance().userInfo.headimgurl;
            if(!doLogin)
                return true;
        }
        TSCommon.log("encodeURI = " + encodeURI(location.href.split("#")[0]));
        if(!doLogin)
            return false;

        if (WeixinManager.getInstance().userInfo == null) {
            if (isweixin)
                window.location.href = Domain.WEIXIN_URL + "/OAuth/weixinlogin.aspx?redirect_uri=" + encodeURI(location.href.split("#")[0]);
            else {                
                window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + Domain.WEIXIN_WEB_APPID +
                    "&redirect_uri=http%3A%2F%2Fweixin.ss2007.com%2FOAuthWeb%2Fweixinauth.aspx&response_type=code&scope=snsapi_login&state="
                    + encodeURI(location.href.split("#")[0]) + "#wechat_redirect";
            }
            return false;
        }
        return true;
    }

    public wxBuyDiamond(useCount:number)
    {
       // console.log("useCount==="+useCount+"    nEnv="+nEnv);
        var self = this;
        wx.requestMidasPayment({

            mode: "game",

            env: Domain.ENV,

            offerId: '1450017594',

            platform: "android",
            
            currencyType: Domain.CURRENCYTYPE,
            
            buyQuantity: useCount*10,

            zoneId: "1",

            success:function(res) {

                console.log("购买成功")
                TSCommon.dispatchEvent(HallResources.onRefreshPlayerDiamondCount, this);
                console.log(res)
                //告知服务器去微信拿钻石
                // var webRequest = new WebRequest();
                // var getOpenIdUrl = Domain.WebRoot+"GetGameCurrency.aspx?UserID="+PublicUserInfo.userDBID+"&js_code="+self.js_code;
                // webRequest.getData(getOpenIdUrl, "",  function (isSucceed, data) {
                //     if (isSucceed == true) {
                //         var jsonObject = JSON.parse(data); 
                //         console.log("获得钻石："+jsonObject.gc);

                        
                //     }
                // })

            },

            fail:function(res) {

                console.log("购买失败")

                console.log(res)

            },

            complete:function(res) {

                console.log("购买完成");
                TSCommon.dispatchEvent(HallResources.onRefreshPlayerDiamondCount, this);

                console.log(res);

            }

        })
    }


    public wxGameLogin()
    {
       
       var self = this;
       AladinSDK.report(AladinSDK.ReportTypes.LOGIN,'')
        wx.login({
            success: function (res) {
                AladinSDK.report(AladinSDK.ReportTypes.AUTH,'')
                console.log(res);
                var code = res.code; 
                self.js_code = code;
                var webRequest = new WebRequest();
                var getOpenIdUrl = Domain.WebRoot+"CodeToAccessToken.aspx?js_code="+code;
                webRequest.getData(getOpenIdUrl, "",  function (isSucceed, data) {
                    if (isSucceed == true) {
                        var jsonObject = JSON.parse(data); 
                        console.log("获得openid为："+jsonObject.openid);
                        AladinSDK.report(AladinSDK.ReportTypes.OPEN_ID,jsonObject.openid)
                        WeixinManager.getInstance().userInfo = new WeixinUserInfo();
                        self.openid = jsonObject.openid;
                        self.uinionid = jsonObject.uinionid;
                        wx.getUserInfo({
                            openIdList: [WeixinManager.getInstance().userInfo.openid],
                            lang: 'zh_CN',
                            withCredentials:true,
                            fail: function (res) {
                                console.log("获取微信授权失败");
                                console.log("获取微信授权失败 res=="+res.data);
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success(res){
                                        wx.getUserInfo({
                                            openIdList: [WeixinManager.getInstance().userInfo.openid],
                                            lang: 'zh_CN',
                                            fail: function (res) {
                                            },
                                            success: function (res) {
                                                var rawData = res.rawData;
                                                WeixinManager.getInstance().userInfo = res.userInfo;
                                                WeixinManager.getInstance().userInfo.openid = self.openid;
                                                WeixinManager.getInstance().userInfo.unionid = self.uinionid;
                                                WeixinManager.getInstance().userInfo.gender = res.userInfo.gender;
                                                TSCommon.log("wxUserinfo rawData="+rawData);
                                                TSCommon.dispatchEvent(TSCommon.onGeWXtUserInfoLogin, "");
                                            }
                                        });
                                    }
                                });
                               
                            },
                            success: function (res) {
                                var rawData = res.rawData;
                                WeixinManager.getInstance().userInfo = res.userInfo;
                                WeixinManager.getInstance().userInfo.openid = self.openid;
                                WeixinManager.getInstance().userInfo.unionid = self.uinionid;
                                WeixinManager.getInstance().userInfo.gender = res.userInfo.gender;
                                TSCommon.log("wxUserinfo rawData="+rawData);
                                TSCommon.dispatchEvent(TSCommon.onGeWXtUserInfoLogin, "");
                            }
                        });
                    }
                })
            }
        })
    }

            //     var genorderURL = "https://api.weixin.qq.com/sns/jscode2session?appid="+Domain.WEIXIN_APPID+"&secret=656ab89aa1e794cc47b357ad8fc7e188&js_code="+code+"&grant_type=authorization_code";
            //     var webRequest = new WebRequest();
            //     webRequest.getData(genorderURL, "",  function (isSucceed, data) {
            //         if (isSucceed == true) {
                        
            //             WeixinManager.getInstance().userInfo = new WeixinUserInfo();
            //             TSCommon.log(data)
            //             var jsonObject = JSON.parse(data)
            //             TSCommon.log(jsonObject)}
            //             WeixinManager.getInstance().userInfo.openid = jsonObject.openid;

            //             wx.getUserInfo({
            //                 openIdList: [WeixinManager.getInstance().userInfo.openid],
            //                 lang: 'zh_CN',
            //                 fail: function (res) {
                                
            //                 },
            //                 success: function (res) {
            //                     var rawData = res.rawData;
            //                     WeixinManager.getInstance().userInfo = res.userInfo;
            //                     WeixinManager.getInstance().userInfo.openid = jsonObject.openid;
            //                     TSCommon.log("wxUserinfo rawData="+rawData);
            //                     TSCommon.dispatchEvent(TSCommon.onGeWXtUserInfoLogin, "");
            //                 }
            //             });
            //         }

            //     , false);

                
            // }
}