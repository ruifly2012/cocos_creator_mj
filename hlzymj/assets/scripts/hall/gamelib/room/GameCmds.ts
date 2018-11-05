import { ByteArray } from "../../common/ByteArray";
import { TSCommon } from "../../TSCommon";
export class GameCmds {
    public static MAIN_GR_LOGON:number = 150;
    public static SUB_GR_LOGON_BY_NAME:number = 1;
    public static SUB_GR_LOGON_BY_USERID:number = 2;
    public static SUB_GR_LOGON_BY_VNET:number = 3;

    public static SUB_GR_LOGON_SUCCESS:number = 50;
    public static SUB_GR_LOGON_FINISH:number = 51;

    public static MAIN_GR_CONFIG:number = 151;
    public static SUB_GR_ROOM_INFO:number = 1;
    public static SUB_GR_SCORE_HEADER:number = 2;
    public static SUB_GR_COLUMN_INFO:number = 3;
    public static SUB_GR_ORDER_INFO:number = 4;
    public static SUB_GR_MEMBER_INFO:number = 5;
    public static SUB_PREVENT_CHEAT:number = 6;
    public static SUB_GR_SUPPORT_TRANSFER:number = 7;
    public static SUB_GR_SUPPORT_REQ_CAN_SIT:number = 8;
    public static SUB_GR_VOIP_INFO:number = 9;
    public static SUB_GR_TABLE_INFO:number = 52;

    public static MAIN_GR_USER:number = 152;
    public static SUB_GR_BROADCAST_USER_COME:number = 1;
    public static SUB_GR_BROADCAST_USER_LEFT:number = 2;
    public static SUB_GR_BROADCAST_USER_STATUS:number = 3;
    public static SUB_GR_BROADCAST_USER_SCORE:number = 4;
    public static SUB_GR_MATCH_ENCASH:number = 5;
    public static SUB_GR_BROADCAST_USER_FAME:number = 6;

    public static SUB_GR_INVITE_USER:number = 20;
    public static SUB_GR_INVITE_PHONE:number = 21;
    public static SUB_GR_GLOBAL_FIND_USER:number = 22;
    public static SUB_GR_REQ_SIT_TABLE:number = 50;
    public static SUB_GR_REQ_LOOK_ON_TABLE:number = 51;
    public static SUB_GR_REQ_STAND_UP:number = 52;
    public static SUB_GR_REQ_INVITE_USER:number = 53;
    public static SUB_GR_REQ_PHONE:number = 54;
    public static SUB_GR_INVITE_PHONE_ANSWER:number = 55;
    public static SUB_GR_GLOBAL_USER_INFO:number = 56;
    public static SUB_GR_MATCH_AGREE_ENCASH:number = 57;
    public static SUB_GR_TRANSFER:number = 58;
    public static SUB_GR_SAFEBOX:number = 59;
    public static SUB_GR_TRANSFER_RESPONSE:number = 60;
    public static SUB_GR_SAFEBOX_RESPONSE:number = 61;
    public static SUB_GR_GET_SAFE_GUARD:number = 62;
    public static SUB_GR_GET_SAFE_GUARD_RESPONSE:number = 63;
    public static SUB_GR_GET_CAN_USE_MONEY:number = 64;
    public static SUB_GR_GET_CAN_USE_MONEY_RESPONSE:number = 65;
    public static SUB_GR_REQ_CAN_SIT_TABLE:number = 66;
    public static SUB_GR_CAN_SIT_TABLE_RESPONSE:number = 67;
    public static SUB_GR_MANAGER_BMATCH_CUOHE_PLAYER:number = 68;
    public static SUB_GR_REQ_VOIP:number = 69;
    public static SUB_GR_CANCEL_VOIP:number = 70;
    public static SUB_GR_ANSWER_VOIP:number = 71;
    public static SUB_GR_READY_VOIP:number = 72;
    public static SUB_GR_DROP_VOIP:number = 73;
    public static SUB_GR_GLOBAL_FIND_VOIP:number = 74;
    public static SUB_GR_GLORY_INFO:number = 75;
    public static SUB_GR_BROADCAST_USER_FACEID:number = 76;
    public static SUB_GR_VCODE:number = 77;
    public static SUB_GR_VCODE_SEND:number = 78;
    public static SUB_MGR_CANCEL_GOLDTABLE:number = 79;
    public static SUB_GR_GROW_INFO:number = 80;
    public static SUB_GR_BANK:number = 81;
    public static SUB_GR_BANK_RETURN:number = 82;
    public static SUB_GR_BANK_VALUE:number = 83;
    public static SUB_GR_MEMBER_END_TIME:number = 84;
    public static SUB_GR_CHANGE_PASSWORD:number = 85;
    public static SUB_GR_CHANGE_PASSWORD_RETURN:number = 86;
    public static SUB_GR_ARRANGE_NOT_ENOUGH_GOLD:number = 87;
    public static SUB_GR_CLEAR_NEGATIVE:number = 88;
    public static SUB_GR_CLEAR_ESCAPE:number = 89;
    public static SUB_GR_ENABLE_LOOKON:number = 90;
    public static SUB_GR_ROOM_TRANSFER:number = 91;
    public static SUB_GR_GET_USERNAME:number = 92;
    public static SUB_GR_VERIFYING_RECEIPT:number = 93;
    public static SUB_GR_LOTERY_POOL:number = 94;
    public static SUB_GR_LOTERY_PERSET:number = 95;
    public static SUB_GR_ADD_POOL_SUCCEEDED:number = 96;
    public static SUB_GR_TAX_VALUE:number = 97;
    public static SUB_GR_TRANSFER_TAX_NEED:number = 98;
    public static SUB_GR_GET_GAME_MONEY:number = 104;
    public static SUB_GR_MONEY_TO_GAME:number = 105;
    public static SUB_GR_FRAG_COUNT:number = 106;
    public static SUB_GR_QUERY_GOLD:number = 107;
    public static SUB_GR_SHAKE:number = 108;
    public static SUB_GR_CREATETABLE_FAILED:number = 109;
    public static SUB_GR_ENTERPRIVATE_FAILED:number = 110;
    public static SUB_GR_TOOLCARD_INFO:number = 111;
    public static SUB_GR_BROADCAST_USER_FAME_EX:number = 112;


