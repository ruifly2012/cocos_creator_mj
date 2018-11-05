import { ByteArray } from "../common/ByteArray";

var GameDefs = {

};

GameDefs.PLAYER_COUNT	=	4;		
GameDefs.MAX_MJ_INDEX	=	27;		//27即红中 ，鄂州晃晃
GameDefs.MAX_HOLD_CARD	=	14;		//手上牌数量
GameDefs.MAX_WEAVE		=	4;
GameDefs.MAX_OUT_CARDS	=	28;
GameDefs.MAJIANG_COUNT	=	108;		//麻将总数量 中,发，白
GameDefs.HONG_ZHONG		=	27;		//红中牌值
GameDefs.MAX_SCORE_TIMES		=	30;	

GameDefs.INVALID_CARD	=	GameDefs.MAX_MJ_INDEX;
GameDefs.INVALID_CHAIR	=	5;
GameDefs.INDEX_REPLACE_CARD	 = GameDefs.MAX_MJ_INDEX - 1;
GameDefs.MAX_LEFT_WALL =  GameDefs.MAJIANG_COUNT-13*4-1; //胡牌剩余牌数

//命令码定义
GameDefs.MJ_CMD_OUT		= 1;	// 出牌 BYTE cbCard;
GameDefs.MJ_CMD_GET		= 2; // 摸牌
GameDefs.MJ_CMD_PASS	= 3; // 过
GameDefs.MJ_CMD_EATLEFT	= 4; // 吃左
GameDefs.MJ_CMD_EATMID	= 5; // 吃中
GameDefs.MJ_CMD_EATRIGHT = 6; // 吃右
GameDefs.MJ_CMD_PENG	= 7; // 碰
GameDefs.MJ_CMD_GANG	= 8; // 杠,杠需要从后面拿牌,tagWeaveItem
GameDefs.MJ_CMD_HU		= 9; // 胡
GameDefs.MJ_CMD_ROOMINFO  = 10   //房间配置
GameDefs.MJ_DISSOLVE_ROOM  = 11  //发起解散房间命令  BYTE 发起玩家椅子号
GameDefs.MJ_DISSOLVE_RESULT = 12  //发送解散房间命令结果， BYTE[4] 各玩家选择结果 0是同意解散 1是不同意
GameDefs.MJ_CMD_SETINFO = 13  //局数信息命令
GameDefs.MJ_CMD_DissINFO = 14  //私人场牌局解散时下发
// GameDefs.MJ_CMD_Cancel_AutoOut = 15 //取消托管

GameDefs.MJ_CMD_NOTICE_DISS		 = 18 //通知客户端牌桌解散
GameDefs.MJ_CMD_Cancel_AutoOut	 = 19
GameDefs.MJ_CMD_AutoOut			 = 20
GameDefs.MJ_CMD_PoChan			 = 21
GameDefs.MJ_CMD_ERROR			 = 22	//客户端发送了错误命令
GameDefs.CMD_Notify_Diss	     = 23	//后台强制解散通知命令
GameDefs.CMD_Notify_UpGrade		 = 24

//找娟姐确认
GameDefs.MJ_CMD_Exchange = 15  //换牌 BYTE[3]  
GameDefs.MJ_CMD_DingQue =  16  //定缺 BYTE

// GameDefs.MJ_CMD_AUTOOUT = 17 //托管
GameDefs.CMD_PROPERTY = 25	//发送道具
// GameDefs.CMD_MJ_DISSOLVE = 19 //返回玩家的解散选择
// GameDefs.CMD_Notify_UpGrade = 21;       //升段通知
// GameDefs.MJ_CMD_Set_XueFei = 19		//设置学费
// GameDefs.MJ_CMD_RenShu = 20		//认输
// GameDefs.MJ_CMD_LiKai = 21          //离开
// GameDefs.MJ_CMD_WaitCheat = 22 // 等待检查作弊
// GameDefs.MJ_CMD_Show_Cheat = 23 // 显示检查结果
// GameDefs.MJ_CMD_Client_Cheat = 24 // 客户端上报作弊检测
// GameDefs.MJ_CMD_SHOW_GET_LAIZI = 30  // 起牌时有一个赖子，又自摸一个赖子，必须亮此牌
GameDefs.MJ_CMD_SHOW_HU_SCORE	= 26

