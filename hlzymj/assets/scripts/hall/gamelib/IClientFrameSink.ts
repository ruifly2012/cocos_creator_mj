import {ByteArray} from "../common/ByteArray";
export interface IClientFrameSink {
    onSceneChanged(data: ByteArray);
    onPlayerStateChanged(chair: number, oldState: number, newState: number);
    onGetMainVersion(): number;
    onGetSubVersion(): number;
    onGameStart(): void;
    onGameMessage(chair: number, cbCmdID: number, data: ByteArray);
    onGameEnd(data: ByteArray);
    onGameOption(option: number);
    onUserEnterTable(chair: number, wUserID: number, isPlayer: boolean);
    onUserExitTable(chair: number, wUserID: number, isPlayer: boolean);
    onNotEnoughGold(nMinGold: number, nMaxGold: number);
    onTableSound(nChair: number, pBuf: ByteArray);
    onGameSystemMsg(msg:string);
}