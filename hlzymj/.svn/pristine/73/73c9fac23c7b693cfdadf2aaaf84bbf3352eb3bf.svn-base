
/**
 * 此处为段位晋级的界面
 */

var GameLibSink = require("GameLibSink");
var GameDefs = require("GameDefs");
import { TSCommon } from "../../TSCommon";
var Resources = require("Resources");
import {WeixinManager} from "../../weixin/WeixinManager"
var HallResources = require("HallResources");
cc.Class({
    extends: cc.Component,

    properties: {
        bg_action:{
            default: null,
            type: cc.Node,
        },

        rewardCup_action:{     //表示升阶
            default: null,
            type: cc.Node,
        },

        rewardLevel_action:{     //表示升大段位
            default: null,
            type: cc.Node,
        },

        reward_cup: {
            default: null,
            type: cc.Node,
        },

        match_level: {
            default: null,
            type: cc.Node,
        },

        share_toggle: {
            default: null,
            type: cc.Node,
        },

    },

    onLoad: function () {
        // this.share_toggle.active = false;
        // this.node.getChildByName("share_label").active = false;

        var windowSize=cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;

        //主界面不显示
        if (this.node.getChildByName("bg"))
        {
            this.node.getChildByName("bg").setContentSize(windowSize);
        }
    },

    init:function(newLevel, nNewScore, myselfWinOrLoseScore, onEnd){
        this.m_totalTime = 25;
        this.m_nNewLevel = newLevel;
        this.m_nNewScore = nNewScore;
        this.m_myselfWinOrLoseScore = myselfWinOrLoseScore;  //当前局的输赢分数

        this.m_onEnd = onEnd;
    },

    playJinBiAct:function(){
        var self = this;
        Resources.playCommonEffect("jinbiyu.mp3");
        var whosTurnNode = this.node.getChildByName("jinbiyu_act");
        var strAniName = 'jinbiyu';
        whosTurnNode.active = true;
        var dragonDisplay = whosTurnNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation(strAniName,1);
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },


    onEnable: function () {
        this.show();
        this.playJinBiAct();
        this.reward_cup.active = false;
        this.match_level.active = false;

        this.rewardCup_action.active = false;
        this.rewardLevel_action.active = false;
        
        var bgDragonDisplay = this.bg_action.getComponent(dragonBones.ArmatureDisplay);
        bgDragonDisplay.playAnimation('beijingguang');

        var data = HallResources.getInstance().getRankAndStarByScore(this.m_nNewScore);
        var levelID = data.cup;     //大段位的ID   1是青铜 2是白银 3是黄金 4是铂金  5是钻石 6是王者


        var preScore = this.m_nNewScore - this.m_myselfWinOrLoseScore;
        var preData = HallResources.getInstance().getRankAndStarByScore(preScore);

        var preLevelID = data.cup;

        if(preLevelID != levelID){
            this.rewardCup_action.active = false;
            this.rewardLevel_action.active = true;

            //表示升段位
            var levelDragonDisplay = this.rewardLevel_action.getComponent(dragonBones.ArmatureDisplay);
            if(levelID == 1){
                console.log("基础段位是青铜段位， 段位计算错误");
            }
            else if(levelID == 2){
                levelDragonDisplay.playAnimation('1_shengbaiyin');
            }
            else if(levelID == 3){
                levelDragonDisplay.playAnimation('2_shenghuangjin');
            }
            else if(levelID == 4){
                levelDragonDisplay.playAnimation('3_shengbojin');
            }
            else if(levelID == 5){
                levelDragonDisplay.playAnimation('4_shengzuanshi');
            }
            else if(levelID == 6){
                levelDragonDisplay.playAnimation('5_shengwangzhe');
            }
            else{
                console.log("段位计算超出段位范围");
            }


            levelDragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.showUpgradeResult, this)
            this.m_levelDragonDisplay = levelDragonDisplay;
        }
        else{
            this.rewardCup_action.active = true;
            this.rewardLevel_action.active = false;

            //表示同段位之间的升阶
            var levelDragonDisplay = this.rewardCup_action.getComponent(dragonBones.ArmatureDisplay);
            if(levelID == 1){
                levelDragonDisplay.playAnimation("Animation1_qingtong")
            }
            else if(levelID == 2){
                levelDragonDisplay.playAnimation('Animation2_baiyin');
            }
            else if(levelID == 3){
                levelDragonDisplay.playAnimation('Animation3_huangjin');
            }
            else if(levelID == 4){
                levelDragonDisplay.playAnimation('Animation4_bojin');
            }
            else if(levelID == 5){
                levelDragonDisplay.playAnimation('Animation5_zuanshi');
            }
            else if(levelID == 6){
                levelDragonDisplay.playAnimation('Animation6_wangzhe');
            }
            else{
                console.log("段位计算超出段位范围");
            }

            levelDragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.showUpgradeResult, this)
            this.m_levelDragonDisplay = levelDragonDisplay;
        }
        
    },

    show: function () {

        var self = this;

        this.m_waitCallback = function(){

            self.m_totalTime -= 1;

            // if(self.m_totalTime < 0){
            //     self.node.active = false;
            // }

            if(self.m_totalTime == 22){
                self.node.getChildByName("game_back").active = true;
                self.node.getChildByName("resume_next_btn").active = true;
            }

        }.bind(this);

        this.schedule(this.m_waitCallback, 1, this.m_totalTime, 0);

    },

    onDisable:function(){

        if(this.m_onEnd){
            this.m_onEnd();
        }
        this.m_levelDragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.showUpgradeResult, this);
    },

    

    showUpgradeResult:function(){

        this.reward_cup.active = true;
        this.match_level.active = true;

        this.rewardCup_action.active = false;
        this.rewardLevel_action.active = false;

        this.setMatchCup();

        this.setMatchLevel();

        this.m_levelDragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.showUpgradeResult, this);
    },


    //设定段位奖杯
    setMatchCup:function(){
        var data = HallResources.getInstance().getRankAndStarByScore(this.m_nNewScore);
        var self = this;
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.reward_cup.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.reward_cup.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                });
            }
        });
    },

    //设定段位等级
    setMatchLevel:function(){
        var data = HallResources.getInstance().getRankAndStarByScore(this.m_nNewScore);
        var nextName = data.rankName;

        this.match_level.getComponent(cc.Label).string = nextName;
    },

    //分享检查
    onShareCheckClicked: function (event) {

        if(this.share_toggle.getComponent(cc.Toggle).isChecked){
            this.m_share = true;
        }
        else{
            this.m_share = false;
        }

        this.node.getChildByName("getReward_btn").getComponent(cc.Button).interactable = this.m_share;
    },

    //领取奖励点击
    onGetRewardClicked: function () {
        var self = this;
        
        if (cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType) {
            self.getReward();
            //主动拉起分享接口
            wx.shareAppMessage({
                title: "距离一个亿的小目标又进了一步！",
                imageUrl: HallResources.upgradeShareImgUrl,
                // success(res) {
                //     console.log("段位晋升分享成功");
                //     self.getReward();
                // },
                // fail(res) {
                //     console.log("段位晋升分享失败!!!");
                // }
            })
        } 
    },


    getReward:function(){
        var myOpenId = WeixinManager.getInstance().userInfo.openid;
        var self = this;
        var callback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data)
                // console.log("段位晋升 ---------jsonObject --------------");
                // console.log(jsonObject);
                var nRetCode = parseInt(jsonObject.RetCode)
                if(nRetCode == 1){
                    Resources.showRewardTips("+" + jsonObject.AwardAmount, true, true);
                }
                else if(nRetCode == 11){    //密码错误
                    Resources.showRewardTips("密码错误", true, true, true);
                }
                else if(nRetCode == 12){    //未满足条件
                    Resources.showRewardTips("未满足条件", true, true, true);
                }
                else if(nRetCode == 13){  //重复领取
                    Resources.showRewardTips("重复领取", true, true, true);
                }
                else{
                    console.log("获取段位晋升奖励失败");
                }

                self.node.active = false;
            }
        }
        require('HallWebRequest').getInstance().getUpgradeRewardOnResult(this.m_nNewLevel, myOpenId, callback);
    },


    //游戏返回按钮点击
    onGameBackClicked:function(){
        this.m_onEnd = null;
        // this.node.active = false;
        G.goldGameReady = null;
        G.matchGameReady = null;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

    //继续闯关点击
    onResumeNextClicked: function () {
        this.m_onEnd = null;
        // this.node.active = false;
        G.matchGameReady = true;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

});
