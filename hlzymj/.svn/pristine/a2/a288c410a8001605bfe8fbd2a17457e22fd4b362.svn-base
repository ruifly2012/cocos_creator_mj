import { ByteArray } from "../../common/ByteArray";
import { TSCommon } from "../../TSCommon";
export class tagGameKind {
    public dwMaxVersion: number;
    public dwOnLineCount: number;
    public dwTypeID: number;
    public dwKindID: number;
    public szKindName: string;
    public szProcessName: string;

    public static getLen(): number {
        return 48;
    }

    public deserialize(ba: ByteArray) {
        this.dwMaxVersion = ba.readUnsignedInt();
        this.dwOnLineCount = ba.readUnsignedInt();
        this.dwTypeID = ba.readUnsignedInt();
        this.dwKindID = ba.readUnsignedInt();
        this.szKindName = TSCommon.readGbkString(ba, 16);
        this.szProcessName = TSCommon.readGbkString(ba, 16);
    }
}