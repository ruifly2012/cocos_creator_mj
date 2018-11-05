var ClientFrameSink  = require('ClientFrameSink');
import {CGameLib} from "../gamelib/CGameLib";
import {TSCommon} from "../TSCommon";
import {gamelibcommon} from "../gamelib/gamelibcommon"
var HallResources = require("HallResources");
var GameLibSink = cc.Class({
	statics:{
		instance:null,
	},
    m_gameLib:null,
    _clientFrameSink:null,

    ctor:function()
    {
        this._clientFrameSink = new ClientFrameSink();
        this.m_gameLib = CGameLib.getInstance();
        this.m_gameId = 0;
    },

    run:function(gameID,logonIP,logonPort,webRoot)
    {

        // cc.log("call the GameLibSink of run");
        // cc.log("logonIP =========", logonIP);
        // cc.log("logonPort ========", logonPort);
        // cc.log("webRoot =======", webRoot);
        // gameID = 36;
        if (gameID){
            this.m_gameId = gameID;
            CGameLib.getInstance().createGamelib(gameID,1,this,this._clientFrameSink,
            10001,10101,logonIP,logonPort,webRoot);
        }
        //require('HallResources').getInstance().showLoading();
    },
    
    getGameId:function()
    {
        return this.m_gameId;
    },

    getGameLib:function()
    {
        return this.m_gameLib;
    },

    onLogonFinished:function(){
        cc.log("onLogonFinished");
        // CGameLib.getInstance().autoEnterGameRoom("练习场1")


        // cc.director.loadScene("GameScene");
    },
	
    onPlazaGoldChanged(){

    },

    onRefreshUserInfo(){

    },

    onChargeInfoRefeshRet(result){

    },

    onSendSpeakerRet(cbRetCode){

    },

    onLogonFailed(errorStr, nFaileType){

    },

    onEnteredGameRoom(tableCount, chairCount){
        cc.log("GameLibSink:onEnteredGameRoom")

        this.m_chairCount = chairCount;

        cc.director.loadScene('XueLiuGameScene', function(){
            require('HallResources').getInstance().removeLoading();

            //记录日志
            HallResources.recordPlayerLogToServer(HallResources.recordList.room_res_end);
        });

        cc.log("onEnteredGameRoom");
        
        //CGameLib.getInstance().autoSit();
    },

    onEnterGameRoomFailed(errorStr){

    },

    onRoomConnectClosed(){
        console.log(" --------------onRoomConnectClosed--------------");
        cc.director.loadScene('HallPlatformScene');
    },

    onEnterGameView(){

    },

    onLeaveGameView(){
    },

    onRoomUserEnter(userID){
        cc.log("onRoomUserEnter");
    },

    onRoomUserExit(userID){},


    onRoomUserInfoUpdated(userID){
        var pMyself = this.getGameLib().getMyself();

        if(!pMyself){
            return;
        }

        if(userID == pMyself.getUserID()){
            var logonInfo = this.getGameLib().getUserLogonInfo()
            logonInfo.dwGold = pMyself.getGold()
            logonInfo.nScore = pMyself.getScoreField(gamelibcommon.enScore_Score)
            logonInfo.nWin = pMyself.getScoreField(gamelibcommon.enScore_Win)
            logonInfo.nLose = pMyself.getScoreField(gamelibcommon.enScore_Loss)
            logonInfo.nFlee = pMyself.getScoreField(gamelibcommon.enScore_Flee)
            logonInfo.nDraw = pMyself.getScoreField(gamelibcommon.enScore_Draw)

            if(this._clientFrameSink.m_dataEventHandler){
                this._clientFrameSink.m_dataEventHandler.emit("updateUserInfo", {
                    user : pMyself, 
                })
            }
            else{
                TSCommon.performWithDelay(this, this.onRoomUserInfoUpdated, 0.2);
            }
        }
        else{
            var pUser = this.getGameLib().getUser(userID);
            if(!pUser)
                return;

            if(pMyself.getUserTableID() != pUser.getUserTableID())
                return;

            if(this._clientFrameSink.m_dataEventHandler){
                this._clientFrameSink.m_dataEventHandler.emit("updateUserInfo", {
                    user : pUser, 
                })
            }
            else{
                TSCommon.performWithDelay(this, this.onRoomUserInfoUpdated, 0.2);
            }
        }
    },

    onTableInfoChanged(tableID){

    },

    onRecvHallChat(chat){
        
    },

    //收到语音聊天的消息
    onRecvTableChat(chat){
        if(this._clientFrameSink.m_dataEventHandler){
            this._clientFrameSink.m_dataEventHandler.emit("onRecvTableChat", {
                chatMsg:chat, 
            })
        }
        else{
            TSCommon.performWithDelay(this, this.onRecvTableChat, 0.2);
        }
    },

    onShowAlertMsg(msg){},

    onLogonGameRoomSucceeded(){},

    onChangeUserInfoRet(cbRetCode){},

    onTaskInfo(cbRetCode, pTaskList){},

    onTaskGift(nTaskID, cbRetCode){},

    onNewStatus(nNewMissionDone, nNewMail, nNewActivity, nNewFriend, bLoginGift){},

    onBankInfo(nBankAmount, nBankCapacity){},

    onCreatePrivateTableFailed(lpszErrorMsg){},

    onEnterPrivateTableFailed(lpszErrorMsg){},


    onGameBankOpeReturn(succeeded, gold, bank){},

    onShowGameSystemMsg(msg){},

    onSpeaker(msg, priorty){},
});

GameLibSink.getInstance=function(){
    if(GameLibSink.instance == null)
    {
        GameLibSink.instance = new GameLibSink();
    }
    return GameLibSink.instance;
};

module.exports = GameLibSink