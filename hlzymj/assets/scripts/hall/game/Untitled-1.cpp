

#define PLAYER_COUNT		4		
#define MAX_MJ_INDEX		27		//27红中,28 发财， 29 白板
#define MAX_HOLD_CARD		14		//手上牌数量
#define MAX_WEAVE			4
#define MAX_OUT_CARDS		28
#define MAJIANG_COUNT		108		//麻将总数量
#define MAX_TING_COUNT		10
#define HONG_ZHONG			27		//红中牌值
#define FA_CAI				28
#define BAI_BAN				29
#define WU_TIAO				13	
#define WU_TONG				22
#define MAX_HU_CARDs_COUNT	27		//能胡的所有牌数量
#define MAX_SCORE_TIMES		30		//一局中最多能胡的次数
#define MAX_HU_TYPE			7		//一次胡牌的类型，如清一色， 对对碰

#define INVALID_CARD		MAX_MJ_INDEX
#define INVALID_CHAIR		5
#define INDEX_REPLACE_CARD	MAX_MJ_INDEX

#define Timer_Start			1
#define SEC_START			9*1000
#define Timer_OutCard		2
#define SEC_OUT_CARD		18*1000
#define Timer_Wait_Choice	3		//有吃碰杠胡的玩家等待计时
#define SEC_WAIT_CHOICE		13*1000
#define Timer_Pass			4		//没吃碰杠胡的玩家等待计时
#define SEC_PASS			100  
#define Timer_Robot_OutCard			5		//机器人出牌计时
#define SEC_ROBOT_OutCard			2*1000	
#define Timer_Robot_Choice			6		//onge机器人选择计时
#define SEC_ROBOT_CHOICE			2*1000
#define Timer_Dissolve				7		//解散房间计时
#define SEC_DISSOLVE				60*2*1000
#define Timer_WaitExchange		8
#define SEC_WaitExchange			10*1000
#define Timer_PlayExchange		9		 //漂牌后的发牌阶段
#define SEC_PlayExchange		3*1000  //发牌计时 
#define Timer_Wait_Dingque		10	//亮倒时的选择隐藏暗刻计时
#define SEC_Wait_Dingque		8*1000
#define Timer_Play_Dingque			11
#define SEC_Play_Dingque			2500	
#define Timer_Wait_AutoOutCard		12		//等待托管倒计时
#define SEC_Wait_AutoOutCard		200*1000
#define Timer_AutoOutCard			13		//托管出牌倒计时
#define SEC_AutoOutCard				1*1000
#define Timer_Hu_OutCard			14		//胡牌后出牌
#define SEC_Hu_OutCard				500	
#define Timer_Play_Hu				15		//播胡牌动画
#define SEC_Play_Hu					2*1000
#define Timer_Robot_Exchange_Dingque_0	16
#define Timer_Robot_Exchange_Dingque_1	17
#define Timer_Robot_Exchange_Dingque_2	18
#define Timer_Robot_Exchange_Dingque_3	19


// 命令码定义
#define MJ_CMD_OUT		1	// 出牌
// BYTE cbCard;

#define MJ_CMD_GET		2 // 摸牌
#define MJ_CMD_PASS		3 // 过
#define MJ_CMD_EATLEFT	4 // 吃左
#define MJ_CMD_EATMID	5 // 吃中
#define MJ_CMD_EATRIGHT	6 // 吃右
#define MJ_CMD_PENG		7 // 碰
#define MJ_CMD_GANG		8 // 杠,杠需要从后面拿牌,tagWeaveItem //返回 int[PlayerCount] 即时结算杠牌分数
#define MJ_CMD_HU		9 // 胡
#define MJ_CMD_ROOMINFO	10	//房间配置
#define MJ_DISSOLVE_ROOM	11	//发起解散房间命令  BYTE 发起玩家椅子号
#define MJ_DISSOLVE_RESULT	12	//发送解散房间命令结果， BYTE[4] 各玩家选择结果
#define MJ_CMD_SETINFO	13	//局数信息命令
#define MJ_CMD_DissInfo	14	//私人场牌局解散时下发
#define MJ_CMD_Exchange		15	//换牌 BYTE[3]	 
#define MJ_CMD_DingQue		16	//定缺 BYTE
//#define MJ_CMD_LIANGPAI			17 //亮牌  st_Liangpai;
#define MJ_CMD_NOTICE_DISS		18 //通知客户端牌桌解散
#define MJ_CMD_Cancel_AutoOut	19
#define MJ_CMD_AutoOut			20
#define MJ_CMD_PoChan			21
#define MJ_CMD_ERROR			22	//客户端发送了错误命令
#define CMD_Notify_Diss			23	//后台强制解散通知命令


