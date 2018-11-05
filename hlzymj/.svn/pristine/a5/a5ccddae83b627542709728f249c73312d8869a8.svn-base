import { UserInfo } from "../UserInfo";
import { ByteArray } from "../../common/ByteArray";
import { TSCommon } from "../../TSCommon";
export class UserManager {
    private m_dwMyUserID: number;
    private m_dwMyDBID: number;
    public m_userList: UserInfo[];

    constructor() {
        this.m_dwMyUserID = 0xFFFFFFFF;
        this.m_dwMyDBID = 0xFFFFFFFF;
        this.m_userList = new Array<UserInfo>();
    }

    public getUserCount() {
        return this.m_userList.length;
    }


    public setMyUserID(myUserID: number) {
        this.m_dwMyUserID = myUserID;
    }


    public getMyUserID() {
        return this.m_dwMyUserID;
    }


    public setMyDBID(myDBID) {
        this.m_dwMyDBID = myDBID;
    }

    public getMyDBID() {
        return this.m_dwMyDBID;
    }


    public addUser(user: UserInfo) {        
        this.m_userList.push(user);
    }

    public removeUser(dwUserID: number) {
        dwUserID = dwUserID % 0x10000;
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (dwUserID == this.m_userList[i].getUserID()) {
                this.m_userList.splice(i, 1);
                return;
            }
        }
    }

    public getUser(dwUserID: number) {
        dwUserID = dwUserID % 0x10000;
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (dwUserID == this.m_userList[i].getUserID())
                return this.m_userList[i];
        }
        return null;
    }


    public getMyInfo() {
        return this.getUser(this.m_dwMyUserID);
    }


    public clearAllUser() {
        this.m_userList.splice(0);
    }

    public getUserByDBID(dwDBID: number) {        
        for (var i: number = 0; i < this.m_userList.length; i++) {            
            if (dwDBID == this.m_userList[i].getUserDBID())
                return this.m_userList[i];
        }
        return null;
    }


    public updateGameUser(user) {
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (user.getUserID() == this.m_userList[i].getUserID()) {
                this.m_userList[i] = user;
                return true;
            }
        }
        return false;
    }

    public updateUserScore(wUserID: number, bufScore: ByteArray) {
        wUserID = wUserID % 0x10000;
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (wUserID == this.m_userList[i].getUserID()) {
                this.m_userList[i]._scoreBuf = bufScore;
                this.m_userList[i]._scoreBufLen = bufScore.length;
                return true;
            }
        }
        return false;
    }


    public updateUserFame(wUserID: number, nFameLevel: number, nFameScore: number, cbVIPLevel: number) {
        wUserID = wUserID % 0x10000;
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (wUserID == this.m_userList[i].getUserID()) {
                this.m_userList[i]._fame = nFameScore;
                this.m_userList[i]._fameLevel = nFameLevel;
                this.m_userList[i].m_cbVipLevel = cbVIPLevel;
                return true;
            }
        }
        return false;
    }


    public getUserByTableChair(wTableID: number, cbChair: number) {
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (this.m_userList[i]._tableID == wTableID
                && this.m_userList[i]._chairID == cbChair
                && this.m_userList[i].isPlayer())
                return this.m_userList[i];
        }
        return null;
    }

    public findUserByTableIndex(wTableID: number) {
        var list: UserInfo[] = new Array<UserInfo>();
        for (var i: number = 0; i < this.m_userList.length; i++) {
            if (this.m_userList[i]._tableID == wTableID)
                list.push(this.m_userList[i]);
        }
        return list;
    }
}