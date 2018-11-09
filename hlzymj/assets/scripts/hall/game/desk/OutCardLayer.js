var GameDefs = require("GameDefs");

import { TSCommon } from "../../TSCommon";
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        TSCommon.addEvent(GameCfg.selectedMj, this.onSelectedMj, this);

        TSCommon.addEvent(GameCfg.unSelectedMj, this.onUnSelectedMj, this);

        this.init();

        this.loadRes();
        this.showNode = null;
    },

    onDestroy: function () {
        TSCommon.removeEvent(GameCfg.selectedMj, this.onSelectedMj, this);

        TSCommon.removeEvent(GameCfg.unSelectedMj, this.onUnSelectedMj, this);
    },

    onSelectedMj: function (event) {

        var mjValue = event.data;
        var outCardsNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardsNode.childrenCount; i++) {
            if (outCardsNode.children[i].active && outCardsNode.children[i].cardValue == mjValue) {
                outCardsNode.children[i].color = new cc.Color(150, 150, 227);
            }
        }
    },

    onUnSelectedMj: function () {
        var outCardsNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardsNode.childrenCount; i++) {
            if (outCardsNode.children[i].active) {
                outCardsNode.children[i].color = new cc.Color(255, 255, 255);
            }
        }
    },

    init: function () {
        this.LINE_MAX = 6;
        this.m_outMjs = new Array();
        this.m_lastOutCardNode = new Array();
        this.m_playerMj = new Array();
    
    },
    
    initUI: function () {

        var outCardsNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardsNode.childrenCount; i++) {
            outCardsNode.children[i].active = false;
        }

        var laiziNode = this.node.getChildByName("zhonglaigang");
        for (var i = 0; i < laiziNode.childrenCount; i++) {
            laiziNode.children[i].active = false;
        }
    },

    loadRes: function () {
        var self = this;
        cc.loader.loadResDir("animation/dragonBones/zuanshi", function (err, assets) {
            if (!err) {
                self.zuanshiAssets = assets;
            }
        })
    },

    setmjLaiziValue: function (laiziValue) {
        this.m_laiziValue = laiziValue;
    },

    //设定癞子皮
    setmjLaizipiValue: function (laizipiValue) {
        this.m_laizipiValue = laizipiValue;
    },

    setPlayerMj: function (playerMj) {
        this.m_playerMj = playerMj;
    },

    setPlayerPos: function (nPos) {
        this.m_nPos = nPos;
    },

    putOutMj: function (outMjValue) {
        if (this.m_nPos == 1) {
            this.addSelfOutCard(outMjValue);
        }
        else if (this.m_nPos == 2) {
            this.addRightOutCard(outMjValue);
            this.showOutCard(outMjValue)
        }
        else if (this.m_nPos == 3) {
            this.addTopOutCard(outMjValue);
            this.showOutCard(outMjValue)
        }
        else if (this.m_nPos == 4) {
            this.addLeftOutCard(outMjValue);
            this.showOutCard(outMjValue)
        }
    },

    showOutCard: function (outMjValue) {
        var outMjNode = new cc.Node();

        this.node.addChild(outMjNode, 100);

        var pos;

        if (this.m_nPos == 2) {
            pos = cc.p(356, 40);
        }
        else if (this.m_nPos == 3) {
            pos = cc.p(0, 258);
        }
        else if (this.m_nPos == 4) {
            pos = cc.p(-356, 40);
        }

        outMjNode.x = pos.x;
        outMjNode.y = pos.y;

        var sprite = outMjNode.addComponent(cc.Sprite)

        sprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", outMjValue);

        //直接出现  等待 0.5  0.5内消失完毕

        outMjNode.active = true;

        // var delayTime = cc.delayTime(0.5);

        // var fadeOut = cc.fadeOut(0.5);

        // var onEnd = function () {
        //     outMjNode.removeFromParent(true);
        // }

        // var callback = cc.callFunc(onEnd)

        // var sequence = cc.sequence(delayTime, fadeOut, callback);

        // outMjNode.runAction(sequence);
        this.showNode = outMjNode;
    },

    hideOutCard:function(){
        if (this.showNode)
        {
            this.showNode.removeAllChildren()
            this.showNode.active = false;
            this.showNode = null;
        }
    },
    getLastOutCard: function () {

        /*
        var outCardNode = this.node.getChildByName("outcards");
        var outCardCount = 0;
        for (var i = 0; i < outCardNode.childrenCount; i++) {
            if (outCardNode.children[i].cardValue && outCardNode.children[i].cardValue < GameDefs.MAX_MJ_INDEX) {
                outCardCount = outCardCount + 1;
            }
        }
    
        console.log("outCardCount ==========" + outCardCount);
    
        if (this.m_nPos == 2 || this.m_nPos == 3)
            return outCardNode.children[0];
    
        else if(this.m_nPos == 4){
            var lastOutNode =outCardNode.children[0 + (outCardCount - 1) % this.LINE_MAX];
            cc.log("最后出的牌的牌值为:" + lastOutNode.cardValue);
            return outCardNode.children[0 + (outCardCount - 1) % this.LINE_MAX];
        }
        else{
            var lastOutNode = outCardNode.children[outCardCount - 1];
            cc.log("最后出的牌的牌值为:" + lastOutNode.cardValue);
            return outCardNode.children[outCardCount - 1];    
        }
        */
    
        if(this.m_lastOutCardNode && this.m_lastOutCardNode[this.m_nPos]){
            return this.m_lastOutCardNode[this.m_nPos];
        }
    },


    addZuanShiTexiao: function (node) {
        var zuanshiNode = new cc.Node();
        zuanshiNode.active = true;
        zuanshiNode.x = 0;
        zuanshiNode.y = 0;
        if (this.m_nPos == 1 || this.m_nPos == 3) {
            zuanshiNode.y = 10;
        }
        else if (this.m_nPos == 2) {
            zuanshiNode.y = 13;
        }
        else if (this.m_nPos == 4) {
            zuanshiNode.y = 13;
        }
        var dragonDisplay = zuanshiNode.addComponent(dragonBones.ArmatureDisplay);

        for (var i in this.zuanshiAssets) {
            if (this.zuanshiAssets[i] instanceof dragonBones.DragonBonesAsset) {
                dragonDisplay.dragonAsset = this.zuanshiAssets[i];
            }
            if (this.zuanshiAssets[i] instanceof dragonBones.DragonBonesAtlasAsset) {
                dragonDisplay.dragonAtlasAsset = this.zuanshiAssets[i];
            }
        }

        dragonDisplay.armatureName = 'armatureName';
        dragonDisplay.playAnimation('Animation1');
        node.addChild(zuanshiNode);
    },

    addSelfOutCard: function (outMjValue) {
        var outCardCount = 0;
        var nStartX = -125;
        var nStartY = -43;
        var distanceX = 47;
        var outCardNode = this.node.getChildByName("outcards");

        for (var i = 0; i < outCardNode.childrenCount; i++) {
            outCardNode.children[i].active = false;
            outCardNode.children[i].cardValue = GameDefs.MAX_MJ_INDEX;
        }

        for (var i = 0; i < this.m_playerMj.cbOutCards.length; i++) {
            if (this.m_playerMj.cbOutCards[i] < GameDefs.MAX_MJ_INDEX) {
                outCardCount = outCardCount + 1;
            }
        }


        for (var i = 0; i < outCardCount; i++) {
            if (outCardNode.children[i]) {
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1, this.m_playerMj.cbOutCards[i]);
                outCardNode.children[i].removeAllChildren();
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_dao_spriteFrame("mj1", this.m_playerMj.cbOutCards[i]);
                outCardNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                outCardNode.children[i].active = true;
                outCardNode.children[i].cardValue = this.m_playerMj.cbOutCards[i];
                if (outCardNode.children[i] == null)
                    break;

                if (i < this.LINE_MAX) {
                    outCardNode.children[i].x = nStartX + i * distanceX
                    outCardNode.children[i].y = nStartY;
                }
                else if (i >= this.LINE_MAX && i < this.LINE_MAX * 2) {
                    outCardNode.children[i].x = nStartX + (i - this.LINE_MAX) * distanceX
                    outCardNode.children[i].y = nStartY - 50;
                }
                else if (i >= this.LINE_MAX * 2 && i < this.LINE_MAX * 3) {
                    outCardNode.children[i].x = nStartX + (i - this.LINE_MAX * 2) * distanceX
                    outCardNode.children[i].y = nStartY - 100;
                }

            
                //出的牌如果是癞子皮
                // if (this.m_playerMj.cbOutCards[i] == this.m_laizipiValue){
                //     var laizipiNode = new cc.Node();
                //     var laizipiSprite = laizipiNode.addComponent(cc.Sprite);
                //     laizipiSprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").m_mj_metop_gang_cao;
                    
                //     var outCardSize = outCardNode.children[i].getContentSize();
                //     var laizipiSize = laizipiNode.getContentSize();
                //     laizipiNode.x = outCardSize.width / 2 - laizipiSize.width / 2 - 4;
                //     laizipiNode.y = outCardSize.height / 2 - laizipiSize.height / 2 - 2;

                //     outCardNode.children[i].addChild(laizipiNode);
                // }

                if (outMjValue && i == outCardCount - 1 && this.m_playerMj.cbOutCards[i] == outMjValue) {
                    this.addZuanShiTexiao(outCardNode.children[i])
                }
                	
                if(i == outCardCount - 1){
                    this.m_lastOutCardNode[this.m_nPos] =  outCardNode.children[i];
                }
            }
        }
    },

    addLeftOutCard: function (outMjValue) {
        var outCardCount = 0;
        var nStartX = -168;
        var nStartY = 154;
        var distanceX = 55;
        var distanceY = 36;

        var outCardNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardNode.childrenCount; i++) {
            outCardNode.children[i].active = false;
            outCardNode.children[i].cardValue = GameDefs.MAX_MJ_INDEX;
            outCardNode.children[i].setLocalZOrder(outCardNode.childrenCount);
        }

        for (var i = 0; i < this.m_playerMj.cbOutCards.length; i++) {
            if (this.m_playerMj.cbOutCards[i] < GameDefs.MAX_MJ_INDEX) {
                outCardCount = outCardCount + 1;
            }
        }

        for (var i = 0; i < outCardCount; i++) {
            if (outCardNode.children[i]) {

                outCardNode.children[i].removeAllChildren();
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(4,  this.m_playerMj.cbOutCards[i]);
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_z_SpriteFrame("mj1", this.m_playerMj.cbOutCards[i]);
                outCardNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                outCardNode.children[i].active = true;
                outCardNode.children[i].cardValue = this.m_playerMj.cbOutCards[i];
                if (outCardNode.children[i] == null)
                    break;

                var lineNum = 0;

                if (i < this.LINE_MAX) {
                    outCardNode.children[i].x = nStartX - i * 3;
                    outCardNode.children[i].y = nStartY - i * distanceY;
                    lineNum = 1;
                }
                else if (i >= this.LINE_MAX && i < this.LINE_MAX * 2) {
                    outCardNode.children[i].x = nStartX - distanceX - (i - this.LINE_MAX) * 3;
                    outCardNode.children[i].y = nStartY - (i - this.LINE_MAX) * distanceY;
                    lineNum = 2;
                }
                else if (i >= this.LINE_MAX * 2 && i < this.LINE_MAX * 3) {
                    outCardNode.children[i].x = nStartX - distanceX * 2 - (i - this.LINE_MAX * 2) * 3;
                    outCardNode.children[i].y = nStartY - (i - this.LINE_MAX * 2) * distanceY;
                    lineNum = 3;
                }

                //出的牌如果是癞子皮
                // if (this.m_playerMj.cbOutCards[i] == this.m_laizipiValue){
                //     var laizipiNode = new cc.Node();
                //     var laizipiSprite = laizipiNode.addComponent(cc.Sprite);
                //     laizipiSprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").m_mj_left_gang_cao;

                //     var outCardSize = outCardNode.children[i].getContentSize();
                //     var laizipiSize = laizipiNode.getContentSize();
                //     laizipiNode.x = (outCardSize.width / 2 - laizipiSize.width / 2) - 6;
                //     laizipiNode.y = -(outCardSize.height / 2 - laizipiSize.height / 2) + 18;
                //     outCardNode.children[i].addChild(laizipiNode);
                // }

                if (outMjValue && i == outCardCount - 1 && this.m_playerMj.cbOutCards[i] == outMjValue) {
                    this.addZuanShiTexiao(outCardNode.children[i])
                }


                outCardNode.children[i].setLocalZOrder(outCardNode.childrenCount - lineNum * this.LINE_MAX + (i % this.LINE_MAX));
                // outCardNode.children[i].setLocalZOrder(outCardNode.childrenCount - lineNum * this.LINE_MAX);
                	
                if(i == outCardCount - 1){
                    this.m_lastOutCardNode[this.m_nPos] =  outCardNode.children[i];
                }
            }
        }
    },

    addTopOutCard: function (outMjValue) {
        var outCardCount = 0;
        var nStartX = 83;
        var nStartY = 157;
        var distanceX = 36;
        // var distanceY = 36;

        var outCardNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardNode.childrenCount; i++) {
            outCardNode.children[i].active = false;
            outCardNode.children[i].cardValue = GameDefs.MAX_MJ_INDEX;
        }

        for (var i = 0; i < this.m_playerMj.cbOutCards.length; i++) {
            if (this.m_playerMj.cbOutCards[i] < GameDefs.MAX_MJ_INDEX) {
                outCardCount = outCardCount + 1;
            }
        }

        for (var i = 0; i < outCardCount; i++) {
            if (outCardNode.children[i]) {
                outCardNode.children[i].removeAllChildren();
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(1,  this.m_playerMj.cbOutCards[i]);
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_dao_spriteFrame("mj1", this.m_playerMj.cbOutCards[i]);
                outCardNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
                outCardNode.children[i].active = true;
                outCardNode.children[i].cardValue = this.m_playerMj.cbOutCards[i];
                if (outCardNode.children[i] == null)
                    break;

                if (i < this.LINE_MAX) {
                    outCardNode.children[i].x = nStartX - i * distanceX;
                    outCardNode.children[i].y = nStartY;
                }
                else if (i >= this.LINE_MAX && i < this.LINE_MAX * 2) {
                    outCardNode.children[i].x = nStartX - (i - this.LINE_MAX) * distanceX;
                    outCardNode.children[i].y = nStartY + 42;
                }
                else if (i >= this.LINE_MAX * 2 && i < this.LINE_MAX * 3) {
                    outCardNode.children[i].x = nStartX - (i - this.LINE_MAX * 2) * distanceX;
                    outCardNode.children[i].y = nStartY + 42 * 2;
                }

                
                //出的牌如果是癞子皮
                // if (this.m_playerMj.cbOutCards[i] == this.m_laizipiValue){
                //     var laizipiNode = new cc.Node();
                //     var laizipiSprite = laizipiNode.addComponent(cc.Sprite);
                //     laizipiSprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").m_mj_metop_gang_cao;
                    
                //     var outCardSize = outCardNode.children[i].getContentSize();
                //     var laizipiSize = laizipiNode.getContentSize();
                //     laizipiNode.x = outCardSize.width / 2 - laizipiSize.width / 2 - 4;
                //     laizipiNode.y = outCardSize.height / 2 - laizipiSize.height / 2 - 2;

                //     outCardNode.children[i].addChild(laizipiNode);
                // }


                if (outMjValue && i == outCardCount - 1 && this.m_playerMj.cbOutCards[i] == outMjValue) {
                    this.addZuanShiTexiao(outCardNode.children[i])
                }

                outCardNode.children[i].setScale(0.77)
                outCardNode.children[i].setLocalZOrder(outCardNode.childrenCount - i);
                                    
                if(i == outCardCount - 1){
                    this.m_lastOutCardNode[this.m_nPos] =  outCardNode.children[i];
                }
            }
        }
    },

    addRightOutCard: function (outMjValue) {
        var outCardCount = 0;
        var nStartX = 173;
        var nStartY = -26;
        var distanceX = 55;
        var distanceY = 36;

        var outCardNode = this.node.getChildByName("outcards");
        for (var i = 0; i < outCardNode.childrenCount; i++) {
            outCardNode.children[i].active = false;
            outCardNode.children[i].cardValue = GameDefs.MAX_MJ_INDEX;
        }

        for (var i = 0; i < this.m_playerMj.cbOutCards.length; i++) {
            if (this.m_playerMj.cbOutCards[i] < GameDefs.MAX_MJ_INDEX) {
                outCardCount = outCardCount + 1;
            }
        }

        for (var i = 0; i < outCardCount; i++) {
            if (outCardNode.children[i]) {
                outCardNode.children[i].removeAllChildren();
                // var spriteFrameName = this.getSpriteFrameNameByMjValue(2,  this.m_playerMj.cbOutCards[i]);
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_y_SpriteFrame("mj1", this.m_playerMj.cbOutCards[i]);
                outCardNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                outCardNode.children[i].active = true;
                outCardNode.children[i].cardValue = this.m_playerMj.cbOutCards[i];
                if (outCardNode.children[i] == null)
                    break;

                if (i < this.LINE_MAX) {
                    outCardNode.children[i].x = nStartX - i * 3;
                    outCardNode.children[i].y = nStartY + i * distanceY;
                }
                else if (i >= this.LINE_MAX && i < this.LINE_MAX * 2) {
                    outCardNode.children[i].x = nStartX + distanceX - (i - this.LINE_MAX) * 3;
                    outCardNode.children[i].y = nStartY + (i - this.LINE_MAX) * distanceY;
                }
                else if (i >= this.LINE_MAX * 2 && i < this.LINE_MAX * 3) {
                    outCardNode.children[i].x = nStartX + distanceX * 2 - (i - this.LINE_MAX * 2) * distanceX;
                    outCardNode.children[i].y = nStartY + (i - this.LINE_MAX * 2) * distanceY;
                }

                if (outMjValue && i == outCardCount - 1 && this.m_playerMj.cbOutCards[i] == outMjValue) {
                    this.addZuanShiTexiao(outCardNode.children[i])
                }

                 //出的牌如果是癞子皮
                // if (this.m_playerMj.cbOutCards[i] == this.m_laizipiValue){
                //     var laizipiNode = new cc.Node();
                //     var laizipiSprite = laizipiNode.addComponent(cc.Sprite);
                //     laizipiSprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").m_mj_right_gang_cao;
                    
                //     var outCardSize = outCardNode.children[i].getContentSize();
                //     var laizipiSize = laizipiNode.getContentSize();
                //     laizipiNode.x = -(outCardSize.width / 2 - laizipiSize.width / 2) + 6;
                //     laizipiNode.y = outCardSize.height / 2 - laizipiSize.height / 2 - 8;

                //     outCardNode.children[i].addChild(laizipiNode);
                // }

                outCardNode.children[i].setLocalZOrder(outCardNode.childrenCount - i);
                	
                if(i == outCardCount - 1){
                    this.m_lastOutCardNode[this.m_nPos] =  outCardNode.children[i];
                }
            }
        }
    },

    doCards: function () {
        if (this.m_nPos == 1) {
            this.addSelfOutCard();
        }
        else if (this.m_nPos == 2) {
            this.addRightOutCard();
        }
        else if (this.m_nPos == 3) {
            this.addTopOutCard();
        }
        else if (this.m_nPos == 4) {
            this.addLeftOutCard();
        }
        // this.addOutLaiZi(this.m_playerMj.cbCountLaiziGang, this.m_laiziValue);
    },

    //添加打出去的癞子的牌值
    addOutLaiZi: function (nLaiZiNum, nLaiZiMjValue) {
        var laiziNode = this.node.getChildByName("zhonglaigang");

        var MjResourceMgr = this.node.parent.getComponent("MjResourceMgr")
        var spriteFrame;
        if (this.m_nPos == 1) {

            spriteFrame = MjResourceMgr.get_face_dao_spriteFrame("mj1", nLaiZiMjValue);
        }
        else if (this.m_nPos == 2) {
            spriteFrame = MjResourceMgr.get_face_y_SpriteFrame("mj1", nLaiZiMjValue);
        }
        else if (this.m_nPos == 3) {
            spriteFrame = MjResourceMgr.get_face_dao_spriteFrame("mj1", nLaiZiMjValue);
        }
        else if (this.m_nPos == 4) {
            spriteFrame = MjResourceMgr.get_face_z_SpriteFrame("mj1", nLaiZiMjValue);
        }


        for (var i = 0; i < nLaiZiNum; i++) {
            if (spriteFrame) {
                laiziNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                laiziNode.children[i].active = true;
            }

        }
    },

    //设定所有出的牌的可见性
    setAllOutCardIsVis: function (bIsVis) {
        var outCardCount = 0;

        var outCardNode = this.node.getChildByName("outcards");

        for (var i = 0; i < outCardNode.childrenCount; i++) {
            outCardNode.children[i].active = false;
        }

        if(this.m_playerMj && this.m_playerMj.cbOutCards){
            for (var i = 0; i < this.m_playerMj.cbOutCards.length; i++) {
                if (this.m_playerMj.cbOutCards[i] < GameDefs.MAX_MJ_INDEX) {
                    outCardCount = outCardCount + 1;
                }
            }
        }
        

        for (var i = 0; i < outCardCount; i++) {
            outCardNode.children[i].active = bIsVis;
        }

        //修改癞子杠的
        var laiziNode = this.node.getChildByName("zhonglaigang");
        for (var i = 0; i < laiziNode.childrenCount; i++) {
            laiziNode.children[i].active = false;
        }
        this.hideOutCard();
    },

    gameOver: function () {
        this.setAllOutCardIsVis();
    },

    cleanAllMjs: function () {
        this.setAllOutCardIsVis(false);
    }
});
