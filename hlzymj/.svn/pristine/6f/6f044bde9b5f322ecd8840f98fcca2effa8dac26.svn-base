
import { ByteArray } from "../common/ByteArray";
import {CGameLib} from "../gamelib/CGameLib";
import {TSCommon} from "../TSCommon";
var  ClientFrameSink = cc.Class({	 
    ctor:function()
    {
        this.m_dataEventHandler = null;
    },
    onSceneChanged:function(data){
        
		if(this.m_dataEventHandler){
			this.m_dataEventHandler.emit("onSceneChanged", {data:data})
        }
        else{
            var callback = function(){
                this.onSceneChanged(data)
            };
            TSCommon.performWithDelay(this, callback, ClientFrameSink.N_DELAYTIME);
        }

    },
    onPlayerStateChanged:function(chair, oldState, newState){
        
        if(this.m_dataEventHandler){
            this.m_dataEventHandler.emit("onPlayerStateChanged", {
                chair : chair,
                nOldState : oldState,
                nNewState : newState,
            })
        }
        else{
            var callback = function(){
                this.onPlayerStateChanged(chair, oldState, newState)
            };
            TSCommon.performWithDelay(this, callback, ClientFrameSink.N_DELAYTIME);
        }
    },
    onGetMainVersion:function(){
        return 1;
    },
    onGetSubVersion:function(){
        return 1;
    },

    onGameStart:function(){

    },

    onGameMessage:function(chair, cbCmdID, data){
        
		if(this.m_dataEventHandler){
			this.m_dataEventHandler.emit("onGameMessage", {
				chair:chair, 
				cCmdID:cbCmdID,
				data:data,
			})
        }
        else{
            var callback = function(){
                this.onGameMessage(chair, cbCmdID, data)
            };
            TSCommon.performWithDelay(this, callback, ClientFrameSink.N_DELAYTIME);
        }
    },
    onGameEnd:function(data){

    },
    onGameOption:function(option){

    },
    onUserEnterTable:function(chair, wUserID, isPlayer){
        
        if(this.m_dataEventHandler){
            cc.log("onUserEnterTable ========");
            this.m_dataEventHandler.emit("onUserEnterTable", {
                chair:chair,
                wUserID:wUserID,
                isPlayer:isPlayer,
            })
        }
        else{
            var callback = function(){
                this.onUserEnterTable(chair, wUserID, isPlayer)
            }
            TSCommon.performWithDelay(this, callback, ClientFrameSink.N_DELAYTIME);
        }
    },
    onUserExitTable(chair, wUserID, isPlayer){   
        cc.log("onUserExitTable ========");
        if(this.m_dataEventHandler){
            this.m_dataEventHandler.emit("onUserExitTable", {
                chair:chair,
                wUserID:wUserID,
                isPlayer:isPlayer,
            })
        }
        else{
            var callback = function(){
                this.onUserExitTable(chair, wUserID, isPlayer)
            }
            TSCommon.performWithDelay(this, callback, ClientFrameSink.N_DELAYTIME);
        }
    },
    onNotEnoughGold:function(nMinGold, nMaxGold){

    },
    onTableSound:function(nChair, pBuf){

    },
    onGameSystemMsg:function(msg){

    },
});

ClientFrameSink.N_DELAYTIME = 1;

module.exports = ClientFrameSink;