
import {WeixinManager} from "../../../hall/weixin/WeixinManager";
import {TSCommon} from "../../TSCommon";
var HallResources = require("HallResources");
var inviteFriendLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        getRewardBtn: {
            default: null,
            type: cc.Button,
        },
        getRewardGrayBtn: {
            default: null,
            type: cc.Button,
        },
        inviteBtnPrefab:{
            default: null,
            type: cc.Prefab,
        },
        startTime: {
            default: null,
            type: cc.Label,
        },
        endTime: {
            default: null,
            type: cc.Label,
        },
        hasGet: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.inviteCount = 0;
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

    initData:function(data)
    {   
        this.startTime.string = data.startTime;
        this.endTime.string = data.endTime;
        
    },

    initFriendData:function(data)
    {
        var self = this;
        this.imageUrl = data.img;
        var tbData = [];
        tbData[0] = [];
        tbData[1] = [];
        tbData[2] = [];
        tbData[0].x = -330;
        tbData[0].y = 40;
        tbData[1].x = -145;
        tbData[1].y = -20;
        tbData[2].x = 25;
        tbData[2].y = 80;
        var bGetGift = false;
        var openIdFriendList = "";
        self.openIdFriendData = [];
        self.myOpenId = "";
        for (var i = 0;i < data.length;i++){
            if(data[i].InviteeOpenID == "undefined" || data[i].InviteeOpenID == null || data[i].InviteeOpenID == ""){
                //如果没有被邀请的好友的openID,说明不需要去拿到好友头像，而且按钮需要分享功能
                tbData[i].callbackFunc = function(){
                    console.log("点击第"+i+"个");
                    self.shareToFriend();
                };
            }else{
                self.myOpenId = data[i].InviterOpenID;
                if (openIdFriendList == "")
                {
                    openIdFriendList = data[i].InviteeOpenID;
                }else{
                    openIdFriendList = openIdFriendList + "," + data[i].InviteeOpenID;
                }
                
                //有邀请好友ID，并且没有领取过
                bGetGift = bGetGift || (data[i].IsInviterGift == 0);
                if (data[i].IsInviterGift == 0){
                    self.openIdFriendData.push(data[i].InviteeOpenID)
                }
            }
            tbData[i].gold = data[i].InviterGiftAmount;
            
        }
        
        
        self.data = data;
        self.tbData = tbData;

        var fun = function(bolSuccess,data){
            if (bolSuccess) {
                if (bolSuccess) {
                    HallResources.getInstance().removeLoading();
                    var jsonObject = JSON.parse(data)
                    // console.log("-----------------WxUserInfoGet.aspx返回数据----------------------------")
                    // console.log(jsonObject)
                    for (var i = 0;i<jsonObject.table.length;i++)
                    {
                        var headUrl = jsonObject.table[i].WxFaceUrl + "?aaa=aa.jpg";
                        self.tbData[i].imgurl = headUrl;
                    }
                }
            }
            for (var i = 0;i<self.data.length;i++)
            {
                var invitePrefab = cc.instantiate(self.inviteBtnPrefab);
                invitePrefab.parent = self.bg;
                invitePrefab.getComponent("inviteFriendItem").initData(self.tbData[i]);   
                invitePrefab.setPosition(self.tbData[i].x,self.tbData[i].y); 
            }
        }
        console.log("被邀请者的id列表"+openIdFriendList)
        require('HallWebRequest').getInstance().getWxUserInfo(openIdFriendList,fun);

        if(bGetGift){
            //按钮设置为可以点击
            self.getRewardGrayBtn.node.active = false;
            self.getRewardBtn.node.active = true;
        };
    },

    start: function () {

    },

    clickGetRewardBtn:function (){

        require("HallControl").getInstance().requestTableInfo();
        var self = this;
        var callFunc = function(bolSuccess,data){
            if (bolSuccess) {
                if (bolSuccess) {
                    HallResources.getInstance().removeLoading();
                    var jsonObject = JSON.parse(data)
                    // console.log("-----------------WxUserInfoGet.aspx返回数据----------------------------")
                    // console.log(jsonObject)
                    if (jsonObject.RetCode == 1){
                        self.openIdFriendData.shift()
                        if (self.openIdFriendData.length == 0){
                            self.getRewardGrayBtn.node.active = true;
                             self.getRewardBtn.node.active = false;
                        }
                        var goldData = require("HallControl").getInstance().getPublicUserInfo().nGold
                        require("HallControl").getInstance().getPublicUserInfo().nGold = parseInt(jsonObject.AwardAmount) + parseInt(goldData);
    
                        TSCommon.dispatchEvent(HallResources.onGoldOrDiamondChanged,true);
                        TSCommon.dispatchEvent(HallResources.onShowFlyMessage,["+"+jsonObject.AwardAmount,"texture/hallRes/roomInfo/gold"]);
                    }
                    else if(jsonObject.RetCode == 11) {
                        console.log("没有邀请关系");
                    }
                    else if(jsonObject.RetCode == 12) {
                        console.log("重复领取");
                    }
                    else if(jsonObject.RetCode == 13) {
                        console.log("领奖账户不存在");
                    }
                }
            }
        }
        if (self.openIdFriendData.length > 0){
            require('HallWebRequest').getInstance().getWxInviteAwardGetAward(self.myOpenId,self.openIdFriendData[0],callFunc);
        }
    },

    shareToFriend:function (){
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            //主动拉起分享接口
            var myopenId = WeixinManager.getInstance().userInfo.openid;
                wx.shareAppMessage({
                    query: "inviteOpenId="+myopenId,
                    title: "带你装逼带你飞，要跟我一起来赚钱吗？",
                    imageUrl: HallResources.shareImgUrl,
                    success(res){
                        console.log("转发成功!!!")
                    },
                    fail(res){
                        console.log("转发失败!!!")
                    } 
                })
        }
    },

    clickSummonFriendsBtn:function (){
        wx.shareAppMessage({
            query: "inviteOpenId="+myopenId,
            title: "带你装逼带你飞，要跟我一起来赚钱吗？",
            imageUrl: HallResources.shareImgUrl,
            success(res){
                console.log("转发成功!!!");
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail(res){
                console.log("转发失败!!!");
            } 
        });
    },

    clickCloseBtn: function () {
        HallResources.getInstance().playCloseEffect();
        // this.node.active = false;
        this.closeAndChangeScaleAction();
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

    setHasGetDesk:function(bol){
        this.hasGet.active = bol;
    },
    // update (dt) {},
});

module.exports = inviteFriendLayer;