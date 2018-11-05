var CupScrollList = cc.Class({
    extends: cc.Component,

    properties: {
        cupItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function() {
        this.m_coinList = new Array();
        
        //.初始化数据
        this.initData();
        this.maxHeight = 0;
         
    },

    start:function() {

    },

    // update (dt) {},
    
    //.生成假数据（自己按需生成）
    initData:function(){
        this.content = this.node.getComponent(cc.ScrollView).content;
        this.content.removeAllChildren();
        for(var i=0; i<6; i++){
            var item = cc.instantiate(this.cupItem);
            item.parent = this.content;
            item.getComponent("NewSeasonRankItem").initData(i);    
            var y = -55 -i*(110); 
            item.setPosition(0,y);
        }

        var newHeight = 660;
        this.content.height = newHeight;
        
    }
});

module.exports = CupScrollList;