enum
{
	Wan = 0,
		Tiao,
		Tong,
		InvalidCardType
};

enum
{
	InvalidType = 0,
		Peng,
		MingGang,		//明杠 
		XuGang,			//续杠
		AnGang,			//暗杠
		HongzhongGang,  //红中杠  不放入WeaveItem 组合
		LaiziGang,		//赖子杠  不放入WeaveItem 组合
		ShunLeft,
		ShunMid,
		ShunRight,
		Yan,
};

//胡牌方式
enum
{
	InvalidHuType = 0,
		PiHu,
		TianHu,
		DiHu,
		With19,
		QingYiSe,
		JiangDui,			//将对
		PengPengHu,	
		QiDui,
		HaoHuaQiDui,		//龙七对
		QingQiDui,
		QingLongQiDui,
		QingDui,

		////////加番///////
		HaiDiLao,
		HideMingGang,		//隐藏明杠
		HideAnGang,			//隐藏暗杠
		QiangGangHu,		//抢杠胡
		GangShangKaiHua,	//杠上花
		GangShangPao,		//点杠炮
		MenQing,			//门清
		ZhongZhang,			//中张
		ShouZhuaYi,			//金钩胡
		ZimoJiaDi,			//自摸加底
		ZimoJiaFan,			//自摸加番

		////////卡五星///////		
		MingSiGui,
		AnSiGui,	
		ShuangHaoHuaQiDui,
		DaSanYuan,
		XiaoSanYuan,
		SanYuanQiDui,	
		KaWuXing,
		ZuihouYiZhang,		//最后一张胡牌
};

//结束方式
enum
{
	Fangpao = 0,	//放炮
	Zimo,			//自摸
	Liuju,			//流局
	InvalidEndType,	
};

enum scoreType
{
	scoreFangPao,
	scoreZimo,
	scoreAnGang,
	scoreMingGang,
	scoreXuGang,
	ScoreChaDaJiao,
	ScoreChaHuaZhu,
	InvalidScoreType,
};

//游戏状态
enum
{
	PhaseFree = 0,
	PhaseStart,		//游戏开始， 客户端码牌等动画操作
//	PhaseSendCard,		//发牌，选庄家
	PhaseExchange,		//等待换牌
	PhasePlayExchange,		//播放换牌动画
	PhaseDingque,			//定缺阶段
	PhasePlayDingque,		//播放定缺动画
	PhaseOutCard,		//摸牌或吃杠碰后玩家操作阶段
	PhaseWaitChoice,	//玩家出牌后， 等待其他玩家的吃碰杠操作
	PhaseEnd,
	PhasePlayHu,	//胡牌播放动画
};

enum PlayerAction
{
	paNothing            =  0,     //什么都不可以做   
		paOutCard            =  1,     //出牌
		paGet1CardFromHeader =  2,     //从长城头部抓取一张牌
		paGet1CardFromTail   =  4,     //从长城尾部抓取一张牌
		paPatchFlower        =  8,     //补花
		paPeng               =  16,    //碰牌
		paGang               =  32,    //杠牌
		paHu                 =  64,    //胡牌
		paEat                =  128,   //吃牌
		paLiang				 =	256,
		//根据需要添加自己的动作，不超过65535
};


//组合子项
typedef struct tagWeaveItem
{
	BYTE							cbWeaveKind;						//组合类型
	BYTE							cbChair;							//吃碰谁家的椅子号
	BYTE							cbCardData[4];				
	tagWeaveItem()
	{
		memset(this,0xff,sizeof(tagWeaveItem));
		cbWeaveKind = InvalidType;
	}
} WeaveItem;

