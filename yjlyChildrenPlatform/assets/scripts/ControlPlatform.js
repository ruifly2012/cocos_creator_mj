
var ControlPlatform = cc.Class({
    extends: cc.Component,

    properties: {
        shrinkRank: {
            default: null,
            type: cc.Node,
        },
        extendedRank: {
            default: null,
            type: cc.Node,
        },
        groupdRank: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var self = this;
        //微信开启群分享
        this.groupRankList = new Array();
        this.myOpenId = null;
        this.ticket = "";
    },

    onClickExtendedBtn:function(){
        this.shrinkRank.active = true;
        this.extendedRank.active = false;
        this.groupdRank.active = false;
    },

    onClicShrinkBtn:function(){
        var self = this;
        this.shrinkRank.active = false;
        this.extendedRank.active = true;
        this.groupdRank.active = false;
        // wx.getUserInfo({
        //     openIdList: [self.myOpenId],
        //     lang: 'zh_CN',
        //     fail: function (res) {
                
        //     },
        //     success: function (res) {
        //         console.log("被邀请者的名字"+res.data[0].nickName)
                
        //     }
        // });
    },

    getGroupData:function(){
        var self = this;
        self.groupRankList = new Array();
        //拿到数据并排序
        wx.getGroupCloudStorage({
            shareTicket: self.ticket,
            keyList: ['playerScore'],
            success: function (res) {
                console.log("重新拉取群排行界面----------------")
                console.log(res);
                for (var i = 0;i<res.data.length;i++)
                {
                    var playInfo = [];
                    if(res.data[i].KVDataList[0] == null || res.data[i].KVDataList[0] == undefined){
                        playInfo.playScore = 0;
                    }
                    else{
                        playInfo.playScore = res.data[i].KVDataList[0].value;
                    }
                    
                    playInfo.avatarUrl = res.data[i].avatarUrl;
                    playInfo.nickname = res.data[i].nickname;
                    playInfo.openid = res.data[i].openid;
                    playInfo.rank = i+1;
                    self.groupRankList.push(playInfo);
                }

                var sortFunction = function (stStation1, stStation2){
                    return stStation1.playScore - stStation2.playScore;
                };
                    
                self.groupRankList.sort(sortFunction).reverse();
                if (self.groupRankList.length == 0){
                    console.log("没有群排行信息")
                }
                else{
                    self.groupdRank.getComponent("RankGroupListLayer").initData(self.groupRankList);
                }
            }
        });
    },

    onClickOpenGroupBtn:function(){
        // var self = this;
        this.shrinkRank.active = true;
        this.extendedRank.active = false;
        this.groupdRank.active = true;
        console.log("-------------------------这里创建群排行界面")

        // if (this.groupRankList.length == 0){
            this.getGroupData();
        // }
        // else{
        //     this.groupdRank.getComponent("RankGroupListLayer").initData(self.groupRankList);
        // }
    },

    onCloseGroup:function(){
        this.groupdRank.active = false;
    },


    start:function() {
       
        if(cc.sys.browserType == "mqqbrowser" || "wechatgamesub" == cc.sys.browserType){
            var self = this;     
            
            var showData = function() {
                self.hallRankList = new Array();
                //拉到其他人排行榜相关的数据
                wx.getFriendCloudStorage({
                    keyList: ['playerScore'],
                    success: function (res) {
                        console.log("调用微信接口getFriendCloudStorage获得排行榜玩家");
                        console.log(res);
                        for (var i = 0;i<res.data.length;i++)
                        {
                            var playInfo = [];
                            if(res.data[i].KVDataList[0] == null || res.data[i].KVDataList[0] == undefined){
                                playInfo.playScore = 0;
                            }
                            else{
                                playInfo.playScore = res.data[i].KVDataList[0].value;
                            }
                            
                            playInfo.avatarUrl = res.data[i].avatarUrl;
                            playInfo.nickname = res.data[i].nickname;
                            playInfo.openid = res.data[i].openid;
                            self.hallRankList.push(playInfo);
                        }


                        var sortFunction = function (stStation1, stStation2){
                            return stStation1.playScore - stStation2.playScore;
                        };
                            
                        self.hallRankList.sort(sortFunction).reverse();
                        self.shrinkRank.getComponent("RankShrinkListLayer").initData(self.hallRankList);
                        self.extendedRank.getComponent("RankExtendedListLayer").initData(self.hallRankList,self.myOpenId);
                    },
                    fail:function(res) {
             
                        console.log("调用失败")
     
                        console.log(res)
     
                    },
                });

                // if(!(self.ticket == null || self.ticket == undefined || self.ticket == ""))
                // {
                //     console.log("群排行数据"+self.ticket)
                //     //拿到群的数据
                //     wx.getGroupCloudStorage({
                //         shareTicket: self.ticket,
                //         keyList: ['playerScore'],
                //         success: function (res) {
                //             console.log("下面是群排行的玩家数据")
                //             console.log(res);
                //             for (var i = 0;i<res.data.length;i++)
                //             {
                //                 var playInfo = [];
                //                 if(res.data[i].KVDataList[0] == null || res.data[i].KVDataList[0] == undefined){
                //                     playInfo.playScore = 0;
                //                 }
                //                 else{
                //                     playInfo.playScore = res.data[i].KVDataList[0].value;
                //                 }
                                
                //                 playInfo.avatarUrl = res.data[i].avatarUrl;
                //                 playInfo.nickname = res.data[i].nickname;
                //                 playInfo.openid = res.data[i].openid;
                //                 playInfo.rank = i+1;
                //                 self.groupRankList.push(playInfo);
                //             }

                //             var sortFunction = function (stStation1, stStation2){
                //                 return stStation1.playScore - stStation2.playScore;
                //             };
                                
                //             self.groupRankList.sort(sortFunction).reverse();
                //             this.groupdRank.getComponent("RankGroupListLayer").initData(self.groupRankList);
                //         }
                //     });
                // }
            };

            //子域传递
            wx.onMessage(data =>{
                console.log("获得传递数据，群的ticket是："+data.ticket);
                console.log("获得传递数据，我的openid是："+data.openid);
                this.myOpenId = data.openid;
                this.ticket = data.ticket;
                switch(data.message)
                {
                    case '1':
                        this.onClickExtendedBtn();
                        break;
                    case '2':
                        this.onClicShrinkBtn();
                        break;
                    case '3':
                        this.onClickOpenGroupBtn();
                        break;
                    case '4':
                        //第一次调用1的时候没有拿到myopenid，无法设置我的排行数据，为了再用一次showData()，增加4
                        this.onClickExtendedBtn();
                        showData();
                        break;
                    case '6':
                        this.onClickExtendedBtn();
                        this.shrinkRank.setPositionX(-60);
                        this.extendedRank.setPositionX(-60);
                        showData();
                        break;
                    case '5':
                        this.onCloseGroup();
                    default:
                        break;
                } 
            });
            showData();
                
        } 
        
    }
});

module.exports = ControlPlatform;