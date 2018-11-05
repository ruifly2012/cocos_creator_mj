import {ByteArray} from "../common/ByteArray";
import {TSCommon} from "../TSCommon";
export class CMD_CM_SysteMessage {
    public bCloseLine: number;
    public bMessageType: number;
    public wMessageLen: number;
    public szMessage: string;

    public deserialize(ba: ByteArray) {
        this.bCloseLine = ba.readUnsignedByte();
        this.bMessageType = ba.readUnsignedByte();
        this.wMessageLen = ba.readUnsignedShort();
        if (this.wMessageLen > 0)
            this.szMessage = TSCommon.readGbkString(ba, this.wMessageLen);//ba.readUTFBytes(this.wMessageLen);
        else
            this.szMessage = "";
    }
}

export class CMD_CM_SysteMessageEx {
    public bCloseLine: number;
    public uButtonType: number;
    public wMessageLen: number;
    public szMessage: string;

    public deserialize(ba: ByteArray) {
        this.bCloseLine = ba.readUnsignedByte();
        this.uButtonType = ba.readUnsignedByte();
        this.wMessageLen = ba.readUnsignedShort();
        if (this.wMessageLen > 0)
            this.szMessage = TSCommon.readGbkString(ba, this.wMessageLen);
        else
            this.szMessage = "";
    }
}