GameDefs.CardType = {
	wan		: 0,
	tiao	: 1,
	tong	: 2,
	InvalidCardType : 3,
};

//返回牌值
GameDefs.GetCardType = function(nCard){
	var nCardType = GameDefs.CardType.InvalidCardType
	nCardType = nCard/9;
	return nCardType
}

GameDefs.WeaveType = {
	// InvalidType 	: 0,
	// Peng 			: 1,
	// MingGang 		: 2,	//明杠 
	// XuGang			: 3,	//续杠
	// AnGang			: 4,	//暗杠
	// HongzhongGang 	: 5,  	//红中杠  不放入WeaveItem 组合
    // LaiziGang		: 6,	//赖子杠  不放入WeaveItem 组合
    // ChaoTianMingGang: 7,    //朝天明杠 只需要3张赖子皮就可以杠
    // ChaoTianAnGang  : 8,		//朝天暗杠  只需要3张赖子皮就可以杠
	// ShunLeft		: 9,
	// ShunMid			: 10,
	// ShunRight		: 11,
	// Yan 			: 12,
    // FangGang 		: 13,
    InvalidType 	: 0,
	Peng 			: 1,
	MingGang 		: 2,	//明杠 
	XuGang			: 3,	//续杠
	AnGang			: 4,	//暗杠
	xueliuGang 	    : 5,  	//  不放入WeaveItem 组合
	LaiziGang		: 6,	//赖子杠  不放入WeaveItem 组合
	ShunLeft		: 7,
	ShunMid			: 8,
	ShunRight		: 9,
	FangGang 		:10
};

GameDefs.EndStatus = {
	// InvalidHuType : 0,
	// RuanPai : 1,	// 软牌
    // YingPai : 2,	// 硬牌
    // RuanLaiyou : 3, // 软赖油
    // YingLaiyou : 4,	// 硬赖油
    // YouZhongyou: 5, // 油中油
    InvalidHuType :     0,
	PiHu :              1,
	TianHu :            2,
	DiHu :              3,
	With19 :            4,
	QingYiSe :          5,
	JiangDui :          6,			//将对
	PengPengHu :        7,	
	QiDui :             8,
	HaoHuaQiDui :       9,		//龙七对
	QingQiDui :         10,
	QingLongQiDui :     11,
	QingDui :           12,

	////////加番///////
	HaiDiLao :          13,
	HideMingGang :      14,		//隐藏明杠
	HideAnGang :        15,			//隐藏暗杠
	QiangGangHu :       16,		//抢杠胡
	GangShangKaiHua :   17,	//杠上花
	GangShangPao :      18,		//点杠炮
	MenQing :           19,			//门清
	ZhongZhang :        20,	//中张
	ShouZhuaYi :        21,	//金钩胡
	ZimoJiaDi :         22,		//自摸加底
	ZimoJiaFan :        23,		//自摸加番
	QingJinGouGou:		24,		//清金钩钩
	JiangJinGouGou:		25,		//将金钩钩
	ShiBaLuoHan:		26,		//十八罗汉
	QingShiBaLuoHan:	27,	//清十八罗汉
};

GameDefs.HUTYPE_STRING =
[
	// "软胡",
    // "硬胡",
    // "软癞油",
    // "硬癞油",
    "平胡",
	"天胡",
	"地胡",
	"带幺九",
	"清一色",
	"将对",
	"碰碰胡",
	"七对",
	"龙七对",
	"清七对",
	"清龙七对",
	"清对",
	"海底捞",
	"隐藏明杠",
	"隐藏暗杠",
	"抢杠胡",
	"杠上花",
	"杠上炮",
	"门清",
	"中张",
	"金钩胡",
	"自摸加底",
	"自摸加番",
	"清金钩钩",
	"将金钩钩",
	"十八罗汉",
	"清十八罗汉",
];

