
import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
import {tagClientInfo} from "../tagClientInfo";
import {tagVersionInfo} from "../tagVersionInfo";
export class CMD_GP_GetGameInfo {
    public nUserDBID:number;
    public nPartnerID: number;
    public nVersionCode:number;
    public ClientInfo:tagClientInfo;					
    public VersionInfo: tagVersionInfo;
    public password: string;

    public serialize(ba: ByteArray) {
        ba.writeInt(this.nUserDBID);
        ba.writeInt(this.nPartnerID);
        ba.writeInt(this.nVersionCode);
        this.ClientInfo.serialize(ba);
        this.VersionInfo.serialize(ba);
        TSCommon.log("password = " + this.password);
        TSCommon.writeStringWithLength(ba, this.password, 64);
    } 
}