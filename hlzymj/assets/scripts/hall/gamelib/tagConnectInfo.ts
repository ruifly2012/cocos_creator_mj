import {ByteArray} from "../common/ByteArray";
export class tagConnectInfo {
    public wSize: number = 16;
    public dwGameInstallVer: number = 1;
    public dwGameBuildVer: number = 1;
    public dwConnectDelay: number = 1;

    public serialize(byteArray: ByteArray) {
        byteArray.writeShort(this.wSize);
        byteArray.writeInt(this.dwGameInstallVer);
        byteArray.writeInt(this.dwGameBuildVer);
        byteArray.writeInt(this.dwConnectDelay);
    }  
}