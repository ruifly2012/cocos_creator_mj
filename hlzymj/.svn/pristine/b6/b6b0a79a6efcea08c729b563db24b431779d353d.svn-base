import {TSCommon} from "TSCommon";
var HallResources = require("HallResources");
var HallQualifying = cc.Class({
    extends: cc.Component,

    properties: {
        star1: {
            default: null,
            type: cc.Sprite,
        },
        star2: {
            default: null,
            type: cc.Sprite,
        },
        star3: {
            default: null,
            type: cc.Sprite,
        },
        star4: {
            default: null,
            type: cc.Sprite,
        },
        star5: {
            default: null,
            type: cc.Sprite,
        },
        cupIcon: {
            default: null,
            type: cc.Sprite,
        },
        rankLabel: {
            default: null,
            type: cc.Label,
        },
        lightActNode: {
            default: null,
            type: cc.Node,
        },
        starActNode: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.showAnimation();

        this.moveCup();
    },

    clickReceiveBtn(){
        HallResources.getInstance().playButtonEffect();
    },

    showAnimation:function(){
        var whosTurnNode = this.lightActNode.getChildByName("light_act");
        whosTurnNode.active = true;
        var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation('beibaiguang');
    },

    showStarAnimation:function(count){
        if (count > 2){
            var whosTurnNode = this.starActNode.getChildByName("light_act_3");
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('dengjixingxing');
        }
        if (count > 1){
            var whosTurnNode = this.starActNode.getChildByName("light_act_2");
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('dengjixingxing');
        }
        if (count > 0){
            var whosTurnNode = this.starActNode.getChildByName("light_act_1");
            whosTurnNode.active = true;
            var dragonDisplay = whosTurnNode.addComponent(dragonBones.ArmatureDisplay);
            dragonDisplay.playAnimation('dengjixingxing');
        }

    },

    moveCup:function(){
        var action1 = cc.moveBy(1,0,10);
        var action2 = cc.moveBy(1,0,-10);
        var seq = cc.sequence(action1,action2);
        this.cupIcon.node.runAction(cc.repeatForever(seq));
    },

    clickQuestionBtn: function () {
        
        this.node.parent.parent.getComponent("HallPlatformInfo").showSeasonLayer();
    },

    changeRank:function(rankScore){
        var self = this;
        var data = HallResources.getInstance().getRankAndStarByScore(rankScore);
        
        if (data.star > 4){this.star5.node.active = true;}
        if (data.star > 3){this.star4.node.active = true;}
        if (data.star > 2){this.star3.node.active = true;}
        if (data.star > 1){this.star2.node.active = true;}
        if (data.star > 0){this.star1.node.active = true;}
        this.rankLabel.string = data.rankName;
        this.showStarAnimation(data.star);
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.cupIcon.spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+data.cup,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.cupIcon.spriteFrame = spriteFrame;
                    }
                });
            }
        });
    },
    
    // update (dt) {},
});

module.exports = HallQualifying;