import { HtmlChat } from "./room/HtmlChat";
export interface IGameLibSink {
    onLogonFinished();

    onPlazaGoldChanged();

    onRefreshUserInfo();

    onChargeInfoRefeshRet(result);

    onSendSpeakerRet(cbRetCode);

    onLogonFailed(errorStr: string, nFaileType: number);

    onEnteredGameRoom(tableCount, chairCount);

    onEnterGameRoomFailed(errorStr);

    onRoomConnectClosed();

    onEnterGameView();

    onLeaveGameView();

    onRoomUserEnter(userID);

    onRoomUserExit(userID);


    onRoomUserInfoUpdated(userID);

    onTableInfoChanged(tableID);

    onRecvHallChat(chat);

    onRecvTableChat(chat);

    onShowAlertMsg(msg);

    onLogonGameRoomSucceeded();

    onChangeUserInfoRet(cbRetCode);

    onTaskInfo(cbRetCode, pTaskList);

    onTaskGift(nTaskID, cbRetCode);

    onNewStatus(nNewMissionDone, nNewMail, nNewActivity, nNewFriend, bLoginGift);

    onBankInfo(nBankAmount, nBankCapacity);


    onCreatePrivateTableFailed(lpszErrorMsg);

    onEnterPrivateTableFailed(lpszErrorMsg);


    onGameBankOpeReturn(succeeded, gold, bank);

    onShowGameSystemMsg(msg: string);

    onSpeaker(msg: string, priorty: number);
}