import {ByteArray} from "../common/ByteArray";
import {TSCommon} from "../TSCommon";
export class tagGameServerEx {
    public dwServerIP: number;
    public dwServerID: number;
    public dwKindID: number;
    public dwStationID: number;
    public wOnLineCount: number;
    public wMaxOnLineCount: number;
    public uServerPort: number;
    public szGameRoomName: string;
    public dwRuleID: number; 
    public dwMinGold: number;
    public dwMaxGold: number;   // 
    public cbMinVipNeed: number;
    public cbPrivateRoom: number;
    public cbMinCreateTableVIP: number;
    public nTableGold: number;
    public nBaseGold: number;

    public static getLen(): number {
        return tagGameServerEx.getBasicLen() + 15;
    }

    public deserialize(ba: ByteArray) {
        this.dwServerIP = ba.readUnsignedInt();
        this.dwServerID = ba.readUnsignedInt();
        this.dwKindID = ba.readUnsignedInt();
        this.dwStationID = ba.readUnsignedInt();
        this.wOnLineCount = ba.readUnsignedShort();
        this.wMaxOnLineCount = ba.readUnsignedShort();
        this.uServerPort = ba.readUnsignedInt();
        this.szGameRoomName = TSCommon.readGbkString(ba, 32);
    }

    public deserializeEx(ba: ByteArray) {
        this.deserialize(ba);
        this.dwRuleID = ba.readUnsignedInt();
        this.dwMinGold = ba.readUnsignedInt();
        this.dwMaxGold = ba.readUnsignedInt();
        this.cbMinVipNeed = ba.readByte();
        this.cbPrivateRoom = ba.readByte();
        this.cbMinCreateTableVIP = ba.readByte();
    }

    public deserializeExtraInfo(ba: ByteArray) {
        this.nTableGold = ba.readUnsignedInt();
        this.nBaseGold = ba.readUnsignedInt();
    }

    public static getBasicLen(): number {
        return 56;
    }

    public static getExtraInfoLen(): number{
        return 12;
    }
}