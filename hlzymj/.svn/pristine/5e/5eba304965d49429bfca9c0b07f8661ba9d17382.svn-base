
var dailyTomorrowItem = cc.Class({
    extends: cc.Component,

    properties: {
        dayIcon: {
            default: null,
            type: cc.Sprite,
        },
        dayCount: {
            default: null,
            type: cc.Label,
        },
        coinIcon: {
            default: null,
            type: cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },


    start: function () {

    },
    initData:function(data){
        var self = this;
        this.dayCount.string = data.amount;
        cc.loader.loadRes("texture/activityRes/dailyLogin/days"+data.days,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.dayIcon.spriteFrame = spriteFrame;
            }
        });
        cc.loader.loadRes("texture/activityRes/dailyLogin/"+data.icon,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.coinIcon.spriteFrame = spriteFrame;
            }
        });
    },

    // update (dt) {},
});

module.exports = dailyTomorrowItem;