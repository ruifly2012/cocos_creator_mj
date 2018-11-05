import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
import {WeixinManager} from "../../../hall/weixin/WeixinManager";
var ConsecutiveVictoriesRewardLayer = cc.Class({
    extends: cc.Component,

    properties: {
        playerName: {
            default: null,
            type: cc.Label,
        },
        playerTime: {
            default: null,
            type: cc.Label,
        },
        playerHead: {
            default: null,
            type: cc.Sprite,
        },
        winCount: {
            default: null,
            type: cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },


    initData:function(winCount)
    {
        var self = this;
        this.winAddCount = winCount
        cc.loader.loadRes("texture/activityRes/consecutiveVictories/winCount_"+winCount,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.winCount.spriteFrame = spriteFrame;
            }
        });

        var weixinUserInfo = WeixinManager.getInstance().userInfo;
        if(weixinUserInfo && weixinUserInfo.avatarUrl){
            var imgurl=weixinUserInfo.avatarUrl+"?aaa=aa.jpg";
            cc.loader.load(imgurl, function(err, texture){
                self.playerHead.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        var publicUserInfo = require("HallControl").getInstance().getPublicUserInfo();
        this.playerName.string = publicUserInfo.nickName;

        var testDate = new Date();
        var time = testDate.toLocaleString( ); //获取日期与时间
        this.playerTime.string = time;
    },

    onClickSharetBtn:function(){
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
        self.closeLayer();
    },

    onClickNextBtn:function(){
        this.closeLayer();
    },

    closeLayer:function()
    {
        this.node.active = false;
    },

    // update (dt) {},
});

module.exports = ConsecutiveVictoriesRewardLayer;