/**
 * 此处结算界面为段位赛的结算界面
 */
var GameDefs = require("GameDefs");
var Resources = require("Resources");
import { TSCommon } from "../../TSCommon";
var HallResources = require("HallResources");
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {
        match_title: {
            default: null,
            type: cc.Node,
        },

        match_cup: {
            default: null,
            type: cc.Node,
        },

        match_level: {
            default: null,
            type: cc.Node,
        },

        match_level_star_bg: {
            default: null,
            type: cc.Node,
        },

        match_level_star: {
            default: null,
            type: cc.Node,
        },

        level_progressBar: {
            default: null,
            type: cc.ProgressBar,
        },

        back_Btn: {
            default: null,
            type: cc.Button,
        },

        richProgressTips: {
            default: null,
            type: cc.Sprite,
        },

        richProgress: {
            default: null,
            type: cc.RichText,
        },

        protect_score_icon: cc.Node,

        cur_score: cc.Label,

        changeScore: cc.Label,

        lose_score_font: cc.Font,

        win_score_font: cc.Font,

        continue_win_counts: cc.Label,

        richTips: cc.RichText,

        share_btn:cc.Button,

        next_btn:cc.Button,

        share_tips2: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;

        //主界面不显示
        if (this.node.getChildByName("mask_bg")) {
            this.node.getChildByName("mask_bg").setContentSize(windowSize);
        }
        this.bolShareDouble = true;
        this.getShareDoubleTimes();
    },

    getShareDoubleTimes:function(){
        var self = this;
        var onRetCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                var hasTimes = jsonObject.TotalTimes - jsonObject.CurTimes;
                self.richTips.string = "<color=#ffffff>您目前还有</color><color=#e72c07>"+hasTimes+"</color><color=#ffffff>次积分翻倍的机会</color>"
                if(parseInt(jsonObject.CurTimes) >= parseInt(jsonObject.TotalTimes)){
                    
                    self.bolShareDouble = false;
                    
                    cc.loader.loadRes("game/gameOver/shareToGroup", cc.SpriteFrame,function (error, spriteframe)
                    {
                        if (!error) {
                            self.share_btn.node.getComponent(cc.Sprite).spriteFrame = spriteframe;
                        
                        }
                    });
                }
            }
        }
        require('HallWebRequest').getInstance().getDoubleScoreGetInfo(onRetCallback)
    },

    /*
     * 初始化
     * @huType 胡牌类型 
     * @fanNum 胡牌番数
     * @laiyouValue 癞油字的牌值
    */
    init: function (bIsLiuju, huType, fanNum, laiyouValue, showDetailResult, nMatchLevel, nMatchScore, myselfWinOrLoseScore, winCount,sn) {
        this.m_totalTime = 60;
        this.m_sn = sn;     //本局的流水号
        this.m_bIsLiuju = bIsLiuju;
        this.m_huType = huType;
        this.m_fanNum = fanNum;
        this.m_laiyouValue = laiyouValue;
        this.m_showDetailResult = showDetailResult;
        this.m_matchLevel = nMatchLevel;
        this.m_matchScore = nMatchScore;

        this.m_myselfWinOrLoseScore = myselfWinOrLoseScore;

        //连胜场数
        this.m_winCount = winCount;

        this.m_leftTimerStop = false;

        this.m_thisViewClosed = false;

        TSCommon.addEvent(GameCfg.PROTECT_SCORE_SUCCESS, this.onProtectScoreSucceed, this);
    },

    onEnable: function () {
        this.show();

        this.continue_win_counts.node.active = false;
        this.continue_win_counts.node.parent.active = false;
        this.protect_score_icon.active = false;
        this.continue_win_counts.string = this.m_winCount;

        // this.startLeftTimer();

        var winSize = cc.director.getWinSize();
        var self = this;
        var playDropAction = function () {

            var preX = self.match_title.x;
            var preY = self.match_title.y;
            self.match_title.x = preX;
            self.match_title.y = winSize.height / 2 + self.match_title.height / 2 + 20;

            var drop = cc.moveTo(0.1, cc.p(preX, preY - 30));

            var up = cc.moveTo(0.2, cc.p(preX, preY + 30));

            var moveToDes = cc.moveTo(0.3, cc.p(preX, preY));

            var seq = cc.sequence(drop, up);

            self.match_title.runAction(seq);
        }


        if (this.m_bIsLiuju) {

            this.loadTitleRes("result_liuju_title", playDropAction);
        }
        else {
            if (this.m_myselfWinOrLoseScore <= 0) {

                this.loadTitleRes("result_lose_title", playDropAction);

                cc.loader.loadRes("game/gameOver/shareToGroup", cc.SpriteFrame,function (error, spriteframe)
                    {
                        if (!error) {
                            self.share_btn.node.getComponent(cc.Sprite).spriteFrame = spriteframe;
                        
                        }
                    });
            }
            else {

                this.loadTitleRes("result_win_title", playDropAction);
            }
        }

        this.setLevelInfo();

        var HallResources = require("HallResources");
        HallResources.recordPlayerLogToServer(HallResources.recordList.count_page);
    },


    onDestroy: function () {
        this.m_protectedScoreSucceed = false;

        //停止掉所有定时器
        this.m_thisViewClosed = true;

        this.stopLeftTimer();

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


    //设定段位升级的回调
    setShowLevelUpgrade: function (showLevelUpgrade) {
        console.log("设定段位升级显示");
        this.m_showLevelUpgrade = showLevelUpgrade;
    },

    loadTitleRes: function (titleResName, onEnd) {

        var self = this;
        cc.loader.loadRes("game/matchResult/" + titleResName, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.match_title.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                if (onEnd) {
                    onEnd();
                }
            }
        });
    },

    shareToGroup:function(){
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            wx.shareAppMessage({
                title: "血流换三张，本群谁能与我一战！",
                imageUrl: HallResources.groupShareImgUrl,
            })
        }
        

        var self = this;
        var onRetCallback = function(success, data){
            require('HallResources').getInstance().removeLoading();
            if(success){
                var jsonObject = JSON.parse(data);
                var retcode = jsonObject.RetCode;
                if (retcode == 1){
                    Resources.showRewardTips("分享双倍成功", true, true, true);
                    self.share_btn.node.active = false;
                    self.richTips.node.active = false;
                    self.share_tips2.node.active = false;
                    var newRankData = HallResources.getInstance().getRankAndStarByScore(jsonObject.NowScore);
                    self.init(false, null, null, null, null, self.m_matchLevel, jsonObject.NowScore, self.m_myselfWinOrLoseScore, self.m_winCount, self.m_sn);
                    self.m_showLevelUpgrade = function(onLevelUpgradeClosed){
                        var upgradelevelLayer = self.node.parent.getComponent("DeskScene").levelUpgradeLayer.getComponent("UpgradeLevelLayer");
                        upgradelevelLayer.init(newRankData.id, jsonObject.NowScore, self.myselfWinOrLoseScore, onLevelUpgradeClosed);
                        self.node.parent.getComponent("DeskScene").levelUpgradeLayer.active = true;
                    }

                    self.setLevelInfo();
                }
                else if(retcode == 11) {
                    console.log("次数不足");
                    Resources.showRewardTips("您分享双倍的机会已经用尽", true, true, true);
                }
                else if(retcode == 12) {
                    console.log("参数错误");
                }
                else if(retcode == 13) {
                    console.log("分数不为正");
                }
                self.getShareDoubleTimes()
            }
        }
        if (this.bolShareDouble){
            console.log("进入分享翻倍功能")
            require('HallWebRequest').getInstance().getGetDoubleScoreAward(onRetCallback,this.m_sn);
        }
        else{
            Resources.showRewardTips("您分享双倍的机会已经用尽", true, true, true);
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
            this.richTips.node.active = false;
            this.share_tips2.node.active = false;
            this.changeScore.string = this.m_myselfWinOrLoseScore;
            this.back_Btn.node.active = true;
            this.richProgressTips.node.active = true;
            this.next_btn.node.active = true;

            if (this.m_myselfWinOrLoseScore == 0) {
                var nextLevel = this.m_matchLevel;
                var toNextPercent = 1-curPercent;
                var preLevelData = HallResources.getInstance().getRankDataById(nextLevel);
                var preMaxScore = preLevelData.MaxScore;
                var preMinScore = preLevelData.MinScore;
                var preOffsetScore = (preMaxScore - preMinScore);

                var needProgress = parseInt(preOffsetScore * toNextPercent);
                this.richProgress.string = "<color=#42130a>您当前还差</color><color=#e72c07>"+needProgress+"</color><color=#42130a>积分晋级</color>"
        
            }
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

        //播放连胜动画
        var playWinsAction = function () {
            var winsIconNode = self.continue_win_counts.node.parent;

            winsIconNode.active = true;
            self.continue_win_counts.node.active = true;
            winsIconNode.setScale(5);

            var preX = winsIconNode.x;
            var preY = winsIconNode.y;

            winsIconNode.x = winsIconNode.x + 50;
            winsIconNode.y = winsIconNode.y + 50;

            var delay = cc.delayTime(0.2);

            var moveTo = cc.moveTo(0.1, cc.p(preX, preY));

            var scaleTo = cc.scaleTo(0.1, 1);

            var spawn = cc.spawn(moveTo, scaleTo);

            var seq = cc.sequence(delay, spawn);

            winsIconNode.runAction(seq);
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

                        if (self.m_winCount > 1) {
                            playWinsAction();
                        }

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
        else {

            // this.cur_score.font = this.win_score_font;

            this.changeScore.font = this.win_score_font;

            //表示本局赢了  但并不是连胜
            if (this.m_winCount == 1 || this.m_winCount == 0) {

                TSCommon.performWithDelay(this, function () {

                    playChangeScoreAction();

                    showResultProgress();
                }.bind(this), 1);
            }

            //表示连胜
            else if (this.m_winCount > 1) {

                TSCommon.performWithDelay(this, function () {

                    playChangeScoreAction();

                    showResultProgress();
                }.bind(this), 1);
            }
        }
        
    },

    show: function () {

        var self = this;

        this.m_waitCallback = function(){
            if (self.m_leftTimerStop) {
                return;
            }
            self.m_totalTime -= 1;
            if(self.m_totalTime < 0){
                self.node.active = false;
                //倒计时结束主动离开游戏
                self.onLeaveGameClicked();                
            }

            if(self.m_totalTime == 57){
                self.back_Btn.node.active = true;
                self.richProgressTips.node.active = true;
                self.next_btn.node.active = true;
            }

        }.bind(this);

        this.schedule(this.m_waitCallback, 1, this.m_totalTime, 0);

    },

    //设定奖杯和段位信息
    setCupAndLevelInfo: function (score) {
        var self = this;

        var data = HallResources.getInstance().getRankAndStarByScore(score);
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup" + data.cup, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.match_cup.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.match_cup.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                });
            }
        });

        var nextName = data.rankName;
        this.match_level.getComponent(cc.Label).string = nextName;
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

    //分享保分成功
    onProtectScoreSucceed: function () {

        console.log("监听到保分成功");
        this.m_protectedScoreSucceed = true;

    },

    setProtectScoreSuccess: function () {
        this.m_protectedScoreSucceed = true;
    },


    getLeftLeaveTime: function () {
        return this.m_totalTime;
    },

    stopLeftTimer: function () {
        this.m_leftTimerStop = true;
    },

    onLeaveGameClicked: function () {
        G.goldGameReady = null;
        G.matchGameReady = null;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

    onDetailResultClicked: function () {
        if (this.m_showDetailResult) {
            this.m_showDetailResult();
        }
    },

    onPrepareClicked: function () {
        G.matchGameReady = true;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
    },

});
