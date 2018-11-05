import { CMD_GP_LogonSuccess_Ex2 } from "./CMD_GP_LogonSuccess_Ex2"
import { PlazaCmds } from "./PlazaCmds"
import { ByteArray } from "../../common/ByteArray";
import { TSCommon } from "../../TSCommon";
import { CMD_GP_GetGameInfo } from "./CMD_GP_GetGameInfo"
import { tagGameStationEx } from "../tagGameStationEx";
import { tagGameServerEx } from "../tagGameServerEx";
import { GameIDList } from "./GameIDList";
import { CGameLib } from "../CGameLib";
import { tagGameKind } from "./tagGameKind";
import { tagVersionInfo } from "../tagVersionInfo";
import { tagClientInfo } from "../tagClientInfo";
import { tagConnectInfo } from "../tagConnectInfo";
import { CMD_CM_SysteMessage } from "../CMD_CM_SysteMessage";
import PublicUserInfo = require("../../PublicUserInfo");
enum LoginType {
    GetGameInfo = 0,
    GetServerList,
};

export class GamePlace {
    private m_plazaIP: string;
    private m_plazaPort: number;
    private m_webRoot: string;
    private m_socket: WebSocket;
    private m_socketType: number;
    private m_userLoginInfo: CMD_GP_LogonSuccess_Ex2;
    private m_pSink;
    private m_gameIDList: GameIDList;
    private m_gameLib: CGameLib;
    private m_gameID: number;
    private _publicUserInfo: PublicUserInfo;
    private m_bRefreshServerList: boolean;
    public constructor(gameLib, publicUserInfo) {
        this.m_socketType = LoginType.GetGameInfo;
        this.m_pSink = null;
        this.m_gameLib = gameLib;
        this.m_gameIDList = new GameIDList();
        this._publicUserInfo = publicUserInfo;
        TSCommon.log("password for gameplace = " + publicUserInfo.encryptPassword);
    }

    public getGameLib(): CGameLib {
        return this.m_gameLib;
    }

    public setSink(sink) {
        this.m_pSink = sink;
    }

    public setGameID(gameid: number) {
        this.m_gameID = gameid;
    }

    public loginGame() {
        this.m_pSink.onLogonFinished();
    }

    public setServerIP(ip: string) {
        this.m_plazaIP = ip;
    }

    public setPort(port: number) {
        this.m_plazaPort = port;
    }

    public setWebRoot(webRoot: string) {
        this.m_webRoot = webRoot;
    }

    public getGameInfo() {
        this.initWebSocket();
    }

    private changeIP(ip: number): string {
        var ba: ByteArray = new ByteArray();
        ba.writeUnsignedInt(ip);
        ba.position = 0;
        return ba.readUnsignedByte() + "." + ba.readUnsignedByte() + "." + ba.readUnsignedByte() + "." + ba.readUnsignedByte();
    }

    private initWebSocket(): void {
        //创建 WebSocket 对象
        //this.m_socket = new WebSocket("ws://dged.ss2007.com:13502");
        this.m_socket = new WebSocket("wss://" + this.m_plazaIP + ":" + this.m_plazaPort);
        //设置数据格式为二进制，默认为字符串
        this.m_socket.binaryType = "arraybuffer";
        // //添加收到数据侦听，收到数据会调用此方法
        // this.m_socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        // //添加链接打开侦听，连接成功会调用此方法
        // this.m_socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        // //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        // this.m_socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        // //添加异常侦听，出现异常会调用此方法
        // this.m_socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        var socket: WebSocket = this.m_socket;
        var self = this;
        this.m_socket.onopen = function (evt) {
            console.log("websocket was opened.");
            self.sendGetGameInfo();
        };

        this.m_socket.onmessage = function (event) {
            self.onReceiveMessage(event.data);
        };

        this.m_socket.onerror = function (event) {
            console.log("Send Text fired an error");
            self.m_socket = null;
            self.m_pSink.onLogonFailed("网络连接失败，请检查网络后重新连接！",1);
        };

        this.m_socket.onclose = function (event) {
            console.log("onclose");
            self.m_socket = null;
        };
    }

    private closeSocket(): void {
        if (!this.m_socket)
            return;
        this.m_socket.close();
    }

