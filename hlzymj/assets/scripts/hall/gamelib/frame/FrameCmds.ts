export class FrameCmds {
    public static FRAME_INVALID_USER_ID:number = 0xffff;

    // copy from old frame///////////////////////////////////////////////////////////
    //服务器命令码起始值
    public static SERVERSITE_MSG:number = 0x80;

    //个人场景
    public static SERVERSITE_PERSONAL_SCENE:number = (FrameCmds.SERVERSITE_MSG + 1);
    //场景(与SERVERSITE_PERSONAL_SCENE相似)
    public static SERVERSITE_SCENE:number = (FrameCmds.SERVERSITE_MSG + 2);
    //第一个场景(请求确认)
    public static SERVERSITE_FIRST_SCENE:number = (FrameCmds.SERVERSITE_MSG + 3);
    //保存相关
    public static SERVERSITE_SAVE_STORAGE:number = (FrameCmds.SERVERSITE_MSG + 4);
    public static SERVERSITE_SAVE_STORAGE_CONTINUE:number = (FrameCmds.SERVERSITE_MSG + 5);
    public static SERVERSITE_SAVE_STORAGE_END:number = (FrameCmds.SERVERSITE_MSG + 6);
    //游戏结束
    public static SERVERSITE_GAME_OVER:number = (FrameCmds.SERVERSITE_MSG + 7);
    //解散
    public static SERVERSITE_GAME_DISMISS:number = (FrameCmds.SERVERSITE_MSG + 8);
    //允许(禁止)旁观
    public static SERVERSITE_ENABLE_LOOKON:number = (FrameCmds.SERVERSITE_MSG + 9);
    //等待开始
    public static SERVERSITE_WAITING_START:number = (FrameCmds.SERVERSITE_MSG + 10);
    //有新版本了
    public static SERVERSITE_REQUEST_NEWVERSION:number = (FrameCmds.SERVERSITE_MSG + 11);
    //比赛进程
    public static SERVERSITE_MATCH_PROGRESSING:number = (FrameCmds.SERVERSITE_MSG + 12);
    //比赛结束
    public static SERVERSITE_MATCH_END:number = (FrameCmds.SERVERSITE_MSG + 13);
    //回应桌主椅子号
    public static SERVERSITE_ANSWER_TABLEOP:number = (FrameCmds.SERVERSITE_MSG + 14);
    //对话框消息
    public static SERVERSITE_POPUPMESSAGE:number = (FrameCmds.SERVERSITE_MSG + 15);

    //通知客户端有新版本提供下载
    public static SERVERSITE_NEWVERSION_AVAILABLE:number = (FrameCmds.SERVERSITE_MSG + 16);
    //告诉客户端版本不对, 提示下载
    public static SERVERSITE_INVALID_VERSION:number = (FrameCmds.SERVERSITE_MSG + 17);
    //把规则号发给客户端
    public static SERVERSITE_GAMEOPTION:number = (FrameCmds.SERVERSITE_MSG + 18);
    //把软开始转发给所有人
    public static SERVERSITE_SOFT_READY:number = (FrameCmds.SERVERSITE_MSG + 19);
    //把协商离开的请求发给所有人
    public static SERVERSITE_NEGOTIATE_DISMISS:number = (FrameCmds.SERVERSITE_MSG + 20);
    //发信息给客户端聊天框显示
    public static SERVERSITE_SYSTEMMESSAGE:number = (FrameCmds.SERVERSITE_MSG + 21);
    //发送默认是否允许旁观的信息
    public static SERVERSITE_DEFAULT_LOOKON:number = (FrameCmds.SERVERSITE_MSG + 22);
    //发送命令让客户端下载指定文件到指定目录
    public static SERVERSITE_DOWNLOAD_FILE:number = (FrameCmds.SERVERSITE_MSG + 23);
    //数据:

    // enum FrameDownloadType
    // {
    //	enDownload_Silently   0, //后台
    //enDownload_Promptly, //有对话框
    // }

    //桌主踢人后, 给个提示给客户端
    public static SERVERSITE_MASTER_KICK:number = (FrameCmds.SERVERSITE_MSG + 24);
    //服务器框架的版本号
    public static SERVERSITE_SERVERFRAME_VERSION:number = (FrameCmds.SERVERSITE_MSG + 25);

    //当用户进来的时候发送的一些信息
    public static SERVERSITE_INFOS_WHEN_USER_ENTER:number = (FrameCmds.SERVERSITE_MSG + 26);

    //让客户端显示类似msn的系统消息
    public static SERVERSITE_SHOW_GLOBAL_MSG:number = (FrameCmds.SERVERSITE_MSG + 27);

    //通知客户端, 桌主取消了规则设置
    public static SERVERSITE_CANCEL_CHANGE_GAMERULE:number = (FrameCmds.SERVERSITE_MSG + 28);

    //通知客户端, 桌主改变了规则设置
    public static SERVERSITE_CHANGE_GAMERULE:number = (FrameCmds.SERVERSITE_MSG + 29);

    //把默认的规则发送给客户端
    public static SERVERSITE_DEFAULT_GAMERULE:number = (FrameCmds.SERVERSITE_MSG + 30);

    //发送可以开始的信号给客户端
    public static SERVERSITE_CAN_READY:number = (FrameCmds.SERVERSITE_MSG + 31);

    //让客户端显示多功能对话框
    public static SERVERSITE_FUNCTIONAL_MSGBOX:number = (FrameCmds.SERVERSITE_MSG + 32);


    //发送分数段到客户端
    public static SERVERSITE_ACADEMY_SCORESEGMENT:number = (FrameCmds.SERVERSITE_MSG + 33);
    //数据：带长度的buffer

    //发送级别段到客户端
    public static SERVERSITE_ACADEMY_LEVELSEGMENT:number = (FrameCmds.SERVERSITE_MSG + 34);
    //数据：带长度的buffer
    //发送声音
    public static SERVERSITE_SOUND:number = (FrameCmds.SERVERSITE_MSG + 35);


    //////////////////////////////////////////////////////////////////////////
    // 客户端命令码起始值
    public static CLIENTSITE_MSG:number = 0xc0;
    //确认开始
    public static CLIENTSITE_CONFIRM_START:number = (FrameCmds.CLIENTSITE_MSG + 1);
    //允许(禁止)旁观
    public static CLIENTSITE_ENABLE_LOOKON:number = (FrameCmds.CLIENTSITE_MSG + 2);
    //请求保存
    public static CLIENTSITE_REQUEST_STORAGE:number = (FrameCmds.CLIENTSITE_MSG + 3);
    //发送版本信息
    public static CLIENTSITE_REQUEST_VERIFY_VERSION:number = (FrameCmds.CLIENTSITE_MSG + 4);
    //管理员裁决
    public static CLIENTSITE_ADMINISTRATOR_SENTENCE:number = (FrameCmds.CLIENTSITE_MSG + 5);
    //请求桌主
    public static CLIENTSITE_REQUEST_TABLEOP:number = (FrameCmds.CLIENTSITE_MSG + 6);
    //软开始
    public static CLIENTSITE_SOFT_READY:number = (FrameCmds.CLIENTSITE_MSG + 7);
    //协商离开的命令
    public static CLIENTSITE_NEGOTIATE_DISMISS:number = (FrameCmds.CLIENTSITE_MSG + 8);
    //客户端框架发送框架自身的版本号
    public static CLIENTSITE_FRAME_VERSION:number = (FrameCmds.CLIENTSITE_MSG + 9);
    //客户端发送桌主踢人的命令
    public static CLIENTSITE_MASTER_KICK:number = (FrameCmds.CLIENTSITE_MSG + 10);
    //客户端发送我同意规则的命令
    public static CLIENTSITE_AGREE_GAMERULE:number = (FrameCmds.CLIENTSITE_MSG + 11);
    //客户端发送我改变规则的命令
    public static CLIENTSITE_CHANGE_GAMERULE:number = (FrameCmds.CLIENTSITE_MSG + 12);
    //客户端取消设置规则
    public static CLIENTSITE_CANCEL_CHANGE_GAMERULE:number = (FrameCmds.CLIENTSITE_MSG + 13);
    //发送语音
    public static CLIENTSITE_SEND_SOUND:number = (FrameCmds.CLIENTSITE_MSG + 14);

    public static SCENE_STATUS_PLAYING:number = 0;
    public static SCENE_STATUS_FREE:number = 1;

    public static DISPID_CHANGE_GAMERULE: number = 1;	// 閻犱礁澧介悿鍡樼閸℃凹鐎柛鎺炴嫹dwReserved2濞戞捇缂氶‖鍐礆濡惧嵔ffer, byte[], dwReserved3濞戞挻妞介弳杈ㄦ償閿熺禒nt);
    public static DISPID_CANCEL_CHANGE_GAMERULE: number = 2;	// 闁告瑦鐗楃粔椋庢媼閸撗呮瀭閻熸瑥瀚崹锟絛wReserved2濞戞捇缂氶‖鍐礆濡惧嵔ffer, byte[], dwReserved3濞戞挻妞介弳杈ㄦ償閿熺禒nt);
    public static DISPID_DEFAULT_GAMERULE: number = 3;	// 濮掓稒顭堥鑽ゆ喆閸曨偄鐏 ? dwReserved2濞戞捇缂氶‖鍐礆濡惧嵔ffer, byte[], dwReserved3濞戞挻妞介弳杈ㄦ償閿熺禒nt);
    public static DISPID_EVENT_LOGIC_INITIAL_DATA: number = 4;	// 闂侇偅姘ㄩ悡锟犳焻閺勫繒甯嗛柛娆樺灟娴滄帡宕氬┑鍡╃€堕柛鏍ㄧ墬閺嗙喖骞戦敓鍊熴亹閹炬惌鏀遍柡瀣煐閺佸湱锟界仦鑲╁晩闁活枌鍔嶉崺娑㈠礆濡ゅ嫨锟介悹瀣暟閺侊拷dwReserved2闁告粌鐣硍Reserved3婵炲矉绱曢弫锟; ?
    public static DISPID_EVENT_LOGIC_CLEAR_DATA: number = 5;	// 闂侇偅姘ㄩ悡锟犳焻閺勫繒甯嗘繛鎾虫嚇濞呭酣寮悧鍫濈ウ, 闂侇偅鑹鹃悥鍫曞及椤栨繂娈扮€规瓕浜—褍顕ｉ敓绲泈Reserved2闁告粌鐣硍Reserved3婵炲矉绱曢弫锟; ?
    public static DISPID_IS_SUPPORT_UNITED_READY: number = 6;	// 閻犲洢鍨藉Λ鍫曟焻閺勫繒甯嗛柡鍕靛灠閹線寮ㄩ娑樼槷閺夌儐鍨抽垾鏍ь嚕閿熺瓔鐎堕柣銊ュ缁儤绋夐敓浠嬪础瀹曞洦鏆犳俊妤€妫欓悘锔剧不閿涘嫭鍊為弶鐑嗗灣閳ユ牕顕ｉ敓绛嬬€?(dwReserved2闁告粌鐣硍Reserved3婵炲矉绱曢弫锟藉┑鈥冲€归悘澶屾啺娴ｈ鏀遍柡瀣硾椤︾敻鎮堕崱妤€鐏熼弶鈺傛煥濞叉湦RUE);
    public static DISPID_ON_GAME_DISMISS: number = 7;	// 婵炴挸鎲￠崹娆戞偖椤愩儛鎺楀极閿熶粙寮悩鎻掓闁轰緤鎷; ?
    public static DISPID_ON_CREATE_OVER: number = 8;	// 闁告帗绋戠紓鎾诲箣閹邦剙顬? 闁哄啰濮村顒勫极閿燂拷;
    public static DISPID_USE_DIRECTSOUND: number = 9;	// 闁哄嫷鍨伴幆浣规媴鐠恒劍鏆廳irectsound;
    //public final int int DISPID_USER_ENTER				10	// 闁告帗淇虹换姗€寮堕妷褎鐣辨繛鎴濈墛娴硷拷闁哄牆绉存慨鐔煎闯閵娧€锟介悹浣靛€曢幃锟 ?
    public static DISPID_GAME_HELP: number = 11;	// 婵炴挸鎲￠崹娆撴焻閺勫繒甯嗛柡鍕靛灠閹線鎳涢鍡欏笡help闁挎稑鐭佺换鎴﹀炊閻愮儤濮 ? 闁告帗鐟﹂、瀣几閺堢數鐟濋柛鎰Т閼村﹪宕欏ú顏嗗笡閻犱降鍊楀▓鎴犳暜椤旂厧袠濡炪倗鏁诲锟 ?#define  DISPID_ISCASINO_GAME  12	// 闁哄嫷鍨伴幆渚€鏌岄幋婵堫伈婵炴挸鎲￠崹娆撴晬瀹€鍕闂佸弶鍨电粩闈涖€掗崨濠傜亞濞戞挸绉崇槐鎵喆閿曪拷绲洪弶鈺傜懁闁诧拷;
    public static DISPID_USER_PROPERTY_RETURN: number = 13;	// 濞寸姰鍎遍幃妤冿拷濮橆偆鐤;?
}