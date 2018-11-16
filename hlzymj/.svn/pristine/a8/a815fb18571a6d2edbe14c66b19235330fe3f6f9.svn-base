var GameDefs = require("GameDefs");
var Resources = require("Resources");
import { TSCommon } from "../../TSCommon";
var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {

        //碰杠预置体
        PengGangPrefab: {
            default: null,
            type: cc.Prefab,
        },

        //杠牌选择预置体
        gangMoreSelectPrefab: {
            default: null,
            type: cc.Prefab,
        },

        arrowSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },

        ArrowTag: 1000,
        m_nQueYiMenStyleType:-1,
    },


    onLoad: function () {
        this.setTouchMjEnable = true;
        this.setTouchMjEnable2 = true;

        this.init();
        this.colorGray = new cc.Color(137, 137, 137);
        this.colorWhite = new cc.Color(255, 255, 255);
        var holdCardRootNode = this.node.getChildByName("holds");
        
    },

    init: function () {

        this.threeMjValueList = new Array();
        this.firstThreeMjValue = new Array();
        this.m_saveMjGroupCard = new Array();

        this.m_actionState = GameDefs.PlayerAction.paNothing;

        var holdCardRootNode = this.node.getChildByName("holds");

        this.m_selfOriginalPosY = holdCardRootNode.children[0].y;

        this.m_selfOriginalPosX = holdCardRootNode.children[0].x;

        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this)

        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)

        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancel, this);
        this.otherMovePos = 0; 
    },



    onTouchBegan: function (event) {
        if (this.m_nPos != 1) {
            return;
        }
        if (!this.setTouchMjEnable2)
            return;

        var pos = event.touch.getLocation();

        var holdCardRootNode = this.node.getChildByName("holds");

        this.m_touchMoved = false;

        this.m_touchPoint = pos;

        var touchIndex = -1;

        for (var i = 0; i < holdCardRootNode.childrenCount; i++) {
            var convertPos = holdCardRootNode.children[i].convertToNodeSpace(pos)
            var size = holdCardRootNode.children[i].getContentSize();

            var rect = cc.rect(0, 0, size.width, size.height);

            if (rect.contains(convertPos) && holdCardRootNode.children[i].active == true) {
                touchIndex = i;
                break;
            }

        }

        this.m_TouchIndex = touchIndex;
    },

    onTouchMove: function (event) {


        if (this.m_nPos != 1) {
            return;
        }

        var pos = event.touch.getLocation();

        var prePos = event.touch.getPreviousLocation();

        var holdCardRootNode = this.node.getChildByName("holds");
        if (this.m_TouchIndex != -1) {
            var touchMj = holdCardRootNode.children[this.m_TouchIndex];
            var touchMjPos = cc.p(touchMj.getPosition());

            if (cc.pDistanceSQ(pos, this.m_touchPoint) > 100) {
                this.m_touchMoved = true;
            }
            else {
                this.m_touchMoved = false;
            }

            var offsetVec = cc.p(pos.x - prePos.x, pos.y - prePos.y)

            if (this.m_touchMoved) {
                if (!this.m_moveMj) {
                    this.m_moveMj = new cc.Node();

                    var desPos = this.node.parent.convertToNodeSpace(touchMjPos);

                    var sprite = this.m_moveMj.addComponent(cc.Sprite);
                    sprite.spriteFrame = touchMj.getComponent(cc.Sprite).spriteFrame;
                    this.m_moveMj.x = desPos.x;
                    this.m_moveMj.y = desPos.y;
                    this.m_moveMj.setAnchorPoint(cc.p(0, 0.5));
                    this.node.parent.addChild(this.m_moveMj, 5);
                }
                else {
                    var sprite = this.m_moveMj.getComponent(cc.Sprite);
                    this.m_moveMj.x += offsetVec.x;
                    this.m_moveMj.y += offsetVec.y;
                }

                if ((Math.abs(this.m_moveMj.x - touchMjPos.x) > 30 || Math.abs(this.m_moveMj.y - touchMjPos.y) > 30) &&
                    this.m_moveMj.y > touchMjPos.y + 30) {
                    this.m_moveMj.cardValue = touchMj.cardValue
                }
            }

        }
    },

    onTouchEnd: function (event) {

        if (this.m_nPos != 1) {
            return;
        }
        
        var holdCardRootNode = this.node.getChildByName("holds");

        var cardValue;
        if (this.m_moveMj) {
            cardValue = this.m_moveMj.cardValue;
            this.m_moveMj.removeFromParent();
            this.m_moveMj = null;
        }
        if (this.node.parent.getComponent("DeskScene").getIsGameChangeMjing())
        {
        }else{
            if (!this.node.parent.getComponent("DeskScene").getIsGameRunning())
                return;
        }
        
        TSCommon.dispatchEvent(GameCfg.unSelectedMj, null);

        if (this.m_TouchIndex == -1) { 
            if (this.node.parent.getComponent("DeskScene").getIsGameChangeMjing()){}
            else{
                this.threeMjValueList.length = 0;
                this.retsetAllHandCardPos();
            }
        }
        else {
            TSCommon.dispatchEvent(require("HallResources").onHideSendGiftToPLayer,true);
             //若是换牌阶段，去执行另外一种提起麻将的方式
            if (this.node.parent.getComponent("DeskScene").getIsGameChangeMjing())
                {
                    this.onChooseMjClicked(this.m_TouchIndex);
                    this.m_TouchIndex = -1;
                    return
                }

            if (!this.m_touchMoved)
                this.onMjClicked(this.m_TouchIndex);
            else {

                if (this.canOutCard) {
                    if (cardValue != undefined) {
                        require("sendCMD").sendCMD_PO_OUTCARD(cardValue);
                        this.removeAllCardArrow()

                        if(this.isFirstOutCard()){
                            this.recordFirstOutCardToServer();
                        }

                        var vCardList = {}
                        vCardList.cardValue = cardValue
                        TSCommon.dispatchEvent(GameCfg.NOTIFICATION_LISTENCARD, vCardList);

                        holdCardRootNode.children[this.m_TouchIndex].setScale(1);
                        holdCardRootNode.children[this.m_TouchIndex].y = this.m_selfOriginalPosY;
                    }
                }
            }
        }

        this.m_TouchIndex = -1;
    },

    onCancel: function (event) {
        if (this.m_nPos != 1) {
            return;
        }

        this.onTouchEnd();
    },

    //重设所有的牌的坐标  无视最后一张牌的情况
    resetAllHandCardPosWithNoDiff: function () {
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            holdCardsNode.children[i].x = i * 79 + this.m_selfOriginalPosX;
            holdCardsNode.children[i].y = this.m_selfOriginalPosY;
            holdCardsNode.children[i].setScale(1);
        }
    },

    //重设所有的牌的坐标 如果可以吃牌的时候  最后一张牌就会拉开距离
    retsetAllHandCardPos: function () {
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            if (this.canOutCard && i == this.m_playerMjs.cbHoldCardCount - 1) {
                holdCardsNode.children[i].x = holdCardsNode.children[i - 1].x + 110;
                holdCardsNode.children[i].setScale(1);
                holdCardsNode.children[i].y = this.m_selfOriginalPosY;
            }
            else {
                holdCardsNode.children[i].x = i * 79 + this.m_selfOriginalPosX + this.otherMovePos;
                holdCardsNode.children[i].y = this.m_selfOriginalPosY;
                holdCardsNode.children[i].setScale(1);
            }

        }
        if (this.node.parent.getComponent("DeskScene").getIsGameChangeMjing()){
            if(this.getCanUpCardBySelectCount()){
                this.setGrayForCannotUpCard(true);
            }        
        }
    },

    //设定当前玩家是否可以出牌
    setCanOutCard: function (canOutCard) {
        this.canOutCard = canOutCard;
    },

    //设定当前玩家信息
    setPlayerMj: function (PlayerMj) {
        this.m_playerMjs = PlayerMj;
    },

    setmjLaiziValue: function (laiziValue) {
        this.m_laiziValue = laiziValue;
    },

    setmjLaizipiValue: function (laizipiValue) {
        this.m_laizipiValue = laizipiValue;
    },

    setPlayerPos: function (nPos) {
        this.m_nPos = nPos;
    },

    //设定当前玩家可进行的操作(比如 出牌， 碰牌， 杠牌， 胡牌， 吃牌)
    setActionState: function (actionState) {

        this.m_actionState = actionState;
    },

    //设定玩家麻将的
    setPlayerMjFrameByNode: function (node, spriteFrame, cardValue) {
        node.active = true;
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        node.cardValue = cardValue;
        node.bolMove = false;
    },

    getLastHandCard: function () {
        var cbHoldCardCount;
        if(this.m_playerMjs){
            cbHoldCardCount = this.m_playerMjs.cbHoldCardCount;
            var holdCardsNode = this.node.getChildByName("holds");

            if (this.m_nPos != 2) {
                return holdCardsNode.children[cbHoldCardCount - 1];
            }
            else {
                return holdCardsNode.children[GameDefs.MAX_HOLD_CARD - cbHoldCardCount];
            }
        }
        else{
            return null;
        }
    },

    doCards: function (bFreshPutCard,bolHu) {
        this.setTouchMjEnable2 = !(bolHu);
        if (this.m_playerMjs == null) {
            return;
        }

        this.putPairsAndEatMj();

        if (!bFreshPutCard){
            if (!this.isHandCardNeedRefresh()) {
                return;
            }
        }

        if (this.m_nPos == 1) {
            this.putSelfHandCards();
        }
        else if (this.m_nPos == 2) {
            this.putRightHandCards();
        }
        else if (this.m_nPos == 3) {
            this.putTopHandCards();
        }
        else if (this.m_nPos == 4) {
            this.putLeftHandCards();
        }

        this.setEndCardPosByPosAndStated(true);

        this.saveHandCards();

        if (bolHu) {
            this.setGrayForCannotUpCard(false)
            this.removeAllCardArrow()  
        }
        if (this.node.parent.getComponent("DeskScene").getIsPoChan())
        {
            this.removeAllCardArrow()  
            this.setGrayForCannotUpCard(false)
        }
     
    },

    getOneMj: function (mjCardValue,bolHu) {
        this.setTouchMjEnable2 = !(bolHu);
        var preCount = this.m_saveMjGroupCard.length;
        if (preCount <= 0) {
            return;
        }

        var mjCardValue = this.m_playerMjs.cbHoldCards[this.m_playerMjs.cbHoldCardCount - 1];

        var holdCardsNode = this.node.getChildByName("holds");
        if (this.m_nPos == 1) {
            if (holdCardsNode.children[preCount]) {
                holdCardsNode.children[preCount].active = true;
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", mjCardValue);
                this.setPlayerMjFrameByNode(holdCardsNode.children[preCount], spriteFrame, mjCardValue);
                holdCardsNode.children[preCount].y = this.m_selfOriginalPosY;
                holdCardsNode.children[preCount].setScale(1);
                // holdCardsNode.children[preCount].removeAllChildren();

                // if (mjCardValue == this.m_laiziValue || mjCardValue == this.m_laizipiValue) {
                //     var laiziIcon = new cc.Node();
                //     var sprite = laiziIcon.addComponent(cc.Sprite);

                //     var frame;
                //     if (mjCardValue == this.m_laiziValue) {
                //         frame = this.node.parent.getComponent("MjResourceMgr").m_mj_hh_li_laizi
                //     }
                //     else {
                //         frame = this.node.parent.getComponent("MjResourceMgr").m_mj_metop_cao
                //     }

                //     sprite.spriteFrame = frame;

                //     laiziIcon.x = holdCardsNode.children[preCount].getContentSize().width - laiziIcon.getContentSize().width / 2;
                //     laiziIcon.y = holdCardsNode.children[preCount].getContentSize().height / 2 - laiziIcon.getContentSize().height / 2 - 15;
                //     holdCardsNode.children[preCount].addChild(laiziIcon);
                // }

                Resources.playCommonEffect("getcard.mp3");

                //判定是否出了后会听牌
                var vOutCardList = this.node.parent.getComponent("DeskScene").m_stSceneData.vTingList;

                for(var j = 0; j <= preCount; j++){
                    for (var index = 0; index < vOutCardList.length; index++) {
                        if (vOutCardList[index].cbOutCard == holdCardsNode.children[j].cardValue) {
                            var arrowNode = new cc.Node();
                            arrowNode.active = true;
                            var arrowSprite = arrowNode.addComponent(cc.Sprite);
                            arrowSprite.spriteFrame = this.arrowSpriteFrame;
                            var size = holdCardsNode.children[j].getContentSize();
                            arrowNode.x = size.width / 2;
                            arrowNode.y = size.height / 2 + arrowNode.getContentSize().height / 2 + 10;
                            holdCardsNode.children[j].addChild(arrowNode, 0, this.ArrowTag + j);
                        }
                    }
                }
                
            }

        }
        else if (this.m_nPos == 2) {
            if (holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount - 1]) {
                holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount - 1].active = true;
            }
        }
        else {
            if (holdCardsNode.children[preCount]) {
                holdCardsNode.children[preCount].active = true;
            }
        }


        if (this.m_nPos == 1) {
            if (holdCardsNode.children[preCount] && holdCardsNode.children[preCount - 1]) {
                holdCardsNode.children[preCount].x = holdCardsNode.children[preCount - 1].x + 110;
            }
        }
        else if (this.m_nPos == 2) {
            if (holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount - 1] && holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount]) {
                holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount - 1].x = holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount].x - 15;
                holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount - 1].y = holdCardsNode.children[GameDefs.MAX_HOLD_CARD - preCount].y + 40;
            }
        }
        else if (this.m_nPos == 3) {
            if (holdCardsNode.children[preCount] && holdCardsNode.children[preCount - 1]) {
                holdCardsNode.children[preCount].x = holdCardsNode.children[preCount - 1].x - 50;
            }

        }
        else if (this.m_nPos == 4) {

            if (holdCardsNode.children[preCount] && holdCardsNode.children[preCount - 1]) {

                holdCardsNode.children[preCount].x = holdCardsNode.children[preCount - 1].x - 10
                holdCardsNode.children[preCount].y = holdCardsNode.children[preCount - 1].y - 60;
            }
        }

        this.m_saveMjGroupCard.push(mjCardValue);
        
        this.setQueYiMenMjGray();
        if (bolHu) 
        {
            this.removeAllCardArrow()  
            this.setGrayForCannotUpCard(false)
        }
        if (this.node.parent.getComponent("DeskScene").getIsPoChan())
        {
            this.removeAllCardArrow()  
            this.setGrayForCannotUpCard(false)
        }
    },

    setEndCardPosByPosAndStated: function (bIsSetPos) {
        if (!bIsSetPos)
            return;

        var addPos = [[110, 0], [-8, 30], [-30, 0], [-8, -40]]

        if (this.m_actionState == GameDefs.PlayerAction.paNothing || this.m_actionState == GameDefs.PlayerAction.paGang ||
            this.m_actionState == GameDefs.PlayerAction.paOutCard) {
            return;
        }

        var cardCount = this.m_playerMjs.cbHoldCardCount;
        var holdCards = this.node.getChildByName("holds");


        if (this.m_nPos == 1) {
            for (var i = 0; i < holdCards.childrenCount; i++) {
                holdCards.children[i].x = i * 79 + this.m_selfOriginalPosX + this.otherMovePos;
                holdCards.children[i].y = this.m_selfOriginalPosY;
                holdCards.children[i].setScale(1);

            }

            holdCards.children[cardCount - 1].x = holdCards.children[cardCount - 2].x + addPos[this.m_nPos - 1][0];
            holdCards.children[cardCount - 1].y = holdCards.children[cardCount - 2].y + addPos[this.m_nPos - 1][1];
        }

        else if (this.m_nPos == 2) {
            holdCards.children[GameDefs.MAX_HOLD_CARD - cardCount].x = holdCards.children[GameDefs.MAX_HOLD_CARD - cardCount].x + addPos[this.m_nPos - 1][0];
            holdCards.children[GameDefs.MAX_HOLD_CARD - cardCount].y = holdCards.children[GameDefs.MAX_HOLD_CARD - cardCount].y + addPos[this.m_nPos - 1][1];
        }
        else {
            holdCards.children[cardCount - 1].x = holdCards.children[cardCount - 1].x + addPos[this.m_nPos - 1][0];
            holdCards.children[cardCount - 1].y = holdCards.children[cardCount - 1].y + addPos[this.m_nPos - 1][1];
        }

    },

    isHandCardNeedRefresh() {
        var bRefresh = false;   //是否需要重新刷新牌

        if (this.m_saveMjGroupCard.length != this.m_playerMjs.cbHoldCardCount ||
            this.actionState == GameDefs.PlayerAction.paPeng || this.actionState == GameDefs.PlayerAction.paEat) {
            bRefresh = true;
        }
        else {
            //判断手上的牌是否和原来的相同
            var bFind = false;
            for (var i = 0; i < this.m_playerMjs.cbHoldCardCount; i++) {
                bFind = false;
                for (var j = 0; j < this.m_saveMjGroupCard.length; j++) {
                    if (this.m_playerMjs.cbHoldCards[i] == this.m_saveMjGroupCard[j]) {
                        bFind = true;
                        break;
                    }
                }

                if (!bFind) {
                    bRefresh = true;
                    break;
                }
            }
        }
        // cc.log(nPos + "号椅子判定刷新的结果为：" + bRefresh);
        return bRefresh;
    },

    saveHandCards() {
        this.m_saveMjGroupCard = [];
        if (this.m_playerMjs.cbHoldCardCount > 0) {
            for (var i = 0; i < this.m_playerMjs.cbHoldCardCount; i++) {
                this.m_saveMjGroupCard[i] = this.m_playerMjs.cbHoldCards[i];
            }
        }
    },
    //摆自己的牌
    putSelfHandCards: function () {
        var holdCards = new Array();
        var holdCardCount = this.m_playerMjs.cbHoldCardCount;
        for (var i = 0; i < holdCardCount; i++) {
            
            holdCards[i] = GameCfg.getStyleBySort(this.m_playerMjs.cbHoldCards[i],this.m_nQueYiMenStyleType);
        }

        var self = this;
        holdCards.sort(function (a, b) {

            if (a != b) {
                // if (a == self.m_laiziValue)
                //     return -1;
                // if (b == self.m_laiziValue)
                //     return 999999;

                return a - b;
            }

            return 0;
        })

        var holdCardsNode = this.node.getChildByName("holds");

        for (var i = 0; i < holdCardCount; i++) {
            holdCards[i] =holdCards[i]%100;
        }

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardsNode.children[i].active = false;
        }

        var startX = this.otherMovePos + this.m_selfOriginalPosX
        var distanceX = 79;


        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            if (i < holdCardCount && holdCards[i] < GameDefs.MAX_MJ_INDEX) {
                var spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", holdCards[i])
                this.setPlayerMjFrameByNode(holdCardsNode.children[i], spriteFrame, holdCards[i]);
                holdCardsNode.children[i].x = startX + (i) * distanceX;
                holdCardsNode.children[i].y = this.m_selfOriginalPosY;
                holdCardsNode.children[i].setScale(1);

                // holdCardsNode.children[i].removeAllChildren();

                //判定是否出了后会听牌
                var vOutCardList = this.node.parent.getComponent("DeskScene").m_stSceneData.vTingList;

                for (var index = 0; index < vOutCardList.length; index++) {
                    if (vOutCardList[index].cbOutCard == holdCards[i]) {
                        var arrowNode = new cc.Node();
                        arrowNode.active = true;
                        var arrowSprite = arrowNode.addComponent(cc.Sprite);
                        arrowSprite.spriteFrame = this.arrowSpriteFrame;
                        var size = holdCardsNode.children[i].getContentSize();
                        arrowNode.x = size.width / 2;
                        arrowNode.y = size.height / 2 + arrowNode.getContentSize().height / 2 + 10;
                        holdCardsNode.children[i].addChild(arrowNode, 0, this.ArrowTag + i);
                    }
                }
            }
            else {
                holdCardsNode.children[i].active = false;
            }
        }
        this.setQueYiMenMjGray()
    },

    putRightHandCards: function () {
        var holdCardCount = this.m_playerMjs.cbHoldCardCount;

        var holdCardsNode = this.node.getChildByName("holds");

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardsNode.children[i].active = false;
        }

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {

            holdCardsNode.children[i].x = 415 + (i) * 7;
            holdCardsNode.children[i].y = 228 - (i) * 27;

            if (i >= GameDefs.MAX_HOLD_CARD - holdCardCount) {
                holdCardsNode.children[i].active = true;
            }
            else {
                holdCardsNode.children[i].active = false;
            }
        }
    },

    putTopHandCards: function () {
        var holdCardCount = this.m_playerMjs.cbHoldCardCount;
        var holdCardsNode = this.node.getChildByName("holds");

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardsNode.children[i].active = false;
        }

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            if (i < holdCardCount) {
                holdCardsNode.children[i].active = true;
                holdCardsNode.children[i].x = 215 - (i) * 33 //+ this.otherMovePos;
            }
            else {
                holdCardsNode.children[i].active = false;
            }
        }
    },

    putLeftHandCards: function () {
        var holdCardCount = this.m_playerMjs.cbHoldCardCount;
        var holdCardsNode = this.node.getChildByName("holds");

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardsNode.children[i].active = false;
        }

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardsNode.children[i].x = -415 - (i) * 7;
            holdCardsNode.children[i].y = 228 - (i) * 27;

            if (i < holdCardCount) {
                holdCardsNode.children[i].active = true;
            }
            else {
                holdCardsNode.children[i].active = false;
            }
        }
    },

    //移除所有牌的箭头动画
    removeAllCardArrow: function () {
        if (this.m_nPos != 1) {
            return;
        }

        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            var node = holdCardsNode.children[i].getChildByTag(this.ArrowTag + i);
            if (node) {
                node.removeFromParent(true);
            }
        }
    },

    onMjClicked: function (clickIndex) {

        var holds = this.node.getChildByName("holds");
        var node = holds.children[clickIndex];

        var cardValue = node.cardValue;

        var index = clickIndex;

        TSCommon.dispatchEvent(GameCfg.unSelectedMj, null);

        var vCardList = {}
        vCardList.cardValue = cardValue
        TSCommon.dispatchEvent(GameCfg.NOTIFICATION_LISTENCARD, vCardList);

        if (node.y == this.m_selfOriginalPosY) {
            if (this.getCanUpCardBySelectCount())
            //重置所有牌位置
            for (var i = 0; i < holds.childrenCount; i++) {
                if (this.canOutCard && i == this.m_playerMjs.cbHoldCardCount - 1) {
                    holds.children[i].x = holds.children[i - 1].x + 110;
                    holds.children[i].y = this.m_selfOriginalPosY;
                    holds.children[i].setScale(1);
                }
                else {
                    holds.children[i].x = i * 79 + this.m_selfOriginalPosX + this.otherMovePos;
                    holds.children[i].y = this.m_selfOriginalPosY;
                    holds.children[i].setScale(1);
                }

            }

            node.y = node.y + 30;
            node.setScale(1.2);

            
            TSCommon.dispatchEvent(GameCfg.selectedMj, cardValue);
            Resources.playCommonEffect("selectmahjong.mp3");


            if(this.isFirstOutCard()){
                this.recordFirstClickCardToServer();
            }

            //然后将之后牌往后移

            for (var i = 0; i < holds.childrenCount; i++) {
                if (node == holds.children[i]) {
                    index = i;
                    break;
                }
            }

            if (index != -1) {
                for (var i = index + 1; i < holds.childrenCount; i++) {
                    holds.children[i].x += 15;
                }
            }
        }
        else {

            if (this.canOutCard) {
                require("sendCMD").sendCMD_PO_OUTCARD(cardValue)

                node.setScale(1);
                node.y = node.y - 30;
                this.removeAllCardArrow()        
                
                if(this.isFirstOutCard()){
                    this.recordFirstOutCardToServer();
                }
            }
            else {
                //重置所有牌位置
                for (var i = 0; i < holds.childrenCount; i++) {

                    holds.children[i].x = i * 79 + this.m_selfOriginalPosX + this.otherMovePos;
                    holds.children[i].y = this.m_selfOriginalPosY;
                    holds.children[i].setScale(1);
                }
            }
        }
    },

    //判定是否是第一次出牌
    isFirstOutCard:function(){
        var isFirst = true;
        for(var i = 0; i < this.m_playerMjs.cbOutCards.length; i++){
            if(this.m_playerMjs.cbOutCards[i] < GameDefs.MAX_MJ_INDEX && this.m_playerMjs.cbOutCards[i] >= 0){
                isFirst = false;
                break;
            }
        }

        return isFirst;
    },

    //记录玩家点击第一张牌 然后发给服务器
    recordFirstClickCardToServer:function(){
        var HallResources = require("HallResources");
        HallResources.recordPlayerLogToServer(HallResources.recordList.click_card);
    },

    //记录第一张出牌记录  然后发给服务器
    recordFirstOutCardToServer:function(){
        var HallResources = require("HallResources");
        HallResources.recordPlayerLogToServer(HallResources.recordList.click_discard);
    },

    gangMoresCardToast: function (gangInfoArray) {
        var selectEatNode = this.node.getChildByName("select_penggangs");
        selectEatNode.removeAllChildren();

        var onGangSelectFinish = function () {
            selectEatNode.removeAllChildren();
        }

        var startX = -125;
        var startY = 200;
        var distanceX = 250;

        for (var i = 0; i < gangInfoArray.length; i++) {
            var gangMoreSelectItem = cc.instantiate(this.gangMoreSelectPrefab);
            var gangMoreSelectItemView = gangMoreSelectItem.getComponent('EatOrGangSelectLayer');

            var spriteAtlas = this.node.parent.getComponent("MjResourceMgr").mj1_face_dao;
            gangMoreSelectItemView.init(GameDefs.PlayerAction.paGang, gangInfoArray[i], onGangSelectFinish, spriteAtlas);
            gangMoreSelectItemView.showUI();
            selectEatNode.addChild(gangMoreSelectItem);

            gangMoreSelectItem.x = startX + (i) * distanceX;
            gangMoreSelectItem.y = startY;
        }
    },

    //移除吃杠的多种选择
    removeEatOrGangMoresCardToast: function () {
        var selectEatNode = this.node.getChildByName("select_penggangs");
        selectEatNode.removeAllChildren();

    },

    getRangeSpriteFrameByPos() {
        if (this.m_nPos == 1 || this.m_nPos == 3) {
            return this.node.parent.getComponent("MjResourceMgr").mj1_face_dao;
        }
        else if (this.m_nPos == 2) {
            return this.node.parent.getComponent("MjResourceMgr").mj1_face_suit_y;
        }
        else if (this.m_nPos == 4) {
            return this.node.parent.getComponent("MjResourceMgr").mj1_face_suit_z;
        }
        else {
            cc.log("the this.m_nPos is error!");
        }
    },

    getCardSpriteFrame: function () {
        return this.mjFrame;
    },

    //摆碰或者杠的牌
    putPairsAndEatMj: function () {
        if (this.m_pengGangArray == null) {
            this.m_pengGangArray = new Array();
        }
        var pengGangRootNode = this.node.getChildByName('penggangs');

        var pairsItem = null;
        var cardSuit = null;
        var startX = null;
        var startY = null;
        var distanceX = null;
        var distanceY = null;

        var scale = 1;

        if (this.m_nPos == 1) {
            startX = -450;
            startY = -297

            distanceX = 200;
            distanceY = 0;

            this.otherMovePos = (56*3 + 35) * this.m_playerMjs.nWeaveCount;
        }
        else if (this.m_nPos == 2) {
            startX = 570;
            startY = -120

            distanceX = -35;
            distanceY = +115;

            scale = 0.9;
        }
        else if (this.m_nPos == 3) {
            startX = -230;
            startY = 330
            distanceX = 120;
            distanceY = 0;
            scale = 0.6;
            // this.otherMovePos = -(33.6*3 + 35) * this.m_playerMjs.nWeaveCount;
        }
        else if (this.m_nPos == 4) {
            startX = -570;
            startY = -79;

            distanceX = 35;
            distanceY = 115;
            scale = 0.9;
        }

        //var MjResourceMgr = this.node.parent.getComponent("")
        for (var i = 0; i < this.m_playerMjs.nWeaveCount; i++) {
            
            cardSuit = this.m_playerMjs.showCardSuits[i];

            // 检查杠的数据是否有问题
            if (cardSuit.cbWeaveKind == GameDefs.WeaveType.AnGang || cardSuit.cbWeaveKind == GameDefs.WeaveType.XuGang ||
                cardSuit.cbWeaveKind == GameDefs.WeaveType.MingGang) {
            }
            if (this.m_pengGangArray[i] == null) {
                pairsItem = cc.instantiate(this.PengGangPrefab);
                var RangeCardLayer = pairsItem.getComponent('RangeCardLayer');
                RangeCardLayer.init(cardSuit.cbWeaveKind, cardSuit.cbCardData, this.m_nPos, this.getRangeSpriteFrameByPos());//, this.m_laiziValue, this.m_laizipiValue);
                pengGangRootNode.addChild(pairsItem);
                pairsItem.setScale(scale);
                pairsItem.x = startX + (i) * distanceX;
                pairsItem.y = startY + (i) * distanceY;
                this.m_pengGangArray[i] = pairsItem;
            }
            else {
                var RangeCardLayer = this.m_pengGangArray[i].getComponent('RangeCardLayer');
                RangeCardLayer.init(cardSuit.cbWeaveKind, cardSuit.cbCardData, this.m_nPos, this.getRangeSpriteFrameByPos());//, this.m_laiziValue, this.m_laizipiValue);
            }
        }
        
    },

    //游戏结束的时候调用
    gameOver: function () {
        this.threeMjValueList.length = 0;
        this.firstThreeMjValue.length = 0;
        this.setTouchMjEnable = true;
        this.setTouchMjEnable2 = true;
        this.setQueYiMenStyleType(-1);
        this.showHandCardOnGameOver();
    },

    //结束的时候将所有手牌全都展示出来
    showHandCardOnGameOver: function () {

        var holdCardCount = this.m_playerMjs.cbHoldCardCount;

        var holdCardRootNode = this.node.getChildByName("holds");

        var startX = holdCardRootNode.children[0].x;
        var startY = holdCardRootNode.children[0].y;
        var distanceX = 40;
        var distanceY = 40;
        var foreName = "";
        var scale = 1;
        if (this.m_nPos == 1) {
            foreName = "hh_dao_";
            distanceX = 48;
            distanceY = 0;

            startX = -300 + this.m_pengGangArray.length * 82 + (this.m_pengGangArray.length -1)*79;

        }
        else if (this.m_nPos == 2) {
            foreName = "hh_suit_y_";
            scale = 0.8;
            distanceX = -8;
            distanceY = 27;

            var startX = holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1].x;
            var startY = holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1].y;
        }
        else if (this.m_nPos == 3) {
            foreName = "hh_dao_";
            scale = 0.8;
            distanceX = -38;
            distanceY = 0;

        }
        else if (this.m_nPos == 4) {
            foreName = "hh_suit_z_"
            scale = 0.8;
            distanceX = -8;
            distanceY = -27
        }


        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardRootNode.children[i].active = false;
        }

        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {

            if (i < this.m_playerMjs.cbHoldCardCount) {
                var name = Resources.get_frameName(foreName, this.m_playerMjs.cbHoldCards[i]);
                var spriteFrame = null;
                if (this.m_nPos == 1 || this.m_nPos == 3) {
                    spriteFrame = this.node.parent.getComponent("MjResourceMgr").mj1_face_dao.getSpriteFrame(name);
                }
                else if (this.m_nPos == 2) {
                    spriteFrame = this.node.parent.getComponent("MjResourceMgr").mj1_face_suit_y.getSpriteFrame(name);
                }
                else if (this.m_nPos == 4) {
                    spriteFrame = this.node.parent.getComponent("MjResourceMgr").mj1_face_suit_z.getSpriteFrame(name);
                }



                if (this.m_nPos != 2) {

                    //表明是最后一张牌 如果胡牌 则要拉开差距
                    if (i == this.m_playerMjs.cbHoldCardCount - 1 && this.node.getComponent("Player").getIsWinner()) {
                        holdCardRootNode.children[i].active = true;
                        holdCardRootNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        holdCardRootNode.children[i].setScale(scale)
                        holdCardRootNode.children[i].x = startX + (i) * distanceX;
                        holdCardRootNode.children[i].y = startY + (i) * distanceY;
                    } else {
                        holdCardRootNode.children[i].active = true;
                        holdCardRootNode.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        holdCardRootNode.children[i].setScale(scale)
                        holdCardRootNode.children[i].x = startX + (i - 1) * distanceX;
                        holdCardRootNode.children[i].y = startY + (i - 1) * distanceY;
                    }

                }
                else {
                    if (i == this.m_playerMjs.cbHoldCardCount - 1 && this.node.getComponent("Player").getIsWinner()) {
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].active = true;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].setScale(scale)
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].x = startX + (i) * distanceX;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].y = startY + (i) * distanceY;
                    }
                    else {
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].active = true;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].setScale(scale)
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].x = startX + (i - 1) * distanceX;
                        holdCardRootNode.children[GameDefs.MAX_HOLD_CARD - 1 - i].y = startY + (i - 1) * distanceY;
                    }

                }
                if (this.m_nPos == 1) 
                    holdCardRootNode.children[i].getChildByName("shadow").active = false;
            }
        }
    },


    //清除掉所有麻将  并且将所有麻将复位
    cleanAllMjs: function () {

        var offset = [
            [78, 0],
            [7, -27],
            [-34, 0],
            [-7, -27],
        ]


        var holdCardRootNode = this.node.getChildByName("holds");
        for (var i = 0; i < GameDefs.MAX_HOLD_CARD; i++) {
            holdCardRootNode.children[i].active = false;
            holdCardRootNode.children[i].setScale(1);

            if (offset[this.m_nPos - 1]){
                holdCardRootNode.children[i].x = this.m_selfOriginalPosX + (i) * offset[this.m_nPos - 1][0];
                holdCardRootNode.children[i].y = this.m_selfOriginalPosY + (i) * offset[this.m_nPos - 1][1];
            }
            // holdCardRootNode.children[i].removeAllChildren();
        }

        if (this.m_pengGangArray) {
            for (var i = 0; i < this.m_pengGangArray.length; i++) {
                this.m_pengGangArray[i].removeFromParent(true);
                this.m_pengGangArray[i] = null;
            }
            this.m_pengGangArray = [];
        }
    },

    //获得手上万/条/筒的数量，可以在选择换牌和选择定缺一门的时候使用
    getWanTiaoTongCount:function(){
        var typeCountList = [];
        var wanCount = 0 
        var tiaoCount = 0 
        var tongCount = 0
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            var nType = GameCfg.getMjColor(holdCardsNode.children[i].cardValue);
            if (nType == 0) {
                wanCount = wanCount + 1;
            }
            else if (nType == 1) {
                tiaoCount = tiaoCount + 1;
            }
            else if (nType == 2) {
                tongCount = tongCount + 1;
            }
        }
        typeCountList[0] = wanCount;
        typeCountList[1] = tiaoCount;
        typeCountList[2] = tongCount;
        return typeCountList;
    },

    //客户端选牌/选定缺
    //bolChooseDingQue为是否判断缺一门，不是的话那就是判断选牌
    getChooseMjTypeByCount:function(bolChooseDingQue){
        var typeCountList = this.getWanTiaoTongCount();
        if (bolChooseDingQue){
            var nType = 0;
            nType = (typeCountList[0] < typeCountList[1])?0:1;
            nType = (typeCountList[nType] < typeCountList[2])?nType:2;
            return nType;
        }
        else{
            //选择换牌的话，要考虑牌类型数是不是小于3，若是小于3则提示别的牌型
            var nType = 0;
            nType = (typeCountList[0] < 3)?-1:0;
            if (nType === -1)
            {
                nType = (typeCountList[1] < 3)?-1:1;
            }
            else{
                if (typeCountList[1] >= 3){
                    nType = (typeCountList[0] < typeCountList[1])?0:1;
                }
            }

            if (nType === -1)
            {
                nType = 2;
            }
            else{
                if (typeCountList[2] >= 3){
                    nType = (typeCountList[nType] < typeCountList[2])?nType:2;
                }
            }
            //这里取-1只是为了方便
            return nType;
        }
    },

    //客户端根据类型自动提示三张换牌
    upThreeCardByType:function(){
        this.firstThreeMjValue = new Array();
        var tipUpType = this.getChooseMjTypeByCount();
        var upCount = 0;
        // console.log("客户端自动提起三张牌------------"+tipUpType)
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            // console.log(holdCardsNode.children[i].cardValue);
            var nType = GameCfg.getMjColor(holdCardsNode.children[i].cardValue);
            if (tipUpType === nType)
            {
                upCount = upCount + 1;
                this.firstThreeMjValue[this.firstThreeMjValue.length] = holdCardsNode.children[i].cardValue;
                this.onChooseMjClicked(i);
            }
            if (upCount === 3)
            {
                break;
            }
        }
    },
    //获得默认提起的三张牌
    getUpThreeCardValue:function()
    {
        return this.firstThreeMjValue;    
    },

    //插入三张牌到手中
    insertThreeCard:function(cbList,nPos)
    {
        var holdCardsNode = this.node.getChildByName("holds");
        
        var nTempList = [];
        var moveHeight = 10
        if (nPos == 1)
            moveHeight = 40;
        else if(nPos == 2 || nPos == 4)
            moveHeight = 30;
        var bFind = false
        //是我自己的牌就找到对应的牌，提起之后再执行放下动作，是别人的牌，随机三个位置，然后执行提起后放下
        if (nPos != 1){
            while (true){
                var nRandom =Resources.getOneRandom(holdCardsNode.childrenCount)
                bFind = false
                for (var i=0;i < nTempList.length;i++){
                    if (nTempList[i] == nRandom) {
                        bFind = true
                    }
                }
                if (!bFind) {
                    nTempList[nTempList.length] = nRandom;
                    if (nTempList.length ==3) {
                        break
                    }
                } 
            }
            for (var i=0;i < nTempList.length;i++){
                for (var j=0;j < holdCardsNode.childrenCount;j++){
                    if (nTempList[i] == j){
                        var pMjOrginPosY = holdCardsNode.children[j].y;
                        holdCardsNode.children[j].y = pMjOrginPosY+moveHeight;
                        holdCardsNode.children[j].bolMove = true;
                        break;
                    }
                }
            }
        }
        else{
            for (var i=0;i < 3;i++){
                for (var j=0;j < holdCardsNode.childrenCount;j++){
                    if (cbList[i] == holdCardsNode.children[j].cardValue) {
                        var pMjOrginPosY = holdCardsNode.children[j].y;
                        holdCardsNode.children[j].y = pMjOrginPosY+moveHeight;
                        break;
                    }
                    
                }
            }
        }
        var self = this;
        var action =cc.delayTime(1);
        var action2 = cc.callFunc(function(){
            for (var i=0;i < holdCardsNode.childrenCount;i++){
                var sp = holdCardsNode.children[i];
                if (nPos!= 1)
                {
                    if (holdCardsNode.children[i].bolMove){
                        sp.runAction(cc.moveTo(0.3,cc.p(sp.x,sp.y - moveHeight)));
                    }
                }
                else{
                    if (sp.y> self.m_selfOriginalPosY) {
                        sp.runAction(cc.moveTo(0.3,cc.p(sp.x,self.m_selfOriginalPosY)));
                    }
                }
            }
        });
        
        var sequence = cc.sequence(action, action2);
        holdCardsNode.runAction(sequence);
  
    },

    //删除三张手牌然后刷新
    deleteThreeMjRefresh:function(list)
    {
        var leg =  this.m_playerMjs.cbHoldCardCount;
        var targetKeys = this.getThreeUpCradList();
        if (list && list.length > 0)
            targetKeys= list;
        // for (let i = leg - 1; i >= 0; i--) {
        //     for (let j = 0; j < targetKeys.length; j++) {
        //         if ( this.m_playerMjs.cbHoldCards[i]) {
        //             if ( this.m_playerMjs.cbHoldCards[i] == targetKeys[j]) {
        //                     this.m_playerMjs.cbHoldCards.splice(i, 1)
        //                     break; //结束当前本轮循环，开始新的一轮循环
        //             }
        //         }
        //     }
        // }
        for (let j = 0; j < targetKeys.length; j++) {
            for (let i = 0; i <leg; i++) {
            
                // if ( this.m_playerMjs.cbHoldCards[i]) {
                    if ( this.m_playerMjs.cbHoldCards[i] == targetKeys[j]) {
                        this.m_playerMjs.cbHoldCards.splice(i, 1)
                        leg = leg - 1;
                        break; //结束当前本轮循环，开始新的一轮循环
                    }
                // }
            }
        }
        
        this.m_playerMjs.cbHoldCardCount = this.m_playerMjs.cbHoldCardCount - 3;
        this.putSelfHandCards();
    },

    //获得当前被提起的三张牌分别是什么
    getThreeUpCradList:function()
    {
        return this.threeMjValueList;
    },

    //获得当前被提起的牌数目来控制现在能否提起牌
    getCanUpCardBySelectCount:function(){
        var count = 0;
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            if (holdCardsNode.children[i].y > this.m_selfOriginalPosY)
            {
                count = count + 1;
            }
        }
        return count < 3;
    },

    setQueYiMenStyleType:function(nStyleType){
        this.m_nQueYiMenStyleType = nStyleType
    },

    //设置缺一门的为灰色
    setQueYiMenMjGray:function(){
        if(this.m_nPos != 1)
            return
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            var nType = GameCfg.getMjColor(holdCardsNode.children[i].cardValue);
            if (nType == this.m_nQueYiMenStyleType){
                holdCardsNode.children[i].getChildByName("shadow").active = true;
            }
            else{
                holdCardsNode.children[i].getChildByName("shadow").active = false;
            }
        }
    },

    //获得手上是不是有缺一门的牌
    getHasQueYiMenMj:function(){
        if(this.m_nPos != 1)
            return false;
        var holdCardsNode = this.node.getChildByName("holds");
        var cbHoldCardCount = this.m_playerMjs.cbHoldCardCount;
        for (var i = 0; i < cbHoldCardCount; i++) {
            var nType = GameCfg.getMjColor(holdCardsNode.children[i].cardValue);
            if (nType == this.m_nQueYiMenStyleType){
                return true;
            }
        }
        return false;
    },

    //设置没被抬起来的麻将变灰，并且控制当前是否还能继续点击
    setGrayForCannotUpCard:function(bol){
        if(this.m_nPos != 1)
            return
        var holdCardsNode = this.node.getChildByName("holds");
        for (var i = 0; i < holdCardsNode.childrenCount; i++) {
            if (holdCardsNode.children[i].y == this.m_selfOriginalPosY)
            {
                if (bol){
                    holdCardsNode.children[i].getChildByName("shadow").active = false;
                }else{
                    holdCardsNode.children[i].getChildByName("shadow").active = true;
                }
            }
        }
        this.setTouchMjEnable = bol;
    },

    //为了在换牌的时候提起三张牌，这里重构了点击牌的方法，和原来正常点击牌作了区分
    onChooseMjClicked: function (clickIndex) {

        // if (!this.getCanUpCardBySelectCount())
        //     return;
        var holds = this.node.getChildByName("holds");
        var node = holds.children[clickIndex];
        
        var cardValue = node.cardValue;
        var index = clickIndex;
        if (node.y == this.m_selfOriginalPosY) {
            if (!this.setTouchMjEnable)
            {
                return;
            }

            //存储到列表供给外部调用
            this.threeMjValueList[this.threeMjValueList.length] = cardValue;

            node.y = node.y + 30;
            node.setScale(1.2);

            Resources.playCommonEffect("selectmahjong.mp3");

            //然后将之后牌往后移
            for (var i = 0; i < holds.childrenCount; i++) {
                if (node == holds.children[i]) {
                    index = i;
                    break;
                }
            }

            if (index != -1) {
                for (var i = index + 1; i < holds.childrenCount; i++) {
                    holds.children[i].x += 15;
                }
            }
            //因为在手机上很卡，暂时注释
            if(!this.getCanUpCardBySelectCount()){
                this.setTouchMjEnable = false;
            //     this.setGrayForCannotUpCard(false);
            }
        }
        else{

            //到列表删除指定数据
            var index = this.threeMjValueList.indexOf(cardValue);
            if (index > -1) {
                this.threeMjValueList.splice(index, 1);
            }

            node.y = node.y - 30;
            node.setScale(1);
            //将之后牌往前移
            for (var i = 0; i < holds.childrenCount; i++) {
                if (node == holds.children[i]) {
                    index = i;
                    break;
                }
            }

            if (index != -1) {
                for (var i = index + 1; i < holds.childrenCount; i++) {
                    holds.children[i].x -= 15;
                }
            }
            if(this.getCanUpCardBySelectCount()){
                this.setGrayForCannotUpCard(true);
            }
        }
    },
});
