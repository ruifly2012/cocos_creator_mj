//使用方法参考HallPlatformInfo.onClickCollectBtn
var commonTipsLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        titleIcon: {
            default: null,
            type: cc.Sprite,
        },
        
        tipsText: {
            default: null,
            type: cc.Label,
        },

        showGameLoad: {
            default: null,
            type: cc.Sprite,
        },

        coinIcon: {
            default: null,
            type: cc.Sprite,
        },

        coinText: {
            default: null,
            type: cc.Label,
        },

        commonTipsBtn1: {
            default: null,
            type: cc.Button,
        },

        commonTipsBtn2: {
            default: null,
            type: cc.Button,
        },

        commonTipsBtn3: {
            default: null,
            type: cc.Button,
        },

        otherNode: {
            default: null,
            type: cc.Node,
        },

        otherText1: {
            default: null,
            type: cc.Label,
        },

        otherText2: {
            default: null,
            type: cc.Label,
        },

        otherText3: {
            default: null,
            type: cc.Label,
        },

        arrowSp: {
            default: null,
            type: cc.Sprite,
        },

        womenSp: {
            default: null,
            type: cc.Sprite,
        },

        cloudSp: {
            default: null,
            type: cc.Sprite,
        },

        cloudLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.commonTipsBtn1.node.on('click', this.btnCallback1, this);
        this.commonTipsBtn2.node.on('click', this.btnCallback2, this);
        this.commonTipsBtn3.node.on('click', this.btnCallback3, this);
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
        }
    },

    start: function () {

    },

    btnCallback1: function () {
        this.button1Func();
    },

    btnCallback2: function () {
        this.button2Func();
    },

    btnCallback3: function () {
        this.button3Func();
    },

    clickCloseBtn: function () {
        require('HallResources').getInstance().playCloseEffect();
        this.node.active = false;
    },
    
    showGameLoadTips: function () {
        this.showGameLoad.node.active = true;
        this.arrowSp.node.active = true;
        
    },

    initData: function (data) {
        var self = this;
        self.tipsText.string = data.msg;
        if (data.showIconLabel){
            self.coinText.string = data.showIconLabel;
        }else{
            self.coinText.string = "";
        }
        
        cc.loader.loadRes(data.titleIcon,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.titleIcon.spriteFrame = spriteFrame;
            }
        });

        //判断是否显示金币图标
        if (data.showIcon){
            cc.loader.loadRes(data.showIcon,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.coinIcon.spriteFrame = spriteFrame;
                }
            });
        }else
        {
            self.coinIcon.active = false;
        }

        //判断是否显示中央按钮
        if (data.buttonIcon1){
            cc.loader.loadRes(data.buttonIcon1,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.commonTipsBtn1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
        }
        else{
            self.commonTipsBtn1.node.active = false;
        }
        //判断是否显示两侧按钮
        if (data.buttonIcon2){
            self.commonTipsBtn2.node.active = true;
            cc.loader.loadRes(data.buttonIcon2,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.commonTipsBtn2.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
        }
        if (data.buttonIcon3){
            self.commonTipsBtn3.node.active = true;
            cc.loader.loadRes(data.buttonIcon3,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.commonTipsBtn3.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
        }
        //判断是否显示分享次数的文本
        if (data.otherText1){
            self.otherText1.string = data.otherText1;
            if (data.movePos){
                self.otherText1.node.x = self.otherText1.node.x + data.movePos;
            }
        }

        if (data.otherText2){
            self.otherNode.active = true;
            self.otherText2.string = data.otherText2;
            if (data.movePos){
                self.otherText2.node.x = self.otherText2.node.x + data.movePos;
            }
        }
        if (data.otherText3){
            self.otherText3.string = data.otherText3;
            if (data.movePos){
                self.otherText3.node.x = self.otherText3.node.x + data.movePos;
            }
        }
        //设置几个按钮的回调函数
        if (data.button1Func)
        {
            self.button1Func = data.button1Func;
        }
        if (data.button2Func)
        {
            self.button2Func = data.button2Func;
        }
        if (data.button3Func)
        {
            self.button3Func = data.button3Func;
        }

        //判断是否显示女人和云，设置云上面的内容
        if (data.womenThink)
        {
            self.womenSp.node.active = true;
            self.cloudSp.node.active = true;
            self.cloudLabel.string = data.womenThink;
            self.tipsText.node.active = false;
        }
    },

    // update (dt) {},
});

module.exports = commonTipsLayer;