    public static MAIN_GR_ROOM_STATUS: number = 153;				//;

    public static SUB_GR_BROADCAST_TABLE_STATUS:number = 1;
    public static SUB_GR_SHOW_SHORT_MESSAGE:number = 2;
    public static SUB_GR_PREVETCHEAT_ROOM_TABLE_COUNT:number = 3;
    public static SUB_GR_BROADCAST_GOLD_TABLE:number = 4		;

//////////////////////////////////////////////////////-
    public static MAIN_GR_PROPERTY			:number = 154;

    public static SUB_GR_PROP_REQ_USE:number = 1;
    public static SUB_GR_PROP_REQ_BUY: number = 2;
    public static SUB_GR_PROP_REPLY_SUPPORT: number = 3;				//;
    public static SUB_GR_CLIENT_PROP_USE: number = 4;			//;
    public static SUB_GR_PROP_REQ_BUY_EX: number = 6;			//;
    public static SUB_GR_PROP_REQ_PRESENT: number = 7;				//;
    public static SUB_GR_PROP_REQ_THROW: number = 8;			//;
    public static SUB_GR_PROP_REQ_BUY_V1: number = 9;			//;
    public static SUB_GR_PROP_REQ_UPDATE: number = 10;				//;


    public static SUB_GR_PROP_REALIZE:number = 20;
    public static SUB_GR_PROP_REQ_SUPPORT:number = 21;
    public static SUB_GR_PROP_UPDATE:number = 22				//;
    public static SUB_GR_PROP_ISSHOW_BTBUY:number = 23				//;
    public static SUB_GR_CLIENT_PROP_REALIZE:number = 24				//;
    public static SUB_GR_CLIENT_PROP_PLAY_FLASH:number = 25;
    public static SUB_GR_PROP_ASK_BUY:number = 26;

//////////////////////////////////////////////////////////
    public static MAIN_GR_CLIENT: number = 155;				//;

