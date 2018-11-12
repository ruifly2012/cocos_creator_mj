var HallResources = require("HallResources")
var Resources = require("Resources")
var MoreGameListItem = cc.Class({
    extends: cc.Component,
    properties: {
        
        playerCount:{
            default:null,
            type:cc.Label,
        },
        gameMsg:{
            default:null,
            type:cc.Label,
        },
        gameIcon:{
            default:null,
            type:cc.Sprite,
        },
        gameHotTag:{
            default:null,
            type:cc.Sprite,
        },
    },

    onLoad:function() {
    },


    onClickButton:function(event,index)
    {
        // require('HallResources').getInstance().playButtonEffect();
        if (this.gameId)
            this.node.parent.parent.parent.parent.parent.parent.getComponent("HallPlatformInfo").onClickGameBtn(null,this.gameId)
        else
            Resources.ShowToast("敬请期待")
    },

    initData:function(gameData,hot,changwan) {
        var self = this;
        var gamePlayer = 0;
        var gameMsgLabel = "";
        var gameTagSp = null;
        var gameIconSp = "texture/hallRes/gameList/jqqdIcon";
        this.gameId = gameData.m_iId;
        if (gameData != null)
        {
            if (gameData.m_iId == 36){
                // gamePlayer = gameData.count;
                gameMsgLabel = "换三张"; 
                gameIconSp = "texture/hallRes/gameList/xlchIcon";
            }else if (gameData.m_iId == 97){
                // gamePlayer = gameData.count;
                gameMsgLabel = "鸡平胡"; 
                gameIconSp = "texture/hallRes/gameList/gdmjIcon";
            }else if (gameData.m_iId == 44){
                // gamePlayer = gameData.count;
                gameMsgLabel = "换三张";  
                gameIconSp = "texture/hallRes/gameList/xzddIcon";
            }
            if (hot == gameData.m_iId){
                gameTagSp = "texture/hallRes/gameList/famousTag";
            }
            if (changwan == gameData.m_iId){
                gameTagSp = "texture/hallRes/gameList/hotTag";
            }
        }
        cc.loader.loadRes(gameIconSp,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.gameIcon.spriteFrame = spriteFrame;
            }
        });
        if (gameTagSp == null)
        {
            self.gameHotTag.node.active = false;  
        }
        else{
            cc.loader.loadRes(gameTagSp,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.gameHotTag.spriteFrame = spriteFrame;
                }
            });
        }
        this.gameMsg.string = gameMsgLabel;
        this.playerCount.string = gamePlayer;
    },
});
module.exports = MoreGameListItem;