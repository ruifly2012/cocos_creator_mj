import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var gameRuleLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Node,
        },
        game_toggle1:{
            default: null,
            type: cc.Toggle,
        },

        game_toggle2:{
            default: null,
            type: cc.Toggle,
        },

        game_help_scrollView: {
            default: null,
            type: cc.ScrollView,
        },

        yjly_toggle:{
            default: null,
            type: cc.Toggle,
        },

        cxz_toggle:{
            default: null,
            type: cc.Toggle,
        },

        helpAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        }
    },

    onLoad: function () {
        var windowSize = cc.view.getVisibleSize();

        this.node.width = windowSize.width;
        this.node.height = windowSize.height;
        
        var self = this;
        cc.loader.loadRes("game/help/xueliu_rule1", cc.SpriteFrame, function (err, spriteFrame) {
            if(!err){
                self.m_yjlyRuleFrame = spriteFrame;
            }
        })

        cc.loader.loadRes("game/help/xuezhan_rule1", cc.SpriteFrame, function (err, spriteFrame) {
            if(!err){
                self.m_cxzRule = spriteFrame
            }
        })
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.yjly_toggle.node.on('toggle', this.showYJLY, this);
        this.cxz_toggle.node.on('toggle', this.showCXZ, this);
        self.showYJLY()
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

    showYJLY:function(){
        this.yjly_toggle.isChecked = true;
        this.cxz_toggle.isChecked = false;
        if (this.game_toggle1.isChecked){
            this.showMessage(0,1)
        }
        else{
            this.showRule(0,1)
        }
    },

    showCXZ:function(){
        this.yjly_toggle.isChecked = false;
        this.cxz_toggle.isChecked = true;
        if (this.game_toggle1.isChecked){
            this.showMessage(0,2)
        }
        else{
            this.showRule(0,2)
        }
    },

    showMessage:function(event,data){
        this.game_toggle1.isChecked = true;
        this.game_toggle2.isChecked = false;
        var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
        var content = scrollview.content;
        var item = content.children[0];
        var listFrameName = ""
        if (data == 1){
            listFrameName = "xueliu_double"
        }
        else if (data == 2){
            listFrameName = "xuezhan_double"
        }
        else
        {
            listFrameName = this.yjly_toggle.isChecked?"xueliu_double":"xuezhan_double";
        }
        var spriteFrame = this.helpAtlas.getSpriteFrame(listFrameName);
        if(spriteFrame){
            item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        
        var rect = spriteFrame.getRect();
        content.setContentSize(cc.size(rect.width, rect.height + 30));
        scrollview.scrollToTop(0);
    },

    showRule:function(event,data){
        this.game_toggle1.isChecked = false;
        this.game_toggle2.isChecked = true;
        var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
        var content = scrollview.content;
        var item = content.children[0];
        var self = this;
        var spriteFrame;
        if (data == 1){
            spriteFrame = self.m_yjlyRuleFrame
        }
        else if (data == 2){
            spriteFrame = self.m_cxzRule
        }
        else
        {
            spriteFrame = this.yjly_toggle.isChecked?self.m_yjlyRuleFrame:self.m_cxzRule;
        }

        if(spriteFrame){
            item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        
        var rect = spriteFrame.getRect();

        content.setContentSize(cc.size(rect.width, rect.height + 50));

        scrollview.scrollToTop(0);
    },
//     onLoad: function () {
//         var self = this;
//         cc.loader.loadRes("game/help/yjly_rule1", cc.SpriteFrame, function (err, spriteFrame) {
//             if(!err){
//                 self.m_yjlyRuleFrame = spriteFrame;
//             }
//         })

//         cc.loader.loadRes("game/help/cxz_rule1", cc.SpriteFrame, function (err, spriteFrame) {
//             if(!err){
//                 self.m_cxzRule = spriteFrame
//             }
//         })
//     },

//     onEnable:function(){
//         this.initUI();
//     },

//     initUI:function(){
//         var DeskScene = this.node.parent.getComponent("DeskScene");

//         var isCXZ = false;
//         if(DeskScene && DeskScene.IsCXZ()){
//             isCXZ = true;
//         }

//         var iconFrameName;
//         var listFrameName;

//         if(isCXZ){
//             iconFrameName = "cxz_icon_press";
//             listFrameName = "cxz_double"
//         }
//         else{
//             iconFrameName = "yjly_icon_press";
//             listFrameName = "yjly_double"
//         }
        


//         var gameListScrollview = this.game_list_scrollView.node.getComponent(cc.ScrollView)
//         var listContent = gameListScrollview.content;
//         var listItem = listContent.children[0];
        
//         var spriteFrame = this.helpAtlas.getSpriteFrame(iconFrameName);
//         if(spriteFrame){
//             listItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
//         }

//         var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
//         var content = scrollview.content;
//         var item = content.children[0];

//         var spriteFrame = this.helpAtlas.getSpriteFrame(listFrameName);
//         if(spriteFrame){
//             item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
//         }
        
//         var rect = spriteFrame.getRect();
//         content.setContentSize(cc.size(rect.width, rect.height + 60));
//         scrollview.scrollToTop(0);
//     },

//     onGameIntroClicked: function (event) {

//         this.game_toggle1.getComponent(cc.Toggle).isChecked = true;
//         this.game_toggle2.getComponent(cc.Toggle).isChecked = false;

//         var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
//         var content = scrollview.content;
//         var item = content.children[0];

//         var DeskScene = this.node.parent.getComponent("DeskScene");
//         var listFrameName;
//         if(DeskScene && DeskScene.IsCXZ()){
//             listFrameName = "cxz_double";
//         }
//         else{
//             listFrameName = "yjly_double";
//         }

//         var spriteFrame = this.helpAtlas.getSpriteFrame(listFrameName);
//         item.getComponent(cc.Sprite).spriteFrame = spriteFrame;

//         var rect = spriteFrame.getRect();

//         content.setContentSize(cc.size(rect.width, rect.height + 100));

//         scrollview.scrollToTop(0);

//     },

//     onGameRuleClicked: function (event) {

//         this.game_toggle1.getComponent(cc.Toggle).isChecked = false;
//         this.game_toggle2.getComponent(cc.Toggle).isChecked = true;

//         var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
//         var content = scrollview.content;
//         var item = content.children[0];

//         var DeskScene = this.node.parent.getComponent("DeskScene");
//         var spriteFrame
//         if(DeskScene && DeskScene.IsCXZ()){
//             spriteFrame = this.m_cxzRule;
//         }
//         else{
//             spriteFrame = this.m_yjlyRuleFrame;
//         }

//         if(spriteFrame){
//             item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
//         }
        
//         var rect = spriteFrame.getRect();

//         content.setContentSize(cc.size(rect.width, rect.height + 100));

//         scrollview.scrollToTop(0);
//     },

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

    onCloseClicked: function () {
        HallResources.getInstance().playCloseEffect();
        // this.node.active = false;
        this.closeAndChangeScaleAction();
    },

});

module.exports = gameRuleLayer;