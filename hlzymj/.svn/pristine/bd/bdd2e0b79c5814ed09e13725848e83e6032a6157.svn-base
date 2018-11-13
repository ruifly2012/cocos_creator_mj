/**
 * 此处结算界面是金币场内的结算界面
 */


var GameDefs = require("GameDefs");
var Resources = require("Resources");
import {TSCommon} from "../../TSCommon";
cc.Class({
    extends: cc.Component,

    properties: {
        resultListBg:{
            default: null,
            type: cc.Sprite,
        },
        resultList:{
            default: null,
            type: cc.ScrollView,
        },
        playerPrefab:{
            default: null,
            type: cc.Prefab,
        },
        showPlayerNode:{
            default: null,
            type: cc.Node,
        },
        backBtn:{
            default: null,
            type: cc.Button,
        },
        backToDeskBtn:{
            default: null,
            type: cc.Button,
        },
        nextBtn:{
            default: null,
            type: cc.Button,
        },
        continueBtn:{
            default: null,
            type: cc.Button,
        },
    },

    onLoad:function(){
        this.isPrivateRoom = false;
    },

    onDestroy:function(){
        this.stopLeftTimer();
    },

    onEnable:function(){
        

        this.startLeftTimer();

        var HallResources = require("HallResources");
        HallResources.recordPlayerLogToServer(HallResources.recordList.count_page);
    },

    
    /*
     * 初始化
     * @huType 胡牌类型 
     * @fanNum 胡牌番数
     * @laiyouValue 癞油字的牌值
    */
    init:function(stWinStruct, players,playersName,playerAvatorUrls,myChair,showDetailResult,nCost,playerPoChan,bolIsPrivateRoom){
        this.m_showDetailResult = showDetailResult;
        this.m_stWinStruct = stWinStruct;
        this.m_playersInfo = players;
        this.m_stPlayerName = playersName;
        this.m_playerAvators = playerAvatorUrls;
        this.m_myChair = myChair;
        this.m_leftTimerStop = false;
        this.m_leftTime = 60;
        this.m_nCost = nCost;
        this.m_nPoChan = playerPoChan;
        this.m_bolIsPrivateRoom = bolIsPrivateRoom;
        this.initData();
    },


    getLeftLeaveTime:function(){
        return this.m_leftTime;
    },

    //开始离开房间的按钮
    startLeftTimer:function(){
        var leftTimerNode = this.node.getChildByName("ready_btn").getChildByName("leave_timer");
        leftTimerNode.active = true;
        leftTimerNode.getComponent(cc.Label).string = "(" + this.m_leftTime + ")";

        var self = this;
        var callback = function(){
            if(self.m_leftTimerStop){
                return;
            }

            self.m_leftTime -= 1;
            var label = leftTimerNode.getComponent(cc.Label);
            label.string = "(" + self.m_leftTime + ")";

            if(self.m_leftTime > 0){
                TSCommon.performWithDelay(self, callback, 1);
            }
            else{
                leftTimerNode.getComponent(cc.Label).string = "";
                leftTimerNode.active = false;
                G.goldGameReady = null;
                require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
            }
        }

        TSCommon.performWithDelay(this, callback, 1);
    },

    stopLeftTimer:function(){
        this.m_leftTimerStop = true;
    },

    setContinueBtn:function(func){
        this.continueBtn.node.active = true;
        this.backToDeskBtn.node.active = true;
        
        this.continueBtn.node.setPosition(0,-600);
        var action4 = cc.moveBy(0.3,0,300);
        this.continueBtn.node.runAction(action4);

        this.backToDeskBtn.node.setPosition(560,-628);
        var action5 = cc.moveBy(0.3,0,300);
        this.backToDeskBtn.node.runAction(action5);
        
        this.nextBtn.node.active = false;
        this.backBtn.node.active = false;
        this.continueBtnFunc = func;
    },

    clickContinueBtn:function(){
        this.continueBtnFunc();
    },

    //离开按钮点击
    onLeaveGameClicked:function(){
        var leftTimerNode = this.node.getChildByName("ready_btn").getChildByName("leave_timer");
        this.stopLeftTimer();
        leftTimerNode.active = false;
        // var DeskScene = this.node.parent.getComponent("DeskScene");
        
        // if(DeskScene.IsCXZ()){
        //     G.goldGameReady = 3;
        // }
        // else{
        //     G.goldGameReady = 4;
        // }
        G.goldGameReady = null;
        require('GameLibSink').getInstance().getGameLib().leaveGameRoom();       
    },


    //详细结算按钮
    onDetailResultClicked:function(){
        if(this.m_showDetailResult){
            this.m_showDetailResult();
        }
    },

    setBackToDeskBtn:function(func){
        this.backToDesk = func;
    },

    clickBackToDeskBtn:function(){
        this.backToDesk();
    },

    setIsPrivateRoom:function(bol)
    {
        this.isPrivateRoom = bol;
    },

    getIsPrivateRoom:function()
    {
        return this.isPrivateRoom;
    },

    //准备按钮
    onReadyClicked:function(){
        if (this.getIsPrivateRoom())
        {
            G.matchGameReady = true;
            require('GameLibSink').getInstance().getGameLib().leaveGameRoom();
            return;
        }
        this.node.active = false;
        var GameCfg = require("GameCfg");
        TSCommon.dispatchEvent(GameCfg.GAME_RESTART, {isReady : true});
    },
    initData:function(){
        this.showPlayerNode.removeAllChildren();
        //四个玩家的内容
        var maxScore = this.m_stWinStruct.nFinalScore[0];
       var maxScoreIndex = 0;
        for (var i = 1;i<GameDefs.PLAYER_COUNT; i++){
            if (maxScore < this.m_stWinStruct.nFinalScore[i])
            {
                maxScore = this.m_stWinStruct.nFinalScore[i];
                maxScoreIndex = i;
            }
        }
        for (var i = 0;i<GameDefs.PLAYER_COUNT; i++){
            var playerResultItem = cc.instantiate(this.playerPrefab);
            playerResultItem.parent = this.showPlayerNode;
            var score = 0
            if (this.m_bolIsPrivateRoom)
                score = this.m_stWinStruct.nFinalScore[i];
            else
                score = this.m_stWinStruct.nFinalScore[i] +this.m_nCost;
            console.log("这个玩家的最终分数："+score)
            playerResultItem.getComponent("XueLiuPlayerResultItem").initData(this.m_stPlayerName[i],this.m_playerAvators[i],score,maxScoreIndex == i,i,this.m_myChair,this.m_nPoChan[i],this.m_bolIsPrivateRoom,this.m_stWinStruct.nSrcScore[i]);   
            playerResultItem.setPosition(-70 + i*290,300);

            var delay = cc.delayTime(0.2*i);
            var action = cc.moveBy(0.3,0,-300);
            var sequence = cc.sequence(delay, action);
            playerResultItem.runAction(sequence);
        }
        this.resultList.getComponent("XueLiuGameOverScrollList").initData(this.m_stWinStruct.cbWriteScoreTimes[this.m_myChair],this.m_stWinStruct.stSingleScore[this.m_myChair],this.m_myChair);
        
        this.resultListBg.node.setPosition(0,-432);
        var action1 = cc.moveBy(0.3,0,300);
        this.resultListBg.node.runAction(action1);


        this.backBtn.node.setPosition(-292,-602);
        var action2 = cc.moveBy(0.3,0,300);
        this.backBtn.node.runAction(action2);

        this.nextBtn.node.setPosition(292,-602);
        var action3 = cc.moveBy(0.3,0,300);
        this.nextBtn.node.runAction(action3);
    },
});
