
var getRewardLayer = cc.Class({
    extends: cc.Component,

    properties: {
        getRewardIcon: {
            default: null,
            type: cc.Sprite,
        },
        getRewardLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.initUI();
    },

    initUI:function(){
        var effectNode = this.node.getChildByName("reward_frame_sp").getChildByName("reward_light_sp");
        var rotate = cc.rotateBy(4, 360);
        var repeatForever = cc.repeatForever(rotate);
        effectNode.runAction(repeatForever);
    },

    initData:function(data)
    {
        var self = this;
        var resPath = "";
        var addCount = "";
        if (data.moneytype == 7)
        {
            resPath = "texture/activityRes/dailyLogin/jinbi_3";
            addCount = "金币+"+data.wantamount;
        }
        this.getRewardLabel.string = addCount;
        cc.loader.loadRes(resPath,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.getRewardIcon.spriteFrame = spriteFrame;
            }
        });
    },

    start: function () {

    },

    clickGetRewardBtn:function (){
        self.node.active = false;
    },

    clickCloseBtn: function () {
        require('HallResources').getInstance().playCloseEffect();
        this.node.active = false;
    },

    // update (dt) {},
});

module.exports = getRewardLayer;