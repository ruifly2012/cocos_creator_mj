export class PlazaCmds {
    public static MAIN_GP_LOGON:number = 100;				//锟斤拷陆锟斤拷锟斤拷锟斤拷锟斤拷

    public static SUB_GP_LOGON_RIGISTER:number = 1;				//注锟斤拷锟斤拷锟矫伙拷
    public static SUB_GP_LOGON_BY_NAME:number = 2;				//通锟斤拷锟斤拷锟街碉拷陆
    public static SUB_GP_LOGON_BY_USERID:number = 3;				//通锟斤拷 ID 锟斤拷陆
    public static SUB_GP_LOGON_BY_VNET:number = 4;				//通锟斤拷 VNET 锟斤拷陆
    public static SUB_GP_LOGON_BY_VNET_TOKEN:number = 5;				//通锟斤拷Vnet锟斤拷证锟斤拷锟斤拷陆	//add by mxs 2006-3
    public static SUB_GP_LOGON_BY_VNET_TOKEN_V1:number = 6;				//通锟斤拷Vnet锟斤拷证锟斤拷锟斤拷陆(锟斤拷)//add by mxs nedu
    public static SUB_GP_LOGON_BY_VNET_CMD:number = 7;				//通锟斤拷Vnet锟斤拷锟斤拷锟叫碉拷陆	//add by mxs e8
    public static SUB_GP_LOGON_BY_IMEI:number = 8;
    public static SUB_GP_LOGON_BY_EMAIL:number = 9;
    public static SUB_GP_GET_GAMEINFO:number = 10;
    public static SUB_GP_GET_GAMEINFO_EX:number = 11;

    public static SUB_GP_LOGON_SUCCESS:number = 50;				//锟斤拷陆锟缴癸拷通知
    public static SUB_GP_LOGON_SUCCESS_EX:number = 51;				//锟斤拷陆锟缴癸拷通知
    public static SUB_GP_LOGON_RIGISTER_EX:number = 52;				//注锟斤拷锟斤拷锟矫伙拷
    public static SUB_GP_GET_OPEN_PLATFORM_TOKEN:number = 53;				//锟斤拷锟斤拷平台锟斤拷取锟矫伙拷Token					//add by mxs 2006- 8 - 8
    public static SUB_GP_OPEN_PLATFORM_GETTOKEN:number = 54;				//锟矫碉拷token								//add by mxs 2006- 8 - 8
    public static SUB_GP_LOGON_SUCCESS_VNET:number = 55;				//Vnet锟斤拷录锟缴癸拷(锟斤拷要锟角凤拷锟斤拷锟剿硷拷锟斤拷锟斤拷锟斤拷)//add by mxs vnetpass	2007- 2 - 27
    public static SUB_GP_LOGON_RIGISTER_V1:number = 56;				//注锟斤拷锟矫伙拷								//add by mxs fcm
    public static SUB_GP_PSW_CARD_COORD:number = 57;				//锟矫碉拷锟斤拷锟诫卡锟斤拷锟? //add by mxs mmk
    public static SUB_GP_PSW_CARD_USER_NUM:number = 58;				//锟斤拷锟斤拷锟矫伙拷锟斤拷锟斤拷锟斤拷锟斤拷肟拷锟斤拷锟 ? //add by mxs mmk
    public static SUB_GP_GET_OPEN_PLATFORM_TOKEN_VNET:number = 64;				//锟斤拷锟斤拷平台锟斤拷取锟矫伙拷token(VNET锟斤拷陆锟斤拷)//add by mxs nedu
    public static SUB_GP_OPEN_PLATFORM_GETTOKEN_VNET:number = 65;				//锟矫碉拷token(Vnet锟斤拷陆锟斤拷)//add by mxs nedu
    public static SUB_GP_LOGON_REG_RESULT:number = 66;				//注锟结返锟截的斤拷锟? //add by mxs nplaza
    public static SUB_GP_LOGON_AVATAR_URL:number = 67;				//AvatarURL								//add by mxs atr
    public static SUB_GP_LOGON_FACEDATA:number = 68;				// 鑷畾涔夊ご鍍忎俊鎭 ?
    public static SUB_GP_VIP_INFO:number = 69;				// 用户vip等级
    //int nVIPLevel; int nVIPScore;
    public static SUB_GP_SCORE_EX:number = 70;				// 分数补充
    //int nWeekWinAmount; int nMaxWinAmount
    //public static SUB_GP_LOGON_AWARD_BASE:number = 71;				// 每日登陆奖励基数
    public static SUB_GP_GAMEINFO:number = 72;


    //一些锟斤拷锟斤拷锟斤拷锟 ?
    public static SUB_GP_TRANSFER:number = 60;				//转锟斤拷									//add by mxs 2006- 3
    public static SUB_GP_SAFEBOX:number = 61;				//锟斤拷锟秸癸拷								//add by mxs 2006- 3
    public static SUB_GP_SEND_LOGON_TIME:number = 62;				//锟斤拷锟酵碉拷陆时锟斤拷							//add by mxs tel
    public static SUB_GP_VNET_RT_URL:number = 63;				//锟斤拷取锟斤拷锟斤拷Vnet锟斤拷陆锟斤拷URL					//add by mxs nedu
    public static SUB_GP_GUEST:number = 64;
    public static SUB_GP_LOGON_BY_TOKEN:number = 65;



    //////////////////////////////////////////////////////////////////////////

    public static MAIN_GP_SERVER_LIST:number = 101;				//锟斤拷锟斤拷锟斤拷锟叫憋拷

    public static SUB_GP_SERVER_LIST_Web:number = 12;				//锟斤拷戏web锟节碉拷
    public static SUB_GP_SERVER_LIST_TYPE:number = 1;				//锟斤拷戏锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_KIND:number = 2;				//锟斤拷戏锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_STATION:number = 3;				//锟斤拷戏站锟斤拷
    public static SUB_GP_SERVER_LIST_ROOM:number = 4;				//锟斤拷戏锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_ROOM_EX:number = 5;				//锟斤拷戏锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_ITEM:number = 6;				//锟斤拷锟斤拷锟斤拷息
    public static SUB_GP_SERVER_LIST_MODE:number = 9;				//锟叫憋拷模式
    public static SUB_GP_SERVER_LIST_SUBSTATION_ROOM:number = 10;				//锟斤拷站锟斤拷锟斤拷锟叫憋拷
    public static SUB_GP_SERVER_LIST_EDU_ITEM:number = 21;				//锟斤拷锟斤拷锟斤拷平台锟斤拷戏锟叫憋拷		//add by mxs edu
    public static SUB_GP_SERVER_LIST_SUBSTATION_KIND:number = 22;				//锟斤拷站锟斤拷戏锟叫憋拷				//add by mxs nedu
    public static SUB_GP_SERVER_LIST_TYPE_V1:number = 23;				//锟斤拷戏锟斤拷锟斤拷					//add by mxs sc

    public static SUB_GP_SERVER_WEB_COUNT:number = 13;				//WEB锟节碉拷锟斤拷锟斤拷
    public static SUB_GP_SERVER_KIND_COUNT:number = 7;				//锟斤拷锟斤拷锟斤拷锟斤拷
    public static SUB_GP_SERVER_ROOM_COUNT:number = 8;				//锟斤拷锟斤拷锟斤拷锟斤拷
    public static SUB_GP_SERVER_SUBSTATION_COUNT:number = 11;				//锟斤拷站锟斤拷锟斤拷

    public static SUB_GP_GET_SERVER_LIST:number = 9;				//锟斤拷取锟斤拷锟斤拷
    public static SUB_GR_GET_COLLECTION_SERVER:number = 51;				//锟斤拷取锟斤拷锟矫凤拷锟斤拷锟斤拷
    public static SUB_GR_GET_COLLECTION_SERVER_EX:number = 53;				//锟斤拷取锟斤拷锟矫凤拷锟斤拷锟斤拷
    public static SUB_GP_GET_SUBSTATION_SERVER_LIST:number = 54;				//锟斤拷站锟斤拷锟斤拷锟叫憋拷
    public static SUB_GP_GET_EDU_SERVER_LIST:number = 59;				//锟斤拷取锟斤拷锟斤拷锟斤拷平台锟斤拷戏锟叫憋拷	//add by mxs edu

    public static SUB_GP_GET_ONLINE_COUNT:number = 52;				//锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷
    public static SUB_GP_GET_SUBSTATION_ONLINE_COUNT:number = 55;				//锟斤拷取锟斤拷站锟斤拷锟斤拷


    //锟借单锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷戏锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_SPECIAL_KIND:number = 56;				//锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_WEB_KIND:number = 57;				//web锟斤拷锟斤拷
    public static SUB_GP_SERVER_LIST_OPENPLATFORM_KIND:number = 58;				//锟斤拷锟斤拷平锟斤拷戏	add by mxs 2006- 8 - 8
    //////////////////////////////////////////////////////////////////////////

    public static MAIN_GP_CONFIG:number = 102;				//锟斤拷锟斤拷锟斤拷息

    public static SUB_GP_BBRING_IP:number = 1;				//寻锟斤拷锟斤拷址
    public static SUB_GP_USER_INFO:number = 2;				//锟矫伙拷锟斤拷锟斤拷
    public static SUB_GP_MASTER_IP:number = 3;				//锟斤拷艿锟街?
    public static SUB_GP_CHANGE_INFO:number = 50;				//锟斤拷锟斤拷锟斤拷锟?
    public static SUB_GP_AD_INFO:number = 51;				//锟斤拷锟斤拷锟较?
    public static SUB_GP_BIND_EMAIL:number = 52;
    public static SUB_GP_GET_AWARD:number = 53;				// 鑾峰彇濂栧姳
    public static SUB_GP_GET_FACE:number = 54;				// 鑾峰彇澶村儚
    public static SUB_GP_APPLE_CHARGE:number = 55;				// 苹果充值
    public static SUB_GP_CHANGE_USERWORD:number = 56;				// 修改签名


    public static MAIN_CM_SERVICE:number = 200;
    public static SUB_CM_MESSAGE:number = 1;
    public static SUB_CM_MESSAGE_EX:number = 2;
    public static SUB_CM_MESSAGE_EX_2:number = 3;
    //////////////////////////////////////////////////////////////////////////

    //锟斤拷效锟斤拷锟斤拷 ID
    public static ERROR_KIND_ID:number = 0xFFFF
}