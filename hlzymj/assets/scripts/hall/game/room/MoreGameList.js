var HallResources = require("HallResources")
var MoreGameList = cc.Class({
    extends: cc.Component,
    properties: {
        moreItem: cc.Prefab,
    },

    onLoad:function() {
        // this.initData();
    },

    initData:function(gameList,hot,changwan) {
        this.content = this.node.getComponent(cc.ScrollView).content;
        this.content.removeAllChildren();
        this.maxHeight = this.content.height;
        this.newWidth = this.content.width;
        
        console.log("下面是游戏列表：-----------------------------")
        console.log(gameList)
        //做个限制，目前仅显示血流和期待
        // var tbList = [];
        // for (var i = 0;i <gameList.length;i++)
        // {
        //     if ("xueliu" == gameList[i].m_sEn)
        //     {
        //         tbList[0] = gameList[i]
        //     }
        // }
        // tbList[2] = {
        //     m_iId:null,
        //     m_iIv:1,
        //     m_iPort:8109,
        //     m_sCn:"敬请期待",
        //     m_sDir:"http://edongtest.ss2007.com/xueliu3/",
        //     m_sEn:"jqqd",
        //     m_sServeIp:"h5.ss2007.com",
        //     m_sVersion:"1.0.5",
        //     m_sWr:"https://h5.ss2007.com:444/xueliu/",
        // }
        for(var i=0; i<gameList.length; i++){
            var item = cc.instantiate(this.moreItem);
            item.parent = this.content;
            item.getComponent("MoreGameListItem").initData(gameList[i],hot,changwan);      
            //.初始化位置
            var x = -500 + (i)%3 * 335;
            var y = -140-Math.floor((i)/3)*250; 
            console.log("x =========="+x+"y============"+y)
            item.setPosition(x,y);
        }

        var newHeight = (this.moreItem.data.height+5) * Math.ceil(gameList.length/3);
        this.content.height = (newHeight>this.maxHeight)?this.maxHeight:newHeight;
        var newWidth = (this.moreItem.data.width+5) * (gameList.length%3);
        this.content.width = (newWidth>this.maxHeight)?this.maxHeight:newWidth;
    },
});
module.exports = MoreGameList;