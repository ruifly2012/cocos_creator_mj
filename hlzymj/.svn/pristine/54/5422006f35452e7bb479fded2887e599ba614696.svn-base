import {ByteArray} from "../common/ByteArray";
import {TSCommon} from "../TSCommon";
export class tagGameStationEx {
    public dwParentID: number;
    public dwStationID: number;
    public szStationName: string;   // 
    public dwMinGold: number;
    public dwRuleID: number;
    public nTableGold: number;
    public nBaseGold: number;

    public static getLen(): number{
        return 40;
    }

    public deserialize(ba: ByteArray) {
        this.dwParentID = ba.readInt();
        this.dwStationID = ba.readInt();
        this.szStationName = TSCommon.readGbkString(ba, 32);
    }
}