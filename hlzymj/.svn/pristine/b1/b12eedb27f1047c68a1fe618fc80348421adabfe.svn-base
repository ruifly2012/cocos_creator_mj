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

        match_level_star_bg: cc.Node,

        match_level_star: cc.Node,

        level_progressBar: cc.ProgressBar,

        cur_score: cc.Label,

        changeScore: cc.Label,

        protect_score_icon: cc.Node,

        protect_tips2: cc.Sprite,

        richProgressTips: {
            default: null,
            type: cc.Sprite,
        },

        richProgress: {
            default: null,
            type: cc.RichText,
        },
    },

    onLoad:function(){
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.removeCancelBtn = true;
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
        this.setLevelInfo();
    },

    onDisable:function(){
        this.unschedule(this.m_waitCallback);

        if(this.m_onEnd){
            this.m_onEnd();
        }
    },

    init: function (sn, score, onEnd, nMatchLevel, nMatchScore, myselfWinOrLoseScore) {
        this.m_totalTime = 25;
        this.m_leftTimerStop = false;
        this.m_sn = sn;     //本局的流水号

        this.m_score = score;    //本局结束的分数
        
        this.m_thisViewClosed = false;
        
        // this.node.getChildByName("give_up_protect").active = false;

        this.m_onEnd = onEnd;

        this.m_matchLevel = nMatchLevel;
        this.m_matchScore = nMatchScore;

        this.m_myselfWinOrLoseScore = myselfWinOrLoseScore;
        TSCommon.addEvent(GameCfg.PROTECT_SCORE_SUCCESS, this.onProtectScoreSucceed, this);
    },

    show: function () {

        var self = this;

        this.m_waitCallback = function(){
            if (self.m_leftTimerStop) {
                return;
            }
            self.m_totalTime -= 1;

            if(self.m_totalTime < 0){
                // self.node.active = false;
                //倒计时结束主动离开游戏
                self.onLeaveGameClicked();                
            }

            if(self.m_totalTime == 22){

                // self.node.getChildByName("give_up_protect").active = true;
                // self.cancel_protect_btn.node.active =  self.removeCancelBtn;
                self.node.getChildByName("game_back_btn").active = true;
                self.next_game_btn.node.active = true;
                self.richProgressTips.node.active = true;
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

    setLevelInfo: function () {

        console.log("设定段位信息");

        //段位ID
        var divisionID = this.m_matchLevel;

        //当前段位数据
        var curLevelData = HallResources.getInstance().getRankDataById(divisionID);
        var curMaxScore = curLevelData.MaxScore;
        var curMinScore = curLevelData.MinScore;
        var offsetScore = (curMaxScore - curMinScore);
        console.log("段位的分数区间为：" + offsetScore);

        var curLevelScore = this.m_matchScore - curMinScore;
        var curPercent = curLevelScore / offsetScore
        console.log("当前分数的比率为：" + curPercent);

        var starNum = Math.floor(curLevelScore / offsetScore * 3);
        console.log("当前的星数为：" + starNum);

        //之前的分数
        var preScore = this.m_matchScore - this.m_myselfWinOrLoseScore;
        console.log("之前的段位分数为: " + preScore);

        var preLevelScore = preScore - curMinScore;
        var preRankData = HallResources.getInstance().getRankAndStarByScore(preScore);

        //之前的星数
        var preStarNum = Math.floor(preLevelScore / offsetScore * 3);
        var prePercent = preLevelScore / offsetScore;
        console.log("之前分数的比率为：" + prePercent);
        console.log("之前的星数为：" + preStarNum);

        // this.cur_score.font = this.m_myselfWinOrLoseScore >= 0 ? this.win_score_font : this.lose_score_font;

        var formatNumber = require("Tools").getFormatNumber(preScore);

        formatNumber = formatNumber;

        this.cur_score.string = formatNumber;

        if (this.m_myselfWinOrLoseScore > 0) {
            this.changeScore.string = "+" + this.m_myselfWinOrLoseScore;
        }
        else {
            this.changeScore.string = this.m_myselfWinOrLoseScore;
        }

        var self = this;

        for (var i = 0; i < this.match_level_star.childrenCount; i++) {
            this.match_level_star.children[i].active = false;
        }

        if (preRankData.id == divisionID) {

            self.setCupAndLevelInfo(self.m_matchScore)
            if (starNum > preStarNum) {   //加星了
                for (var i = 0; i < preStarNum; i++) {
                    self.match_level_star.children[i].active = true;
                }

                self.level_progressBar.progress = prePercent
            }
            else if (starNum < preStarNum) {  //掉星了

                //分享保分成功了
                if (self.m_protectedScoreSucceed) {
                    // console.log("掉星时分享保分成功");
                    for (var i = 0; i < preStarNum; i++) {
                        self.match_level_star.children[i].active = true;
                    }
                    // self.level_progressBar.progress = curPercent;
                    self.level_progressBar.progress = prePercent;
                }
                else {
                    // console.log("掉星时分享保分不成功");
                    for (var i = 0; i < preStarNum; i++) {
                        self.match_level_star.children[i].active = true;
                    }
                    self.level_progressBar.progress = prePercent;
                }
            }
            else {
                //表示既没有加星 也没有掉星
                for (var i = 0; i < starNum; i++) {
                    self.match_level_star.children[i].active = true;
                }

                if (self.m_protectedScoreSucceed) {
                    // self.level_progressBar.progress = curPercent;
                    self.level_progressBar.progress = prePercent;
                }
                else {
                    self.level_progressBar.progress = prePercent;
                }
            }
            
        }
        else {


            self.setCupAndLevelInfo(preScore)

            var preLevelData = HallResources.getInstance().getRankDataById(preRankData.id);
            var preMaxScore = preLevelData.MaxScore;
            var preMinScore = preLevelData.MinScore;
            var preOffsetScore = (preMaxScore - preMinScore);
            preLevelScore = preScore - preMinScore;

            preStarNum = Math.floor(preLevelScore / preOffsetScore * 3);
            prePercent = preLevelScore / preOffsetScore;

            for (var i = 0; i < preStarNum; i++) {
                self.match_level_star.children[i].active = true;
            }

            self.level_progressBar.progress = prePercent
        }

        var showResultProgress = function () {
            console.log("之前的段位id为:" + preRankData.id);
            console.log("现在的段位id为：" + divisionID);

            if(self.m_thisViewClosed){
                return;
            }

            if (preRankData.id == divisionID) {

                if (starNum > preStarNum) {   //加星了
                    var onScrollEnded = function () {
                        self.playJiaxingAction(preStarNum, starNum);
                    }
                    self.scrollToPercent(prePercent, curPercent, 0.5, onScrollEnded);
                }
                else if (starNum < preStarNum) {  //减星了
                    //分享保分成功了
                    if (self.m_protectedScoreSucceed) {
                        self.scrollToPercent(curPercent, prePercent, 0.5);
                    }
                    else {
                        var onScrollEnded = function () {
                            self.playDiaoxingAction(preStarNum, starNum);
                        }
                        self.scrollToPercent(prePercent, curPercent, 0.5, onScrollEnded);
                    }
                }
                else {
                    if (self.m_protectedScoreSucceed) {
                        self.scrollToPercent(curPercent, prePercent, 0.5);
                    }
                    else {
                        self.scrollToPercent(prePercent, curPercent, 0.5);
                    }
                }
            }
            else {
                //表示是段位升级了

                var preLevelData = HallResources.getInstance().getRankDataById(preRankData.id);
                var preMaxScore = preLevelData.MaxScore;
                var preMinScore = preLevelData.MinScore;
                var preOffsetScore = (preMaxScore - preMinScore);

                preLevelScore = preScore - preMinScore;
                preStarNum = Math.floor(preLevelScore / preOffsetScore * 3);
                prePercent = preLevelScore / preOffsetScore;

                var onScrollEnded = function () {
                    //播放加星动画
                    var onPlayActionEnded = function () {

                        console.log("加星动画播放完毕");
                        if (self.m_showLevelUpgrade) {

                            var onLevelUpgradeViewClose = function () {

                                //设定奖杯和段位
                                self.setCupAndLevelInfo(self.m_matchScore);

                                for (var i = 0; i < self.match_level_star.childrenCount; i++) {
                                    self.match_level_star.children[i].active = false;
                                }
                                self.level_progressBar.progress = 0;
                            };

                            //展示段位升级界面
                            console.log("展示段位升级界面");
                            self.m_showLevelUpgrade(onLevelUpgradeViewClose);
                        }
                    }

                    self.playJiaxingAction(preStarNum, 3, onPlayActionEnded);
                };
                self.scrollToPercent(prePercent, 1, 0.5, onScrollEnded,true);
            }
           
        }


        var playProtectScoreAction = function () {

            self.protect_score_icon.active = true;
            self.protect_score_icon.setScale(5);

            var preX = self.protect_score_icon.x;
            var preY = self.protect_score_icon.y;

            self.protect_score_icon.x = self.protect_score_icon.x + 50;
            self.protect_score_icon.y = self.protect_score_icon.y + 50;

            var delay = cc.delayTime(0.2);

            var moveTo = cc.moveTo(0.1, cc.p(preX, preY));

            var scaleTo = cc.scaleTo(0.1, 1);

            var spawn = cc.spawn(moveTo, scaleTo);

            var seq = cc.sequence(delay, spawn);

            self.protect_score_icon.runAction(seq);
        }

        //播放胜利或者失败奖章动画
        var playChangeScoreAction = function () {

            if(self.m_thisViewClosed){
                return;
            }


            if (self.m_myselfWinOrLoseScore == 0) {
                self.changeScore.string = "";
                return;
            }

            var playActionTime = 0.5;

            var deltaScore = Math.abs(self.m_myselfWinOrLoseScore);

            //每次改变的分数的数值
            var changed = Math.floor(85 / 2400 * deltaScore);

            if (self.m_myselfWinOrLoseScore <= 0) {
                changed *= -1;
            }

            var deltaTime = playActionTime / (deltaScore / Math.abs(changed));

            //计算后的分数值
            var calcScore = preScore;

            var calcChangeScore = self.m_myselfWinOrLoseScore;

            self.scoreChangeTimer = function () {

                if(self.m_thisViewClosed){
                    return;
                }

                calcScore += changed;

                calcChangeScore -= changed;

                //一帧最大的时间间隔是无限大

                if ((changed > 0 && calcScore > self.m_matchScore) || (changed < 0 && calcScore < self.m_matchScore)) {
                    self.cur_score.string = require("Tools").getFormatNumber(self.m_matchScore);

                    self.changeScore.string = 0;

                    TSCommon.performWithDelay(self, function () {
                        self.changeScore.node.active = false;

                    }, 0.1)

                    self.unschedule(self.scoreChangeTimer);

                    return;
                }

                self.cur_score.string = calcScore;

                self.changeScore.string = calcChangeScore;
            }.bind(self);

            self.schedule(self.scoreChangeTimer, deltaTime, cc.macro.REPEAT_FOREVER, 0)
        }

        //表示本局输了 
        if (this.m_myselfWinOrLoseScore <= 0) {

            // this.cur_score.font = this.lose_score_font;

            this.changeScore.font = this.lose_score_font;

            if (self.m_protectedScoreSucceed) {
                playProtectScoreAction();

                self.changeScore.node.active = false;
            }
            else {
                TSCommon.performWithDelay(this, function () {

                    playChangeScoreAction();

                    showResultProgress();
                }.bind(this), 1);
            }
        }
        
    },

      //滑动列表滑动到某个百分比
      scrollToPercent: function (prePercent, curPercent, scrollTime, onEnd, bolLeaveUp) {
        console.log("滑动时之前比率为：" + prePercent);
        console.log("滑动时当前比率为：" + curPercent);
        var deltaScroll = (curPercent - prePercent) / (scrollTime * 100);
        var self = this;
        Resources.playCommonEffect("moveProgress.mp3");
        var nextLevel = self.m_matchLevel;
        var toNextPercent = 1-curPercent;
        if (bolLeaveUp){
            nextLevel = self.m_matchLevel + 1;
            toNextPercent = 1;
        }
        if (nextLevel<=20){  
            var preLevelData = HallResources.getInstance().getRankDataById(nextLevel);
            var preMaxScore = preLevelData.MaxScore;
            var preMinScore = preLevelData.MinScore;
            var preOffsetScore = (preMaxScore - preMinScore);

            var needProgress = parseInt(preOffsetScore * toNextPercent);
            self.richProgress.string = "<color=#42130a>您当前还差</color><color=#e72c07>"+needProgress+"</color><color=#42130a>积分晋级</color>"
        }
        this.setProgress = function () {

            if(self.m_thisViewClosed){
                return;
            }

            if ((deltaScroll > 0 && (prePercent > curPercent)) || (deltaScroll < 0 && (prePercent < curPercent))) {
                if (onEnd) {
                    onEnd();
                }

                self.unschedule(self.setProgress);
                return;
            }

            prePercent += deltaScroll;
            self.level_progressBar.progress = prePercent;
        }.bind(this);
        this.schedule(this.setProgress, scrollTime / (scrollTime * 100), cc.macro.REPEAT_FOREVER, 0)
    },

    onDestroy: function () {
        this.m_leftTimerStop = true;
        this.m_protectedScoreSucceed = false;

        //停止掉所有定时器
        this.m_thisViewClosed = true;

        this.unschedule(this.setProgress);

        this.unschedule(this.scoreChangeTimer);
        TSCommon.removeEvent(GameCfg.PROTECT_SCORE_SUCCESS, this.onProtectScoreSucceed, this);


        if (this.m_jiaxingdragonDisplay) {
            this.m_jiaxingdragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.onPlayJiaxingFinished, this)
        }

        if (this.m_diaoxingdragonDisplay) {
            this.m_diaoxingdragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.onPlayDiaoxingFinished, this)
        }
    },

    //分享保分成功
    onProtectScoreSucceed: function () {

        console.log("监听到保分成功");
        this.m_protectedScoreSucceed = true;

    },

    //播放加星动画
    playJiaxingAction: function (preStarNum, starNum, onEnd) {
        if (starNum <= preStarNum) {
            return;
        }

        var self = this;
        cc.loader.loadResDir("animation/dragonBones/dh_jiaxing", function (err, assets) {
            if (!err) {
                self.jiaxingAssets = assets;

                var tmpStarNum = preStarNum;
                var playStarAction = function (stars) {

                    var actNode = new cc.Node();
                    var dragonDisplay = actNode.addComponent(dragonBones.ArmatureDisplay);

                    for (var i in self.jiaxingAssets) {
                        if (self.jiaxingAssets[i] instanceof dragonBones.DragonBonesAsset) {
                            dragonDisplay.dragonAsset = self.jiaxingAssets[i];
                        }
                        if (self.jiaxingAssets[i] instanceof dragonBones.DragonBonesAtlasAsset) {
                            dragonDisplay.dragonAtlasAsset = self.jiaxingAssets[i];
                        }
                    }

                    dragonDisplay.armatureName = 'armatureName';
                    dragonDisplay.playAnimation("shengxing");

                    self.onPlayJiaxingFinished = function () {
                        Resources.playCommonEffect("addStar.mp3");
                        self.match_level_star.children[stars].active = true;
                        actNode.destroy();

                        if ((stars + 1) < starNum) {
                            playStarAction(stars + 1);
                        }
                        else {
                            if (onEnd) {
                                onEnd();
                            }
                        }
                    }
                    dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, self.onPlayJiaxingFinished, self)

                    self.m_jiaxingdragonDisplay = dragonDisplay;
                    self.match_level_star_bg.children[stars].addChild(actNode);
                }

                playStarAction(tmpStarNum);
            }
        });
    },

    //播放掉星动画
    playDiaoxingAction: function (preStarNum, starNum, onEnd) {
        if (starNum >= preStarNum) {
            return;
        }

        var self = this;
        cc.loader.loadResDir("animation/dragonBones/dh_diaoxing", function (err, assets) {
            if (!err) {
                self.diaoxingAssets = assets;

                var tmpStarNum = preStarNum;
                var playStarAction = function (stars) {

                    var actNode = new cc.Node();
                    var dragonDisplay = actNode.addComponent(dragonBones.ArmatureDisplay);

                    for (var i in self.diaoxingAssets) {
                        if (self.diaoxingAssets[i] instanceof dragonBones.DragonBonesAsset) {
                            dragonDisplay.dragonAsset = self.diaoxingAssets[i];
                        }
                        if (self.diaoxingAssets[i] instanceof dragonBones.DragonBonesAtlasAsset) {
                            dragonDisplay.dragonAtlasAsset = self.diaoxingAssets[i];
                        }
                    }

                    dragonDisplay.armatureName = 'armatureName';
                    dragonDisplay.playAnimation("diaoxing");
                    self.onPlayDiaoxingFinished = function () {
                        Resources.playCommonEffect("removeStar.mp3");
                        self.match_level_star.children[stars - 1].active = false;
                        actNode.destroy();

                        if (stars - 1 > starNum) {
                            playStarAction(stars - 1);
                        }
                        else {
                            if (onEnd) {
                                onEnd();
                            }
                        }
                    }
                    dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, self.onPlayDiaoxingFinished, self)

                    self.m_diaoxingdragonDisplay = dragonDisplay;
                    self.match_level_star.children[stars - 1].addChild(actNode);
                }

                playStarAction(tmpStarNum)
            }
        });
    },

    //设定奖杯和段位信息
    setCupAndLevelInfo: function (score) {
        var self = this;

        var data = HallResources.getInstance().getRankAndStarByScore(score);
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup" + data.cup, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.cup_icon.spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.cup_icon.spriteFrame = spriteFrame;
                    }
                });
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
                    cc.loader.loadRes("game/matchResult/protect_success_title", cc.SpriteFrame, function (err, spriteFrame) {
                        if (!err) {
                            self.title_icon.spriteFrame = spriteFrame;
                        }
                    });

                    cc.loader.loadRes("game/protectScore/protect_girl_img2", cc.SpriteFrame, function (err, spriteFrame) {
                        if (!err) {
                            self.women_icon.spriteFrame = spriteFrame;
                        }
                    });
                    self.playJinBiAct();
                    self.removeCancelBtn = false;
                    // self.cancel_protect_btn.node.active = false;
                    self.protect_score.node.active = false;
                    self.protect_share_btn.node.active = false;
                    self.next_game_btn.node.active = true;
                    self.richProgressTips.node.active = true;
                    self.richText.node.active = false;
                    self.protect_tips2.node.active = false;

                    self.init(self.m_sn, self.m_score, self.m_onEnd,  self.m_matchLevel, self.m_matchScore,self.m_myselfWinOrLoseScore);
                    self.setLevelInfo();
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

                    cc.loader.loadRes("game/gameOver/shareToGroup", cc.SpriteFrame,function (error, spriteframe)
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
        this.m_onEnd = null;
        G.matchGameReady = true;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

    onLeaveGameClicked: function () {
        this.m_onEnd = null;
        G.goldGameReady = null;
        G.matchGameReady = null;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },
});
