import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
import {WeixinManager} from "../weixin/WeixinManager";
var Tools = require("Tools");

var SeasonLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        cupBg: {
            default: null,
            type: cc.Node,
        },
        nowRankPrefab:{
            default: null,
            type: cc.Prefab,
        },
        otherRankPrefab:{
            default: null,
            type: cc.Prefab,
        },
        nextLevelLabel:{
            default:null,
            type: cc.Label,
        },
        progressBar:{
            default:null,
            type: cc.ProgressBar,
        },
        progressValueLabel:{
            default:null,
            type: cc.Label,
        },
        levelNowSeasonLabel:{
            default:null,
            type: cc.Label,
        },
        rewardLabel:{
            default:null,
            type: cc.Label,
        },
        getRewardBtn:{
            default:null,
            type: cc.Button,
        },
        getRewardGrayBtn:{
            default:null,
            type: cc.Button,
        },
        // timeLabel:{
        //     default:null,
        //     type: cc.Label,
        // },
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

    initData:function(rankScore,allRankData,seasonStartTime,seasonEndTime,divisionID)
    {
        if (divisionID!=19)
        {   
            var data = HallResources.getInstance().getRankDataById(divisionID+1);
            var nextScore = data.MinScore;
            var nextName = data.LittleName;
            this.nextLevelLabel.string = "距离"+nextName + "还差" + (nextScore - rankScore);
            this.progressBar.progress = rankScore/nextScore;
            this.progressValueLabel.string = Tools.getFormatNumber(rankScore)+"/"+Tools.getFormatNumber(nextScore);
        }else{
            this.nextLevelLabel.string = "您已经达到最高等级"
            this.progressBar.progress = 1;
            this.progressValueLabel.string = rankScore+"/"+rankScore;
        }
        
        
        // this.timeLabel.string = "赛季时间："+ seasonStartTime+"至"+seasonEndTime;
        this.cupBg.removeAllChildren();
        var data = HallResources.getInstance().getRankAndStarByScore(rankScore);
        console.log("=================赛季================")
        console.log(data)
        var myCup = data.cup-1;
        //铂金和铂金以下若是我的分数段，显示在最左边
        if (myCup <= 3){
            
            var item = null;
            var offsetX = 300;
            item = cc.instantiate(this.nowRankPrefab);
            item.getComponent("NowRankLevelItem").initData(allRankData[myCup],data,divisionID);
            // offsetX = 165;

            item.parent = this.cupBg;
            
            //.初始化位置
            item.setPosition(110,0);

            for(var i = 1;i<3;i++)
            {
                var item2 = null;
                item2 = cc.instantiate(this.otherRankPrefab);
                item2.getComponent("OtherRankLevelItem").initData(allRankData[myCup + i]);
                var offsetX2 = 315;
                item2.parent = this.cupBg;
            
                //.初始化位置
                var x = 110+offsetX + (i-1) * offsetX2;
                item2.setPosition(x,0);

                if (i == 2){
                    //最后一个的时候不显示箭头
                    item2.getComponent("OtherRankLevelItem").setArrowShow(false);
                } 
             }
            
        }//超过铂金，显示内容不变，但是我自身的奖杯修改
        else{
            for(var i = 3;i<6;i++)
            {
                if (myCup == i){
                    var item = null;
                    var offsetX = 300;
                    item = cc.instantiate(this.nowRankPrefab);
                    item.getComponent("NowRankLevelItem").initData(allRankData[myCup],data,divisionID);
                    if (i == 5){
                        //最后一个的时候不显示箭头
                        item.getComponent("NowRankLevelItem").setArrowShow(false);
                    } 
                    // offsetX = 165;
                }
                else{
                    item = cc.instantiate(this.otherRankPrefab);
                    item.getComponent("OtherRankLevelItem").initData(allRankData[i]);
                    item.getComponent("OtherRankLevelItem").setUnlockVis(myCup < i);
                    offsetX = 315;
                    if (i == 5){
                        //最后一个的时候不显示箭头
                        item.getComponent("OtherRankLevelItem").setArrowShow(false);
                        // offsetX = 165;
                    } 
                
                }
                item.parent = this.cupBg;
                
                //.初始化位置
                var x = 110 + (i-3) * offsetX;
                item.setPosition(x,0);
            }
        }
    },

    start: function () {

    },

    updateGetRewardData:function(){
        var self = this;
        //设置时间
        var callBackFunc = function(bolSuccess,data){
            if (bolSuccess) {
                HallResources.getInstance().removeLoading();
                var jsonObject = JSON.parse(data)
                // console.log("-----------------DivisionUpAwardGetInfo.aspx返回数据----------------------------")
                // console.log(jsonObject)
                var data = jsonObject.table[0];
                // Score --玩家当前分数
                // LevelUpTo --大段位ID
                // LevelName --段位名
                // AwardAmount --领奖数量
                // CanAward --是否满足领奖条件
                // IsGetAward --是否已经领奖
                self.rewardLabel.string = "x"+data.AwardAmount;
                self.levelNowSeasonLabel.string = "本赛季段位达到"+data.LevelName;
                self.LevelUpTo = data.LevelUpTo;
                if((data.CanAward == 1)&&(data.IsGetAward == 0)){
                    self.getRewardGrayBtn.node.active = false;
                    self.getRewardBtn.node.active = true;
                    TSCommon.dispatchEvent(HallResources.onSeasonLevelUp,true);
                }
                else{
                    self.getRewardGrayBtn.node.active = true;
                    self.getRewardBtn.node.active = false;
                    TSCommon.dispatchEvent(HallResources.onSeasonLevelUp,false);
                }
            }
        };
        require('HallWebRequest').getInstance().getDivisionUpAwardGetInfo(callBackFunc);
    },

    clickGetRewardBtn:function (){
        var self = this;
        //设置时间
        var callBackFunc = function(bolSuccess,data){
            if (bolSuccess) {
                HallResources.getInstance().removeLoading();
                var jsonObject = JSON.parse(data)
                // console.log("-----------------DivisionUpAwardGetInfo.aspx返回数据----------------------------")
                // console.log(jsonObject)
                var data = jsonObject;
                var retcode = data.RetCode;
                // RetCode --操作结果(1=成功 11=密码错误 12=未满足条件 13=重复领取   0,255,-1=其他错误, 254=access_token错误, 253=openId错误, 252=offer_id错误, 251=session_key错误, 90010=登录失败, )
                // AwardAmount --领取的奖励额度
                // myBalance --领奖后的钻石余额
                if (retcode == 1){
                    require("HallControl").getInstance().getPublicUserInfo().nDiamond = data.myBalance;
                    TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["+"+data.AwardAmount,"texture/commonRes/money/diamondCoin"]);
                    TSCommon.dispatchEvent(HallResources.onRefreshPlayerDiamondCount, this);

                    self.updateGetRewardData();
                }
                else if(retcode == 11) {
                    console.log("密码错误");
                }
                else if(retcode == 12) {
                    console.log("未满足条件");
                }
                else if(retcode == 13) {
                    console.log("重复领取");
                }
                else {
                    console.log("失败");
                }
            }
        };
        var myOpenId = WeixinManager.getInstance().userInfo.openid;
        require('HallWebRequest').getInstance().getDivisionUpAwardGetAward(self.LevelUpTo,myOpenId,callBackFunc);
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

module.exports = SeasonLayer;