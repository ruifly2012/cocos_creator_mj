
var dailyGetButtonItem = cc.Class({
    extends: cc.Component,

    properties: {
        btnBG:{
            default:null,
            type:cc.Button,
        },
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
        this.btnBG.node.on('click', this.callback, this);

        this.initUI();
    },


    initUI:function(){
        var effectNode = this.node.getChildByName("get_daily_reward_btn").getChildByName("same_effect_sp");
        var rotate = cc.rotateBy(4, 360);
        var repeatForever = cc.repeatForever(rotate);
        effectNode.runAction(repeatForever);
    },

    callback: function () {
        var self = this;
        self.callbackFunc();
    },

    initData:function(data,callback){
        var self = this;
        self.callbackFunc = callback;
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

module.exports = dailyGetButtonItem;