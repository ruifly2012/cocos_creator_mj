import { ByteArray } from "../../common/ByteArray";
import { TSCommon } from "../../TSCommon";
import { UserInfo } from "../UserInfo";
import { IGameLibSink } from "../IGameLibSink";
import { IClientFrameSink } from "../IClientFrameSink";
import { ClientFrame } from "../frame/ClientFrame";
import { tagGameServerEx } from "../tagGameServerEx";
import { UserManager } from "../room/UserManager";
import { TableManager } from "../room/TableManager";
import { GameCmds } from "../room/GameCmds";
import { tagClientInfo } from "../tagClientInfo";
import { CGameLib } from "../CGameLib";
import { ScoreParser } from "./ScoreParser";
import { tagUserInfoBroad } from "./tagUserInfoBroad";
import { gamelibcommon } from "../gamelibcommon";
import { Chair } from "../Chair";
import { CMD_GR_BroadCast_UserStatus } from "./CMD_GR_BroadCast_UserStatus";
import { HtmlChat } from "./HtmlChat";
import { CMD_GR_BroadCast_UserScore } from "../room/GameCmds";
import { CMD_GR_BroadCast_TableStatus } from "../room/GameCmds";
import { CMD_GR_GameInfo } from "../room/GameCmds";
import { CMD_CM_SysteMessage } from "../CMD_CM_SysteMessage";
import { CMD_CM_SysteMessageEx } from "../CMD_CM_SysteMessage";
import { CMD_GR_RoomOption } from "../room/GameCmds";
import { CMD_GR_Req_UserSit } from "../room/GameCmds";
import { CMD_GR_Req_UserLookOn } from "../room/GameCmds";
import { FrameCmds } from "../frame/FrameCmds";
import { Table } from "../Table";
import { CMD_GR_Logon_ByVnet } from "./CMD_GR_Logon_ByVnet";
import PublicUserInfo = require("../../PublicUserInfo");
import HallUtils = require("../../HallUtils");
import { StringConvert } from "../../common/StringConvert";

export class GameRoom {
    private m_socket: WebSocket;
    private m_mySelf: UserInfo;
    private m_sink: IGameLibSink;
    private m_clientFrameSink: IClientFrameSink;
    private m_clientFrame: ClientFrame;
    private m_dwLastPingTime: number;
    private m_pGameServer: tagGameServerEx;
    private m_dwUserID: number;
    private m_gameVersion: number;
    private m_userManager: UserManager;
    private m_tableManager: TableManager;
    private m_wLastFindTable: number;
    private m_pGameLib: CGameLib;
    private m_bIsPrivateRoom : boolean;
    private m_dwLastSendTableChat: number;
    private m_cbLastChairID: number;
    private m_nNetLag: number;
    private m_nSendPingTime: number;
    private m_timer_ping: number;
    private m_lostPingCount: number;

    private m_uPort: number;
    private m_strServerIP: string;
    private m_dwServerIP: number;
    private m_szPass: string;    

    private LAST_PING_LOST_TIME: number = 5000;
    
    private _publicUserInfo: PublicUserInfo;
    public constructor(pGameLib: CGameLib,publicUserInfo) {
        this.m_socket = null;
        this.m_mySelf = null;
        
        
        this.m_pGameLib = pGameLib;
        this.m_clientFrame = new ClientFrame(this,pGameLib);
        this.m_dwLastPingTime = 0;
        this.m_lostPingCount = 0;
        this.m_userManager = new UserManager();
        this._publicUserInfo = publicUserInfo;
    }

    public setSink(pSink){
        this.m_sink = pSink;
    }


    public enterGameRoom(gameServer: tagGameServerEx, userID: number, password: string, version: number): boolean{
        if (gameServer == null)
            return false;
        if (this.isServicing()) {
            this.trace("enterGameRoom close");
            this.m_socket.close();
            this.m_socket = null;
        }
        this.m_dwServerIP = gameServer.dwServerIP;
        this.m_strServerIP = this.changeIP(this.m_dwServerIP);
        this.m_uPort = gameServer.uServerPort;
        this.m_pGameServer = gameServer;
        this.m_dwUserID = userID;
        this.m_szPass = password;
        this.m_gameVersion = version;
        if (this.m_socket == null) {
            this.initWebSocket(this.m_strServerIP, this.m_uPort);
        }
    }

    public enterGameRoomByIP(ipaddress: string, port: number, userID: number, password: string, version: number, gameServer: tagGameServerEx) {
        if (this.isServicing()) {
            this.trace("enterGameRoomByIP close");
            this.m_socket.close();
            this.m_socket = null;
        }        
        this.m_strServerIP = ipaddress;
        this.m_uPort = port;
        this.m_pGameServer = gameServer;
        this.m_dwUserID = userID;
        this.m_szPass = password;
        this.m_gameVersion = version;
        if (this.m_socket == null) {
            this.initWebSocket(this.m_strServerIP, this.m_uPort);
        }
    }

    public getCurrentGameRoom(){
        if (!this.isServicing())
            return;
        return this.m_pGameServer;
    }

    public isServicing(): boolean {
        if (this.m_socket == null)
            return false;
        if(this.m_socket.readyState != WebSocket.OPEN)
            return false;
        return this.m_mySelf != null;
    }

    private changeIP(ip: number): string {
        var ba: ByteArray = new ByteArray();
        ba.writeUnsignedInt(ip);
        ba.position = 0;
        return ba.readUnsignedByte() + "." + ba.readUnsignedByte() + "." + ba.readUnsignedByte() + "." + ba.readUnsignedByte();
    }

