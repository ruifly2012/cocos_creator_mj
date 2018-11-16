
cc.Class({
    extends: cc.Component,

    properties: {
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

        game_list_scrollView:{
            default: null,
            type: cc.ScrollView,
        },

        helpAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        }
    },

    onLoad: function () {
        var self = this;
        cc.loader.loadRes("game/help/xueliu_rule1", cc.SpriteFrame, function (err, spriteFrame) {
            if(!err){
                self.m_xueliuRuleFrame = spriteFrame;
            }
        })

        cc.loader.loadRes("game/help/xuezhan_rule1", cc.SpriteFrame, function (err, spriteFrame) {
            if(!err){
                self.m_xuezhanRule = spriteFrame
            }
        })

        var windowSize = cc.view.getVisibleSize();
        this.node.getChildByName("shadow_bg").setContentSize(windowSize);
    },

    onEnable:function(){
        this.initUI();
    },

    initUI:function(){
        var DeskScene = this.node.parent.getComponent("DeskScene");

        var isXueZhan = false;
        if(DeskScene && DeskScene.IsXueZhan()){
            isXueZhan = true;
        }

        var iconFrameName;
        var listFrameName;

        if(isXueZhan){
            iconFrameName = "xuezhan_icon_press";
            listFrameName = "xuezhan_double"
        }
        else{
            iconFrameName = "xueliu_icon_press";
            listFrameName = "xueliu_double"
        }
        


        var gameListScrollview = this.game_list_scrollView.node.getComponent(cc.ScrollView)
        var listContent = gameListScrollview.content;
        var listItem = listContent.children[0];
        
        var spriteFrame = this.helpAtlas.getSpriteFrame(iconFrameName);
        if(spriteFrame){
            listItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }

        var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
        var content = scrollview.content;
        var item = content.children[0];

        var spriteFrame = this.helpAtlas.getSpriteFrame(listFrameName);
        if(spriteFrame){
            item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        
        var rect = spriteFrame.getRect();
        content.setContentSize(cc.size(rect.width, rect.height + 60));
        scrollview.scrollToTop(0);
    },

    onGameIntroClicked: function (event) {

        this.game_toggle1.getComponent(cc.Toggle).isChecked = true;
        this.game_toggle2.getComponent(cc.Toggle).isChecked = false;

        var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
        var content = scrollview.content;
        var item = content.children[0];

        var DeskScene = this.node.parent.getComponent("DeskScene");
        var listFrameName;
        if(DeskScene && DeskScene.IsXueZhan()){
            listFrameName = "xuezhan_double";
        }
        else{
            listFrameName = "xueliu_double";
        }

        var spriteFrame = this.helpAtlas.getSpriteFrame(listFrameName);
        item.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        var rect = spriteFrame.getRect();

        content.setContentSize(cc.size(rect.width, rect.height + 100));

        scrollview.scrollToTop(0);

    },

    onGameRuleClicked: function (event) {

        this.game_toggle1.getComponent(cc.Toggle).isChecked = false;
        this.game_toggle2.getComponent(cc.Toggle).isChecked = true;

        var scrollview = this.game_help_scrollView.node.getComponent(cc.ScrollView)
        var content = scrollview.content;
        var item = content.children[0];

        var DeskScene = this.node.parent.getComponent("DeskScene");
        var spriteFrame
        if(DeskScene && DeskScene.IsXueZhan()){
            spriteFrame = this.m_xuezhanRule;
        }
        else{
            spriteFrame = this.m_xueliuRuleFrame;
        }

        if(spriteFrame){
            item.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        
        var rect = spriteFrame.getRect();

        content.setContentSize(cc.size(rect.width, rect.height + 100));

        scrollview.scrollToTop(0);
    },

    onCloseClicked: function () {
        require('HallResources').getInstance().playCloseEffect();
        this.node.active = false;
    },

});
