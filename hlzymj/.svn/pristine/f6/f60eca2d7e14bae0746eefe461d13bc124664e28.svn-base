import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var ConsecutiveVictoriesLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        showWinPrefab:{
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
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
            // this.node.active = false;
            this.closeAndChangeScaleAction();
        }
    },

    initData:function(data)
    {
        this.bg.getChildByName("list").removeAllChildren();
        var nowProgressingIndex = 0;
        for(var i = 0;i<data.length;i++)
        {
            if ((data[i].CanAward == 0)){
                nowProgressingIndex = i;
                break;
            }
        }
        if ((nowProgressingIndex == 0)&&(data[data.length-1].CanAward == 1))
        {
            //目的是搞一个读取不到的数来阻止显示当前进度
            nowProgressingIndex = data.length;
        }
        for(var i = 0;i<data.length;i++)
        {
            var item = cc.instantiate(this.showWinPrefab);
            item.getComponent("ConsecutiveVictoriesItem").initData(data[i]);
            
            if (i==nowProgressingIndex){
                //显示正在进行中
                item.getComponent("ConsecutiveVictoriesItem").setProgressing(true);
            } 
            item.parent = this.bg.getChildByName("list");
            var offsetY = 100;
            //.初始化位置
            var y = 70-i * offsetY;
            item.setPosition(0,y);
        }
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


    clickCloseBtn: function () {
        HallResources.getInstance().playCloseEffect();
        // this.node.active = false;
        this.closeAndChangeScaleAction();
    },

    // update (dt) {},
});

module.exports = ConsecutiveVictoriesLayer;