import {ByteArray} from "../common/ByteArray";
import {ScoreParser} from "./room/ScoreParser";
import {gamelibcommon} from "./gamelibcommon";
export class UserInfo {
    _faceID:number;
    _userDBID:number;
    _userLevel:number;
    _groupID:number;
    _name: string;
    _maxim:string;
    _age:number;
    _sex:number;
    _fame:number;
    _fameLevel:number;
    _bankValue:number;
    _tableID:number;
    _chairID:number;
    _status:number;		
    _userIndex:number;
    _userRountIC: number;
    _scoreBuf: ByteArray;
    _scoreBufLen:number;
    m_cbFaceChagneIndex:number;
    m_cbVipLevel:number;
    _location: string;
    _netLag: number;

    constructor() {
        this._faceID = 0;
        this._userDBID = 0;
        this._userLevel = 0;
        this._groupID = 0;
        this._name = "";
        this._maxim = "";
        this._age = 0;
        this._sex = 1;
        this._fame = 0;
        this._fameLevel = 0;
        this._bankValue = 0;
        this._tableID = 0xFFFF;
        this._chairID = 0xFF;
        this._status = 0;
        this._userIndex = 0;
        this._userRountIC = 0;
        this._scoreBuf = new ByteArray();
        this._scoreBufLen = 0;
        this.m_cbFaceChagneIndex = 0;
        this.m_cbVipLevel = 0;
        this._location = "";
        this._netLag = 0;
    }

    getUserID(): number {
        return this._userIndex;
    }
    getUserChair(): number {
        return this._chairID;
    }
    getUserDBID(): number {
        return this._userDBID;
    }
    getUserName(): string {
        return this._name;
    }
    getUserTableID(): number {
        return this._tableID;
    }
    getUserStatus(): number {
        return this._status;
    }
    getFace(): number {
        return this._faceID;
    }
    isPlayer(): boolean {
        return this._status >= gamelibcommon.USER_SIT_TABLE && this._status < gamelibcommon.USER_WATCH_GAME
    }

    isValidPlayer(): boolean {
        return this.isPlayer();
    }
    getGold(): number {
        return this.getScoreField(gamelibcommon.enScore_Gold);
    }
    getScore(): number {
        return this.getScoreField(gamelibcommon.enScore_Score);
    }
    getBean(): number {
        return this.getScoreField(gamelibcommon.enScore_Bean);
    }
    getSex(): number {
        return this._sex;
    }
    getScoreField(field: number): number {
        return ScoreParser.getInstance().getScoreFieldInt(this._scoreBuf,field);
    }
    getAge(): number {
        return this._age;
    }

    getGameTitleScore():number{
        return this._fame;
    }

    getBankAmount(): number {
        return this._bankValue;
    }
    getLocation(): string {
        return this._location;
    }
    getMaxim(): string {
        return this._maxim;
    }   

    getNetLag(): number {
        return this._netLag;
    }
}