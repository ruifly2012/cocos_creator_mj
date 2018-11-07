
var RankExtendedListLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Node,
        },
        rankList: {
            default: null,
            type: cc.ScrollView,
        },
        itemPrefab:{
            default: null,
            type: cc.Prefab,
        },
        myName:{
            default: null,
            type: cc.Label,
        },
        myScore:{
            default: null,
            type: cc.Label,
        },
        myCount:{
            default: null,
            type: cc.Label,
        },
        myRank:{
            default: null,
            type: cc.Label,
        },
        myIcon:{
            default: null,
            type: cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    // onTouch: function (event) {
    //     var poisition = event.touch.getLocation();
    //     var locationInNode = this.bg.convertToNodeSpace(poisition);
    //     var s = this.bg.getContentSize();
    //     var rect = cc.rect(0, 0, s.width, s.height);
    //     if (cc.rectContainsPoint(rect, locationInNode)) {
    //         // this.node.active = true;
    //     }
    //     else {
    //         event.stopPropagation();
    //         // this.node.active = false;
    //         this.node.parent.getComponent("ControlPlatform").onClickExtendedBtn();
    //     }
    // },

    initData:function(data,myOpenId)
    {   
        var self = this;
        this.content = this.rankList.getComponent(cc.ScrollView).content;
        this.content.removeAllChildren();

        var listData = data;
        for(var i=0; i<listData.length; i++){
            listData[i].rank = i+1;
            var item = cc.instantiate(this.itemPrefab);
            item.parent = this.content;
            item.getComponent("RankExtendedListItem").initView(listData[i]);
            //.初始化位置
            var x = 0;
            var y = -70-i*93; 
            item.setPosition(x,y);
            if (myOpenId == listData[i].openid)
            {

                this.myCount.string = "胜局数："+listData[i].playScore;
                this.myName.string = this.cutString(listData[i].nickname,100,24,this.myName.node);
                var imgurl=listData[i].avatarUrl+"?aaa=aa.jpg";
                this.myRank.string = listData[i].rank;
                cc.loader.load(imgurl, function(err, texture){
                    self.myIcon.spriteFrame = new cc.SpriteFrame(texture);
                    // self.myIcon.node.setScale(0.53);
                });
            }
        }

        this.content.height = 50 + 93 * listData.length;
        if (this.content.height < 476){
            this.content.height = 476;
        }
    },
    cutString:function(str, maxWidth, fontSize, parent){
        var splitStr = str.split("")
        var node = new cc.Node();
        parent.addChild(node)
    
        var label = node.addComponent(cc.Label);
        label.fontSize = fontSize;
        label.string = "...";
        var lastStrWidth = node.width;       //最后三个...号的宽度
        var i = 0;
        var isOverMaxWidth = false;          //是否超过了最大超度
        var countLength = 0;
        var resultStr = "";
        while(i < splitStr.length && !isOverMaxWidth){
            label.string = splitStr[i];
            if(lastStrWidth + countLength + node.width < maxWidth){
                countLength += node.width
                resultStr += splitStr[i]; 
            }
            else{
                isOverMaxWidth = true;
            }
            i += 1;
        }
        if(isOverMaxWidth){
            resultStr += "..." 
        }
    
        node.destroy();
        return resultStr;
    },

});

module.exports = RankExtendedListLayer;