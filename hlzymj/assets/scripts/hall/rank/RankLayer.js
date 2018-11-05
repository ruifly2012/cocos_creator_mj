
var RankExtendedListLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Node,
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
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
            this.node.active = false;
            this.node.parent.parent.getComponent("HallPlatformInfo").onClickExtendedBtn();
        }
    },

    initData:function(data,myOpenId)
    {   
        // var self = this;
        // this.content = this.rankList.getComponent(cc.ScrollView).content;
        // this.content.removeAllChildren();

        // var listData = data;
        // for(var i=0; i<listData.length; i++){
        //     listData[i].rank = i+1;
        //     var item = cc.instantiate(this.itemPrefab);
        //     item.parent = this.content;
        //     item.getComponent("RankExtendedListItem").onInit(listData[i]);
        //     //.初始化位置
        //     var x = 0;
        //     var y = -70-i*93; 
        //     item.setPosition(x,y);
        //     if (myOpenId == listData[i].openid)
        //     {

        //         this.myCount.string = "局数："+listData[i].playScore;
        //         this.myName.string = listData[i].nickname;
        //         var imgurl=listData[i].avatarUrl+"?aaa=aa.jpg";
        //         this.myRank.string = listData[i].rank;
        //         cc.loader.load(imgurl, function(err, texture){
        //             self.myIcon.spriteFrame = new cc.SpriteFrame(texture);
        //             self.myIcon.node.setScale(0.53);
        //         });
        //     }
        // }

    },

});

module.exports = RankExtendedListLayer;