//分析子项
typedef struct tagAnalyseItem
{
	BYTE							cbCardEye;							//牌眼扑克
	bool                            bMagicEye;                          //牌眼是否是王霸
	BYTE							cbWeaveKind[MAX_WEAVE];				//组合类型
	BYTE							cbCenterCard[MAX_WEAVE];			//中心扑克
	BYTE                            cbCardData[MAX_WEAVE][4];           //实际扑克
	tagAnalyseItem()
	{
		memset(this,0,sizeof(tagAnalyseItem));
	}
	
	BYTE GetCardCount(BYTE cbCard)
	{
		BYTE cbRet = 0;
		for(int i = 0;i < MAX_WEAVE;i++)
		{
			for(int j = 0;j < 4;j++)
			{
				if(cbCardData[i][j] == cbCard)
					cbRet++;
			}
		}
		return cbRet;
	}
	
} AnalyseItem;

inline BOOL IsValidCard(BYTE cbCard)
{
	if(cbCard >=0 && cbCard < MAX_MJ_INDEX)
		return TRUE;
	return FALSE;
}

inline BYTE GetCardType(BYTE cbCard)
{
	if(cbCard >= MAX_MJ_INDEX)
		return InvalidCardType;
	if(cbCard < 27)
		return cbCard / 9;
	return InvalidCardType;
}

struct PlayerInfo
{
	BYTE cbLastCard; // 最后摸上来的牌
	BYTE cbLastOutCard;
	BYTE cbHoldCardCount;
	BYTE cbHoldCards[MAX_HOLD_CARD];
	WeaveItem showCardSuits[MAX_WEAVE];
	BYTE cbOutCards[MAX_OUT_CARDS];// 已出的牌	
	BYTE cbDingque;		//定缺哪一门
	BYTE cbAutoOutCard;
	BYTE cbExchange[3]; //换出去的牌
	BYTE cbBeExchange[3]; //换过来的牌
	BYTE cbIsHu;	//是否已经胡牌
	BYTE cbHuCount;    //胡了多少张牌
	BYTE cbHuCards[MAX_HU_CARDs_COUNT]; //已经胡的牌
	PlayerInfo()
	{
		SetClear();
	}

	void SetClear()
	{
		memset(this,0,sizeof(PlayerInfo));
		memset(cbOutCards,INVALID_CARD,sizeof(cbOutCards));
		memset(cbHoldCards,INVALID_CARD,sizeof(cbHoldCards));
		memset(cbExchange,INVALID_CARD,sizeof(cbExchange));
		memset(cbBeExchange,INVALID_CARD,sizeof(cbBeExchange));
		memset(cbHuCards,INVALID_CARD,sizeof(cbHuCards));
		cbDingque = InvalidCardType;
//		memset(cbTingCard,INVALID_CARD,sizeof(cbTingCard));
//		memset(cbHideKezi,INVALID_CARD,sizeof(cbHideKezi));
		cbLastOutCard = INVALID_CARD;
	}

	BYTE GetWeaveCount()
	{
		for(int i = 0;i < MAX_WEAVE;i++)
		{
			if(showCardSuits[i].cbWeaveKind == InvalidType)
			{
				return i;
			}
		}
		return MAX_WEAVE;
	}

	BYTE GetWeaveCountExceptAnGang()
	{
		BYTE cbCount = 0;
		for(int i = 0;i < MAX_WEAVE;i++)
		{
			if(showCardSuits[i].cbWeaveKind == InvalidType)
			{
				break;
			}
			if(showCardSuits[i].cbWeaveKind <MingGang && showCardSuits[i].cbWeaveKind > LaiziGang)
				cbCount++;
			else
			{
				if(showCardSuits->cbWeaveKind != AnGang)
					cbCount++;
			}
		}
		return cbCount;
		
	}

	BYTE GetOutCardCount()
	{
		for(int i = 0;i < MAX_OUT_CARDS;i++)
		{
			if(!IsValidCard(cbOutCards[i]))
				return i;
		}
		return MAX_OUT_CARDS;
	}

