import { ByteArray } from "../common/ByteArray";
var GameDefs = require("GameDefs")
var ezhhSendCMD = {

};

//发送准备命令
ezhhSendCMD.sendCMD_PO_RESTART = function () {
    var gameLib =  require('GameLibSink').getInstance().getGameLib();
    gameLib.sendReadyCmd();

    cc.log("准备命令发送完毕");
},

//发送过的命令
ezhhSendCMD.sendCMD_PO_PASS = function(){
    var gameLib =  require('GameLibSink').getInstance().getGameLib();
    gameLib.sendGameCmd(GameDefs.MJ_CMD_PASS, null);
},
 
//出牌命令
ezhhSendCMD.sendCMD_PO_OUTCARD = function(mjValue){
    var ba = new ByteArray();
    ba.writeByte(mjValue);
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_OUT, ba);
},

//吃牌命令
ezhhSendCMD.sendCMD_PO_EAT = function(nEatCmd){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(nEatCmd, null);
},

//碰牌命令
ezhhSendCMD.sendCMD_PO_PENG = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_PENG, null);
},

//通知服务器换牌
ezhhSendCMD.sendCMD_PO_Exchange = function (vList){      //byte[3]
    var ba = new ByteArray();
    ba.writeByte(vList[0])
    ba.writeByte(vList[1])
    ba.writeByte(vList[2])
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_Exchange ,ba)
},

//通知服务器定缺
ezhhSendCMD.sendCMD_PO_DingQue = function(nType) {      //byte
     var ba = new ByteArray();
     ba.writeByte(nType)
     require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_DingQue ,ba)
},


//杠牌命令
ezhhSendCMD.sendCMD_PO_GANG = function(nCard, nType){
    var ba = new ByteArray();
    ba.writeByte(nType);
    ba.writeByte(0)
    ba.writeByte(nCard)
    ba.writeByte(nCard)
    ba.writeByte(nCard)
    ba.writeByte(nCard)
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_GANG, ba);
},

//胡牌
ezhhSendCMD.sendCMD_PO_HU = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_HU, null);
},

//通知托管
ezhhSendCMD.sendCMD_PO_ROBOTPLAYSTART = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_AutoOut, null);
},

//通知取消托管
ezhhSendCMD.sendCMD_PO_ROBOTPLAYCANCEL = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_Cancel_AutoOut, null);
}

//设置学费
ezhhSendCMD.sendCMD_PO_XUEFEI = function(nXuefei){
    var ba = new ByteArray();
    ba.writeInt(nXuefei);
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_Set_XueFei, ba);
}

//认输
ezhhSendCMD.sendCMD_PO_RENSHU = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_RenShu, null);
}

//离开
ezhhSendCMD.sendCMD_PO_LIKAI = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_LiKai, null); 
}

//通知服务器有作弊信息时是否继续游戏
ezhhSendCMD.MJ_CMD_SHOW_CHEAT = function(cheat){
    var ba = new ByteArray();
    ba.writeInt(cheat);
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_Show_Cheat, ba);
}

//客户端检测到作弊信息通知服务器，无内容
ezhhSendCMD.MJ_CMD_CLIENT_CHEAT = function(){
    require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.MJ_CMD_Client_Cheat, null); 
}

module.exports = ezhhSendCMD