    public static SUB_GR_CHAT_SUPPORT_HTML: number = 1;				//;
    public static SUB_CR_MSG_BOX_REQ: number = 2;		//;
    public static SUB_CR_MSG_BOX_RET: number = 3;		//;
    public static SUB_GR_CLOST_GAME_CLIENT: number = 4;			//鍏抽棴瀹㈡埛绔 ?;
    public static SUB_GR_MSG_AUTO_CLOSE: number = 5;			//;
    public static SUB_CR_MSG_BOX_REQ_WITH_TIMER: number = 6;			//;

    public static MAIN_GR_MATCH: number = 156;			//比赛相关命令;
    public static SUB_GR_MATCH_PRIZE: number = 1;		// 比赛奖励;
//int nRanking, char * szPrize;
    public static SUB_GR_MATCH_WAIT_START: number = 2;			// 比赛因人不齐，请等待;

    public static SUB_GR_MATCH_ELIMINATE: number = 3;			// 被淘汰;
    public static SUB_GR_MATCH_PROMOTE: number = 4;			// 晋级;


    public static CMD_HTML_HALL_CHAT:number = 0x1E;
    public static CMD_HTML_TABLE_CHAT:number = 0x1F;


    public static CMD_AD:number = 0x12;
    public static CMD_MANAGER:number = 0x15;
    public static CMD_SERVER_PING:number = 0x1a;
    public static IDS_SP_PING_CLIENT:number = 1;
    public static IDC_SP_ANWSER_PING:number = 2;

    public static IDS_MANAGER_MANAGER_MESSAGE:number = 0x0A;

    public static MAIN_CM_SERVICE: number = 200;			//鏈嶅姟娑堟伅;

    public static SUB_CM_MESSAGE: number = 1;			//绯荤粺娑堟伅;
    public static SUB_CM_MESSAGE_EX: number = 2;			//鎵╁睍娑堟伅;
    public static SUB_CM_MESSAGE_EX_2: number = 3;				//浜屾鎵╁睍娑堟伅;
    public static SUB_CM_SHOW_WEB: number = 4;			//鏈嶅姟鍣ㄩ€氱煡鎵撳紑椤甸潰;

    public static SUB_CM_YESORNO_REQ: number = 11;				//鏈嶅姟鍣ㄨ闂畒es or no 娑堟伅;
    public static SUB_CM_YESORNO_RET: number = 12;				//澶у巺绛斿yes or no 娑堟伅;

    public static SUB_CM_MSG_BOX_REQ: number = 13;			//鏈嶅姟鍣ㄨ姹傚脊鍑篗SGBOX;
    public static SUB_CM_MSG_BOX_RET: number = 14;			//澶у巺绛斿MSGBOX娑堟伅;
    public static SUB_CR_MSG_BOX_REQ_TIMER: number = 15;			//澶у巺绛斿MSGBOX娑堟伅(甯imer);
//////////////////////////////////////////////////////////////////////////

    public static MAIN_CM_DOWN_LOAD: number = 201;				//涓嬭浇娑堟伅;

    public static SUB_CM_DOWN_LOAD_INSTALL: number = 1;				//瀹夎鏂囦欢;

    public static CMD_NONE: number = 0;	// = 0鏄渶瀹规槗鍑虹幇鐨勪贡鐮侊紝涓嶈兘瀹氫箟涓哄懡浠ょ爜;
    public static CMD_LOGIN:number = 1;
    public static CMD_FTP:number = 2;
    public static CMD_GAME:number = 3;
    public static CMD_USER:number = 4;
    public static CMD_SQUARE:number = 5;
    public static CMD_HALL_CHAT:number = 6;
    public static CMD_TABLE_CHAT:number = 7;
    public static CMD_JUDGE:number = 8;
    public static CMD_WHISPER:number = 9;
    public static CMD_SERVER_INFO:number = 0x0A;
    public static CMD_GAME_INFO:number = 0x0B;
    public static CMD_USER_COUNT:number = 0x0C;
    public static CMD_SERVER_CLOSE:number = 0x0D;
    public static CMD_SQUARE_IDLE:number = 0x0E;
    public static CMD_SQUARE_ACTIVE:number = 0x0F;
    public static CMD_REPORT_EVENT:number = 0x10;
    public static CMD_POST_DATA:number = 0x11;
    public static IDC_USER_REQ_SIT_DOWN:number = 0x01;
    public static IDS_USER_ANS_SIT_DOWN:number = 0x02;
    public static IDC_USER_STAND_UP:number = 0x03;
    public static IDC_USER_AGREE_START:number = 0x04;
    public static IDC_USER_GAME_OVER:number = 0x06;
    public static IDC_USER_REQ_LOOK_ON:number = 0x07;
    public static IDS_USER_ANS_LOOK_ON:number = 0x08;
    public static IDS_USER_BROADCAST_USER_INFO:number = 0x09;
    public static IDS_USER_BROADCAST_USER_STATUS:number = 0x0A;
    public static IDS_USER_BROADCAST_TALBLE_STATUS:number = 0x0B;
    public static IDS_USER_BROADCAST_USER_GAMEOVER:number = 0x0C;
    public static IDC_USER_AGREE_LOOKON:number = 0x0D;
    public static IDS_USER_USERLIST_END:number = 0x0E;
    public static IDC_USER_CANCEL_READY:number = 0x16;



//CMD_PING_USER
    public static CMD_PING_USER: number = 0x16;	// 缃戠粶娴嬭瘯;