	void AddOneOutCard(BYTE cbCard)
	{
		BYTE cbIndex = GetOutCardCount();
		cbOutCards[cbIndex] = cbCard;
		cbLastOutCard = cbCard;
	}

	void AddWeaveItem(WeaveItem item)
	{
		BYTE cbIndex = GetWeaveCount();
		showCardSuits[cbIndex] = item;
	}

	BOOL AddHoldCard(BYTE cbCard)
	{
		BYTE cbIndex = cbHoldCardCount;
		if(cbIndex >= MAX_HOLD_CARD)
			return FALSE;
		cbHoldCards[cbIndex] = cbCard;
		cbHoldCardCount++;
		cbLastCard = cbCard;
		return TRUE;
	}

	BOOL RemoveOndCard(BYTE cbCard)
	{
		BYTE cbCount = cbHoldCardCount;
		if(cbCount == 0)
			return FALSE;
		for(int i = 0;i < cbCount;i++)
		{
			if(cbHoldCards[i] == cbCard)
			{
				if(i == cbCount - 1)
					cbHoldCards[i] = 0xFF;
				else
					memcpy(&cbHoldCards[i],&cbHoldCards[i + 1],cbCount - i - 1);
				cbHoldCardCount--;
				return TRUE;
			}
		}
		return FALSE;
	}

	BYTE GetCardCount(BYTE cbCard)
	{
		BYTE cbCount = 0;
		for(int i = 0;i < cbHoldCardCount;i++)
		{
			if(cbHoldCards[i] == cbCard)
				cbCount++;
		}
		return cbCount;
	}

	void RemoveLastOutCard()
	{
		BYTE cbCount = GetOutCardCount();
		if(cbCount == 0)
			return;
		cbOutCards[cbCount - 1] = MAX_MJ_INDEX;
	}
};

///玩家动作结构定义
struct PLAYER_ACTION
{
	unsigned short nAction;
	BYTE           nChair ;		//如果nAction是pahu，则nChair代表胡牌的个数，nParam 代表胡牌的椅子号
	int            nParam ;		//，如，1,2,3号椅子3个人胡牌，则nChair = 3， nParam = 123 类似这样的数字，个，十，百分别代表一个椅子号
};

struct GameScene
{
	BYTE cbPhase;		// 游戏过程或者结束状态
	BYTE cbBanker;		// 庄家
	BYTE cbBankerCount;	// 连庄次数
	BYTE cbWhosTurn;	// 到谁操作
	BYTE cbFirstDice;	// 开局时扔骰子数 个位为一个，十位为一个
	BYTE cbSecondDice;	// 换牌时扔的骰子
	BYTE cbGetCard;		// 是否已经摸牌
	BYTE cbCurrentIndex;	// 画客户端长城用，头
	BYTE cbLastIndex;		// 尾
	BYTE cbCurrentCard;
	PlayerInfo players[PLAYER_COUNT];
	PLAYER_ACTION   LastAction;           //最后一次动作
	PLAYER_ACTION   CurrentPlayerAction;  //当前玩家必须做的动作,如果有多个，则必须做一个
	short           ChoiceAction[PLAYER_COUNT];      //可选择的动作

	GameScene()
	{
		Clear(INVALID_CHAIR,1,1);
		cbPhase = PhaseFree;
	}

	void Clear(BYTE cbRandomBanker,BYTE cbRandomDiceFirst, BYTE cbRandomDiceSecond)
	{
		memset(this,0,sizeof(GameScene));
		players[0].SetClear();
		players[1].SetClear();
		players[2].SetClear();
		players[3].SetClear();
		cbPhase = PhaseFree;
		cbBankerCount = 0;
		cbBanker = cbRandomBanker;
		cbWhosTurn = cbBanker;
//		cbLaizipi = MAX_MJ_INDEX;
//		cbLaizi = MAX_MJ_INDEX;
		cbFirstDice = cbRandomDiceFirst;
		cbSecondDice = cbRandomDiceSecond;
		cbGetCard = FALSE;
	}
};


