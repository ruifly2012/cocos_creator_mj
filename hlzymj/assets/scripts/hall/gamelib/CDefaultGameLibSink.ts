import { IGameLibSink } from "./IGameLibSink";

export class CDefaultGameLibSink implements IGameLibSink {
    public onLogonFinished() { }

    public onPlazaGoldChanged() { }

    public onRefreshUserInfo() { }

    public onChargeInfoRefeshRet(result) { }

    public onSendSpeakerRet(cbRetCode) { }

    public onLogonFailed(errorStr:string, nFaileType:number) { }

    public onEnteredGameRoom(tableCount, chairCount) { }

    public onEnterGameRoomFailed(errorStr) { }

    public onRoomConnectClosed() { }

    public onEnterGameView() { }

    public onLeaveGameView() { }

    public onRoomUserEnter(userID) { }

    public onRoomUserExit(userID) { }


    public onRoomUserInfoUpdated(userID) { }

    public onTableInfoChanged(tableID) { }

    public onRecvHallChat(chat) { }

    public onRecvTableChat(chat) { }



    public onShowAlertMsg(msg) { }

    public onLogonGameRoomSucceeded() { }


    public onChangeUserInfoRet(cbRetCode) { }

    public onTaskInfo(cbRetCode, pTaskList) { }

    public onTaskGift(nTaskID, cbRetCode) { }

    public onNewStatus(nNewMissionDone, nNewMail, nNewActivity, nNewFriend, bLoginGift) { }

    public onBankInfo(nBankAmount, nBankCapacity) { }


    public onCreatePrivateTableFailed(lpszErrorMsg) { }

    public onEnterPrivateTableFailed(lpszErrorMsg) { }


    public onGameBankOpeReturn(succeeded, gold, bank) { }

    public onShowGameSystemMsg(msg: string) {

    }

    public onSpeaker(msg: string, priorty: number) {

    }
}