GameDefs.SCORE_TYPE_STRING =
[
	"放炮",
	"自摸",
	"刮风",
	"下雨",
	"下雨",
	"查大叫",
	"被查花猪",
	"空"
];

GameDefs.OTHER_SCORE_TYPE_STRING =
[
	"被放炮",
	"被自摸",
	"被刮风",
	"被下雨",
	"被下雨",
	"被查大叫",
	"被查花猪",
	"空"
];

GameDefs.scoreType = {
	scoreFangPao : 0,
	scoreZimo : 1,
	scoreAnGang : 2,
	scoreMingGang : 3,
	scoreXuGang : 4,
	scoreChaDaJiao : 5,
	ScoreChaHuaZhu : 6,
	InvalidScoreType : 7
}

GameDefs.EndType = {
	Fangpao : 0,
	Zimo	: 1,
	Liuju	: 2,
    RenShu 	: 3,
    Jiesan  : 4,
};

GameDefs.GamePhase = {
	// PhaseFree 	: 0,	
	// PhaseStart	: 1,		//游戏开始，选庄家， 洗牌，翻赖子
	// PhaseOutCard	: 2,	//摸牌或吃杠碰后玩家操作阶段
	// PhaseWaitChoice : 3,	//玩家出牌后， 等待其他玩家的吃碰杠操作
    // PhaseEnd	: 4,
    PhaseFree 	:        0,	
	PhaseStart	:        1,		//游戏开始，选庄家， 洗牌，翻赖子
	PhaseExchange :      2,		////等待换牌
	PhasePlayExchange :  3,		////播放换牌动画
	PhaseDingque :       4,			////定缺阶段
	PhasePlayDingque :   5,		////播放定缺动画
	PhaseOutCard	:    6,	//摸牌或吃杠碰后玩家操作阶段
	PhaseWaitChoice :    7,	//玩家出牌后， 等待其他玩家的吃碰杠操作
	PhaseEnd	:        8, //游戏结束
	PhasePlayHu :        9  //播放胡特效
};

GameDefs.PlayerAction = {
	paNothing            :  0,     //什么都不可以做
	paOutCard            :  1,     //出牌
	paGet1CardFromHeader :  2,     //从长城头部抓取一张牌
	paGet1CardFromTail   :  4,     //从长城尾部抓取一张牌
	paPatchFlower        :  8,     //补花
	paPeng               :  16,    //碰牌
	paGang               :  32,    //杠牌
	paHu                 :  64,    //胡牌
    paEat                :  128,   //吃牌
    PaExt				 : 	256,   //換牌顔色
};

GameDefs.tagWeaveItem = function(ba){
    var tag = {};
	tag.cbWeaveKind = ba.readUnsignedByte()
	tag.cbChair = ba.readUnsignedByte()
	tag.cbCardData = []
	tag.cbCardData[0] = ba.readUnsignedByte()
	tag.cbCardData[1] = ba.readUnsignedByte()
	tag.cbCardData[2] = ba.readUnsignedByte()
	tag.cbCardData[3] = ba.readUnsignedByte()
	return tag
};