    private initWebSocket(serverIP: string,serverPort:number): void {
        //创建 WebSocket 对象
        // this.m_socket = new WebSocket();
        // //设置数据格式为二进制，默认为字符串
        // this.m_socket.type = WebSocket.TYPE_BINARY;
        // //添加收到数据侦听，收到数据会调用此方法
        // this.m_socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        // //添加链接打开侦听，连接成功会调用此方法
        // this.m_socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        // //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        // this.m_socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        // //添加异常侦听，出现异常会调用此方法
        // this.m_socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        // //连接服务器
        // this.m_socket.connect(serverIP, serverPort);
        
        serverIP = HallUtils.getDoMainFromIp(serverIP);
       

        TSCommon.log("connect to " + serverIP + ":" + serverPort);
        this.m_socket = new WebSocket("wss://" + serverIP + ":" + serverPort);
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
            self.onSocketOpen();
        };        

        this.m_socket.onmessage = function (event) {           
            self.onReceiveMessage(event.data);
        };

        this.m_socket.onerror = function (event) {
            self.onSocketError();
            self.m_socket = null;
        };

        this.m_socket.onclose = function (event) {
            self.trace("this.m_socket.onclose");
            self.onSocketClose();
            self.m_socket = null;
        };
    }  

    private onSocketOpen(): void {
        this.trace("WebSocketOpen");
        this.sendLoginCmd();
        this.m_dwLastPingTime =new Date().getTime();
        this.startCheckPing()
    }

    private onSocketClose(): void {
        this.trace("WebSocketClose");
        this.m_mySelf = null;
        this.m_pGameServer = null;
        if (this.m_userManager)
            this.m_userManager.clearAllUser();
        this.m_clientFrame.clear();
        /*if (this.m_socket)
            this.m_socket.close();*/
        
        this.m_socket = null;
        
        this.m_cbLastChairID = 0xff;
        this.m_pGameLib.refreshGold();
        this.m_sink.onRoomConnectClosed();
        this.stopCheckPing();
    }

    private onSocketError(): void {
        this.trace("WebSocketError");
    }

    private onReceiveMessage(arrayBuffer: ArrayBuffer): void {
        //创建 ByteArray 对象
        var byte: ByteArray = new ByteArray(arrayBuffer);
        //读取数据
        var nLen = byte.length;
        var cbMainCmd = byte.readUnsignedByte();
        this.trace("onReceiveMessage mainCmd = " + cbMainCmd + ",len = " + nLen);

        if(cbMainCmd < 100){
            var data: ByteArray = new ByteArray();            
            byte.readBytes(data);
            this.recvData(cbMainCmd, 0, 0, data);
            return;
        }

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
    }

    private recvData(cbMainCmd: number, cbSubCmd: number, cbHandleCode: number, buf: ByteArray) {
        var s: string = "Recv other MainCmd = " + cbMainCmd + " SubCmd = " + cbSubCmd;
        //this.trace(s);
        switch (cbMainCmd) {
            case GameCmds.MAIN_GR_LOGON:
                return this.recvLogonMessage(cbSubCmd, cbHandleCode, buf);
            case GameCmds.MAIN_GR_ROOM_STATUS:
                return this.recvRoomStatus(cbSubCmd, cbHandleCode, buf);            
            case GameCmds.MAIN_GR_CONFIG:
                return this.recvConfigMsg(cbSubCmd, cbHandleCode, buf);
            case GameCmds.MAIN_GR_USER:
                return this.recvUserMessage(cbSubCmd, cbHandleCode, buf);
            case GameCmds.CMD_HTML_HALL_CHAT:
                return ;
            case GameCmds.CMD_HTML_TABLE_CHAT:
                return this.recvTableChat(buf);            
            case GameCmds.CMD_MANAGER:
                // 网管命令，暂时不处理                
                return true;
            case GameCmds.CMD_SERVER_PING:
                // 服务器ping
                //if (nLen!=1+4) return true;
                var data: ByteArray = new ByteArray();
                data.writeInt(0);
                this.sendOldCommand(GameCmds.CMD_SERVER_PING, GameCmds.IDC_SP_ANWSER_PING, data);
                return true;

            case GameCmds.MAIN_CM_SERVICE:
                return this.recvCMMessage(cbSubCmd, buf);
            case GameCmds.MAIN_CM_DOWN_LOAD:
                // 下载，不处理
                return true;
            case GameCmds.CMD_GAME: // 游戏命令
                this.m_clientFrame.recvGameCmd(buf);
                return true;
            case GameCmds.CMD_USER:
                {
                    var cbSubCmd = buf.readUnsignedByte();
                    if (cbSubCmd == GameCmds.IDS_USER_ANS_SIT_DOWN) {
                        var bEnable = (buf.readByte() != 0);
                        if (!bEnable)
                            this.m_sink.onShowAlertMsg("坐下失败");
                    }
                    return true;
                }
            case GameCmds.CMD_PING_USER:
                this.recvAnswerPing();
                return true;
            default:
                var s: string = "Recv other MainCmd = " + cbMainCmd + " SubCmd = " + cbSubCmd;
                this.trace(s);
                break;
        }
        return true;
    }

    private recvLogonMessage(cbSubCmd: number, cbHandleCode: number, buf: ByteArray): boolean	{
        buf.position = 0;
        switch (cbSubCmd) {
            case GameCmds.SUB_GR_LOGON_SUCCESS:
                this.trace("SUB_GR_LOGON_SUCCESS");
                var uUserID: number = buf.readUnsignedInt();
                //GlobalObjects.g_MainPage.SetConnectingViewContent("登录房间成功，正在获取房间信息,请稍候......");

                this.m_userManager.clearAllUser();
                this.m_userManager.setMyDBID(uUserID);
                this.m_sink.onLogonGameRoomSucceeded();
                break;
            case GameCmds.SUB_GR_LOGON_FINISH:
                //发送房间设置
                this.sendOptionsMessage();
                this.m_sink.onEnteredGameRoom(this.m_tableManager.getTableCount(), this.m_tableManager.getChairCount());                
                this.m_dwLastSendTableChat = 0
                break;
        }
        return true;
    }

    private recvRoomStatus(cbSubCmd: number, cbHandleCode: number, buf: ByteArray): boolean{
        switch (cbSubCmd) {
            case GameCmds.SUB_GR_BROADCAST_TABLE_STATUS:		//广播桌子状态
                {
                    //trace("SUB_GR_BROADCAST_TABLE_STATUS");
                    //if (m_TableManager == null)
                    //	return true;
                    //处理数据
                    var pTableStatus: CMD_GR_BroadCast_TableStatus = new CMD_GR_BroadCast_TableStatus();
                    pTableStatus.deserialize(buf);
                    var table: Table = this.m_tableManager.getTable(pTableStatus.wTableID);

                    if (table == null) {
                        this.trace("查找桌子失败");
                        return false;
                    }
                    table._isLocked = ((pTableStatus.cbTableStatus & Table.TABLE_LOCKED) != 0);
                    table._isPlaying = ((pTableStatus.cbTableStatus & Table.TABLE_PLAYING) != 0);
                    this.m_sink.onTableInfoChanged(pTableStatus.wTableID);
                    return true;
                }

            default:
                {
                    return true;
                }
        }
    }

    private recvConfigMsg(cbSubCmd: number, cbHandleCode: number, buf: ByteArray): boolean{
        switch (cbSubCmd) {
            case GameCmds.SUB_GR_ROOM_INFO:			//房间配置 
                {
                    this.trace("SUB_GR_ROOM_INFO");
                    var pGameInfo: CMD_GR_GameInfo = new CMD_GR_GameInfo();
                    pGameInfo.deserialize(buf);
                    if(pGameInfo.bufReserved.readUnsignedByte() > 1){
                        pGameInfo.bufReserved.readUnsignedByte(); 
                        let cbPrivate = pGameInfo.bufReserved.readUnsignedByte();       //数组从0 开始  第一个值解析的是长度
			            this.m_bIsPrivateRoom = (cbPrivate > 0);
                    }
                    this.m_tableManager = new TableManager(pGameInfo.wTableCount, pGameInfo.cbTableUser);
                    return true;
                }
            case GameCmds.SUB_GR_SCORE_HEADER:		//分数信息
                {
                    //Trace("GameCmds.SUB_GR_SCORE_HEADER");
                    ScoreParser.getInstance().setScoreHeader(buf);
                    return true;
                }  
            case GameCmds.SUB_GR_TABLE_INFO:		//分数信息
                {
                    var tableID: number = buf.readByte();
                    var table: Table = this.m_tableManager.getTable(tableID);
                    if (table) {
                        var tableBuf = new ByteArray();
                        buf.readBytes(tableBuf);
                        table.setTableBuffer(tableBuf);
                    }
                    return true;
                }
            case GameCmds.SUB_GR_COLUMN_INFO: {
                this.trace("SUB_GR_COLUMN_INFO " + buf.length);
                return true;
            }    
            default:
                {
                    this.trace("UnKnow MAIN_GR_CONFIG Message" + cbSubCmd);
                    return true;
                }
        }
    }

    private recvUserMessage(cbSubCmd:number, cbHandleCode:number, buf:ByteArray):boolean	{
        var ret: boolean;
        switch (cbSubCmd) {
            case GameCmds.SUB_GR_BROADCAST_USER_COME:		//用户进入
                {
                    ret = this.onSubUserComeMessage(buf);
                    break;
                }
            case GameCmds.SUB_GR_BROADCAST_USER_LEFT:		//用户离开
                {
                    ret = this.onSubUserLeftMessage(buf);
                    break;
                }
            case GameCmds.SUB_GR_BROADCAST_USER_STATUS:		//用户状态
                {
                    ret = this.onSubUserStatusMessage(buf);
                    break;
                }
            case GameCmds.SUB_GR_BROADCAST_USER_SCORE:		//用户分数
                {
                    ret = this.onSubUserScoreMessage(buf);
                    break;
                }
            case GameCmds.SUB_GR_CAN_SIT_TABLE_RESPONSE:
                {
                    return true;
                }
            case GameCmds.SUB_GR_BROADCAST_USER_FAME_EX:
                {
                    return false;
                }
            case GameCmds.SUB_GR_FRAG_COUNT:
                {
                    //this.m_pGameLib.updateMyFragCount(buf.readInt());
                    this._publicUserInfo.nFrag = buf.readUnsignedInt();
                    //EventDispatcher.getInstance().dispatch(EventDispatcher.onFragChanged, this._publicUserInfo.nFrag);
                    this.m_sink.onRoomUserInfoUpdated(this.m_mySelf.getUserID());
                    ret = true;
                    break;
                }
            case GameCmds.SUB_GR_BANK_VALUE:
                {
                    this.m_mySelf._bankValue = buf.readInt();
                    ret = true;
                    break;
                }
            default:
                {
                    this.trace("MAIN_GR_USER Message subid = " + cbSubCmd);
                    // 其他新命令码暂时不处理
                    ret = true;
                }
        }
        return ret;
    }

    private onSubUserComeMessage(buf:ByteArray):boolean{
        var user: tagUserInfoBroad = new tagUserInfoBroad();
        user.deserialize(buf);
        this.trace(user.szName + "进来了");
        var bExist = true
        var userItem = this.m_userManager.getUser(user.wUserIndex);

        if (userItem == null) {
            userItem = new UserInfo();
            bExist = false
        }
        // 如果是我自己        
        userItem._name = user.szName;
        userItem._userIndex = user.wUserIndex;
        userItem._userRountIC = user.wRoundCount;
        userItem._faceID = user.wFaceID;
        userItem._netLag = user.wNetTimelag;
        userItem._tableID = user.wTableID;
        userItem._chairID = user.cbChairID;
        userItem._status = user.cbUserStatus;
        userItem._userDBID = user.lUserDBID;
        userItem._groupID = user.dwGroupID;
        userItem._userLevel = user.dwUserLevel;
        userItem._sex = user.cbSex;
        userItem._scoreBuf = user.szScores;
        userItem._age = user.nAge;    
        if (!bExist)
            this.m_userManager.addUser(userItem);        
       

        if (userItem._userDBID == this.m_userManager.getMyDBID())    // 我自己
        {
            this.m_userManager.setMyUserID(userItem._userIndex);
            this.m_mySelf = userItem;
            this.m_clientFrame.setMyself(userItem);
            //this.m_pGameLib.updateMyScore();
        }
        // 如果状态大于坐下
        if (userItem._status > gamelibcommon.USER_WAIT_SIT
            && userItem._status < gamelibcommon.USER_WATCH_GAME) {
            var table: Table = this.m_tableManager.getTable(userItem._tableID);
            if (table != null) {
                var chair: Chair = table.getChair(userItem._chairID);
                if (chair != null) {
                    chair.setEmpty(false);
                    chair.setUserID( userItem._userIndex);
                }
            }
        }
        if (!bExist)
            this.m_sink.onRoomUserEnter(userItem._userIndex);
        return true;
    }

    private onSubUserLeftMessage(buf: ByteArray): boolean{		
        var dwUserDBID: number = buf.readUnsignedInt();
        var user: UserInfo = this.m_userManager.getUserByDBID(dwUserDBID);
        if (user == null) {
            this.trace("用户离开的时候居然没找到！");
            return true;
        }
        this.m_sink.onRoomUserExit(user._userIndex);
        this.m_userManager.removeUser(user._userIndex);
        return true;
    }

    private onSubUserStatusMessage(buf: ByteArray): boolean {
        var userstatus: CMD_GR_BroadCast_UserStatus = new CMD_GR_BroadCast_UserStatus();
        userstatus.deserialize(buf);
        // 查找用户        
        var user: UserInfo = this.m_userManager.getUserByDBID(userstatus.dwUserDBID);
        if (user == null) {
            this.trace("用户状态改变的时候居然没找到！");
            return true;
        } 
        var wNowTableID: number = userstatus.wTableID;
        var wLastTableID: number = user._tableID;
        var cbNowChairID: number = userstatus.cbChairID;
        var cbLastChairID: number = user._chairID;
        var cbNowStatus: number = userstatus.cbUserStatus;
        var cbLastStatus: number = user._status;

        //设置数据
        user._tableID = wNowTableID;
        user._chairID = cbNowChairID;
        user._status = cbNowStatus;
        user._netLag = userstatus.wNetTimelag;

        var nowTable: Table = this.m_tableManager.getTable(wNowTableID);
        var oldTable: Table = this.m_tableManager.getTable(wLastTableID);
        var nowChair: Chair = ((nowTable != null) ? nowTable.getChair(cbNowChairID) : null);
        var oldChair: Chair = ((oldTable != null) ? oldTable.getChair(cbLastChairID) : null);

        var changeTableStatus = false;
        if (wNowTableID != wLastTableID)
            changeTableStatus = true;

        if (cbNowChairID != cbLastChairID)
            changeTableStatus = true;

        if (gamelibcommon.isSitTable(cbLastStatus) != gamelibcommon.isSitTable(cbNowStatus))
            changeTableStatus = true;


        if (oldTable != null) {
            if (oldChair != null && gamelibcommon.isSitTable(cbLastStatus) && !oldChair.isEmpty()) {
                oldChair.setEmpty(true);
                this.m_sink.onTableInfoChanged(wLastTableID);
            }
        }

        if (nowTable != null) {
            if (nowChair != null && gamelibcommon.isSitTable(cbNowStatus) && !nowChair.isEmpty()) {
                nowChair.setEmpty(false);
                nowChair.setUserID(user._userIndex);
                this.m_sink.onTableInfoChanged(wNowTableID);
            }
        }

        var wMeTableID: number = this.m_mySelf._tableID;

        this.m_sink.onRoomUserInfoUpdated(user._userIndex);

        //判断是否自己
        if (user._userDBID == this.m_userManager.getMyDBID()) {
            // 保留上一次有效椅子号
            if (cbLastChairID < this.m_tableManager.getChairCount()) {
                this.m_cbLastChairID = cbLastChairID;
            }
            if (cbNowChairID < this.m_tableManager.getChairCount()) {
                this.m_cbLastChairID = cbNowChairID;
            }
            if (cbNowStatus >= gamelibcommon.USER_SIT_TABLE) {
                if (cbLastStatus < gamelibcommon.USER_SIT_TABLE || wNowTableID != wLastTableID || cbLastStatus == gamelibcommon.USER_OFF_LINE) {
                    this.m_clientFrame.meEnterGame(this.m_tableManager.getChairCount());
                    this.m_sink.onEnterGameView();
                    this.m_clientFrameSink.onUserEnterTable(cbNowChairID, this.m_mySelf._userIndex, this.m_mySelf.isPlayer());

                }

                if ((wNowTableID != wLastTableID) || (cbLastStatus == gamelibcommon.USER_OFF_LINE)) {
                    //sendAllUserExitTableToMe(wLastTableID);
                    for (var i: number = 0; i < this.m_userManager.m_userList.length; i++) {
                        var userEnter: UserInfo = this.m_userManager.m_userList[i];
                        if (userEnter._userIndex == user._userIndex)
                            continue;
                        if (userEnter._tableID == wNowTableID)
                            this.m_clientFrameSink.onUserEnterTable(userEnter._chairID, userEnter._userIndex, userEnter.isPlayer());
                    }
                }

                if (gamelibcommon.isSitTable(cbLastStatus) || gamelibcommon.isSitTable(cbNowStatus)) {
                    this.m_clientFrameSink.onPlayerStateChanged(this.m_mySelf._chairID, cbLastStatus, cbNowStatus);
                }


                if (cbNowStatus == gamelibcommon.USER_PLAY_GAME) {
                }
                else if (cbNowStatus == gamelibcommon.USER_SIT_TABLE ||
                    cbNowStatus == gamelibcommon.USER_FREE_STATUS) {
                }
                return true;
            }
            else	//我自己离开位置
            {
                //_clientFrame.meExitGame();
                this.sendAllUserExitTableToMe(wLastTableID);
                this.m_sink.onLeaveGameView();
                //this.m_clientFrameSink.onUserExitTable(this.m_mySelf._chairID,this.m_mySelf._userIndex,this.m_mySelf.isPlayer());

                return true;
            }
        }

        // 如果我没有椅子号
        if (wMeTableID == gamelibcommon.INVALI_TABLE_ID)
            return true;

        //发送游戏用户状态

        if (((wMeTableID == wNowTableID) || (wMeTableID == wLastTableID))) {
            if ((wMeTableID == wNowTableID) && (wMeTableID != wLastTableID)) {
                //发送进入消息
                this.m_clientFrameSink.onUserEnterTable(user._chairID, user._userIndex, user.isPlayer());
            }
            else if ((wMeTableID != wNowTableID) && (wMeTableID == wLastTableID)) {
                //发送离开消息
                this.m_clientFrameSink.onUserExitTable(cbLastChairID, user._userIndex, cbLastStatus >= gamelibcommon.USER_SIT_TABLE && cbLastStatus < gamelibcommon.USER_WATCH_GAME);
            }

            if (gamelibcommon.isSitTable(cbLastStatus) || gamelibcommon.isSitTable(cbNowStatus))
                this.m_clientFrameSink.onPlayerStateChanged(user._chairID, cbLastStatus, cbNowStatus);            
        }
        return true;
    }

    private onSubUserScoreMessage(buf:ByteArray):boolean		    {
        var userScore: CMD_GR_BroadCast_UserScore = new CMD_GR_BroadCast_UserScore();
        userScore.deserialize(buf);
        //更新分数

        var pUserItem: UserInfo = this.m_userManager.getUserByDBID(userScore.dwUserDBID);
        if (pUserItem != null) {
            this.m_userManager.updateUserScore(pUserItem._userIndex, userScore.cbScoreBuf);
            this.m_sink.onRoomUserInfoUpdated(pUserItem._userIndex);
        }
        return true;
    }

    public recvTableChat(buf: ByteArray): boolean	{
        var chat: HtmlChat = new HtmlChat();
        chat.deserialize(buf);
        this.m_sink.onRecvTableChat(chat);
        return true;
    }
    private recvCMMessage(cbSubCmd: number, buf: ByteArray): boolean{
        switch (cbSubCmd) {
            case GameCmds.SUB_CM_MESSAGE:	//系统消息
                {
                    var pSystemMessage: CMD_CM_SysteMessage = new CMD_CM_SysteMessage();
                    pSystemMessage.deserialize(buf);
                    //判断关闭连接
                    if (pSystemMessage.bCloseLine) {
                        this.trace("SUB_CM_MESSAGE 断开连接");
                        this.m_socket.close();
                    }

                    //显示消息
                    if (pSystemMessage.wMessageLen > 0)
                        this.m_sink.onShowAlertMsg(pSystemMessage.szMessage);

                    //判断是否关闭房间
                    return true;
                }

            case GameCmds.SUB_CM_MESSAGE_EX:
                {
                    var sm: CMD_CM_SysteMessageEx = new CMD_CM_SysteMessageEx();
                    sm.deserialize(buf);
                    if (sm.bCloseLine){
                        this.trace("SUB_CM_MESSAGE_EX 断开连接");
                        this.m_socket.close();
                    }
                    if (sm.wMessageLen > 0)
                        this.m_sink.onShowAlertMsg(sm.szMessage);
                    return true;
                }
            case GameCmds.SUB_CM_YESORNO_REQ:
                {
                    return true;
                }
            case GameCmds.SUB_CM_SHOW_WEB:
                {
                    return true;
                }
            case GameCmds.SUB_CM_MSG_BOX_REQ:
                {
                    return true;
                }
            case GameCmds.SUB_CR_MSG_BOX_REQ_WITH_TIMER:
                {
                    // 没有处理 
                    return true;
                }
            case GameCmds.SUB_GR_MSG_AUTO_CLOSE:
                {
                    // 没有处理
                    return true;
                }
            default:
                {
                    this.trace("MAIN_GR_MESSAGE Message subcmd = " + cbSubCmd);
                    return true;
                }
        }
    }

    private sendAllUserExitTableToMe(tableID: number) {
        for (var i = 0;i < this.m_userManager.m_userList.length;i++){
            var user = this.m_userManager.m_userList[i];
            if (user._tableID == tableID) {
                this.m_clientFrameSink.onUserExitTable(user._chairID, user._userIndex, user.isPlayer());
            }
        }
    }

    //发送房间设置
    private sendOptionsMessage(): void{
        		
        var RoomOption: CMD_GR_RoomOption = new CMD_GR_RoomOption();
        var buf = RoomOption.serialize();
        this.sendCommand(GameCmds.MAIN_GR_CONFIG, GameCmds.SUB_GR_ROOM_OPTION, 0, buf);     
    }

    private trace(msg: any): void {
        TSCommon.log(msg);
    }

    private startCheckPing() {
        if (this.m_timer_ping<=0)
            return;
        this.m_lostPingCount = 0;
       
        var mcurTimer = new Date().getTime();
        var self = this;
        this.m_timer_ping=window.setInterval(function(){
            if (mcurTimer - this.m_dwLastPingTime >= this.LAST_PING_LOST_TIME) {
                this.m_lostPingCount++;
                //可能已经断线，进行重连
                if (this.m_lostPingCount >= 2) {
                    this.reconnect();
                    this.stopCheckPing();
                    return
                }
                this.m_dwLastPingTime =new Date().getTime();//egret.getTimer();
            }
		    else
                this.m_lostPingCount = 0;
       
		    //if getTickCount() - this.m_dwLastPingTime >= this.CHECK_PING_TIME * 1000 {			
            self.sendPingCmd();
        },5000); 
        // this.m_timer_ping.addEventListener(egret.TimerEvent.TIMER, (event) => {
        //     TSCommon.log("timerFunc count" + (<egret.Timer>event.target).currentCount);
        //     if (egret.getTimer() - this.m_dwLastPingTime >= this.LAST_PING_LOST_TIME) {
        //         this.m_lostPingCount++;
        //         //可能已经断线，进行重连
        //         if (this.m_lostPingCount >= 2) {
        //             this.reconnect();
        //             this.stopCheckPing();
        //             return
        //         }
        //         this.m_dwLastPingTime =new Date().getTime();//egret.getTimer();
        //     }
		//     else
        //         this.m_lostPingCount = 0;
       
		//     //if getTickCount() - this.m_dwLastPingTime >= this.CHECK_PING_TIME * 1000 {			
        //     this.sendPingCmd();
        // }, this);
    }

    private stopCheckPing() {
        if (this.m_timer_ping <= 0)
            return;
        //this.m_timer_ping.stop();
        window.clearInterval(this.m_timer_ping)
        this.m_timer_ping = 0;
    }

    private reconnect() {
        if (this.m_uPort == null)
            return;        
        if (this.m_dwServerIP == null && this.m_strServerIP == null)
            return;
        
        if (this.isServicing()) {
            this.trace("reconnect close socket");
            this.m_socket.close();            
            //this.m_socket = null;
        }

        if (this.m_socket == null) {
            if (this.m_strServerIP == null)
                this.m_strServerIP = this.changeIP(this.m_dwServerIP);
            this.initWebSocket(this.m_strServerIP, this.m_uPort);
        }
    }

    public sendGameCmd(cmdID: number, buf: ByteArray) {
        if (!this.isServicing())
            return false;
        var ba = new ByteArray();
        ba.writeByte(cmdID)
        if (buf != null)
            ba.writeBytes(buf);
        
        this.sendOldGameCmd(GameCmds.CMD_GAME, ba);
        return true
    }

    public sendCommand(mainCmd: number, subCmd: number, handleCode: number, buf: ByteArray) {
        var b: ByteArray = new ByteArray();
        b.writeByte(mainCmd);
        b.writeByte(subCmd);
        b.writeByte(handleCode);
        b.writeByte(0);
        if(buf)
            b.writeBytes(buf);
        TSCommon.log("sendData len = " + b.length);
        this.m_socket.send(b.buffer);
    }

    public sendOldCommand(mainCmd: number, subCmd: number, buf: ByteArray) {
        var b: ByteArray = new ByteArray();
        b.writeByte(mainCmd);
        b.writeByte(subCmd); 
        if(buf)   
            b.writeBytes(buf);
        TSCommon.log("sendData len = " + b.length);
        this.m_socket.send(b.buffer);
    }

    public sendOldGameCmd(cmdID: number, buf: ByteArray) {
        var b: ByteArray = new ByteArray();
        b.writeByte(cmdID);
        if(buf) 
            b.writeBytes(buf);
        TSCommon.log("sendData len = " + b.length);
        this.m_socket.send(b.buffer);
    }

    public sendPingCmd(){
        if (!this.isServicing())
            return;
        var ba = new ByteArray();
        ba.writeByte(GameCmds.IDC_PING_ME);
        ba.writeUnsignedInt(new Date().getTime());
        this.sendOldGameCmd(GameCmds.CMD_PING_USER, ba);
        this.m_nSendPingTime = new Date().getTime();
        this.trace("sendPingCmd---");
    }

    public recvAnswerPing(){    
        this.m_nNetLag = new Date().getTime() - this.m_nSendPingTime;
        return true;
    }

    private sendLoginCmd()	{
        var logonByVNET = new CMD_GR_Logon_ByVnet();
        logonByVNET.lUserDBID = this.m_dwUserID;
        logonByVNET.szEncryptPass = this.m_szPass;
        this.trace("sendLoginCmd pass = " + this.m_szPass);

        logonByVNET.ConnectInfo.wSize = 14;        
        logonByVNET.ConnectInfo.dwConnectDelay = 0;
        logonByVNET.ConnectInfo.dwGameInstallVer = this.m_gameVersion;        
        logonByVNET.VersionInfo = this.m_pGameLib.VersionInfo;
        logonByVNET.ClientInfo = this.m_pGameLib.ClientInfo;
        var ba = logonByVNET.serialize();
        this.sendCommand(GameCmds.MAIN_GR_LOGON, GameCmds.SUB_GR_LOGON_BY_VNET, 0, ba);        
    }

    public enterTable(wTable:number, cbChair:number):boolean
		{
        if (!this.isServicing())
            return false;
        var table: Table = this.m_tableManager.getTable(wTable);
        if (table == null) {
            this.trace("桌子号无效");
            return false;
        }
        var chair: Chair = table.getChair(cbChair);
        if (chair == null) {
            this.trace("椅子号无效");
            return false;
        }
        if (table._isPlaying) {
            // 旁观
            this.sendWatchMessage(wTable, cbChair);
            return true;
        }
        if (!chair.isEmpty()) {
            this.trace("椅子已经有人了，请换一个");
            return false;
        }
        this.sendSitMessage(wTable, cbChair, null);
        return true;
    }

    public leftRoom(): void {
        if (!this.isServicing())
            return;
        this.trace("leftRoom");
        this.m_socket.close();
        //this.m_socket = null;
    }

    public standup(): void {
        var buf: ByteArray = new ByteArray();
        buf.writeByte(GameCmds.IDC_USER_STAND_UP);
        this.sendOldGameCmd(GameCmds.CMD_USER, buf);
    }

    //发送坐下命令
    private sendSitMessage(wTableIndex: number, cbChairID: number, szTablePass: String): boolean {
        if (!this.isServicing())
            return false;
        //构造数据
        var RegSit: CMD_GR_Req_UserSit = new CMD_GR_Req_UserSit();
        RegSit.wNetSpeed = 0;
        RegSit.wTableID = wTableIndex;
        RegSit.cbChairID = cbChairID;        
        var buf: ByteArray = RegSit.serialize();
        this.sendCommand(GameCmds.MAIN_GR_USER, GameCmds.SUB_GR_REQ_SIT_TABLE, 0, buf);
        return true;
    }

    //发送旁观命令
    public sendWatchMessage(wTableIndex: number, cbChairID: number): boolean {
        if (!this.isServicing())
            return false;

        var RegLonkOn: CMD_GR_Req_UserLookOn = new CMD_GR_Req_UserLookOn();
        RegLonkOn.wNetSpeed = 0;
        RegLonkOn.wTableID = wTableIndex;
        RegLonkOn.cbChairID = cbChairID;
        RegLonkOn.cbPassLen = 0;
        var buf: ByteArray = RegLonkOn.serialize();
        this.sendCommand(GameCmds.MAIN_GR_USER, GameCmds.SUB_GR_REQ_LOOK_ON_TABLE, 0, buf);
        return true;
    }

    public sendSoftReady() {
        this.sendOldGameCmd(FrameCmds.CLIENTSITE_SOFT_READY, null);
    }

    public sendReady(): boolean{
        if (!this.isServicing())
            return false;
        if (this.m_mySelf == null)
            return false;
        if (this.m_mySelf._status == gamelibcommon.USER_PLAY_GAME) {
            // 发送软开始
            this.sendSoftReady();
            return true;
        }
        if (this.m_mySelf._status == gamelibcommon.USER_SIT_TABLE) {
            this.sendOldCommand(GameCmds.CMD_USER, GameCmds.IDC_USER_AGREE_START, null);
            return true;
        }
        return false;
    }

    public sendCancelReady(): boolean {
        if (!this.isServicing())
            return false;
        if (this.m_mySelf == null)
            return false;
        if (this.m_mySelf._status != gamelibcommon.USER_READY_STATUS) {
            return false;
        }
       
        this.sendOldCommand(GameCmds.CMD_USER, GameCmds.IDC_USER_CANCEL_READY, null);
        return true;      
    }

    public SendChatMsg(objChatContent: HtmlChat) {
        var ba = objChatContent.serialize();
        this.sendOldGameCmd(GameCmds.CMD_HTML_HALL_CHAT, ba);
    }

    public GetUserName(wUserID: number): string {
        var user = this.m_userManager.getUser(wUserID);
        if (user == null)
            return "";
        return user.getUserName();
    }

    public GetMyID(): number {
        return this.m_userManager.getMyUserID();
    }

    public autoSit(): boolean{
        if (!this.isServicing())
            return false;
        if (!this.m_mySelf)
            return false;
        var cbUserStatus: number = this.m_mySelf._status;

        //判断自己的状态
        if (cbUserStatus == gamelibcommon.USER_PLAY_GAME) {
            //MessageBox.Show("你正在游戏中，不能换位置，请先结束游戏！");
            return false;
        }
       
        var tableID: number = 0xFFFF;
        var chairID: number = 0xFF - 1;
        this.sendSitMessage(tableID, chairID, "");
        return true;
    }

    public getTable(tableID: number): Table {
        if (!this.isServicing())
            return null;        
        return this.m_tableManager.getTable(tableID);
    }
    public getTableList(): Table[] {
        if (!this.isServicing())
            return null;
        return this.m_tableManager.getTableList();
    }

    public getUserByChair(chair:number): UserInfo{
        if(!this.isServicing())
            return null;
        if (chair >= this.m_tableManager.getChairCount())
            return null;
        if (this.m_mySelf.getUserTableID() >= this.m_tableManager.getTableCount())
            return null;
        for (var i: number = 0; i < this.m_userManager.m_userList.length; i++) {
            var user: UserInfo = this.m_userManager.m_userList[i];
            if (user._tableID != this.m_mySelf.getUserTableID())
                continue;
            if (user.getUserChair() != chair)
                continue;
            if (user._status >= gamelibcommon.USER_SIT_TABLE && user._status < gamelibcommon.USER_WATCH_GAME)
                return user;            
        }
        return null;
    }

    public getMyself() {
        if (!this.isServicing())
            return null;
        return this.m_mySelf;
    }

    public getUser(wUserID: number) {
        return this.m_userManager.getUser(wUserID);
    }

    public getUserByDBID(userDBID: number) {
        return this.m_userManager.getUserByDBID(userDBID);
    }

    public refreshGold() {
        if (!this.isServicing())
            return;
        this.sendCommand(GameCmds.MAIN_GR_USER, GameCmds.SUB_GR_QUERY_GOLD, 0, null);
    }

    public sendTableChat(lpszMsg: string) {
        if (!this.isServicing()) {
            return GameCmds.SEND_TABLE_CHAT_OFFLINE;
        }
        if(lpszMsg == null){
            return GameCmds.SEND_TABLE_CHAT_NULL_CONTENT;
        }
        var msg = lpszMsg;
        var nLen = msg.length;
        if (nLen == 0) {
            return GameCmds.SEND_TABLE_CHAT_NULL_CONTENT;
        }
        //是否太频繁
        var nMinTime = 2000
        var dwNow = new Date().getTime();
        if (this.m_dwLastSendTableChat != 0 && dwNow - this.m_dwLastSendTableChat < nMinTime) {
            return GameCmds.SEND_TABLE_CHAT_BUSY;
        }
        this.m_dwLastSendTableChat = dwNow;
        var chat = new HtmlChat();
        chat._dwSpeaker = this.m_mySelf.getUserID()
        chat._dwListener = 0xFFFFFFFF
        chat._dwSubCode = 0
        chat._dwChannelIDLength = 4
        chat._szContent = msg;
        var ba = chat.serialize();
        var cmd = GameCmds.CMD_HTML_TABLE_CHAT;        
        this.sendOldGameCmd(cmd, ba);
        return GameCmds.SEND_TABLE_CHAT_OK
    }

    public getRelativePos(cbChair:number){
        if (cbChair == 255) {
            return 0;
        }
        if (cbChair >= this.m_tableManager.getChairCount()) {
            return cbChair;
        }
        if (this.m_mySelf == null) {
            return cbChair;
        }
        var cbMyChair = this.m_mySelf.getUserChair();
        if (cbMyChair >= this.m_tableManager.getChairCount()) {
            cbMyChair = this.m_cbLastChairID;
        }

        if (cbMyChair < 0 || cbMyChair >= this.m_tableManager.getChairCount()) {
            return cbChair;
        }
        return (cbChair + this.m_tableManager.getChairCount() - cbMyChair) % this.m_tableManager.getChairCount();
    }


    public getRealChair(cbPos:number){
        if (cbPos >= this.m_tableManager.getChairCount()) {
            return cbPos;
        }

        if (this.m_mySelf == null) {
            return cbPos;
        }
        var cbMyChair = this.m_mySelf.getUserChair();
        if (cbMyChair >= this.m_tableManager.getChairCount()) {
            cbMyChair = this.m_cbLastChairID;
        }
        if (cbMyChair < 0 || cbMyChair >= this.m_tableManager.getChairCount()) {
            return cbPos;
        }
        return (cbPos + cbMyChair) % this.m_tableManager.getChairCount();
    }

    public isPrivteRoom(){
        return this.m_bIsPrivateRoom;
    }

    public sendSoundToTableUser(pBuf: ByteArray) {
        if (!this.isServicing()) {
            return false;
        }
        if (this.m_mySelf == null) {
            return false;
        }
        if (this.m_mySelf.getUserStatus() < gamelibcommon.USER_SIT_TABLE) {
            return false;
        }
        TSCommon.log("sendSoundToTableUser " + pBuf.length);
        if (pBuf.length <= 0 ){
            return;
        }
        this.sendOldGameCmd(FrameCmds.CLIENTSITE_SEND_SOUND, pBuf);
    }
    public getNetLag() {
        if (!this.isServicing()) {
            return 0;
        }

        return this.m_nNetLag
    }

    public getUserList() {
        if (!this.isServicing()) {
            return null;
        }
        return this.m_userManager.m_userList;
    }

    public setClientFrameSink(sink: IClientFrameSink) {
        this.m_clientFrameSink = sink;
        this.m_clientFrame.setSink(sink);
    }
}