    public static IDC_PING_USER:number = 0X01;
    public static IDS_PING_USER:number = 0X02;
    public static IDC_ANSWER_PING:number = 0X03;
    public static IDS_ANSWER_PING:number = 0X04;
    public static IDC_PING_ME:number = 0x05;
    public static IDS_ANSWER_PING_ME:number = 0x06;

    public static SUB_GR_ROOM_OPTION: number = 50;				//鎴块棿閰嶇疆;

    public static CMD_CLIENT_VERSION:number = 0x81;

    public static IDC_USER_KICK_OFF_TABLE:number = 0x12;
    public static KICK_ENEMY: number = 1;	// 鍥犱负鏄晫浜烘墍浠ヨ涪浠 ?;
    public static KICK_MASTER_DENY: number = 2;	// 鍥犱负鎴戞槸妗屼富锛屾垜鎯宠涪浣?;

    public static SEND_TABLE_CHAT_OK:number = 0;
    public static SEND_TABLE_CHAT_OFFLINE:number = 1;
    public static SEND_TABLE_CHAT_NULL_CONTENT:number = 2;
    public static SEND_TABLE_CHAT_BUSY: number = 3;

    public static FIELD_DATA_ID = 0;
    public static FIELD_USER_INDEX = 1;
    public static FIELD_ROUND_COUNT = 2;
    public static FIELD_NAME = 3;
    public static FIELD_USER_DESCRIBE = 4;
    public static FIELD_USER_NOTE = 5;
    public static FIELD_ORDER = 6;
    public static FIELD_GOLD = 7;
    public static FIELD_POINT = 8;
    public static FIELD_TABLE_ID = 9;
    public static FIELD_CHAIR_ID = 10;
    public static FIELD_USER_STATUS = 11;
    public static FIELD_WIN_COUNT = 12;
    public static FIELD_LOST_COUNT = 13;
    public static FIELD_DRAW_COUNT = 14;
    public static FIELD_FLEE_COUNT = 15;
    public static FIELD_FLEE_RATE = 16;
    public static FIELD_WIN_RATE = 17;
    public static FIELD_PLAY_COUNT = 18;
    public static FIELD_NET_TIMELAG = 19;
    public static FIELD_MEMBER = 20;
    public static FIELD_USER_LEVEL = 21;
    public static FIELD_GROUP_ID = 22;
    public static FIELD_GROUP_NAME = 23;
    public static FIELD_OFFICE_NAME = 24;
    public static FIELD_CONNECTION = 25;
    public static FIELD_USER_SEX = 26;
    public static FIELD_PROVINCE = 27;
    public static FIELD_CITY = 28;
    public static FIELD_AREA = 29;
    public static FIELD_AVATARURL = 30;
    public static FIELD_AGE = 31;
    public static FIELD_AVATAR_NC = 32;
    public static FIELD_HAVE_MOBILE = 33;
    public static FIELD_HAVE_PHONECHAT = 34;
    public static FIELD_PHONE_NUM = 35;
    public static FIELD_SPECIAL_FLAG = 36;
    public static FIELD_SPECIAL_GRADE_NAME = 37;
    public static FIELD_USER_LOGO = 38;
    public static FIELD_GLORY_SCORE = 39;
    public static FIELD_GLORY_INFO = 40;
    public static FIELD_MEMBER_SCORE = 41;
    public static FITLE_MEMBER_CLASS = 42;
    public static FITLE_FAME = 43;
    public static FIELD_QQ = 44;
    public static FIELD_LOCATION = 45;
    public static FIELD_FACECHANGEINDEX = 46;
}

