import {ByteArray} from "../../common/ByteArray";
export class CMD_GR_BroadCast_UserStatus {
    dwUserDBID: number;
    cbUserStatus: number;
    wNetTimelag: number;
    wTableID: number;
    cbChairID: number;

    deserialize(buf: ByteArray) {
        this.dwUserDBID = buf.readUnsignedInt();
        this.cbUserStatus = buf.readUnsignedByte();
        this.wNetTimelag = buf.readUnsignedShort();
        this.wTableID = buf.readUnsignedShort();
        this.cbChairID = buf.readUnsignedByte();
    }
}