struct ST_RoomInfo
{
	int nTurnBasicGold;		//基本底注
	int nCost;				//台费
	int nMinRoomGold;		//房间下限
	int nMaxRoomGold;		//房间上限
	int	nRuleID;			//规则号
	BYTE cbHuanSanZhang;	//是否换三张
	BYTE cbWith19;			//是否带19
	BYTE cbTianDiHu;		//天地胡
	BYTE cbMenQing;			//门清
	BYTE cbZimoJiafan;		//0 自摸加底， 1 自摸加番,2 ,自摸不加番不加底
	BYTE cbDianGangZimo;	//0 点杠花炮， 1 点杠花自摸
	BYTE cbMaxFan;			//上限番
};

struct ST_SetInfo
{
	int nRoomID;
	int nCurSet;
	int nTotalSet;
	int nBaseScore;
	int nRoomOwner;
	int nExt;
};

struct ST_StartDismiss
{
	BYTE cbWhoDissMiss;
	int nSec;
};

struct ST_DissmissInfo
{
	int nZimoTimes;  //自摸次数
    int nJiepaoTimes; //接炮次数
    int nDianpaoTimes; //点炮次数
    int nAngangTimes; //暗杠次数
    int nMinggangTimes; //明杠次数
    int nTotalScore; //总成绩
	int dwDBID;
	char szName[MAX_NAME_LEN];
};

//每次分数变化结构
struct ST_Single_Score
{
	BYTE cbScoreType;		//此次分数变化类型， 放炮， 自摸， 明杠，暗杠， 续杠
	BYTE cbFan;			// 番数
	BYTE cbWinChair;
	BYTE cbFangpaoChair;
	BYTE cbHuTypeCount;
	BYTE cbHuType[MAX_HU_TYPE];
	BYTE cbGen;
	int  nScore;

	ST_Single_Score()
	{
		clear();
	}
	void clear()
	{
		cbScoreType = InvalidScoreType;
		cbFan = 0;
		cbWinChair = INVALID_CHAIR;
		cbFangpaoChair = INVALID_CHAIR;
		memset(cbHuType,InvalidHuType,sizeof(cbHuType));
		nScore = 0;
		cbHuTypeCount = 0;
		cbGen = 0;
	}
};



struct ST_GameEnd
{
	BYTE cbWriteScoreTimes[PLAYER_COUNT];	//各个玩家分数变化次数
	ST_Single_Score stSingleScore[PLAYER_COUNT][MAX_SCORE_TIMES];
	int nFinalScore[PLAYER_COUNT];
//	BYTE cbWallCard[MAJIANG_COUNT-13*PLAYER_COUNT-1];	//剩余牌墙数据


	ST_GameEnd()
	{
		Clear();
	}
	void Clear()
	{
		memset(this, 0, sizeof(ST_GameEnd));
		for (int i = 0; i<PLAYER_COUNT; i++ )
		{
			for (int j = 0; j<MAX_SCORE_TIMES; j++)
			{
				stSingleScore[i][j].clear();
			}
		}
//		memset(cbWallCard,INVALID_CARD, sizeof(cbWallCard));
	}
};

struct ST_LiangPai
{
	BYTE cbOutCard;
	BYTE cbHideCount;
	BYTE cbHideKezi[MAX_WEAVE];
};

struct ST_TING
{
	BYTE cbOutCard;
	BYTE cbTingCount;
	BYTE cbTingCard[MAX_MJ_INDEX];
	
	ST_TING()
	{
		cbOutCard = INVALID_CARD;
		cbTingCount = 0;
		memset( cbTingCard,INVALID_CARD,sizeof(cbTingCard));
	}
	void clear()
	{
		cbOutCard = INVALID_CARD;
		cbTingCount = 0;
		memset( cbTingCard,INVALID_CARD,sizeof(cbTingCard));
	}
};

struct ST_TING_EX 
{
	BYTE cbOutCard;
	BYTE cbTingCount;
	BYTE cbTingCard[MAX_MJ_INDEX];
	BYTE cbFan[MAX_MJ_INDEX];
	BYTE cbLeftCount[MAX_MJ_INDEX];
};