export class CMD_GR_RoomOption {
    public lMinScore: number;
    public lMaxScore: number;
    public wNetTimelag: number;
    public wEscape: number;
    public cbIPLimmit: number;
    constructor() {
        this.lMinScore = -2147483647;
        this.lMaxScore = 2147483647;
        this.wNetTimelag = 0xFFFF;
        this.wEscape = 0xFFFF;
        this.cbIPLimmit = 0;
    }

    public serialize(): ByteArray{
        var ret = new ByteArray();
        ret.writeInt(this.lMinScore);
        ret.writeInt(this.lMaxScore);
        ret.writeShort(this.wNetTimelag);
        ret.writeShort(this.wEscape);
        ret.writeByte(this.cbIPLimmit);
        return ret;
    }
}

export class CMD_GR_BroadCast_TableStatus {
    wTableID: number;
    cbTableStatus: number;

    constructor() {
        this.wTableID = 0xFFFF;
        this.cbTableStatus = 0xFF;
    }

    public deserialize(buf: ByteArray) {
        this.wTableID = buf.readUnsignedShort();
        this.cbTableStatus = buf.readUnsignedByte();
    }
}

export class CMD_GR_GameInfo {
    cbGameKindID: number;
    cbEnableLookOn: number;
    uServerID: number;
    wTableCount: number;
    cbTableUser: number;
    bufReserved: ByteArray;
    constructor() {
        this.bufReserved = new ByteArray();
    }
    public deserialize(buf: ByteArray) {
        this.cbGameKindID = buf.readUnsignedByte();
        this.cbEnableLookOn = buf.readUnsignedByte();
        this.uServerID = buf.readUnsignedInt();
        this.wTableCount = buf.readUnsignedShort();
        this.cbTableUser = buf.readUnsignedByte();
        this.bufReserved = new ByteArray();
        buf.readBytes(this.bufReserved);
    }
}

export class CMD_GR_BroadCast_UserScore {
    dwUserDBID: number;
    cbScoreSize: number;
    cbScoreBuf: ByteArray;
    constructor() {
        this.cbScoreBuf = new ByteArray();
    }

    public deserialize(buf: ByteArray) {
        this.dwUserDBID = buf.readUnsignedInt();
        this.cbScoreSize = buf.readUnsignedByte();        
        buf.readBytes(this.cbScoreBuf);
    }
}

export class CMD_GR_Req_UserSit {
    wNetSpeed: number;
    wTableID: number;
    cbChairID: number;
    cbCreateTable: number;
    szTablePass: string;

    constructor() {
        this.wNetSpeed = 0;
        this.wTableID = 0;
        this.cbCreateTable = 0;
        this.szTablePass = "";
    }

    serialize(): ByteArray{
        var ba: ByteArray = new ByteArray();
        ba.writeUnsignedShort(this.wNetSpeed);
        ba.writeUnsignedShort(this.wTableID);
        ba.writeByte(this.cbChairID);
        ba.writeByte(this.cbCreateTable);
        TSCommon.writeStringWithLength(ba, this.szTablePass, 16);
        return ba;
    }
}

export class CMD_GR_Req_UserLookOn {
    wNetSpeed: number;
    wTableID: number;
    cbChairID: number;
    cbPassLen: number;
    szTablePass: string;

    constructor() {
        this.wNetSpeed = 0;
        this.wTableID = 0;
        this.cbPassLen = 0;
        this.szTablePass = "";
    }

    serialize(): ByteArray {
        var ba: ByteArray = new ByteArray();
        ba.writeUnsignedShort(this.wNetSpeed);
        ba.writeUnsignedShort(this.wTableID);
        ba.writeByte(this.cbChairID);
        ba.writeByte(this.cbPassLen);
        TSCommon.writeStringWithLength(ba, this.szTablePass, 16);
        return ba;
    }
}