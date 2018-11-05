import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
import {FrameCmds} from "./FrameCmds";
import {GAME_DATA} from "./GAME_DATA";
import {GameRoom} from "../room/GameRoom";
import {CGameLib} from "../CGameLib";
import {UserInfo} from "../UserInfo";
import {IClientFrameSink} from "../IClientFrameSink";
import {gamelibcommon} from "../gamelibcommon";
export class ClientFrame {
    private m_sink: IClientFrameSink;
    private _mySelf: UserInfo;
    private m_gameRoom: GameRoom;
    private m_pGameLib: CGameLib;
    private m_bDismissed: boolean;
    private m_chairCount: number;
    private m_nSceneStatus: number;
    private m_cachedCmds: ByteArray[];

    constructor(room:GameRoom,gameLib:CGameLib) {
        this.m_sink = null;
        this._mySelf = null;
        this.m_gameRoom = room;
        this.m_pGameLib = gameLib;
        this.m_cachedCmds = new Array<ByteArray>();
        this.clear();
    }

    public clear() {
        this._mySelf = null;       
        this.m_cachedCmds.splice(0);
        this.m_bDismissed = false;
        this.m_chairCount = 2;
        this.m_nSceneStatus = FrameCmds.SCENE_STATUS_FREE;
    }
    public setMyself(myself: UserInfo) {
        this._mySelf = myself;
    }

    public setSink(sink: IClientFrameSink) {
        this.m_sink = sink;
        this.m_nSceneStatus = FrameCmds.SCENE_STATUS_FREE;
    }

    public meEnterGame(cbChairCount: number) {
        console.log("meEnterGame");
        this.m_chairCount = cbChairCount;
        var frameVersion: number = 1310761;
        var ba = new ByteArray();
        ba.writeInt(frameVersion);
        this.sendGameCmd(FrameCmds.CLIENTSITE_FRAME_VERSION, ba);
        var version = new ByteArray();
        version.writeInt(this.m_sink.onGetMainVersion());
        version.writeInt(this.m_sink.onGetSubVersion());
        version.writeInt(0);
        this.sendGameCmd(FrameCmds.CLIENTSITE_REQUEST_VERIFY_VERSION, version);
        this.m_cachedCmds.splice(0);
    }

    public sendGameCmd(cmdID: number, buf: ByteArray) {
        this.m_gameRoom.sendGameCmd(cmdID, buf);
    }

    public recvGameCmd(buf: ByteArray): boolean{
        var dataLen: number = buf.length - 2;
        if (dataLen < 0)
            return false;
        if (this.m_sink == null) {
            this.m_cachedCmds.push(buf);
            return true;
        }
        var data: GAME_DATA = new GAME_DATA(buf);        
        if (data.cCmdID >= FrameCmds.SERVERSITE_MSG) {
            this.recvFrameCmd(data.cChairID, data.cCmdID, data.data);
            return true;
        }
        this.m_sink.onGameMessage(data.cChairID, data.cCmdID, data.data);
        return true;
    }

