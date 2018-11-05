"use strict";
// exports.__esModule = true;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.conf = {
        sdk_version: '1.3.8',
        appid: '',
        base_url: 'https://mprogram.boomegg.cn/sprogram/ads/c/ad/',
        //base_url:"https://www.easy-mock.com/mock/5b681340896e85688f8ed388",
        reportUrl: 'https://distribute-stats.boomegg.cn',
        // reportUrl : 'https://third-dev.boomegg.cn',
        //更多好玩
        more_width: 144,
        more_height: 144,
        interval: 10000,
        banner_interval:60000,
        allowShare: 0,
        init_suc: false,
        is_report: true,
        windowWidth: 0,
        windowHeight: 0,
        changelog:'',
        changelogArr:[],
        default_params: {},
        gdt_pos_left: 0,
        gdt_pos_top: 0,
        gdt_pos_width: 300,
        gdt_pos_height: 100,
        coverleft: false,
        coverright: false,
        covertop: false,
        coverbottom: false,
        //回调
        cb: null,
        //上报
        openId: "",
        extraAppId: "",
        //广点通
        gdt: ''
    };
    //开关
    Data.switches = {
        isShowMore: false,
        isShowBanner: false,
        isShowGDT: false
    };
    return Data;
}());
//数据相关
var Report = /** @class */ (function () {
    function Report() {
    }
    Report.initReportParam = function () {
        Report._handleAdSource();
        var language = '';
        var equipment = '';
        var channel = '';
        var systerm = '';
        var wx_version = '';
        var res = wx.getSystemInfoSync();
        language = res.language;
        equipment = res.platform;
        channel = res.model;
        systerm = res.system;
        wx_version = res.version;
        Report.commStr.report_prefix1 = 't_event|distribute_all|';
        Report.commStr.report_prefix2 = equipment + '|' + channel + '|' + Report.commStr.version + '|' + systerm + '||||' + language + '||' + wx_version + '|' +
            Data.conf.appid + '|' + Report.adStr.Ads + ' |' + Report.adStr.AdsPos + '|' + Report.adStr.Layers + '|0|';
    };
    Report._handleAdSource = function () {
        var opts = wx.getLaunchOptionsSync();
        //上报  保存来自于参数
        var appId = '', Ads = '', AdsPos = '';
        var query = opts.query;
        if (query.scene) {
            //从二维码进入    scene 二维码规定格式为 目标小程序的Appid,ads,adsPos
            var scene = query.scene;
            if (scene) {
                var sceneArray = decodeURIComponent(scene).split(',');
                appId = sceneArray[0];
                Ads = sceneArray[1];
                AdsPos = sceneArray[2];
            }
        }
        else if (query.tgt && query.Ads && query.AdsPos) {
            // 来源小程序跳转  参数 以 path传递 pages/index/index?tgt=目标小程序appID&Ads=Ads&adsPos=adsPos
            appId = query.tgt;
            Ads = query.Ads;
            AdsPos = query.AdsPos;
        }
        else if (opts.referrerInfo && opts.referrerInfo.extraData) {
            /*来源小程序跳转  参数以
            extraData:{
                tgt:APPID,
                Ads:Ads,
                AdsPos:AdsPos,
            }
            */
            var extraData = opts.referrerInfo.extraData;
            appId = extraData.tgt;
            Ads = extraData.Ads;
            AdsPos = extraData.AdsPos;
        }
        if (Ads && AdsPos && appId) {
            wx.navigateToMiniProgram({
                appId: appId,
                path: "pages/index/index",
                extraData: {
                    tgt: appId,
                    Ads: Ads,
                    AdsPos: AdsPos
                },
                success: function (res) {
                    // 打开成功
                },
                complete: function (res) {
                    wx.hideLoading();
                }
            });
        }
        Report.adStr.Ads = Ads;
        Report.adStr.AdsPos = AdsPos;
        Report.adStr.SourceAppId = appId;
    };
    Report.reportWithAppId = function (appId, get_type, data) {
        if (data === void 0) { data = ""; }
        Data.conf.appid = appId;
        Report.initReportParam(); //初始化
        Report._report(get_type, data);
    };
    Report.report = function (get_type, data) {
        if (data === void 0) { data = ""; }
        if (!Data.conf.init_suc || !Data.conf.is_report) {
            return;
        }
        Report._report(get_type, data);
    };
    Report._report = function (get_type, data) {
        if (data === void 0) { data = ""; }
        var arr = get_type.split('_');
        var report_value = 0;
        if (arr.length < 2) {
            wx.showToast({
                title: '参数传递错误',
                icon: 'none'
            });
            return;
        }
        if (get_type == Report.ReportTypes.OPEN_ID) {
            Data.conf.openId = data;
        }
        else {
            Data.conf.extraAppId = data;
        }
        if (get_type == Report.ReportTypes.PAY_MENT) {
            if (typeof data != "number") {
                //如果上报支付，则必须传递data
                wx.showToast({
                    title: '参数传递错误，int类型',
                    icon: 'none',
                    duration: 3000
                });
                return;
            }
            report_value = data;
        }
        var type = arr[0];
        var sub_type = arr[1];
        var str = Report.commStr.report_prefix1 + Report._getCurrentDate() + '|' + Report._getTimeStapm() + '|' + Report.commStr.report_prefix2 + Data.conf.openId + '|' + type + '|' + sub_type + '|' + report_value + '|' + Data.conf.extraAppId;
        Report.raw_report(str);
    };
    Report._getCurrentDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = Number(year + month + strDate);
        return currentdate;
    };
    Report._getTimeStapm = function () {
        return Date.parse(new Date().toString()) / 1000;
    };
    Report.raw_report = function (data_req) {
        var baseCode = Report._base64encode(data_req);
        //TODO
        wx.request({
            url: Data.conf.reportUrl + '/report',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                info: baseCode
            },
            method: 'post',
            success: function (res) {
            },
            fail: function (res) { },
            complete: function (res) { }
        });
    };
    Report._base64encode = function (str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    };
    Report.ReportTypes = {
        SHOW: '1_1',
        LOGIN: '1_2',
        OPEN_ID: '1_3',
        AUTH: '1_4',
        PAY_MENT: '6_1',
        MORE_FOLD: '2_1',
        MORE_CLICK: '2_2',
        MORE_LONG_CLICK: '2_3'
    };
    Report.commStr = {
        report_prefix1: '',
        report_prefix2: '',
        version: ''
    };
    Report.adStr = {
        Ads: "",
        AdsPos: "",
        SourceAppId: "",
        Layers: 0
    };
    return Report;
}());
//SDK部分
var SDK = /** @class */ (function () {
    function SDK() {
    }
    SDK.init = function (appId, version, params, cb, report) {

        if (report === void 0) { report = true; }
        var default_params = {
            gdt_left: -1,
            gdt_top: -1,
            gdt_bottom: 0,
            gdt_right: -1,
            gdt_widht: 300
        };
        Data.conf.cb = cb;
        Data.conf.is_report = report;
        Report.commStr.version = version;
        if (params) {
            default_params.gdt_left = params.gdt_left != undefined? params.gdt_left : default_params.gdt_left;
            default_params.gdt_top =  params.gdt_top != undefined? params.gdt_top : default_params.gdt_top;
            default_params.gdt_bottom = params.gdt_bottom != undefined? params.gdt_bottom : default_params.gdt_bottom;
            default_params.gdt_right = params.gdt_right != undefined? params.gdt_right : default_params.gdt_right;
            default_params.gdt_widht = params.gdt_widht != undefined? params.gdt_widht : default_params.gdt_widht;
        }

        //Object.assign(default_params,params);
        var getSystemInfoSync = wx.getSystemInfoSync();
        Data.conf.windowWidth = getSystemInfoSync.windowWidth;
        Data.conf.windowHeight = getSystemInfoSync.windowHeight;
        Data.conf.default_params = default_params;
        SDK.setGDT_pos(default_params, default_params.gdt_widht, default_params.gdt_widht * 108 / 375);
        if (SDK.data.isInited) {
            return;
        }
        Data.conf.appid = appId;
        SDK.data.isInited = true;
        EngineCode.initNodes();
        SDK.initData();
        Data.conf.init_suc = true;
        Report.initReportParam();
        Report.report(Report.ReportTypes.SHOW);
    };
    SDK.setGDT_pos = function (default_params, width, height) {
        var gdt_pos_left = 0;
        var gdt_pos_top = 0;
        var gdt_pos_width = default_params.gdt_widht;
        if (default_params.gdt_top == -1) {
            //未传递top位置按bottom值
            gdt_pos_top = Data.conf.windowHeight - height - default_params.gdt_bottom - 10;
        }
        else {
            //只要传递了top则忽略bottom
            gdt_pos_top = default_params.gdt_top;
        }
        if (default_params.gdt_right == -1 && default_params.gdt_left == -1) {
            //居中
            gdt_pos_left = (Data.conf.windowWidth - width) / 2;
        }
        else if (default_params.gdt_right == -1 && default_params.gdt_left != -1) {
            Data.conf.coverleft = true;
            //未传递right值 按left
            gdt_pos_left = default_params.gdt_left;
        }
        else {
            Data.conf.coverright = true;
            //只要传递了right值 则忽略left 按right
            gdt_pos_left = Data.conf.windowWidth - width + default_params.gdt_right;
        }

        Data.conf.gdt_pos_left = gdt_pos_left;
        Data.conf.gdt_pos_top = gdt_pos_top;
        Data.conf.gdt_pos_width = gdt_pos_width;
    };
    SDK.initData = function () {
        wx.request({
            url: Data.conf.base_url + 'moregame',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                id: Data.conf.appid
            },
            method: 'get',
            success: function (response) {
                if (!response.data) {
                    console.log('提示：未配置数据，请联系对接人');
                    return;
                }
                SDK.parseData(response);
            }
        });
    };
    //解析HTTP请求
    SDK.parseData = function (data) {

        if (data.data) {
            var d = data.data.data;
            Data.conf.allowShare = data.data.open;
            if (d.redirect) {
                wx.navigateToMiniProgram({
                    appId: d.redirect,
                    path: "pages/index/index",
                    success: function (res) {
                        // 打开成功
                    },
                    complete: function (res) {
                    }
                });
            }
            if(d.changelog){
                Data.conf.changelog = d.changelog;
                let arr = [];
                if(d.changelog.indexOf('$$')){
                    Data.conf.changelogArr = d.changelog.split('$$');
                }else{
                    Data.conf.changelogArr.push(d.changelog);
                }
            }
            if (d.interval) {
                Data.conf.interval = d.interval;
            }
            if (d.banner_interval) {
                Data.conf.banner_interval = d.banner_interval;
            }

            if (d.sdk_version) {
                if (d.sdk_version != Data.conf.sdk_version) {
                    let new_versionArr = d.sdk_version.split('.');
                    let local_versionArr = Data.conf.sdk_version.split('.');
                    let big_local = parseInt(local_versionArr[0]);
                    let middle_local = parseInt(local_versionArr[1]);
                    let small_local = parseInt(local_versionArr[2]);
                    let big_new = parseInt(new_versionArr[0]);
                    let middle_new = parseInt(new_versionArr[1]);
                    let small_new = parseInt(new_versionArr[2]);

                    if( big_local <= big_new){
                        if(middle_local <= middle_new){
                            if(small_local < small_new){
                                console.log('%c 请升级SDK版本：','color:red;font-size:26px;font-weight:bold;');
                                console.log('%c 当前版本号：'+ Data.conf.sdk_version,'color:#000;font-size:15px;');
                                console.log('%c 最新版本号：'+ d.sdk_version,'color:#000;font-size:15px;');
                                console.log('%c 修改内容 ：','color:#000;font-size:17px;');
                                Data.conf.changelogArr.forEach(function(item){
                                    console.log('%c     '+ item,'color:#000;font-size:15px;');
                                })
                                console.log('%c 最新版本下载地址：http://ad-static.boomegg.cn/sdk/cocos/' + d.sdk_version +'.zip','color:#333;font-size:22px;font-weight:bold;');
                            }
                        }
                    }
                }
            }
            if (d.icon && d.icon.length > 0) {
                SDK.data.more_list = d.icon;
                Data.switches.isShowMore = true;
            }
            if (d.gdt) {
                Data.conf.gdt = d.gdt;
                Data.switches.isShowGDT = true;
            }
            if (d.bottom && d.bottom.length > 0) {
                SDK.data.banner_list = d.bottom;
                if (!Data.switches.isShowGDT) {
                    Data.switches.isShowBanner = true;
                }
            }
            if (d.bottom.length == 0 && d.icon.length == 0 && d.gdt == "") {
                console.log('提示：未配置数据，请联系管理员');
                return;
            }
            if (d.bottom.length > 0) {
                d.bottom.every(function (val, index) {
                    if (!val.allow && val.preview == "") {
                        console.log('提示：配置错误，banner未配置preview或者未不允许跳转，请联系管理员');
                        return false;
                    }
                });
            }
            if (d.icon.length > 0) {
                d.icon.every(function (val, index) {
                    if (!val.allow && val.preview == "") {
                        console.log('提示：配置错误，icon未配置preview或者未不允许跳转，请联系管理员');
                        return false;
                    }
                });
            }
            //开始显示轮播
            Carousel.Init();
        }
        else {
            //TODO 判断是否没有配置
            console.log("get data error ...");
        }
        if (Data.conf.cb) {
            Data.conf.cb();
        }
    };
    SDK._getImgType = function (img_url) {
        var url_component = img_url.split('/');
        return url_component[url_component.length - 1].split('?')[0].split('.')[1];
    };
    SDK._preview = function (url, reportAppId) {
        Report.report(Report.ReportTypes.MORE_CLICK);
        wx.previewImage({
            urls: [url],
            success: function () {
                Report.report(Report.ReportTypes.MORE_FOLD, reportAppId);
            }
        });
    };
    SDK._toMiniProgram = function (type, appId, targetAppId,params) {
        wx.showLoading({
            title: '正在跳转'
        });
        Report.report(Report.ReportTypes.MORE_CLICK, targetAppId);
        var typeName = type == 1 ? 'aladin_icon' : 'aladin_banr';
        let data = null;

        if(params){
            data = {
                tgt: targetAppId,
                Ads: typeName,
                params: params,
                AdsPos: Data.conf.appid
            }
        }else{
            data = {
                tgt: targetAppId,
                Ads: typeName,
                AdsPos: Data.conf.appid
            }
        }
        wx.navigateToMiniProgram({
            appId: appId,
            path: "pages/index/index",
            extraData: data,
            success: function (res) {
                Report.report(Report.ReportTypes.MORE_FOLD, targetAppId);
                // 打开成功
            },
            complete: function (res) {
                wx.hideLoading();
            }
        });
    };
    SDK.data = {
        isInited: false,
        more_list: [],
        banner_list: [],
        fn: null
    };
    return SDK;
}());
//广点通
var GDT = /** @class */ (function () {
    function GDT() {
    }
    GDT.Run = function () {
        GDT.Next();
    };
    GDT.Next = function () {
        if (GDT.data.adid) {
            GDT.data.adid.destroy();
        }

        if(EngineCode.cache.banner__node.active){  //防止加载了广点通自定义广告还在
            EngineCode.cache.banner__node.active = false;
        }

        GDT.data.adid = wx.createBannerAd({
            adUnitId: Data.conf.gdt,
            style: {
                left: Data.conf.gdt_pos_left,
                width: Data.conf.gdt_pos_width,
                top: Data.conf.gdt_pos_top
            }
        });


        GDT.data.adid.onError(function(err){  //异常处理  如若广点通加载失败 则显示自定义广告
            if(err.errCode == 1004){   //无合适的广告
                if(!EngineCode.cache.banner__node.active){
                    if(SDK.data.banner_list.length>0){  //确保有banner数据再去执行下一个banner
                        EngineCode.cache.banner__node.active = true;
                        Carousel.Next(Carousel.TYPES.BANNER);
                    }
                }
            }
        })

        if (GDT.data.adid) {
            GDT.data.adid.onResize(function () {
                var gdt_pos_left = 0;
                var gdt_pos_top = 0;
                var gdt_pos_width = 300;
                var coverright = Data.conf.coverright;
                var coverleft = Data.conf.coverleft;
                var covertop = Data.conf.covertop;
                var coverbottom = Data.conf.coverbottom;
                if (GDT.data.adid) {
                    var realWidth = GDT.data.adid.style.realWidth;
                    var realHeight = GDT.data.adid.style.realHeight;
                    if (!covertop) {
                        //未传递top位置按bottom值
                        gdt_pos_top = Data.conf.windowHeight - realHeight - Data.conf.default_params['gdt_bottom'] - 10;
                    }
                    else {
                        //只要传递了top则忽略bottom
                        gdt_pos_top = Data.conf.default_params['gdt_top'];
                    }

                    if (!coverright && !coverleft) {
                        //居中
                        gdt_pos_left = (Data.conf.windowWidth - realWidth) / 2;
                    }
                    else if (!coverright && coverleft) {
                        //未传递right值 按left
                        gdt_pos_left = Data.conf.default_params['gdt_left'];
                    }
                    else {
                        //只要传递了right值 则忽略left 按right
                        gdt_pos_left = Data.conf.windowWidth - realWidth + Data.conf.default_params['gdt_right'];
                    }
                    GDT.data.adid.style.left = gdt_pos_left;
                    GDT.data.adid.style.top = Data.conf.gdt_pos_top;
                }
            });

            GDT.data.adid.show();
        }
        GDT.data.timer = setTimeout(GDT.Next, Data.conf.banner_interval);
    };
    GDT.StopTimer = function () {
        if (GDT.data.timer) {
            clearTimeout(GDT.data.timer);
            GDT.data.timer = 0;
        }
    };
    GDT.Hide = function () {
        try {
            GDT.data.adid.destroy();
        } catch (error) {

        }

        if (GDT.data.adid) {
            GDT.data.adid = 0;
            GDT.StopTimer();
        }
    };
    GDT.data = {
        adid: 0,
        timer: 0
    };
    return GDT;
}());
//引擎相关代码
var EngineCode = /** @class */ (function () {
    function EngineCode() {
    }
    EngineCode.show = function (type) {
        if (type == Carousel.TYPES.MORE && !EngineCode.cache.more__node.active) {
            EngineCode.cache.more__node.active = true;
            Carousel.Run(type);
        }
        else if (type == Carousel.TYPES.BANNER && !EngineCode.cache.banner__node.active) {
            EngineCode.cache.banner__node.active = true;
            Carousel.Run(type);
        }
        else if (type == Carousel.TYPES.GDT) {
            if (!GDT.data.adid) {
                GDT.Run();
            }
        }
    };
    EngineCode.HideMore = function () {
        EngineCode.hide(Carousel.TYPES.MORE);
    };
    EngineCode.HideBanner = function () {
        EngineCode.hide(Carousel.TYPES.BANNER);
    };
    EngineCode.ShowMore = function () {
        EngineCode.show(Carousel.TYPES.MORE);
    };
    EngineCode.ShowBanner = function (type, params) {
        if (type === void 0) { type = "BANNER"; }
        if (params === void 0) { params = {}; }
        if (Data.switches.isShowGDT) {
            //此处可以修改广点通位置
            type = Carousel.TYPES.GDT;
            var default_params = {
                gdt_left: -1,
                gdt_top: -1,
                gdt_bottom: 0,
                gdt_right: -1,
                gdt_widht: 300
            };
            Data.conf.default_params = default_params;
            if (params) {
                default_params.gdt_left = params.gdt_left || default_params.gdt_left;
                default_params.gdt_top = params.gdt_top || default_params.gdt_top;
                default_params.gdt_bottom = params.gdt_bottom || default_params.gdt_bottom;
                default_params.gdt_right = params.gdt_right || default_params.gdt_right;
                default_params.gdt_widht = params.gdt_widht || default_params.gdt_widht;
            }
            //Object.assign(default_params,params);
            SDK.setGDT_pos(default_params, default_params.gdt_widht, default_params.gdt_widht * 108 / 375);
        }
        else {
            type = Carousel.TYPES.BANNER;
        }
        EngineCode.show(type);
    };
    EngineCode.hide = function (type) {
        //停timer
        Carousel.StopNextTimer(type);
        if (type == Carousel.TYPES.MORE) {
            EngineCode.cache.more__node.active = false;
            Carousel.ClearAniTimer();
        }
        else if (type == Carousel.TYPES.BANNER) {
            EngineCode.cache.banner__node.active = false;
            GDT.Hide();
        }
    };
    EngineCode.getMoreNode = function () {
        if (!EngineCode.cache.mask) {
            EngineCode.initNodes();
        }
        return EngineCode.cache.mask;
    };
    EngineCode.getBannerNode = function () {
        if (!EngineCode.cache.banner__node) {
            EngineCode.initNodes();
        }
        return EngineCode.cache.banner__node;
    };
    EngineCode.initNodes = function () {
        //更多好玩节点
        var more__node = new cc.Node();
        var more_node = more__node.addComponent(cc.Sprite);
        more__node.width = Data.conf.more_width;
        more__node.height = Data.conf.more_height;
        more__node.name = 'more_game';
        more__node.anchorX = 0;
        more__node.anchorY = 0;
        more__node.on('touchend', Carousel.MoreClick);

        var mask__node = new cc.Node();
        mask__node.addComponent(cc.Mask);
        mask__node.setContentSize(cc.size(144, 144));
        mask__node.type = cc.Mask.Type.RECT;
        mask__node.anchorX = 0;
        mask__node.anchorY = 0;
        mask__node.name = 'mask_node';
        mask__node.addChild(more__node);

        EngineCode.cache.more_node = more_node; //将mask节点暴露出去
        EngineCode.cache.more__node = more__node; //将mask节点暴露出去
        EngineCode.cache.mask = mask__node;

        //banner广告节点
        var banner__node = new cc.Node();
        var banner_node = banner__node.addComponent(cc.Sprite);
        banner__node.name = 'banner_node';
        banner__node.on('touchend', Carousel.BannerClick);
        banner__node.scaleX = 0.5;
        banner__node.scaleY = 0.5;
        banner__node.anchorX = 0.5;
        banner__node.anchorY = 0;


        var widget_banner = banner__node.getComponent(cc.Widget);
        if(!widget_banner){
            widget_banner = banner__node.addComponent(cc.Widget);
        }
        widget_banner.isAlignBottom = true;
        widget_banner.bottom = 10;

        EngineCode.cache.banner_node = banner_node;
        EngineCode.cache.banner__node = banner__node;
    };
    EngineCode._DownloadTexture = function (img_url, download_suc_cb, download_fail_cb) {
        var imgTypy = img_url.substr(img_url.length - 3, 3);
        cc.loader.load(
        //TODO
        { url: img_url, type: imgTypy }, function (err, texture) {
            if (err) {
                console.log('error');
                return console.error(err);
            }
            download_suc_cb(texture);
        });
    };
    EngineCode.RenderTexture = function (type, img_url) {
        if (type == Carousel.TYPES.MORE) {
            EngineCode._DownloadTexture(img_url, EngineCode.DownloadMoreSuc, EngineCode.DownloadMoreFail);
        }
        else if (type == Carousel.TYPES.BANNER) {
            EngineCode._DownloadTexture(img_url, EngineCode.DownloadBannerSuc, EngineCode.DownloadBannerFail);
        }
    };
    EngineCode.DownloadMoreSuc = function (t) {
        if(!t){
            return;
        }

        EngineCode.cache.texture_height = t.height;
        EngineCode.cache.texture_width = t.width;
        var _sp = EngineCode.cache.more_node;
        var sp = EngineCode.cache.more__node;
        if(!t || !t.width || !t.height){
            return;
        }
        if(!sp || !cc.isValid(sp) || !sp.width){
            return;
        }
        sp.width = t.width;
        sp.height = t.height;
        sp.x = 0;
        sp.y = 0;
        _sp.spriteFrame = new cc.SpriteFrame(t);
        //再开一个next的timeout
        Carousel.StartNextTimer(Carousel.TYPES.MORE);
        //清除前一个动图的timer
        Carousel.ClearAniTimer();
        //动图timer
        if (t.width > Data.conf.more_width * 1.5) {
            Carousel.data.timer.more_ani_timer = setInterval(EngineCode.Animation, 60);
        }
    };
    EngineCode.DownloadMoreFail = function (t) {
        Carousel.Next(Carousel.TYPES.MORE);
    };
    EngineCode.DownloadBannerSuc = function (t) {
        var _sp = EngineCode.cache.banner_node;
        var sp = EngineCode.cache.banner_node;
        //TODO 大小和位置，一定要设置大小，否则不会触发click事件
        sp.width = t.width;
        sp.height = t.height;

        let win_widht = cc.view._designResolutionSize.width;
        let win_height = cc.view._designResolutionSize.height;

        sp.x = (win_widht - sp.width)/2;
        sp.y = win_height - sp.height -10;

        // EngineCode.cache.banner__node.x = (win_widht - sp.width)/2;
        // EngineCode.cache.banner__node.y = win_height - sp.height -10;

        _sp.spriteFrame = new cc.SpriteFrame(t);
        sp.active = true;
        Carousel.StopNextTimer(Carousel.TYPES.BANNER);
        //再开一个next的timeout
        Carousel.StartNextTimer(Carousel.TYPES.BANNER);
    };
    EngineCode.DownloadBannerFail = function () {
        Carousel.Next(Carousel.TYPES.BANNER);
    };
    EngineCode.Animation = function () {
        var x = EngineCode.cache.more__node.x - Data.conf.more_width;
        if (EngineCode.cache.texture_width + x >= Data
            .conf.more_width) {
            //没到最后一张
            EngineCode.cache.more__node.x = x;
        }
        else {
            Carousel.ClearAniTimer();
            //停顿一段时间再播
            Carousel.data.timer.more_ani_finish_timer = setTimeout(EngineCode.AniFinish, 600);
        }
    };
    //动画结束停顿事件
    EngineCode.AniFinish = function () {
        EngineCode.cache.more__node.x = 0;
        Carousel.data.timer.more_ani_timer = setInterval(EngineCode.Animation, 60);
    };
    EngineCode.cache = {
        more_container: null,
        more_node: null,
        mask: null,
        mask_node: null,
        banner_node: null,
        banner__node: null,
        more__node: null,
        texture_width: 144,
        texture_height: 144
    };
    return EngineCode;
}());
;
//轮播
var Carousel = /** @class */ (function () {
    function Carousel() {
    }
    Carousel.Init = function () {
        //  "carousel init ..."
        if (!Data.switches.isShowMore) {
            EngineCode.hide(Carousel.TYPES.MORE);
        }
        else {
            Carousel.Run(Carousel.TYPES.MORE);
        }

        if (!Data.switches.isShowBanner) {
            EngineCode.hide(Carousel.TYPES.BANNER);
        }
        else {
            Carousel.Run(Carousel.TYPES.BANNER);
        }
        if (Data.switches.isShowGDT) {
            GDT.Run();
        }
        else {
            //EngineCode.hide(Carousel.TYPES.GDT);
        }
    };
    Carousel.Next = function (type) {
        if (type == Carousel.TYPES.BANNER) {
            var next = (Carousel.data.current.banner + 1) % SDK.data.banner_list.length;
            if (Carousel.data.current.banner == next) {
                return;
            }
            Carousel.data.current.banner = next;
        }
        else {
            var next = (Carousel.data.current.more + 1) % SDK.data.more_list.length;
            if (Carousel.data.current.more == next) {
                return;
            }
            Carousel.data.current.more = next;
        }
        Carousel.Run(type);
    };
    Carousel.Run = function (type) {
        var list = type == Carousel.TYPES.BANNER ? SDK.data.banner_list : SDK.data.more_list;
        var index = type == Carousel.TYPES.BANNER ? Carousel.data.current.banner : Carousel.data.current.more;
        if (list && list.length > 0) {
            EngineCode.RenderTexture(type, list[index]['icon']);
        }
    };
    Carousel.StartNextTimer = function (type) {
        var interval = type == 1? Data.conf.interval:Data.conf.banner_interval;

        var timer = setTimeout(function(){
            //切换更多好玩
            Carousel.Next(type);
        }, interval);

        if (type == Carousel.TYPES.BANNER) {
            Carousel.data.timer.next_banner_timer = timer;
        }
        else {
            Carousel.data.timer.next_more_timer = timer;
        }
    };
    Carousel.StopNextTimer = function (type) {
        if (type == Carousel.TYPES.MORE && Carousel.data.timer.next_more_timer) {
            clearTimeout(Carousel.data.timer.next_more_timer);
            Carousel.data.timer.next_more_timer = 0;
        }
        else if (type == Carousel.TYPES.BANNER && Carousel.data.timer.next_banner_timer) {
            clearTimeout(Carousel.data.timer.next_banner_timer);
            Carousel.data.timer.next_banner_timer = 0;
        }
    };
    Carousel.ClearAniTimer = function () {
        if (Carousel.data.timer.more_ani_timer) {
            clearInterval(Carousel.data.timer.more_ani_timer);
            Carousel.data.timer.more_ani_timer = 0;
        }
        if (Carousel.data.timer.more_ani_finish_timer) {
            clearTimeout(Carousel.data.timer.more_ani_finish_timer);
            Carousel.data.timer.more_ani_finish_timer = 0;
        }
    };
    Carousel.MoreClick = function () {
        var checkEvent = SDK.data.more_list[Carousel.data.current.more];
        if (checkEvent.allow) {
            SDK._toMiniProgram(Carousel.TYPES.MORE, checkEvent.appId, checkEvent.objAppId,checkEvent.params);
        }
        else {
            SDK._preview(checkEvent.preview, checkEvent.objAppId);
        }
        Carousel.StopNextTimer(Carousel.TYPES.MORE);
        Carousel.ClearAniTimer();
        Carousel.Next(Carousel.TYPES.MORE);
    };
    Carousel.BannerClick = function () {
        var checkEvent = SDK.data.banner_list[Carousel.data.current.banner];
        if (checkEvent.allow) {
            SDK._toMiniProgram(Carousel.TYPES.BANNER, checkEvent.appId, checkEvent.objAppId,checkEvent.params);
        }
        else {
            SDK._preview(checkEvent.preview, checkEvent.objAppId);
        }
        Carousel.StopNextTimer(Carousel.TYPES.BANNER);
        Carousel.Next(Carousel.TYPES.BANNER);
    };
    Carousel.TYPES = {
        MORE: 1,
        BANNER: 2,
        GDT: 3
    };
    Carousel.data = {
        current: {
            more: 0,
            banner: 0
        },
        timer: {
            more_ani_timer: 0,
            more_ani_finish_timer: 0,
            next_more_timer: 0,
            next_banner_timer: 0
        }
    };
    return Carousel;
}());

