import {tagConnectInfo} from "../tagConnectInfo";
import {tagClientInfo} from "../tagClientInfo";
import {tagVersionInfo} from "../tagVersionInfo";
import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
export class CMD_GR_Logon_ByVnet {
    lUserDBID: number;
    szEncryptPass: string;
    ConnectInfo: tagConnectInfo;
    ClientInfo: tagClientInfo;
    VersionInfo: tagVersionInfo;
    cbShake: number;
    cbEnterType: number;
    szTablePass: string;
    constructor() {
        this.ConnectInfo = new tagConnectInfo();
        this.ClientInfo = new tagClientInfo();
        this.VersionInfo = new tagVersionInfo();
        this.cbShake = 0;
        this.cbEnterType = 0;
        this.szTablePass = "";
    }

    serialize(): ByteArray {
        var ba: ByteArray = new ByteArray();
        ba.writeInt(this.lUserDBID);
        TSCommon.writeStringWithLength(ba, this.szEncryptPass, 64);
        this.ConnectInfo.serialize(ba);
        this.ClientInfo.serialize(ba);
        this.VersionInfo.serialize(ba);
        ba.writeByte(this.cbShake);
        ba.writeByte(this.cbEnterType);
        TSCommon.writeStringWithLength(ba, this.szTablePass, 16);
        return ba;
    }
}