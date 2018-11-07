
var RankShrinkListLayer = cc.Class({
    extends: cc.Component,

    properties: {
        rankList: {
            default: null,
            type: cc.ScrollView,
        },
        itemPrefab:{
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onTouch: function (event) {
        // var poisition = event.touch.getLocation();
        // var locationInNode = this.bg.convertToNodeSpace(poisition);
        // var s = this.bg.getContentSize();
        // var rect = cc.rect(0, 0, s.width, s.height);
        // if (cc.rectContainsPoint(rect, locationInNode)) {
        //     // this.node.active = true;
        // }
        // else {
        //     this.node.active = false;
        // }
    },

    initData:function(data)
    {   
        this.content = this.rankList.getComponent(cc.ScrollView).content;
        this.content.removeAllChildren();
        var listData = data;
        for(var i=0; i<listData.length; i++){
            listData[i].rank = i+1;
            var item = cc.instantiate(this.itemPrefab);
            item.parent = this.content;
            item.getComponent("RankShrinkListItem").onInit(listData[i]);
            //.初始化位置
            var y = -72-i*102; 
            item.setPositionY(y);
        }

        this.content.height = 32 + 102 * listData.length;
        if (this.content.height < 435){
            this.content.height = 435;
        }
    },

});

module.exports = RankShrinkListLayer;