
var RankGroupListLayer = cc.Class({
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
            wx.postMessage({
                message:'5',
                ticket:"",
                openid:"",
            });
            // this.node.parent.parent.getComponent("HallPlatformInfo").onClickExtendedBtn();
        }
    },

    initData:function(data)
    {   
        
    },

    onClickCloseBtn:function()
    {
        require('HallResources').getInstance().playCloseEffect();
        this.node.active = false;
        wx.postMessage({
            message:'5',
            ticket:"",
            openid:"",
        });
    },

    onClickChangeGroupBtn:function()
    {
        var self = this;
        self.node.parent.parent.getComponent("HallPlatformInfo").onClickOpenGroupBtn()
    },

});

module.exports = RankGroupListLayer;