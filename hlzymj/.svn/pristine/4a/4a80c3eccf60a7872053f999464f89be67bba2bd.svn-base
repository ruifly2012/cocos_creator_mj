import { TSCommon } from "../TSCommon"
var HallResources = require("HallResources");
//道具发送界面
var PropertyAnimationLayer = {
    extends: cc.Component,

    properties: {

        ArmatAssets: Array(),

        SpriteAssets: Array(),


    },

    onLoad:function(){

        this.ArmatAssets = new Array();

        this.SpriteAssets = new Array();

        var self = this;

        cc.loader.loadRes("game/property/gameItem_1", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[1] = spriteFrame;
        })

        cc.loader.loadRes("game/property/gameItem_2", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[2] = spriteFrame;
        })

        cc.loader.loadRes("game/property/gameItem_3", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[3] = spriteFrame;
        })

        cc.loader.loadRes("game/property/gameItem_4", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[4] = spriteFrame;
        })

        cc.loader.loadRes("game/property/gameItem_5", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[5] = spriteFrame;
        })

        cc.loader.loadRes("game/property/gameItem_6", cc.SpriteFrame, function(err, spriteFrame){
            self.SpriteAssets[6] = spriteFrame;
        })
     

        cc.loader.loadResDir("game/property/animation/Game_JiDan", function(err, assets){
            self.ArmatAssets[1] = assets;
        });

        cc.loader.loadResDir("game/property/animation/Game_FeiDao", function(err, assets){
            self.ArmatAssets[2] = assets;
        });

        cc.loader.loadResDir("game/property/animation/Game_ZhuoJi", function(err, assets){
            self.ArmatAssets[3] = assets;
        });

        cc.loader.loadResDir("game/property/animation/Game_Kiss", function(err, assets){
            self.ArmatAssets[4] = assets;
        });

        cc.loader.loadResDir("game/property/animation/Game_MeiGui", function(err, assets){
            self.ArmatAssets[5] = assets;
        });

        cc.loader.loadResDir("game/property/animation/Game_DianZan", function(err, assets){
            self.ArmatAssets[6] = assets;
        });        
    },

    //清理相应数据和事件监听
    onDestroy:function(){
        if(this.dragonDisplay){
            this.dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.onArmatureFinish, this)
        }
        
    },
}

PropertyAnimationLayer.create = function (startPoint, endPoint, nPropertyId, onEnd) {
    this.init(startPoint, endPoint, nPropertyId, onEnd)

    this.PlayArmatureAction();
}


PropertyAnimationLayer.init = function(startPoint, endPoint, nPropertyId, onEnd){
    this.m_startPoint = startPoint;
    this.m_endPoint = endPoint;
    this.m_nPropertyId = nPropertyId;
    this.m_onEnd = onEnd;
}

PropertyAnimationLayer.PlayArmatureAction = function(){

    var isImgLoadFinish = true;
    for(var i = 1; i <= 6; i++){
        if(!this.SpriteAssets[i]){
            isImgLoadFinish = false;
        }
    }

    if(!isImgLoadFinish){
        TSCommon.performWithDelay(this, this.PlayArmatureAction, 0.1);
    }

    var animationArray = ["JiDan","FeiDao","ZhuoJi","Kiss","MeiGui","DianZan2"];

    var actNode = new cc.Node();

    this.node.addChild(actNode, 100);

    actNode.setPosition(cc.v2(this.m_startPoint.x, this.m_startPoint.y));

    actNode.addComponent(cc.Sprite);

    actNode.active = true;

    actNode.getComponent(cc.Sprite).spriteFrame = this.SpriteAssets[this.m_nPropertyId];
    
    var self = this;
    var playeAnimation = function(){

        actNode.removeComponent(cc.Sprite);

        var armatureNode = new cc.Node();

        self.node.addChild(armatureNode, 100);

        armatureNode.setPosition(cc.v2(self.m_endPoint.x, self.m_endPoint.y));

        var dragonDisplay = armatureNode.addComponent(dragonBones.ArmatureDisplay);
    
        for(var i in self.ArmatAssets[self.m_nPropertyId]){
            if(self.ArmatAssets[self.m_nPropertyId][i] instanceof dragonBones.DragonBonesAsset){
                dragonDisplay.dragonAsset = self.ArmatAssets[self.m_nPropertyId][i];
            }
            if(self.ArmatAssets[self.m_nPropertyId][i] instanceof dragonBones.DragonBonesAtlasAsset){
                dragonDisplay.dragonAtlasAsset  = self.ArmatAssets[self.m_nPropertyId][i];
            }
        }
     
        dragonDisplay.armatureName = 'armatureName';
        dragonDisplay.playAnimation(animationArray[self.m_nPropertyId - 1]);

        self.onArmatureFinish = function(){
            if(self.m_onEnd && typeof(self.m_onEnd) == "function"){
                self.m_onEnd();
            }
            armatureNode.destroy();
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, self.onArmatureFinish, self)

        self.dragonDisplay = dragonDisplay;
    }
   

    var moveTo = cc.moveTo(0.7, this.m_endPoint.x, this.m_endPoint.y);
    // TSCommon.performWithDelay(self, function () {
        HallResources.getInstance().playPropertyEffect(self.m_nPropertyId);

    // }, 0.2)
    console.log("self.m_nPropertyId========"+self.m_nPropertyId)
    
    //如果是扔鸡蛋或者是kiss表情 则加一个旋转动画
    if(this.m_nPropertyId == 1 || this.m_nPropertyId == 4){
        var rotate = cc.rotateBy(0.7, 360)
        var spawn = cc.spawn(moveTo, rotate);
        var callFunc = cc.callFunc(playeAnimation);
        var sequence = cc.sequence(spawn, callFunc);
        actNode.runAction(sequence);
    }
    else{
        var callFunc = cc.callFunc(playeAnimation);
        var sequence = cc.sequence(moveTo, callFunc);
        actNode.runAction(sequence);
    }
}

cc.Class(PropertyAnimationLayer)
