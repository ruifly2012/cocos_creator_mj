import { TSCommon } from "../TSCommon";
import { GameRoom } from "./room/GameRoom";
import { GamePlace } from "./place/GamePlace";
import { ClientFrame } from "./frame/ClientFrame";
import { IClientFrameSink } from "./IClientFrameSink";
import { ByteArray } from "../common/ByteArray";
import { CDefaultGameLibSink } from "./CDefaultGameLibSink";
import { Domain } from "../Domain";
import PublicUserInfo = require("../PublicUserInfo");
import { tagClientInfo } from "./tagClientInfo";
import { tagVersionInfo } from "./tagVersionInfo";
import { tagConnectInfo } from "./tagConnectInfo";
import { tagGameStationEx } from "./tagGameStationEx";
import { tagGameServerEx } from "./tagGameServerEx";

export class CGameLib {
    private _gamePlace: GamePlace;
    private _gameRoom: GameRoom;
    private _clientframeSink;
    private _nGameID: number;
    private _gameVersion: number;
    private _publicUserInfo: PublicUserInfo;
    private _sink;
    private _defaultSink;
    public ClientInfo: tagClientInfo;
    public VersionInfo: tagVersionInfo;
    public ConnectInfo: tagConnectInfo;
    private static _instance: CGameLib;
    public static getInstance() {
        if (this._instance)
            return this._instance;
            console.log("创建gamelib .......")
        this._instance = new CGameLib();
        return this._instance;
    }

    private constructor() {
        this.ClientInfo = new tagClientInfo();
        this.VersionInfo = new tagVersionInfo();
        this.ConnectInfo = new tagConnectInfo();
    }

    public createByHall(publicUserInfo, logonIP, logonPort) {
        this._publicUserInfo = publicUserInfo;
        this._gameVersion = 1;
        this._defaultSink = new CDefaultGameLibSink();
        this._sink = this._defaultSink;

        this._gamePlace = new GamePlace(this, publicUserInfo);
        this._gameRoom = new GameRoom(this, publicUserInfo);

        this.setPlazaPort(logonPort);
        this.setPlazaIP(logonIP);
        this._gamePlace.setSink(this._sink);
        this.getGameInfo();
    }


    public createGamelib(nGameID: number, nGameVersion: number, pGameLibSink, pClientFrameSink,
        nPartnerID: number, nClientVersion: number, logonIP: string, logonPort: number, webRoot: string) {
        if (!pGameLibSink)
            pGameLibSink = this._sink;

        this._sink = pGameLibSink;
        this._nGameID = nGameID;
        this._gameVersion = nGameVersion;

        this._gameRoom.setSink(this._sink);
        this._gameRoom.setClientFrameSink(pClientFrameSink);
        this._gamePlace.setSink(pGameLibSink);
        this._gamePlace.setGameID(nGameID);

        this.setWebRoot(webRoot)
        this._gamePlace.loginGame();
    }

    public backToHall() {
        this._sink = this._defaultSink
        this._gameRoom.setSink(this._sink)
        this._gameRoom.setClientFrameSink(null)
        this._gamePlace.setSink(this._sink)
        this._gamePlace.setGameID(0)
    }

    public setPlazaIP(plazaIP: string) {
        this._gamePlace.setServerIP(plazaIP);
    }

    public setPlazaPort(port: number) {
        this._gamePlace.setPort(port);
    }

    public getGameInfo() {
        return this._gamePlace.getGameInfo();
    }

    public setWebRoot(webRoot: string) {
        this._gamePlace.setWebRoot(webRoot);
    }

    public getUserLogonInfo() {
        return this._gamePlace.getUserLoginInfo();
    }

    public getGameStation(stationID: number): tagGameStationEx {
        return this._gamePlace.getGameStation(stationID);
    }

    public getGameServer(gameserverID: number) {
        return this._gamePlace.getGameServer(gameserverID);
    }

    public getStationList() {
        return this._gamePlace.getStationList();
    }

    public getGameServerList(stationID: number) {
        return this._gamePlace.getGameServerList(stationID);
    }

    public getAllGameServerList() {
        return this._gamePlace.getAllGameServerList();
    }

    public enterGameRoom(roomID: number): string {
        var gameServer: tagGameServerEx = this.getGameServer(roomID);
        if (gameServer == null)
            return "";
        if (!this._gameRoom.enterGameRoom(gameServer,
            this._publicUserInfo.userDBID, this._publicUserInfo.encryptPassword, this._gameVersion))
            return "";
        return gameServer.szGameRoomName;
    }

    public autoEnterGameRoom(station: string): string {
        var room = this._gamePlace.getAutoEnterRoom(station);
        if (room != null) {
            TSCommon.log("autoEnterGameRoom " + room.szGameRoomName);
            this.enterGameRoom(room.dwServerID);
            var pStation = this._gamePlace.getGameStation(room.dwStationID);
            if (pStation) {
                return pStation.szStationName;
            }
            return room.szGameRoomName
        }
        TSCommon.log("autoEnterGameRoom 找不到对应的房间 " + station + ",id = " + this._nGameID);
        return "";
    }

