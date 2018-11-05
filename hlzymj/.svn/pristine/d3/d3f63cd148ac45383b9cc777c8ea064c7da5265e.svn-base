/**
 * 分享保分界面
 */

var Resources = require("Resources");
import {TSCommon} from "../../TSCommon";
import {WeixinManager} from "../../weixin/WeixinManager"
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {
        // timer_bg: {
        //     default: null,
        //     type: cc.Node,
        // },
        // timer_label:{
        //     default: null,
        //     type: cc.Label,
        // },

        protect_score: cc.Label,

        timer_label: cc.Label,
    },

    onLoad:function(){
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
       
        //主界面不显示
        if (this.node.getChildByName("mask_bg"))
        {
            this.node.getChildByName("mask_bg").setContentSize(windowSize);
        }
    },

    onEnable: function () {
        this.show();
        this.playLightAct();
    },

    onDisable:function(){
        this.unschedule(this.m_waitCallback);

        if(this.m_onEnd){
            this.m_onEnd();
        }
    },

    init: function (sn, score, onEnd) {
        this.m_totalTime = 10;

        this.m_sn = sn;     //本局的流水号

        this.m_score = score;    //本局结束的分数

        
        this.node.getChildByName("give_up_protect").active = false;

        this.m_onEnd = onEnd;
    },

    show: function () {

        var self = this;

        this.m_waitCallback = function(){

            self.m_totalTime -= 1;

            if(self.m_totalTime < 0){
                self.node.active = false;

            }

            if(self.m_totalTime <= 5){
                self.node.getChildByName("give_up_protect").active = true;
            }

            self.timer_label.string = self.m_totalTime

        }.bind(this);

        this.schedule(this.m_waitCallback, 1, this.m_totalTime, 0);


        this.protect_score.string = this.m_score;

    },

    onShareClicked: function () {
        var self = this;
        var HallResources = require("HallResources");
        if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
            self.requestProtectScore()
            //主动拉起分享接口
            wx.shareAppMessage({
                title: "小手轻轻点，救活你我他！",
                imageUrl: HallResources.protectScoreShareImgUrl,
                // success(res) {
                //     if(res.shareTickets == null || res.shareTickets == undefined || res.shareTickets == ""){ //没有群信息，说明分享的是个人
                //         setTimeout(function(){
                //             Resources.showRewardTips("请选择一个群进行分享", true, true, true);
                //         }, 0)                       
                //     }else{ //有群信息
                //         console.log("下面是群消息数据!!!")
                //         console.log(res);
                //         if(res.shareTickets.length > 0){ 
                //             self.commonShareTickets = res.shareTickets[0];
                //             wx.getShareInfo({
                //                 shareTicket: self.commonShareTickets,
                //                 success: function (res) {
                //                     console.log("下面是群消息唯一性数据!!!")
                //                     console.log(res);
                //                     self.requestProtectScore(res.encryptedData,res.iv);
                //                 }
                //             })
                //         }
                //     }
                // },
                // fail(res) {
                //     console.log("分享保分失败!!!")
                // }
            })
        }
    },

    requestProtectScore: function () {
        var myOpenId = WeixinManager.getInstance().userInfo.openid;
        var self = this;
        var httpCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                console.log("分享保分 ---------jsonObject --------");
                console.log(jsonObject);
                var nRetCode = parseInt(jsonObject.RetCode)
                if(nRetCode == 1){

                    TSCommon.dispatchEvent(GameCfg.PROTECT_SCORE_SUCCESS, null);  

                    Resources.showRewardTips("分享成功", true, true, true);

                    self.node.active = false;                     
                }
                else if(nRetCode == 12){
                    Resources.showRewardTips("分享次数已经达到上限", true, true, true);
                }
                else if(nRetCode == 13){
                    Resources.showRewardTips("该群已分享过一次，请选择其他群进行分享", true, true, true);
                }
                else{
                    console.log("未对应的错误码错误");
                }  
            }
        }

        require('HallWebRequest').getInstance().getProtectScoreShareReward(this.m_sn, this.m_score, myOpenId, httpCallback);
    },

    playLightAct:function(){
        var self = this;
        var whosTurnNode = this.node.getChildByName("protect_act");
        var strAniName = 'btn_fenxiang';
        whosTurnNode.active = true;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName,1);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },

    //继续游戏点击
    onResumeGameClicked:function(){
        this.node.active = false;
    },

});