GameDefs.PlayerInfo = function(ba){
    var player = {}
	player.cbLastCard 		= ba.readUnsignedByte()
	player.cbLastOutCard 	= ba.readUnsignedByte()
	player.cbHoldCardCount 	= ba.readUnsignedByte()
	// player.cbCountLaiziGang = ba.readUnsignedByte()
	// player.cbCountHZGang 	= ba.readUnsignedByte()

	player.cbHoldCards = []
	for (var i=0;i < GameDefs.MAX_HOLD_CARD; i++) {
        player.cbHoldCards[i] = ba.readUnsignedByte()
    }

	player.showCardSuits = []
	player.nWeaveCount = 0;
	for(var i = 0; i < GameDefs.MAX_WEAVE; i++){
        player.showCardSuits[i] = GameDefs.tagWeaveItem(ba)
        if(player.showCardSuits[i].cbWeaveKind != GameDefs.WeaveType.InvalidType){
            player.nWeaveCount = player.nWeaveCount + 1
        }
    }
	
	player.cbOutCards = []
    for(var i = 0; i < GameDefs.MAX_OUT_CARDS; i++){
        player.cbOutCards[i] =ba.readUnsignedByte();
    }
    
    player.cbDingque = ba.readUnsignedByte()  ////定缺哪一门
	player.cbAutoOutCard = ba.readUnsignedByte() //1是托管,0是不托管
 
	player.cbExchange={} ////换出去的牌
	for (var i = 0; i < 3; i++){
		player.cbExchange[i] = ba.readUnsignedByte()
    }

	player.cbBeExchange={} ////换过来的牌
	for (var i = 0; i < 3; i++){
		player.cbBeExchange[i] = ba.readUnsignedByte()
    }

	player.cbIsHu = ba.readUnsignedByte()	////是否已经胡牌
	player.cbHuCount = ba.readUnsignedByte()    ////胡了多少张牌
	player.cbHuCards ={} ////已经胡的牌
	var nCount = 0;
	for (var i = 0; i < 27; i++){
		var nMj =  ba.readUnsignedByte()
		if (nMj < 27) {
			player.cbHuCards[nCount] = nMj;
			nCount = nCount + 1;
        }
    }
    
	return player
};

GameDefs.PLAYER_ACTION = function (ba){
    var pAction = {};
	pAction.nAction = ba.readShort();
	pAction.nChair = ba.readByte();
	pAction.nParam = ba.readInt(); //放杠类型，吃就是放吃的牌
	return pAction
}

//是否是癞子
GameDefs.IsLaiZi = function(cbCard,cbLaizi){
	if(cbCard == GameDefs.HONG_ZHONG)
        return true;
        
	if (cbCard == cbLaizi) 
		return true;
	
	return false
}

//听牌协议
GameDefs.newTing = function(ba){
    var st_tingInfo = {}
    st_tingInfo.cbOutCard =ba.readByte()
    st_tingInfo.cbTingCount = ba.readByte()
    st_tingInfo.cbTingCard = []
    for(var i = 0; i < st_tingInfo.cbTingCount; i++){
        st_tingInfo.cbTingCard[i] = ba.readByte();
    }
    return st_tingInfo
}

//
GameDefs.newTing_EX = function(ba)
{
    var st_tingInfo= {}
    st_tingInfo.cbOutCard =ba.readByte()
    st_tingInfo.cbTingCount = ba.readByte()
    st_tingInfo.cbTingCard = []
    for(var i = 0; i < st_tingInfo.cbTingCount; i++){
        st_tingInfo.cbTingCard[i] = ba.readByte();
    }

    st_tingInfo.cbFan = []
    for(var i = 0; i < st_tingInfo.cbTingCount; i++){
        st_tingInfo.cbFan[i] = ba.readByte()
    }

    st_tingInfo.cbLeftCount = []
    for(var i = 0; i < st_tingInfo.cbTingCount; i++){
        st_tingInfo.cbLeftCount[i] = ba.readByte();
    }
    return st_tingInfo;
}

////每次分数变化结构
GameDefs.ST_Single_Score = function(ba){
	var single_Score ={}
	single_Score.cbScoreType =0		////此次分数变化类型， 放炮， 自摸， 明杠，暗杠， 续杠,查大叫 GameDefs.scoreType
	single_Score.cbFan = 0			//// 番数
	single_Score.cbWinChair = 0
	single_Score.cbFangpaoChair = 0
	single_Score.cbHuTypeCount = 0
	single_Score.cbHuType ={} 
	single_Score.cbGen = 0
	single_Score.nScore = 0
	if (ba.bytesAvailable > 0) {
		single_Score.cbScoreType = ba.readByte()
		single_Score.cbFan = ba.readByte()
		single_Score.cbWinChair = ba.readByte()
		single_Score.cbFangpaoChair = ba.readByte()
		single_Score.cbHuTypeCount = ba.readByte()
		for (var i=0;i<single_Score.cbHuTypeCount;i++) {
			single_Score.cbHuType[i] = ba.readByte()
        }
		single_Score.cbGen = ba.readByte()
		single_Score.nScore = ba.readInt()
    }
	return single_Score
}

