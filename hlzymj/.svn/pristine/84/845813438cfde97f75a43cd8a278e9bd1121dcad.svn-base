import {TSCommon} from "TSCommon";
var HallResources = require("HallResources")
var RoomTypeList = cc.Class({
    extends: cc.Component,
    properties: {
        roomType1:{
            default:null,
            type:cc.Button,
        },
        roomType2:{
            default:null,
            type:cc.Button,
        },
        roomType3:{
            default:null,
            type:cc.Button,
        },
        roomType1Score:{
            default:null,
            type:cc.Label,
        },
        roomType2Score:{
            default:null,
            type:cc.Label,
        },
        roomType3Score:{
            default:null,
            type:cc.Label,
        },
        roomType1Gold:{
            default:null,
            type:cc.Label,
        },
        roomType2Gold:{
            default:null,
            type:cc.Label,
        },
        roomType3Gold:{
            default:null,
            type:cc.Label,
        },
        roomType1PlayerCount:{
            default:null,
            type:cc.Label,
        },
        roomType2PlayerCount:{
            default:null,
            type:cc.Label,
        },
        roomType3PlayerCount:{
            default:null,
            type:cc.Label,
        },
    },

    onLoad:function() {
        this.content = this.node.getComponent(cc.ScrollView).content;
        // 新手场
        var xinshouNode = this.roomType1.node.getChildByName("xinshou_act");
        var dragonDisplay = xinshouNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation("xinshouchang");
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)

        // 中级场
        var zhongjiNode = this.roomType2.node.getChildByName("zhongji_act");
        var dragonDisplay = zhongjiNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation("zhongjichang");
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)

        // 高级场
        var gaojiNode = this.roomType3.node.getChildByName("gaoji_act");
        var dragonDisplay = gaojiNode.getComponent(dragonBones.ArmatureDisplay);
        dragonDisplay.playAnimation("gaojichang");
        var callback = function () {
            dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, callback, self);
        }

        dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, callback, this)
    },


    onClickButton:function(pSender,index)
    {
        if (!G.gameSceneResourcesAddFinish){
            TSCommon.dispatchEvent(HallResources.onShowLoadingNode, true);
            return;
        }
        require('HallResources').getInstance().playButtonEffect();
        var gameInfo = this.gameList[index];
        var pRoomList =  require('HallResources').getInstance().enterGameRoomBeanByStaionName(gameInfo.szStationName);

        //记录日志
        HallResources.recordPlayerLogToServer(HallResources.recordList.enter_room);
    },

    showRoomList:function(gameList) {
        var gameLibSink  =  require('GameLibSink').getInstance();
        var gameLib =  gameLibSink.getGameLib();

        this.gameList = gameList;
        var sortFunction = function (stStation1, stStation2){
            return stStation1.dwRuleID - stStation2.dwRuleID;
        }
        this.gameList.sort(sortFunction)
        // this.content.removeAllChildren();
        // var nButtonX = 0;
        // var nButtonY = 0;
        // var offsetX = 350;
        // var totalWidth = 0;
        // var nListSize = gameList.length;
        
        // for(var i=0;i<gameList.length;i++)
        // {
            // var buttonNode = new cc.Node('buttonNode');
            // var ccBtutton = buttonNode.addComponent(cc.CCButton);
            // var gameInfo = gameList[i];
            // ccBtutton.setCCButton('texture/hallRes/roomInfo/roomType'+(i+1),null,this.onClickButton.bind(this));
            // ccBtutton.setObjectData(gameInfo);
            // buttonNode.parent = this.content;
            // buttonNode.x=nButtonX+ i * offsetX;
            // buttonNode.y=nButtonY;

        // } 
        // totalWidth = offsetX * nListSize;
        // this.content.width = totalWidth;
        this.roomType3.node.active = false;
        this.roomType2.node.active = false;
        this.roomType1.node.active = false;
        if (gameList.length > 2)
        {
            this.roomType3.node.active = true;
            // this.roomType3Gold.string = gameList[2].dwMinGold;
            this.roomType3PlayerCount.string =  gameLib.getStationOnlineCount(gameList[2].dwStationID);
        }
        if (gameList.length > 1)
        {
            this.roomType2.node.active = true;
            // this.roomType2Gold.string = gameList[1].dwMinGold;
            this.roomType2PlayerCount.string =  gameLib.getStationOnlineCount(gameList[1].dwStationID);
        }
        if (gameList.length > 0)
        {
            this.roomType1.node.active = true;
            // this.roomType1Gold.string = gameList[0].dwMinGold;
            this.roomType1PlayerCount.string =  gameLib.getStationOnlineCount(gameList[0].dwStationID);
        }
    },
});
