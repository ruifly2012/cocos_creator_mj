import {GameCmds} from "../../gamelib/room/GameCmds"
import {TSCommon} from "../../TSCommon";
var Resources = require("Resources");
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Node,
        },
    },

    
    //界面载入
    onLoad: function () {
        this.init();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    init:function(){

        var size = this.bg.getContentSize();

        this.prePos = this.node.getPosition();

        this.node.setPosition(cc.p(this.prePos.x + size.width, this.prePos.y))

    },

    onTouch: function (event) {
        cc.log("onTouch");
        var point = event.touch.getLocation();

        var convertPoint = this.bg.convertToNodeSpace(point);

        var size = this.bg.getContentSize();
        
        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, convertPoint)) {          
            this.hide();
        }
    },

    show: function(){
        this.node.active = true;

        this.node.stopAllActions();

        var self = this;

        //运行动画
        var size = this.bg.getContentSize();

        var destPos = cc.p(this.prePos.x, this.prePos.y);

        var moveTo = cc.moveTo(0.2, destPos);

        this.node.runAction(moveTo);
    },

    hide: function(){
        this.node.stopAllActions();

        var self = this;

        var size = this.bg.getContentSize();

        var destPos = cc.p(this.prePos.x + size.width, this.prePos.y);

        var moveTo = cc.moveTo(0.2, destPos);

        var onMoveEnd = function () {
            self.node.active = false;           
        }
        var callFunc = cc.callFunc(onMoveEnd, this)

        var sequence = cc.sequence(moveTo, callFunc);

        this.node.runAction(sequence);
    },

    sendChat:function(lpszMsg){

        var nResult = require('GameLibSink').getInstance().getGameLib().sendTableChat(lpszMsg);
        this.node.active = false;

        if(nResult == GameCmds.SEND_TABLE_CHAT_OFFLINE){

        }
        else if(nResult == GameCmds.SEND_TABLE_CHAT_NULL_CONTENT){

        }
        else if(nResult == GameCmds.SEND_TABLE_CHAT_BUSY){

        }
        else{
            TSCommon.dispatchEvent(GameCfg.sendChatEnd, null);
        }

        return nResult;
    },

    onSendFaceClicked:function(event, faceID){
        // console.log("faceID ====="+faceID);

        var msg = "--:" + (faceID - 1);
        this.sendChat(msg);

        this.hide();

    },

    onSendWordsClicked: function(event, wordID){
        // console.log("wordID =====" + wordID);
        var msg = Resources.QUICK_SEND_CHATS[wordID];
        this.sendChat(msg);

        this.hide();

    },


});
