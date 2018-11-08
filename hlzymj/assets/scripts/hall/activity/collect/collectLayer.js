import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var Resources = require("Resources");
var collectLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        toCollectBtn:{
            default: null,
            type: cc.Button,
        },
        getRewardBtn:{
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.newCallFunc = null;
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

    clickFeaturesBtn:function()
    {
        this.newCallFunc();
        this.clickCloseBtn();
    },

    initData:function(bolIsIphoneX,backFunc,bolShowGetReward)
    {
        var self = this;
        this.toCollectBtn.node.active = !bolShowGetReward;
        this.getRewardBtn.node.active = bolShowGetReward;
        if (bolIsIphoneX){
            if(!cc.sys.isNative && cc.sys.isMobile){
                var canvasFit = this.node.parent.getComponent(cc.Canvas);
                canvasFit.fitHeight = true;
                canvasFit.fitWidth = false;
            }

            cc.loader.loadRes("texture/activityRes/collectGame/collectBg_iphoneX", cc.SpriteFrame,function (error, spriteframe)
            {
                var bgSp = self.node.getChildByName('collectBg').getComponent(cc.Sprite);
                if (!error) {
                    bgSp.spriteFrame = spriteframe;
                    
                }
            });
        }
        this.newCallFunc = backFunc;
    },

    start: function () {

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

module.exports = collectLayer;