    public enterGameRoomByIP(ipaddress: string, port: number){

        return this._gameRoom.enterGameRoomByIP(ipaddress, port, this._publicUserInfo.userDBID, this._publicUserInfo.encryptPassword, 
            this._gameVersion, this._gamePlace.getServerByIPAndPort(ipaddress, port));
    }

    public leaveGameRoom() {
        this._gameRoom.leftRoom();
    }

    public getMyself() {
        return this._gameRoom.getMyself();
    }


    public getUser(wUserID: number) {
        return this._gameRoom.getUser(wUserID);
    }

    public getUserByDBID(dwUserDBID: number) {
        return this._gameRoom.getUserByDBID(dwUserDBID);
    }


    public sitTable(tableID: number, cbChair: number) {
        if (this._nGameID == 125) {
            return this._gameRoom.sendWatchMessage(0, 0);
        }

        return this._gameRoom.enterTable(tableID, cbChair);
    }

    public autoSit() {
        TSCommon.log("autoSit gameid = " + this._nGameID);
        if (this._nGameID == 88) {
            return this._gameRoom.sendWatchMessage(0, 0);
        }
        return this._gameRoom.autoSit();
    }

    public isPlaying() {
        var p = this.getMyself();
        if (p == null) {
            return false;
        }
        return p.isPlayer();
    }

    public sendGameCmd(cbCmdID: number, data: ByteArray) {
        return this._gameRoom.sendGameCmd(cbCmdID, data);
    }

    public sendReadyCmd() {
        return this._gameRoom.sendReady();
    }

    public sendCancelReadyCmd() {
        return this._gameRoom.sendCancelReady();
    }

    public getUserByChair(cbChair: number) {
        return this._gameRoom.getUserByChair(cbChair);
    }

    public sendCommand(cbMainCmd: number, cbSubCmd: number, data: ByteArray) {
        return this._gameRoom.sendCommand(cbMainCmd, cbSubCmd, 0, data);
    }

    public sendOldCmd(cbCmdID: number, data: ByteArray) {
        return this._gameRoom.sendOldGameCmd(cbCmdID, data);
    }

    public setClientFrameSink(sink: IClientFrameSink) {
        this._clientframeSink = sink;
        this._gameRoom.setClientFrameSink(sink);
    }

    public standUp() {
        this._gameRoom.standup();
    }

    public getCurrentGameRoom() {
        return this._gameRoom.getCurrentGameRoom();
    }

    public isInPrivateRoom(){
        if(this._gameRoom.isServicing()){
            return this._gameRoom.isPrivteRoom();
        }

        return false;
    }

    public watch(t: number, c: number) {
        this._gameRoom.sendWatchMessage(t, c);
    }

    public sendTableChat(lpszMsg: string) {
        return this._gameRoom.sendTableChat(lpszMsg);
    }

    public getRelativePos(cbChair: number) {
        if (!this._gameRoom.isServicing()) {
            return cbChair;
        }
        return this._gameRoom.getRelativePos(cbChair);
    }

    public getRealChair(cbPos: number) {
        if (!this._gameRoom.isServicing()) {
            return cbPos;
        }
        return this._gameRoom.getRealChair(cbPos);
    }
    public formatMoney(lMoney: number) {
        var ret = null;
        var bNegative = false;
        if (lMoney < 0) { bNegative = true; }

        var lValue = Math.abs(lMoney);

        if (lValue < 10000) {
            var lpsz = (bNegative ? "-" : "") + lValue;
            return lpsz;
        }
        if (lValue < 100000000) {
            return bNegative ? "-" : "" + lValue / 10000 + lValue % 10000;
        }

        return bNegative ? "-" : "" + lValue / 100000000 + (lValue % 100000000) / 10000 + lValue % 10000;
    }
    //获取我的网络延时
    public getNetLag() {
        return this._gameRoom.getNetLag();
    }

    //获取桌子列表
    public GetTableList() {
        return this._gameRoom.getTableList();
    }

    //获取桌子
    public getTable(tableID) {
        return this._gameRoom.getTable(tableID);
    }
    public getUserList() {
        return this._gameRoom.getUserList();
    }


    public sendVoice(voiceData: ByteArray) {
        this._gameRoom.sendSoundToTableUser(voiceData);
    }

    public isServicing() {
        return this._gameRoom.isServicing();
    }

    public refreshGold() {
        //cclog("CGameLibLua:refreshGold()")
        if (this._gameRoom != null && this._gameRoom.isServicing())
            this._gameRoom.refreshGold();

        //this._gamePlace.getUserGameInfo();
    }
    public getStationOnlineCount(nStationID){
        return this._gamePlace.getStationOnlineCount(nStationID)
    }
}
