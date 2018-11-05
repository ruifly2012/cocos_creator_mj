var GameDefs = require("GameDefs");
var Resources = require("Resources");
cc.Class({
    extends: cc.Component,

    properties: {
        bgNode:{
            default:null,
            type:cc.Sprite,
        }
    },

    init(operateKind, operateData, callBack, spriteFrame){
        this.m_operateKind = operateKind;
        this.m_operateData = operateData;
        this.m_callBack = callBack;
        this.m_spriteFrame = spriteFrame;

        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this)
    },

    onTouch:function(event){
        if(this.m_operateKind == GameDefs.PlayerAction.paEat){
            require("sendCMD").sendCMD_PO_EAT(this.m_operateData[3])
        }
        else if(this.m_operateKind == GameDefs.PlayerAction.paGang){
            require("sendCMD").sendCMD_PO_GANG(this.m_operateData.nGangCard, this.m_operateData.nGangType)
        }
        else{
            cc.log("this.m_operateKind is error");
        }

        if(this.m_callBack != null){
            this.m_callBack();
        }  
    },

    getFrameNameByValue(mjValue){
        var foreName = "";
        var name = "";
        if(this.m_operateKind == GameDefs.PlayerAction.paGang){
            foreName = "hh_dao_"
        }
        else if(this.m_operateKind == GameDefs.PlayerAction.paEat){
            foreName = "hh_li_" 
        }
        else{
            cc.log("no other more operate");
        }

       name = Resources.get_frameName(foreName, mjValue);

        if(mjValue == GameDefs.MAX_MJ_INDEX && this.m_operateKind == GameDefs.PlayerAction.paGang){
            name = foreName + "back"
        }

        return name;
    },

    showUI:function(){

        var cardDataArray = new Array();
        var selectBg = this.node.getChildByName("selectBg");
        if(this.m_operateKind == GameDefs.PlayerAction.paGang){
            for(var i = 0; i < 3; i++){
                cardDataArray[i] = GameDefs.MAX_MJ_INDEX;
            }

            cardDataArray.push(this.m_operateData.nGangCard);
        }
        else{
            for(var i = 0; i < 3; i++){
                cardDataArray[i] = this.m_operateData[i];
            }
        }


        for(var i = 0; i < selectBg.childrenCount; i++){
            var mjValue = cardDataArray[i];
            selectBg.children[i].getComponent(cc.Sprite).spriteFrame = this.m_spriteFrame.getSpriteFrame(this.getFrameNameByValue(mjValue));
        }
    },
 
});
