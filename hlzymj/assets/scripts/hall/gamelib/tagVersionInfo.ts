import {ByteArray} from "../common/ByteArray";
import {TSCommon} from "../TSCommon";
export class tagVersionInfo {
    public dwInstallVer: number = 2015;
    public dwBuildVer: number = 1;
    public dwSubBuildVer: number = 1;
    public serialize(byteArray: ByteArray) {       
        byteArray.writeInt(this.dwInstallVer);
        byteArray.writeInt(this.dwBuildVer);
        byteArray.writeInt(this.dwSubBuildVer);       
    }  
}