GameDefs.GameEnd = function(ba){
	var stWinStruct = {};
	// stWinStruct.cbWinChair = ba.readByte();
	// stWinStruct.cbFangpaoChair = ba.readByte();
	// stWinStruct.cbEndType = ba.readByte(); //流局，放炮2，自摸
	// stWinStruct.cbHuType = ba.readByte();

	// stWinStruct.nScore = [];
    // for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
    //     stWinStruct.nScore[i] = ba.readInt() //总的分数
    // }

	// stWinStruct.cbFan = [];
    // for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
    //     stWinStruct.cbFan[i] = ba.readByte() //总的翻数
    // }

	stWinStruct.cbWriteScoreTimes ={}  //各个玩家分数变化次数

	for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
		stWinStruct.cbWriteScoreTimes[i] = ba.readByte()
    }

	//ST_Single_Score stSingleScore[GameDefs.PLAYER_COUNT][MAX_SCORE_TIMES]
	stWinStruct.stSingleScore={}
	for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
		stWinStruct.stSingleScore[i] ={}
		for (var j=0;j<stWinStruct.cbWriteScoreTimes[i];j++) {
			stWinStruct.stSingleScore[i][j]= GameDefs.ST_Single_Score(ba)
        }
    }

	stWinStruct.nFinalScore={}
	for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
		stWinStruct.nFinalScore[i] = ba.readInt() //总分数
    }

	stWinStruct.nSrcScore={}
	for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
		stWinStruct.nSrcScore[i] = ba.readInt() //排位赛原始分数
	}
	

    stWinStruct.cbWall={}
    
	return stWinStruct
}

GameDefs.GameScene = function(ba){
	var gs = {}
	gs.cbPhase = ba.readByte()			//游戏状态
	gs.cbBanker = ba.readByte()			//庄家
	gs.cbBankerCount = ba.readByte()	//连庄次数
	gs.cbWhosTurn = ba.readByte()		//到谁操作
	// gs.cbLaizipi = ba.readByte()		//赖子皮
	// gs.cbLaizi = ba.readByte()			//赖子
	gs.cbFirstDice = ba.readByte()		//骰子数1
	gs.cbSecondDice = ba.readByte()		//骰子数2
	gs.cbGetCard = ba.readByte()		//是否已经摸牌
	gs.cbCurrentIndex = ba.readByte()	//画客户端长城用，头
	gs.cbLastIndex = ba.readByte()		//画客户端长城用，尾
	// gs.cbWaitTime = ba.readByte()		//等待计时
	gs.cbCurrentCard = ba.readByte()	//当前打出的牌
	gs.players = [] 
    for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
        gs.players[i] = GameDefs.PlayerInfo(ba)
    }

	gs.LastAction = GameDefs.PLAYER_ACTION(ba)
	gs.CurrentPlayerAction = GameDefs.PLAYER_ACTION(ba)

	gs.ChoiceAction = []
    for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
        gs.ChoiceAction[i] = ba.readShort()
    }

	gs.stWinStruct={}
	if (gs.cbPhase == GameDefs.GamePhase.PhaseEnd){
		gs.stWinStruct = GameDefs.GameEnd(ba)
    }

	// if (ba.bytesAvailable > 0){      
	// 	cc.log("获取玩家托管状态")  
    //     for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
    //         gs.players[i].cbAutoOutCard = ba.readByte()  //玩家托管状态
    //     }
    // }   

	gs.cbTingCardCount = 0;
	gs.vTingList = [];
	if (ba.bytesAvailable > 0){
		gs.cbTingCardCount = ba.readByte()
		if (gs.cbTingCardCount > 0){
            for(var i = 0; i < gs.cbTingCardCount; i++){
                var stTing = GameDefs.newTing(ba);
                gs.vTingList[gs.vTingList.length] =  stTing
            }
        }
    }

	if (ba.bytesAvailable > 0){
		gs.cbTingCardCount = ba.readByte()
		if (gs.cbTingCardCount > 0){
            for(var i = 0; i < gs.cbTingCardCount; i++){
                var stTing = GameDefs.newTing_EX(ba);
                gs.vTingList[gs.vTingList.length] =  stTing
            }   
        }
    }

	// gs.stWinStruct.cbWallCount = 0
    // gs.stWinStruct.cbWall = []
    // gs.stWinStruct.nGangScore = [];
    // if (gs.cbPhase == GameDefs.GamePhase.PhaseEnd){
	// 	cc.log("获取牌墙数据")
    //     if (ba.bytesAvailable > 0){
    //         gs.stWinStruct.cbWallCount = ba.readByte()
    //         for(var i = 0; i < gs.stWinStruct.cbWallCount; i++){
    //             gs.stWinStruct.cbWall[i] = ba.readByte();
    //         }
    //     }
    // }
    
    // if(ba.bytesAvailable > 0){
    //     for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){
    //         gs.stWinStruct.nGangScore[i] = ba.readInt();
    //     }
    // }
		
	return gs
}