var AladinSDK = /** @class */ (function () {
    function AladinSDK() {
    }
    AladinSDK.reportTypes = Report.ReportTypes;
    AladinSDK.ReportTypes = Report.ReportTypes;
    AladinSDK.init = function (appId, version, params, cb, report) {
        if (params === void 0) { params = null; }
        if (cb === void 0) { cb = null; }
        if (report === void 0) { report = true; }
        SDK.init(appId, version, params, cb, report);
    };
    AladinSDK.getOpen = function () {
        return Data.conf.allowShare;
    };
    AladinSDK.Report = function (get_type, data) {
        if (data === void 0) { data = ""; }
        Report.report(get_type, data);
    };
    AladinSDK.report = function (get_type, data) {
        if (data === void 0) { data = ""; }
        Report.report(get_type, data);
    };
    AladinSDK.reportWithAppId = function (appId, get_type, data) {
        if (data === void 0) { data = ""; }
        Report.reportWithAppId(appId, get_type, data);
    };
    AladinSDK.getMoreNode = function () {
        return EngineCode.getMoreNode();
    };
    AladinSDK.getBannerNode = function () {
        return EngineCode.getBannerNode();
    };
    AladinSDK.HideMore = function () {
        EngineCode.HideMore();
    };
    AladinSDK.HideBanner = function () {
        EngineCode.HideBanner();
    };
    AladinSDK.ShowMore = function () {
        EngineCode.ShowMore();
    };
    AladinSDK.ShowBanner = function () {
        EngineCode.ShowBanner();
    };
    return AladinSDK;
}());

export default AladinSDK;
;
