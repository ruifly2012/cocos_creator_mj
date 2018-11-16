import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var Resources = require("Resources");
var dailyLoginLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        hasGetPrefab:{
            default: null,
            type: cc.Prefab,
        },
        todayBtnPrefab:{
            default: null,
            type: cc.Prefab,
        },
        tomorrowPrefab:{
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onTouch: function (event) {
        var poisition = event.touch.getLocation();
        var locationInNode = this.bg.convertToNodeSpace(poisition);
        var s = this.bg.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            // this.node.active = true;
        }
        else {
            // this.node.active = false;
            this.closeAndChangeScaleAction();
        }
    },

    initData:function(data,bolClick)
    {
        this.bg.getChildByName("list").removeAllChildren();
        var todayDay = 0;
        for(var i=0; i<data.length; i++){
            if (data[i].hassign == 0){
                todayDay = i;
                break;
            } 
        }
        for(var i=0; i<todayDay; i++){
            var item = cc.instantiate(this.hasGetPrefab);
            item.parent =  this.bg.getChildByName("list");
            item.getComponent("dailyHasGetItem").initData(data[i]);      
            var x = -410 + i*138;
            var y = -30; 
            item.setPosition(x,y);
        }
        
        if (bolClick == 0){
            todayDay = todayDay - 1;
        }
        else{
            var item = cc.instantiate(this.todayBtnPrefab);
            item.parent =  this.bg.getChildByName("list");
            item.getComponent("dailyGetButtonItem").initData(data[i],this.clickGetRewardBtn);      
            var x = 230 + todayDay*138;
            var y = 270; 
            item.setPosition(x,y);
        }
        

        for(var i=todayDay+1; i<data.length; i++){
            var item = cc.instantiate(this.tomorrowPrefab);
            item.parent =  this.bg.getChildByName("list");
            item.getComponent("dailyTomorrowItem").initData(data[i]);      
            var x = -410 + i*138;
            var y = -30; 
            item.setPosition(x,y);
        }
    },

    start: function () {

    },

    clickGetRewardBtn:function (){
        var self = this;
        var callBackFunc = function(bolSuccess,data){
            if (bolSuccess) {
                require('HallResources').getInstance().removeLoading();
                // var XmlToJson = require('XmlToJson');
                // var xmlToJson = new XmlToJson();
                // var jsonData = JSON.stringify(xmlToJson.parse(data));
                // var jsonObject = JSON.parse(jsonData)
                var jsonObject = JSON.parse(data)
                // console.log("-----------------DailySignInfo.aspx返回数据----------------------------")
                // console.log(jsonObject)
                var backData = jsonObject.table[0];
                var allData = [];
                allData.moneytype = backData.MoneyType;
                allData.retcode = backData.RetCode;
                allData.wantamount = backData.WantAmount;
                if (allData.retcode == 1){
                    HallResources.getInstance().playButtonEffect();
                    // self.node.parent.parent.active = false;
                    self.node.parent.parent.parent.getComponent("dailyLoginLayer").closeAndChangeScaleAction();
                    var goldData = require("HallControl").getInstance().getPublicUserInfo().nGold
                    require("HallControl").getInstance().getPublicUserInfo().nGold = parseInt(allData.wantamount) + parseInt(goldData);

                    TSCommon.dispatchEvent(HallResources.onGoldOrDiamondChanged,true);
                    // TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["+"+allData.wantamount,"texture/hallRes/roomInfo/gold"]);
                    TSCommon.dispatchEvent(HallResources.onClearDailyLoginRedPoint,true);
                    var sendData = [];
                    sendData.moneytype = 7;
                    sendData.wantamount = allData.wantamount;

                    self.node.parent.parent.parent.parent.getComponent("HallPlatformInfo").openGetReward(sendData);
                }
                else if(allData.retcode == 11) {
                    console.log("身份验证不通过");
                }
                else if(allData.retcode == 12) {
                    console.log("今天已经签到过");
                }
                else if(allData.retcode == 13) {
                    console.log("签到错误");
                }
            
               
            }
        };
        require('HallWebRequest').getInstance().sendDailyCheck(callBackFunc);
    },

    closeAndChangeScaleAction(){
        var self = this;
        // self.node.active = false;
        var action1 = cc.scaleTo(0.2, 0.3, 0.3);
        var action2 =cc.fadeOut(0.01);
        
        var action3 = cc.callFunc(function(){
            self.node.active = false;
            
            // TSCommon.dispatchEvent(HallResources.onChangeShadow,false);
        });
        var sequence = cc.sequence(action1, action2, action3);
        this.bg.runAction(sequence);
    },


    clickCloseBtn: function () {
        HallResources.getInstance().playCloseEffect();
        // this.node.active = false;
        this.closeAndChangeScaleAction();
    },

    // update (dt) {},
});

module.exports = dailyLoginLayer;