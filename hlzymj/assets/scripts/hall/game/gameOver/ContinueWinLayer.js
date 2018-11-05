//连胜分享界面
import { WeixinManager } from "../../weixin/WeixinManager";

var Resources = require("Resources");
var HallResources = require("HallResources");
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,

        winCountsIcon: cc.Sprite,

        playerAvator: cc.Sprite,

        playerName: cc.Label,

        time: cc.Label,
    },



    onLoad: function () {

        var self = this;
        if (require("HallUtils").isIPhoneX()) {
            cc.loader.loadRes("texture/activityRes/consecutiveVictories/consecutiveVictoriesBg_iphoneX", cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.bg.spriteFrame = spriteFrame;
                }
            })
        }
        else {
            cc.loader.loadRes("texture/activityRes/consecutiveVictories/consecutiveVictoriesBg", cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    self.bg.spriteFrame = spriteFrame;
                }
            })
        }
    },


    init: function (winCounts, onEnd) {
        this.m_winCounts = winCounts;

        this.m_onEnd = onEnd;
    },

    onEnable: function () {
        this.setWinCounts();

        this.setPlayerInfo();
    },

    onDisable: function () {
        if (this.m_onEnd) {
            this.m_onEnd();
        }
    },


    setWinCounts: function () {

        var self = this;
        cc.loader.loadRes("texture/activityRes/consecutiveVictories/winCount_" + this.m_winCounts, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.winCountsIcon.spriteFrame = spriteFrame;
            }
        });
    },

    setPlayerInfo: function () {

        var self = this;
        var wxUserInfo = WeixinManager.getInstance().userInfo;
        if (wxUserInfo && wxUserInfo.avatarUrl) {
            var imgurl = wxUserInfo.avatarUrl
            cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                self.playerAvator.spriteFrame = new cc.SpriteFrame(texture);
            });
        }


        //设置用户名

        // this.playerName.string = this.m_playerInfo.getUserName();

        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        this.playerName.string = publicUserInfo.nickName;

        var date = new Date();

        var curTime = date.toLocaleString();

        this.time.string = curTime;
    },


    onShareBtnClicked:function(){
        var self = this;
        var shareLabel = ""
        var winShareImgUrl = ""
        if (self.winAddCount == 3){
            winShareImgUrl = HallResources.shareWin_3;
            shareLabel = "这游戏太容易赢了，现在的小姐姐都不思考怎么出牌吗？"
        }else if (self.winAddCount == 5){
            winShareImgUrl = HallResources.shareWin_5;
            shareLabel = "厉害了我的哥！"
        }else if (self.winAddCount == 7){
            winShareImgUrl = HallResources.shareWin_7;
            shareLabel = "七杀不会必死吧？"
        }else if (self.winAddCount == 8){
            winShareImgUrl = HallResources.shareWin_9;
            shareLabel = "道友，你已渡劫成功！"
        }

        wx.shareAppMessage({
            title: shareLabel,
            imageUrl: winShareImgUrl,
            // success(res){
            //     console.log("转发成功!!!")
            //     if(res.shareTickets == null || res.shareTickets == undefined || res.shareTickets == ""){ //没有群信息，说明分享的是个人
            //         TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["请分享到群聊"]);
            //     }else{ //有群信息
            //         console.log("下面是群消息数据!!!")
            //         console.log(res);
            //         self.closeLayer();
            //     }
            // },
            // fail(res){
            //     console.log("转发失败!!!")
            // } 
        })

        self.node.active = false;
       
    },

    //继续游戏按钮点击效果
    onResumeBtnClicked: function () {
        this.node.active = false;

    },
});
