import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
import {GameCmds} from "./GameCmds";
export class tagUserInfoBroad {
    wSize:number;
    lUserDBID:number;
    wUserIndex:number;
    wRoundCount:number;
    wFaceID:number;
    wNetTimelag:number;
    wTableID:number;
    dwGroupID:number;
    dwUserLevel:number;
    cbChairID:number;
    cbUserStatus:number;
    cbSex:number;
    cbNameLen:number;
    cbGroupLen:number;
    cbVIPLevel:number;
    cbScoreLen:number;
    dwMemberClass:number;
    dwMemberLevel:number;
    dwFame:number;
    dwFameLevel:number;
    wShowID:number;
    cbMember:number;
    szName: string;
    szGroup: string;
    szScores: ByteArray;
    szAvatar: string;
    szProvince: string;
    szArea: string;
    szCity: string;
    nAge:number;
    lGloryScore:number;
    wGloryID:number;
    cbGloryLevel:number;
    dwSpecialFlag:number;
    dwUpgradeDays:number;
    dwUpgradeRemainDays:number;
    cbShowFaceOnTable:number;
    cbFaceChangeIndex:number;
    szDescribe: string;
    szLocation: string;

    public constructor(){
        this.szScores = new ByteArray();
    }

    public deserialize(buf: ByteArray) {
        this.wSize = buf.readShort();
        this.lUserDBID = buf.readInt();
        this.wUserIndex = buf.readShort();
        this.wRoundCount = buf.readShort();
        this.wFaceID = buf.readShort();
        this.wNetTimelag = buf.readShort();
        this.wTableID = buf.readShort();
        this.dwGroupID = buf.readUnsignedInt();
        this.dwUserLevel = buf.readUnsignedInt();
        this.cbChairID = buf.readByte();
        this.cbUserStatus = buf.readByte();
        this.cbSex = buf.readByte();
        this.cbNameLen = buf.readByte();
        this.cbGroupLen = buf.readByte();
        this.cbVIPLevel = buf.readByte();
        this.cbScoreLen = buf.readByte();
        this.dwMemberClass = buf.readUnsignedInt();
        this.dwMemberLevel = buf.readUnsignedInt();
        this.dwFame = buf.readUnsignedInt();
        this.dwFameLevel = buf.readUnsignedInt();
        this.wShowID = buf.readShort();
        this.szLocation = "";

        this.szName = TSCommon.readGbkString(buf, this.cbNameLen);//buf.readUTFBytes(this.cbNameLen);
        this.szGroup = "";        
        buf.readBytes(this.szScores, 0, this.cbScoreLen);        
        var nFieldsLen = buf.length - buf.position;
        if (nFieldsLen <= 0)
            return;
        var szFields = new ByteArray();
        buf.readBytes(szFields, 0, nFieldsLen);
        var nFieldOff = 0;
        while (nFieldOff < nFieldsLen) {
            var cbFdType:number = szFields.readUnsignedByte();
            nFieldOff = nFieldOff + 1;
            var cbFdLen: number = szFields.readUnsignedByte();
            nFieldOff = nFieldOff + 1
            if (cbFdLen <= 2)
                continue;
            cbFdLen = cbFdLen - 2;
            if (cbFdLen + nFieldOff > nFieldsLen)
                break;
            var fdData = new ByteArray();
            szFields.readBytes(fdData, 0, cbFdLen);
            nFieldOff = nFieldOff + cbFdLen;

            switch (cbFdType) {
                case GameCmds.FIELD_FACECHANGEINDEX: {
                    this.cbFaceChangeIndex = fdData.readUnsignedByte();				
                    break;
                }
                case GameCmds.FIELD_LOCATION: {
                    this.szLocation = TSCommon.readGbkString(fdData, cbFdLen);
                    break;
                }
                case GameCmds.FIELD_USER_DESCRIBE: {
                    this.szDescribe = TSCommon.readGbkString(fdData, cbFdLen);
                    break;
                }               
                default:
                    break;
            }
        }
    }
}