    private recvFrameCmd(chairID:number, cmdID:number, lpBuf:ByteArray):void{
        var nLen: number = lpBuf.length;
        if (nLen < 0)
            return;

        var bt: ByteArray;
        var i: number;
        switch (cmdID) {
            case FrameCmds.SERVERSITE_PERSONAL_SCENE:
                {
                    if (nLen <= 0) {
                        console.log("CClientFrame::RecvFrameMsg() error -- SERVERSITE_SCENE nLen <= 0");
                        return;
                    }
                    this.m_nSceneStatus = FrameCmds.SCENE_STATUS_PLAYING;
                    this.m_bDismissed = false;
                    bt = new ByteArray();
                    bt.writeBytes(lpBuf, 4, nLen - 4);
                    bt.position = 0;
                    this.m_sink.onSceneChanged(bt);
                    break;
                }
            case FrameCmds.SERVERSITE_SCENE:
                {
                    if (nLen <= 0) {
                        console.log("CClientFrame::RecvFrameMsg() error -- SERVERSITE_SCENE nLen <= 0");
                        return;
                    }                    
                    this.m_nSceneStatus = FrameCmds.SCENE_STATUS_PLAYING;
                    this.m_bDismissed = false;
                    bt = new ByteArray();
                    bt.writeBytes(lpBuf, 4, lpBuf.length - 4);
                    bt.position = 0;
                    this.m_sink.onSceneChanged(bt);
                    break;
                }
            case FrameCmds.SERVERSITE_FIRST_SCENE:
                {
                    console.log("CClientFrame::RecvFrameMsg() -- SERVERSITE_FIRST_SCENE");
                    this.changePlayerStatus(-1, gamelibcommon.USER_PLAY_GAME, gamelibcommon.USER_READY_STATUS);
                    this.m_nSceneStatus = FrameCmds.SCENE_STATUS_PLAYING;
                    this.m_bDismissed = false;

                    if (this._mySelf.isPlayer())
                        this.sendGameCmd(FrameCmds.CLIENTSITE_CONFIRM_START, null);

                    bt = new ByteArray();
                    bt.writeBytes(lpBuf, 4, nLen - 4);
                    bt.position = 0;

                    this.m_sink.onSceneChanged(bt);
                    this.m_sink.onGameStart();
                    break;
                }
            case FrameCmds.SERVERSITE_GAME_OVER:
                console.log("--SERVERSITE_GAME_OVER");
                this.m_nSceneStatus = FrameCmds.SCENE_STATUS_FREE;
                // 把所有人的状态改为free
                //this.changePlayerStatus(-1, gamelibcommon.USER_FREE_STATUS, gamelibcommon.USER_PLAY_GAME);
                this.m_sink.onGameEnd(lpBuf);
                break;           
            case FrameCmds.SERVERSITE_GAME_DISMISS:
                {
                    console.log("SERVERSITE_GAME_DISMISS");
                    this.m_nSceneStatus = FrameCmds.SCENE_STATUS_FREE;
                    this.m_bDismissed = true;
                    this.changePlayerStatus(-1, gamelibcommon.USER_FREE_STATUS, gamelibcommon.USER_PLAY_GAME);

                    // 显示解散理由
                    /*if (nLen > 0) {
                        //ShowSystemMsg(lpBuf.toString());
                        this.m_sink.onDispatch(FameCmds..DISPID_ON_GAME_DISMISS, 0, 0);
                    }*/
                }
                break;
           
            
            case FrameCmds.SERVERSITE_GAMEOPTION:
                {
                    var dwOption: number = lpBuf.readUnsignedInt();
                    // 通知逻辑
                    this.m_sink.onGameOption(dwOption);
                    break;
                }
            case FrameCmds.SERVERSITE_SOFT_READY:
                {
                    console.log("Recv player soft ready signal");
                    if (nLen < 4) {
                        console.log("RecvFrameMsg--SERVERSITE_GAMEOPTION error,mismatch length");
                        break;
                    }
                    var nChair: number = lpBuf.readInt();

                    this.changePlayerStatus(nChair, gamelibcommon.USER_READY_STATUS, gamelibcommon.USER_SIT_TABLE);
                    break;
                }
            case FrameCmds.SERVERSITE_SOUND: {
                this.m_sink.onTableSound(chairID, lpBuf);
                break;
            }
            case FrameCmds.SERVERSITE_SYSTEMMESSAGE: {
                ;
                this.m_sink.onGameSystemMsg(TSCommon.readGbkString(lpBuf, lpBuf.length));
                break;
            }            
            default:
                console.log("--CClient::GameMessage, recieved an unknown msg, id= " + cmdID);
                break;
        }
    }

    private changePlayerStatus(chair: number, newStatus: number, oldStatus: number): void {
        if (chair == -1) {
            for (var i: number = 0; i < this.m_chairCount; i++) {
                this.m_sink.onPlayerStateChanged(i, oldStatus, newStatus);
            }
        }
        else
            this.m_sink.onPlayerStateChanged(chair, oldStatus, newStatus);
    }
}