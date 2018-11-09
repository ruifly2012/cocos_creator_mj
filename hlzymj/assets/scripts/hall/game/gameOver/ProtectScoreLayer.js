/**
 * 分享保分界面
 */

var Resources = require("Resources");
import {TSCommon} from "../../TSCommon";
import {WeixinManager} from "../../weixin/WeixinManager"
var HallResources = require("HallResources");
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

        protect_share_btn: cc.Button,

        next_game_btn: cc.Button,

        women_icon: cc.Sprite,

        title_icon: cc.Sprite,

        cup_icon: cc.Sprite,

        cup_name: cc.Label,

        richText: cc.RichText,

        protect_score: cc.Label,

        timer_label: cc.Label,

        cancel_protect_btn: cc.Button,
    },

    onLoad:function(){
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.bolShareProtect = true;
        //主界面不显示
        if (this.node.getChildByName("mask_bg"))
        {
            this.node.getChildByName("mask_bg").setContentSize(windowSize);
        }
    },

    onEnable: function () {
        this.show();
        this.playLightAct();
        this.getShareTimes();
        this.setCupAndLevelInfo(this.m_matchScore);
        
    },

    onDisable:function(){
        this.unschedule(this.m_waitCallback);

        if(this.m_onEnd){
            this.m_onEnd();
        }
    },

    init: function (sn, score, onEnd, nMatchLevel, nMatchScore, myselfWinOrLoseScore) {
        this.m_totalTime = 25;

        this.m_sn = sn;     //本局的流水号

        this.m_score = score;    //本局结束的分数

        
        this.node.getChildByName("give_up_protect").active = false;

        this.m_onEnd = onEnd;

        this.m_matchLevel = nMatchLevel;
        this.m_matchScore = nMatchScore;

        this.m_myselfWinOrLoseScore = myselfWinOrLoseScore;
    },

    show: function () {

        var self = this;

        this.m_waitCallback = function(){

            self.m_totalTime -= 1;

            if(self.m_totalTime < 0){
                self.node.active = false;

            }

            if(self.m_totalTime <= 20){
                self.node.getChildByName("give_up_protect").active = true;
            }

            self.timer_label.string = self.m_totalTime

        }.bind(this);

        this.schedule(this.m_waitCallback, 1, this.m_totalTime, 0);


        this.protect_score.string = this.m_score;

    },

    onShareClicked: function () {
        var self = this;
        if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
            self.requestProtectScore()
            //主动拉起分享接口
            wx.shareAppMessage({
                title: "小手轻轻点，救活你我他！",
                imageUrl: HallResources.protectScoreShareImgUrl,
            })
        }
    },

    //设定奖杯和段位信息
    setCupAndLevelInfo: function (score) {
        var self = this;

        var data = HallResources.getInstance().getRankAndStarByScore(score);
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup" + data.cup, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.cup_icon.spriteFrame = spriteFrame;
            }
        });

        var nextName = data.rankName;
        this.cup_name.string = nextName;
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
                    if (self.bolShareProtect)
                        Resources.showRewardTips("分享成功", true, true, true);
                    else
                        Resources.showRewardTips("您分享保分的机会已经用尽", true, true, true);
                    cc.loader.loadRes("texture/game/matchResult/protect_success_title", cc.SpriteFrame, function (err, spriteFrame) {
                        if (!err) {
                            self.title_icon.spriteFrame = spriteFrame;
                        }
                    });

                    cc.loader.loadRes("texture/game/protectScore/protect_girl_img2", cc.SpriteFrame, function (err, spriteFrame) {
                        if (!err) {
                            self.women_icon.spriteFrame = spriteFrame;
                        }
                    });
                    self.cancel_protect_btn.node.active = false;
                    self.protect_score.node.active = false;
                    self.protect_share_btn.node.active = false;
                    self.next_game_btn.node.active = true;
                    self.getShareTimes();

                    // self.node.active = false;                     
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

    getShareTimes:function(){
        var self = this;
        var onRetCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                var hasTimes = jsonObject.TotalTimes - jsonObject.CurTimes;
                self.richText.string = "<color=#ffffff>您还有</color><color=#e72c07>"+hasTimes+"</color><color=#ffffff>次拯救我的机会</color>"
                if(parseInt(jsonObject.CurTimes) >= parseInt(jsonObject.TotalTimes)){
                    
                    self.bolShareProtect = false;

                    cc.loader.loadRes("texture/game/gameOver/shareToGroup", cc.SpriteFrame,function (error, spriteframe)
                    {
                        if (!error) {
                            self.protect_share_btn.node.getComponent(cc.Sprite).spriteFrame = spriteframe;
                        
                        }
                    });
                }
            }
        }
        require('HallWebRequest').getInstance().getProtectScoreNum(onRetCallback)
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

     //下一局
    onNextClicked:function(){
        G.matchGameReady = true;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

});
