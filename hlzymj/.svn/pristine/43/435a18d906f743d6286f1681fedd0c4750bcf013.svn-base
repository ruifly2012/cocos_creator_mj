import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var MallLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        goldToggle: {
            default: null,
            type: cc.Toggle,
        },
        diamondToggle: {
            default: null,
            type: cc.Toggle,
        },
        mallList:{
            default: null,
            type: cc.ScrollView,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.goldToggle.node.on('toggle', this.showGoldNode, this);
        this.diamondToggle.node.on('toggle', this.showDiamondNode, this);

        if(cc.sys.os == cc.sys.OS_IOS){
            this.diamondToggle.node.active = false;
        }
    },

    onEnable:function(){
        if(require("HallUtils").isIPhoneX())
        { 
            if(!cc.sys.isNative && cc.sys.isMobile){
                var canvasFit = this.node.getComponent(cc.Canvas);
                canvasFit.fitHeight = true;
                canvasFit.fitWidth = false;
            }
        }
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


    showGoldNode:function(){
        this.goldToggle.isChecked = true;
        this.diamondToggle.isChecked = false;
        this.mallList.getComponent("MallScrollList").initData(1);
    },

    showDiamondNode:function(){
        
        if(cc.sys.os == cc.sys. OS_IOS){
            this.closeAndChangeScaleAction();
            this.node.parent.getComponent("HallPlatformInfo").openIosPlatformShare();
        }
        else{
            this.goldToggle.isChecked = false;
            this.diamondToggle.isChecked = true;
            this.mallList.getComponent("MallScrollList").initData(2);
        }
    },
    // update (dt) {},
    
});

module.exports = MallLayer;