GameDefs.ST_RoomInfo = function(ba){
	var roomInfo = {
		nTurnBasicGold : 0,      //基本底注
        nCost : 0,               //台费
        nMinRoomGold : 0,        //房间下限
        nMaxRoomGold : 0,        //房间上限
        nRuleID : 0,             //规则号
        cbLaiType : 0,           //1半赖，2无赖，0两个都不选
	};

	if(ba != null){
		roomInfo.nTurnBasicGold  = ba.readInt();
        roomInfo.nCost  = ba.readInt();
        roomInfo.nMinRoomGold  = ba.readInt();
        roomInfo.nMaxRoomGold  = ba.readInt();
        roomInfo.nRuleID  = ba.readInt();
        roomInfo.cbLaiType = ba.readUnsignedByte();
        if(ba.bytesAvailable > 0){
            roomInfo.nPlayerCount  = ba.readInt();
		}       
	}

	return roomInfo;
}


GameDefs.ST_SetInfo = function (ba ){
	var setInfo =
    {
        nRoomID : 0,		//房号
        nCurSet : 0,		//当前局数
        nTotalSet : 0,		//总局数
        cbBaseScore : 0,	//底分
        nRoomOwner : 0,		//房号
        nExt       : 0,     //额外的参数
        cbGradeIndex :  Array(),   //段位
        szBatchID   :   String,    //流水号
    }

    if (ba != null){
		setInfo.nRoomID = ba.readInt();
        setInfo.nCurSet = ba.readInt();
        setInfo.nTotalSet = ba.readInt();
        setInfo.cbBaseScore = ba.readInt();
        setInfo.nRoomOwner = ba.readInt();
        setInfo.nExt        = ba.readInt();
        for(var i = 0; i < GameDefs.PLAYER_COUNT; i++){

            setInfo.cbGradeIndex.push(ba.readUnsignedByte());
        }
        
        setInfo.szBatchID = ba.readUTFBytes(32);
	}       
    return setInfo
}
GameDefs.ST_Property = {}
GameDefs.ST_Property.new = function(ba){
	var property =
    {
        nPropertyID : 0,  //道具ID
        nPayMoney : 0,    //道具费用
        nChairNum : 0,    //道具魅力值
        cbSendChair : 0,  //发送道具的椅子
        cbToChair : 0,    //道具作用椅子
        bSuccess : false, //是否扣费成功
	}
	
	if(ba){
		property.nPropertyID = ba.readInt();
        property.nPayMoney = ba.readInt();
        property.nChairNum = ba.readInt();
        property.cbSendChair= ba.readUnsignedByte();
        property.cbToChair= ba.readUnsignedByte();
        property.bSuccess = ba.readBoolean();
	}

	return property;
}

module.exports = GameDefs
