
var dailyHasGetItem = cc.Class({
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
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
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
    },

});

module.exports = dailyHasGetItem;