    private onReceiveMessage(arraybuffer: ArrayBuffer): void {
        //创建 ByteArray 对象        
        var byte: ByteArray = new ByteArray(arraybuffer);
        //读取数据
        var nLen = byte.length;
        var cbMainCmd = byte.readUnsignedByte();
        var cbSubCmd = byte.readUnsignedByte();
        var cbHandleCode = byte.readUnsignedByte();

        var nRealDataLen = nLen - 4;
        if (nRealDataLen <= 0) {
            if (nLen < 3)
                return;

            this.recvData(cbMainCmd, cbSubCmd, cbHandleCode, null);
            return
        }
        var data: ByteArray = new ByteArray();
        byte.readUnsignedByte();
        byte.readBytes(data);
        this.recvData(cbMainCmd, cbSubCmd, cbHandleCode, data);
        TSCommon.log("onReceiveMessage main = " + cbMainCmd + ",sub = " + cbSubCmd + ",len = " + data.length);
    }

    private recvData(cbMainCmd: number, cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        switch (cbMainCmd) {
            case PlazaCmds.MAIN_GP_LOGON:
                this.onMainLogonMessage(cbSubCmd, cbHandleCode, buf);
                return;
            case PlazaCmds.MAIN_GP_SERVER_LIST:
                this.onMainServerListMessage(cbSubCmd, cbHandleCode, buf);
                return;
            case PlazaCmds.MAIN_CM_SERVICE:
                this.onMainSystemMessage(cbSubCmd, cbHandleCode, buf);
                return;
            case PlazaCmds.MAIN_GP_CONFIG:
                this.onMainConfig(cbSubCmd, cbHandleCode, buf)
                return;
            default:
                this.trace("onrecv main = " + cbMainCmd + ",sub = " + cbSubCmd);
                break;
        }
    }

    private onMainLogonMessage(cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        switch (cbSubCmd) {
            case PlazaCmds.SUB_GP_GAMEINFO: {
                this.m_userLoginInfo = new CMD_GP_LogonSuccess_Ex2();
                this.m_userLoginInfo.deserialize(buf);
                TSCommon.log("SUB_GP_GAMEINFO userdbid = " + this.m_userLoginInfo.nUserDBID);
                this.getUserGameInfo();
                return;
            }

        }
        TSCommon.log("onMainLogonMessage,sub = " + cbSubCmd);
    }

    private getUserGameInfo() {
        // 获取游戏相关信息，暂时无用
    }
    public getUserLoginInfo() {
        return this.m_userLoginInfo;
    }

    public clearServerList() {
        this.m_gameIDList.clearServerList();
    }

    public getStationOnlineCount(nStationID){
        return this.m_gameIDList.getStationOnlineCount(this._dwGameID,nStationID)
    }

