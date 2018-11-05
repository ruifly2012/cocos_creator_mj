import {ByteArray} from "../common/ByteArray";
import {TSCommon} from "../TSCommon";
export class tagClientInfo {
    public dwComputerID: number[];
    public dwSystemVer: number[];
    public szComputerName: string;

    public constructor() {
        this.dwComputerID = [ 1,2,3];
        this.dwSystemVer = [1,2];
        this.szComputerName = "h5_client";
    }

    public serialize(byteArray: ByteArray) {
        for (var i: number = 0; i < 3;i++)
            byteArray.writeInt(this.dwComputerID[i]);
        for (var i: number = 0; i < 2; i++)
            byteArray.writeInt(this.dwSystemVer[i]);
        TSCommon.writeStringWithLength(byteArray, this.szComputerName, 12);
    }
}