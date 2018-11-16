import {TSCommon} from "../TSCommon";
import {WeixinManager} from "../weixin/WeixinManager";
var MallScrollList = cc.Class({
    extends: cc.Component,

    properties: {
        mallItem: cc.Prefab,
        clickTips: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function() {
        this.m_coinList = new Array();
        //.滚动区域
        this.content = this.node.getComponent(cc.ScrollView).content;
        //.初始化数据
        this.initData();
        this.maxHeight = 0;
         
    },

    start:function() {

    },

    // update (dt) {},
    
    //.生成假数据（自己按需生成）
    initData:function(type){
        // for(var i = 0; i < this.content.childrenCount; i++){
        //     this.content.children[i].destroy();
        // }
        var self = this;
        self.maxHeight = this.content.height;
        this.content.removeAllChildren();
        var listData = [];
        
        if (type == null || type == 1){
            self.m_coinList= require('HallControl').getInstance().getEXchangeList();
            for(var i=0; i<self.m_coinList.length; i++){
                var item = {
                    index: i + 1,
                    count: self.m_coinList[i].gm+"金币",
                    getIcon: "texture/hallRes/mallInfo/mallGold"+(i+1)+".png",
                    needIcon: "texture/commonRes/money/diamondCoin.png",
                    need: self.m_coinList[i].da,
                };
                item.clickFunc = function(useCount,getCount){
                    var clickLayer = cc.instantiate(self.clickTips);
                    var data = [];
                    data.titleIcon = "texture/hallRes/mallInfo/mallBuyTitle";
                    data.msg = "确定使用"+useCount+"钻石来兑换"+getCount+"数量的金币么？";
                    data.showIcon = "texture/hallRes/mallInfo/mallGold"+(i+1)+".png";
                    data.showIconLabel = "*"+getCount;
                    data.buttonIcon2 = "texture/commonRes/button/sureBtn";
                    data.button2Func = function(){
                        clickLayer.getComponent("commonTipsLayer").clickCloseBtn();
                        var onExchange = function(bolSuccess,data){
                            if (bolSuccess) {
                                if (bolSuccess) {
                                    require('HallResources').getInstance().removeLoading();
                                    var HallResources = require("HallResources");
                                    var jsonObject = JSON.parse(data)
                                    // console.log("-----------------xcxGetUserBalance.aspx返回数据----------------------------")
                                    // console.log(jsonObject)
                                    // { "RetCode": 1, "myBalance": 40, "myMoney": 14000 }
                                    var RetCode = jsonObject.RetCode; //返回标记
                                    var myBalance = jsonObject.myBalance; //钻石数
                                    var myMoney = jsonObject.myMoney;
                                    // RetCode(1=成功  0,255,-1=其他错误, 254=access_token错误, 253=openId错误, 252=offer_id错误, 251=session_key错误, 90010=登录失败, 90013=余额不足)
                                    if(RetCode == 1)
                                    {
                                        console.log("兑换成功");
                                        require("HallControl").getInstance().getPublicUserInfo().nDiamond = myBalance;
                                        require("HallControl").getInstance().getPublicUserInfo().nGold = myMoney;
                                        TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["+"+getCount,"texture/hallRes/roomInfo/gold"]);            
                                        //刷新金币和钻石
                                        TSCommon.dispatchEvent(HallResources.onGoldOrDiamondChanged,true);
                                        TSCommon.dispatchEvent(HallResources.onRefreshPlayerDiamondCount, this);
                                    }
                                    else if(RetCode == 90013)
                                    {
                                        if(cc.sys.os == cc.sys. OS_IOS){
                                            self.node.parent.parent.parent.getComponent("HallPlatformInfo").openIosPlatformShare();
                                        }
                                        else{
                                            TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["亲，钻石太少了，请去商店获取钻石"]);
                                        }
                                    }
                                    else
                                    {
                                        TSCommon.dispatchEvent(this.onShowFlyMessage,["兑换失败"]);
                                    }
                                }
                            }
                            
                        }
                        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
                            var myOpenId = WeixinManager.getInstance().userInfo.openid;
                            require('HallWebRequest').getInstance().exchangeMoneyByDiamond(useCount,myOpenId,onExchange);
                        }
                        // require('HallControl').getInstance().exchangeGold(useCount, onExchange,0)
                    };
                    data.buttonIcon3 = "texture/commonRes/button/cancelBtn";
                    data.button3Func = function(){
                        clickLayer.getComponent("commonTipsLayer").clickCloseBtn();
                    };

                    clickLayer.parent = this.node.parent.parent.parent.parent;
                    clickLayer.getComponent("commonTipsLayer").initData(data);   
                    clickLayer.setPosition(0,0);
                };
                listData.push(item);
            }
        }
        else
        {
            self.m_coinList= require('HallControl').getInstance().getShoppingList();
            for(var i=0; i<self.m_coinList.length; i++){
                var item = {
                    index: i+1,
                    count:  self.m_coinList[i].gm+"钻石",
                    getIcon: "texture/hallRes/mallInfo/mallDiamond"+(i+1)+".png",
                    needIcon: "",//"texture/hallRes/mallInfo/rmbIcon.png",
                    need:  (self.m_coinList[i].rmb/100) + "元",
                    wxRmb:(self.m_coinList[i].rmb/100),
                };
                item.clickFunc = function(useCount,getCount,wxRmb){
                    // var clickLayer = cc.instantiate(self.clickTips);
                    // var data = [];
                    // data.titleIcon = "texture/hallRes/mallInfo/mallBuyTitle";
                    // data.msg = "确定使用"+useCount+"来购买"+getCount+"数量的钻石么？";
                    // data.showIcon = "texture/hallRes/mallInfo/mallDiamond"+(i+1)+".png";
                    // data.showIconLabel = "*"+getCount;
                    // data.buttonIcon2 = "texture/commonRes/button/sureBtn";
                    // data.button2Func = function(){
                        // clickLayer.getComponent("commonTipsLayer").clickCloseBtn();
                        console.log(wxRmb+"使用"+useCount+"来购买"+getCount+"数量的钻石");
                        WeixinManager.getInstance().wxBuyDiamond(wxRmb)
                        
                    // };
                    // data.buttonIcon3 = "texture/commonRes/button/cancelBtn";
                    // data.button3Func = function(){
                    //     clickLayer.getComponent("commonTipsLayer").clickCloseBtn();
                        
                    // };

                    // clickLayer.parent = this.node.parent.parent.parent.parent;
                    // clickLayer.getComponent("commonTipsLayer").initData(data);   
                    // clickLayer.setPosition(0,0);
                };
                listData.push(item);
            }
        }

        for(var i=0; i<listData.length; i++){
            var item = cc.instantiate(this.mallItem);
            item.parent = this.content;
            item.getComponent("MallScrollListItem").initView(listData[i]);      
            //.初始化位置
            var x = 140 + (i)%3 * (item.width + 10);
            var y = -110-Math.floor((i)/3)*(item.height + 5); 
            item.setPosition(x,y);
        }

        var newHeight = (this.mallItem.data.height+5) * Math.ceil(listData.length/3);
        this.content.height = (newHeight>self.maxHeight)?self.maxHeight:newHeight;
        
    }
});

module.exports = MallScrollList;