    private onMainServerListMessage(cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        switch (cbSubCmd) {
            case PlazaCmds.SUB_GP_SERVER_LIST_TYPE_V1: {
                var typeCount: number = buf.length / 21;
                TSCommon.log("SUB_GP_SERVER_LIST_TYPE_V1 typecount = " + typeCount);
                return;
            }
            case PlazaCmds.SUB_GP_SERVER_LIST_KIND: {
                if (buf == null) {
                    TSCommon.log("SUB_GP_SERVER_LIST_KIND kindCount = 0");
                    return;
                }
                var kindCount: number = buf.length / tagGameKind.getLen();
                for (var i = 0; i < kindCount; i++) {
                    var gameKind: tagGameKind = new tagGameKind();
                    gameKind.deserialize(buf);
                    this.m_gameIDList.addGameID(gameKind.dwKindID);
                    TSCommon.log("KindID = " + gameKind.dwKindID);
                }
                TSCommon.log("SUB_GP_SERVER_LIST_KIND kindCount = " + kindCount);

                if (cbHandleCode == 0) {
                    this.m_bRefreshServerList = false;
                    this.sendServerListCmd();
                }
                return;
            }
            case PlazaCmds.SUB_GP_SERVER_LIST_STATION: {
                var stationCount: number = buf.length / tagGameStationEx.getLen();
                TSCommon.log("SUB_GP_SERVER_LIST_STATION count = " + stationCount);
                if (stationCount == 0) {
                    return;
                }
                for (var i: number = 0; i < stationCount; i++) {
                    var station: tagGameStationEx = new tagGameStationEx();
                    station.deserialize(buf);
                    this.addGameStation(station);
                    TSCommon.log("station name = " + station.szStationName + ",id=" + station.dwParentID);
                }
                return;
            }
            case PlazaCmds.SUB_GP_SERVER_LIST_ROOM: {
                // 不处理
                if (buf == null) {
                    TSCommon.log("SUB_GP_SERVER_LIST_ROOM  buf null");
                    return;
                }
                var stationCount: number = buf.length / tagGameServerEx.getLen();
                TSCommon.log("SUB_GP_SERVER_LIST_ROOM count = " + stationCount);
                if (stationCount == 0) {
                    return;
                }
                for (var i: number = 0; i < stationCount; i++) {
                    var room: tagGameServerEx = new tagGameServerEx();                    
                    room.deserializeEx(buf);                    
                    room = this.addGameServer(room);
                    if (room) {
                        var station = this.getGameStation(room.dwStationID);
                        if (station) {
                            station.dwMinGold = room.dwMinGold;
                            station.dwRuleID = room.dwRuleID;
                        }
                        TSCommon.log("server name exist = " + room.szGameRoomName);
                    }

                }
                return;
            }
            case PlazaCmds.SUB_GP_SERVER_LIST_ROOM_EX: {
                if (buf == null) {
                    TSCommon.log("SUB_GP_SERVER_LIST_ROOM_EX  buf null");
                    return;
                }
                var stationCount: number = buf.length / tagGameServerEx.getExtraInfoLen();
                TSCommon.log("SUB_GP_SERVER_LIST_ROOM_EX count = " + stationCount + ",handleCode = " + cbHandleCode);
                for (var i: number = 0; i < stationCount; i++) {
                    var serverID: number = buf.readUnsignedInt();
                    var room = this.m_gameIDList.getGameServer(serverID);
                    if (room) {
                        room.deserializeExtraInfo(buf);
                        var station = this.getGameStation(room.dwStationID);
                        if (station) {
                            station.dwMinGold = room.dwMinGold;
                            station.dwRuleID = room.dwRuleID;
                        }
                    }

                }
                if (cbHandleCode == 0) {

                }
                return;
            }
            default:
                break;
        }
        TSCommon.log("onMainServerListMessage,sub = " + cbSubCmd);
    }

    private sendServerListCmd() {
        var ba: ByteArray = new ByteArray();
        ba.writeInt(1);
        ba.writeInt(this.m_gameID);
        var version: tagVersionInfo = this.getGameLib().VersionInfo;
        version.serialize(ba);
        this.sendData(PlazaCmds.MAIN_GP_SERVER_LIST, PlazaCmds.SUB_GP_GET_SERVER_LIST, ba);
    }

    private onMainSystemMessage(cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        switch (cbSubCmd) {
            case PlazaCmds.SUB_CM_MESSAGE: {
                var msg: CMD_CM_SysteMessage = new CMD_CM_SysteMessage();
                msg.deserialize(buf);
                TSCommon.log("SUB_CM_MESSAGE:" + msg.szMessage);
                if (msg.bCloseLine > 0)
                    this.m_socket.close();
                if (msg.wMessageLen > 0)
                    this.m_pSink.onLogonFailed(msg.szMessage,2);
                return;
            }
            default:
                break;
        }
        TSCommon.log("onMainSystemMessage,sub = " + cbSubCmd);
    }

    private onMainConfig(cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        TSCommon.log("onMainConfig,sub = " + cbSubCmd);
    }

    private trace(msg: any): void {
        TSCommon.log(msg);
    }

    private sendGetGameInfo() {
        var l: CMD_GP_GetGameInfo = new CMD_GP_GetGameInfo();
        l.nUserDBID = this._publicUserInfo.userDBID;
        l.nPartnerID = 1;
        l.nVersionCode = 1;
        l.ClientInfo = new tagClientInfo();
        l.VersionInfo = new tagVersionInfo();
        l.password = this._publicUserInfo.encryptPassword;
        var ba: ByteArray = new ByteArray();
        l.serialize(ba);
        this.sendData(PlazaCmds.MAIN_GP_LOGON, PlazaCmds.SUB_GP_GET_GAMEINFO_EX, ba);
    }

