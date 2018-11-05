var Resources = require("Resources");
var GameDefs = require("GameDefs");
import {TSCommon} from "../../TSCommon";
var GameCfg = require("GameCfg");
var Res
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function() {
        TSCommon.addEvent(GameCfg.selectedMj, this.onSelectedMj, this);

        TSCommon.addEvent(GameCfg.unSelectedMj, this.onUnSelectedMj, this);
    },

    onDestroy:function(){
        TSCommon.removeEvent(GameCfg.selectedMj, this.onSelectedMj, this);

        TSCommon.removeEvent(GameCfg.unSelectedMj, this.onUnSelectedMj, this);
    },

    init:function(weaveKind, weaveItem, nPos, spriteFrame){//, laiziValue, laizipiValue) {
        this.weaveKind = weaveKind;
        this.weaveItem = weaveItem;
        this.nPos = nPos;

        this.spriteFrame = spriteFrame;

        // this.laiziValue = laiziValue;

        // this.laizipiValue = laizipiValue;

        this.doCards()
    },

    onSelectedMj:function(event){
        var mjValue = event.data;
        for(var i = 0; i < 4; i++){
            if(this.node.children[i].active && this.node.children[i].cardValue == mjValue){
                this.node.children[i].color =  new cc.Color(150, 150, 227);
            }
        }
    },

    onUnSelectedMj:function(event){
        for(var i = 0; i < 4; i++){
            if(this.node.children[i].active){
                this.node.children[i].color =  new cc.Color(255, 255, 255);
            }
        }
    },

    getSpriteFrameNameByMjValueAndPos:function(mjValue, nPos){
        var foreName = null;
        var name = null;
        if(nPos == 1 || nPos == 3){
            foreName = "hh_dao_";
        }
        else if(nPos == 2){
            foreName = "hh_suit_y_";
        }
        else if(nPos == 4){
            foreName = "hh_suit_z_";
        }

        return Resources.get_frameName(foreName, mjValue);
    },

    getSpriteSpriteFrameByNameAndPos:function(name, nPos){

        return this.spriteFrame.getSpriteFrame(name);
    },


    addLaiziOrLaizipiIcon:function(mjNode, mjValue){
        mjNode.removeAllChildren();
        var Canvas =  cc.director.getScene().getChildByName('Canvas');
        var MjResourceMgr = Canvas.getComponent("MjResourceMgr");
        //如果是癞子
        // if(mjValue == this.laiziValue || mjValue == this.laizipiValue){
        //     var laiziIcon = new cc.Node();
        //     var sprite = laiziIcon.addComponent(cc.Sprite);

        //     if(this.nPos == 1){
                
        //         var frame;
        //         if(mjValue == this.m_laiziValue){
        //             frame = MjResourceMgr.m_mj_metop_gang_lai;
        //         }
        //         else{
        //             frame = MjResourceMgr.m_mj_metop_gang_cao;
        //         }

        //         sprite.spriteFrame = frame;

        //         laiziIcon.x = laiziIcon.getContentSize().width / 2 - 5;
        //         laiziIcon.y = mjNode.getContentSize().height / 2 - laiziIcon.getContentSize().height / 2 - 3;
        //         mjNode.addChild(laiziIcon);
        //     }
        //     else if(this.nPos == 2){
        //         var frame;
        //         if(mjValue == this.m_laiziValue){
        //             frame = MjResourceMgr.m_mj_right_lai;
        //         }
        //         else{
        //             frame = MjResourceMgr.m_mj_right_cao;
        //         }

        //         sprite.spriteFrame = frame;

        //         laiziIcon.x = -(mjNode.getContentSize().width / 2 - laiziIcon.getContentSize().width / 2) + 15;
        //         laiziIcon.y = mjNode.getContentSize().height / 2 - laiziIcon.getContentSize().height / 2 - 5;

        //         mjNode.addChild(laiziIcon);
        //     }
        //     else if(this.nPos == 3){
        //         var frame;
        //         if(mjValue == this.m_laiziValue){
        //             frame = MjResourceMgr.m_mj_metop_gang_lai
        //         }
        //         else{
        //             frame = MjResourceMgr.m_mj_metop_gang_cao
        //         }

        //         sprite.spriteFrame = frame;

        //         laiziIcon.x = mjNode.getContentSize().width / 2 - laiziIcon.getContentSize().width / 2 - 3;
        //         laiziIcon.y = mjNode.getContentSize().height / 2 - laiziIcon.getContentSize().height / 2 - 3;
        //         mjNode.addChild(laiziIcon);
        //     }
        //     else if(this.nPos == 4){
        //         var frame;
        //         if(mjValue == this.m_laiziValue){
        //             frame = MjResourceMgr.m_mj_left_gang_lai;
        //         }
        //         else{
        //             frame = MjResourceMgr.m_mj_left_gang_cao;
        //         }

        //         sprite.spriteFrame = frame;

        //         laiziIcon.x = mjNode.getContentSize().width / 2 - laiziIcon.getContentSize().width / 2 - 20;
        //         laiziIcon.y = -(mjNode.getContentSize().height / 2 - laiziIcon.getContentSize().height / 2) + 20;
        //         mjNode.addChild(laiziIcon);
        //     }             
        // } 
        // else{
            mjNode.removeAllChildren();
        // }                   
    },

    doCards:function(){
        if(this.weaveKind == GameDefs.WeaveType.Peng || this.weaveKind == GameDefs.WeaveType.ShunLeft || 
            this.weaveKind == GameDefs.WeaveType.ShunMid || this.weaveKind == GameDefs.WeaveType.ShunRight){//} || 
            // this.weaveKind == GameDefs.WeaveType.ChaoTianMingGang || this.weaveKind == GameDefs.WeaveType.ChaoTianAnGang){
            for(var i = 0; i < 4; i++){
                if(i == 3){
                    this.node.children[i].active = false;
                    break;
                }
                else{
                    this.node.children[i].active = true;
                    var name = this.getSpriteFrameNameByMjValueAndPos(this.weaveItem[i], this.nPos)
                    this.node.children[i].getComponent(cc.Sprite).spriteFrame = this.getSpriteSpriteFrameByNameAndPos(name, this.nPos);
                    this.node.children[i].cardValue = this.weaveItem[i];

                    this.addLaiziOrLaizipiIcon(this.node.children[i], this.weaveItem[i]);                    
                }
            }
        }
        else if(this.weaveKind == GameDefs.WeaveType.MingGang || this.weaveKind == GameDefs.WeaveType.XuGang || 
            this.weaveKind == GameDefs.WeaveType.AnGang){
                for(var i = 0; i < 4; i++){
                    this.node.children[i].active = true;
                    var name = this.getSpriteFrameNameByMjValueAndPos(this.weaveItem[i], this.nPos)
                    this.node.children[i].getComponent(cc.Sprite).spriteFrame = this.getSpriteSpriteFrameByNameAndPos(name, this.nPos)
                    this.node.children[i].cardValue = this.weaveItem[i];

                    this.addLaiziOrLaizipiIcon(this.node.children[i], this.weaveItem[i]);
                }
            }
    },

});
