
var RankGroupListLayer = cc.Class({
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
    //         this.node.active = false;
    //     }
    // },

    initData:function(data)
    {   
        this.content = this.rankList.getComponent(cc.ScrollView).content;
        this.content.removeAllChildren();
        
        var listData = data;
        if (listData){
            for(var i=0; i<listData.length; i++){
                listData[i].rank = i+1;
                var item = cc.instantiate(this.itemPrefab);
                item.parent = this.content;
                item.getComponent("RankGroupListItem").onInit(listData[i]);
                //.初始化位置
                var x = 0;
                var y = -50-i*95; 
                item.setPosition(x,y);
            }
        
            this.content.height = 32 + 95 * listData.length;
            if (this.content.height < 266){
                this.content.height = 266;
            }
        }
    },

    onClickCloseBtn:function()
    {
        this.node.active = false;
    },

});

module.exports = RankGroupListLayer;