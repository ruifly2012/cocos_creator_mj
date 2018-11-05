import {TSCommon} from "../../TSCommon";
import {WeixinManager} from "../../weixin/WeixinManager";
var XueLiuGameOverScrollList = cc.Class({
    extends: cc.Component,

    properties: {
        resultItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function() {
        this.m_coinList = new Array();
        this.maxHeight = 0;
         
    },

    start:function() {

    },

    initData:function(cbWriteScoreTimes,stSingleScoreItem,myChair){
        console.log("展示滑动列表内容")
        console.log(cbWriteScoreTimes)
        console.log(stSingleScoreItem)
        var self = this;
        this.content = this.node.getComponent(cc.ScrollView).content;
        self.maxHeight = this.content.height;
        this.content.removeAllChildren();

        for(var i=0; i<cbWriteScoreTimes; i++){
            var item = cc.instantiate(this.resultItem);
            item.parent = this.content;
            item.getComponent("XueLiuHuTypeItem").initData(stSingleScoreItem[i],myChair);  
            var y = -25-i*(item.height + 5); 
            item.setPosition(0,y);
        }
        var newHeight =40+ (this.resultItem.data.height+5) * cbWriteScoreTimes;
        this.content.height = newHeight//(newHeight>self.maxHeight)?self.maxHeight:newHeight;
        
    }
});

module.exports = XueLiuGameOverScrollList;