    private sendData(mainCmd: number, subCmd: number, ba: ByteArray) {
        var b: ByteArray = new ByteArray();
        b.writeByte(mainCmd);
        b.writeByte(subCmd);
        b.writeByte(0);
        b.writeByte(0);
        b.writeBytes(ba);
        //TSCommon.log("sendData len = " + b.length);
        if (!this.m_socket) { return; }
        if (this.m_socket.readyState === WebSocket.OPEN) {
            this.m_socket.send(b.buffer);
        }
    }

    public getGameStation(stationID: number): tagGameStationEx {
        return this.m_gameIDList.getStation(stationID);
    }

    public getGameServer(gameserverID: number): tagGameServerEx {
        return this.m_gameIDList.getGameServer(gameserverID);
    }


    public getServerByIPAndPort(ipaddress: string, port: number){
        var gameServerList = this.getAllGameServerList();

        for(var i = 0; i < gameServerList.length; i++){
            if(this.changeIP(gameServerList[i].dwServerIP) == ipaddress && 
            gameServerList[i].uServerPort == port){
                return gameServerList[i];
            }
        }

        return null;
    }

    public getStationList(): tagGameStationEx[] {
        var stationList = this.m_gameIDList.getStationList(this.m_gameID);
        if (stationList.length == 0) {
            this.m_gameIDList.addGameID(this._dwGameID);
            //this.requestServerList()
        }
        return stationList;
    }

    public getGameServerList(stationID: number): tagGameServerEx[] {
        return this.m_gameIDList.getGameServerList(this.m_gameID, stationID);
    }

    public getAllGameServerList(): tagGameServerEx[] {
        return this.m_gameIDList.getAllGameServerList(this.m_gameID);
    }

    public getAutoEnterRoom(lpszStation: string) {
        var server = null;
        var full = 0xFFFF;

        var minServer = null;

        var dwFocusStationID = -1;
        //优先进入更大额房间
        var nMinGold = 0;
        var stationList = this.getStationList();
        for (var i = 0; i < stationList.length; i++) {
            var gameStation = stationList[i];
            //TSCommon.log("getAutoEnterRoom station = " + gameStation.szStationName);
            if (lpszStation != null && (lpszStation.length) > 0) {
                if ((gameStation.szStationName.indexOf(lpszStation)) >= 0) {
                    dwFocusStationID = gameStation.dwStationID;
                    //TSCommon.log("getAutoEnterRoom focusid = " + dwFocusStationID);
                    break;
                }
            }
        }

        var gameList = this.getAllGameServerList();
        for (var i = 0; i < gameList.length; i++) {
            var room = gameList[i];
            //TSCommon.log("getAutoEnterRoom room = " + room.szGameRoomName + ",stationid = " + room.dwStationID);
            if (dwFocusStationID != -1) {
                if (room.dwStationID != dwFocusStationID) {
                    continue;
                }
            }

            if (minServer == null) {
                minServer = room;
            } else {
                if (minServer.dwMinGold > room.dwMinGold) {
                    minServer = room;
                }

            }

            //增加一个金额判断
            if (room.dwMaxGold != 0 && room.dwMaxGold < this._publicUserInfo.nGold)
                continue;

            if (room.dwMinGold != 0 && room.dwMinGold > this._publicUserInfo.nGold)
                continue;


            var tempFull = room.wMaxOnLineCount * 4 / 5 - room.wOnLineCount;
            if (tempFull <= 0)
                continue;
            if (server == null) {
                server = room;
            }

            var nTempMinGold = room.dwMinGold;
            if (nTempMinGold > nMinGold) {
                nMinGold = nTempMinGold;
                server = room;
            }
        };
        if (server == null)
            server = minServer;
        return server;
    }

    public addGameStation(pStation: tagGameStationEx): tagGameStationEx {
        // 先看是否存在
        return this.m_gameIDList.addStation(pStation);
    }

    public addGameServer(pGameServer: tagGameServerEx): tagGameServerEx {
        return this.m_gameIDList.addGameServer(pGameServer);
    }
}