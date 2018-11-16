import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var ConsecutiveVictoriesItem = cc.Class({
    extends: cc.Component,

    properties: {
        progressing: {
            default: null,
            type: cc.Sprite,
        },
        progressingBg: {
            default: null,
            type: cc.Sprite,
        },
        winCount: {
            default: null,
            type: cc.Label,
        },
        winReward: {
            default: null,
            type: cc.Label,
        },
        canGetRewardBtn: {
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },

    setProgressing: function (bol) {
        this.progressing.node.active = bol;
        this.progressingBg.node.active = bol;
    },

    initData:function(data){
        if ((data.CanAward == 1)&&(data.IsGetAward == 0)){
            this.canGetRewardBtn.node.active = true;
        } 
        this.hasCount = data.WinCount;
        this.winCount.string = data.WinCount+"连胜奖励";
        this.winReward.string = "x"+data.AwardAmount;
    },

    onClickRewardBtn:function(){
        var self = this;
        var callBackFunc = function(bolSuccess,data){
            if (bolSuccess) {
                HallResources.getInstance().removeLoading();
                var jsonObject = JSON.parse(data)
                // console.log("-----------------ContinuityWinGetAward.aspx返回数据----------------------------")
                // console.log(jsonObject)
                var backData = jsonObject;
                var retcode = backData.RetCode;
                var awardAmount = backData.AwardAmount;
                if (retcode == 1){
                    var goldData = require("HallControl").getInstance().getPublicUserInfo().nGold
                    require("HallControl").getInstance().getPublicUserInfo().nGold = parseInt(awardAmount) + parseInt(goldData);

                    TSCommon.dispatchEvent(HallResources.onGoldOrDiamondChanged,true);
                    TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["+"+awardAmount,"texture/hallRes/roomInfo/gold"]);
                    self.node.parent.parent.parent.parent.getComponent("HallPlatformInfo").updateConsecutiveVictoriesData();
                    // self.node.parent.parent.parent.getComponent("HallPlatformInfo").openConsecutiveVictoriesReward(self.hasCount);
                }
                else if(retcode == 11) {
                    console.log("密码错误");
                }
                else if(retcode == 12) {
                    console.log("未满足连胜条件");
                }
                else if(retcode == 13) {
                    console.log("重复领取");
                }
            
               
            }
        };
        require('HallWebRequest').getInstance().getContinuityWinGetAward(this.hasCount,callBackFunc);
    }
});

module.exports = ConsecutiveVictoriesItem;