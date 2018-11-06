
//个人信息预览界面
import { ByteArray } from "../common/ByteArray";
import { TSCommon } from "../TSCommon"
var GameDefs = require("GameDefs")
var PersonInfoPreView = {
    extends: cc.Component,

    properties: {
        perInfoFrame:{
            default: null,
            type:cc.Node,
        },
        // progressBarBg:{
        //     default: null,
        //     type:cc.ProgressBar,
        // },
        progressBar1:{
            default: null,
            type:cc.Sprite,
        },
        progressBar2:{
            default: null,
            type:cc.Sprite,
        },
        progressBar3:{
            default: null,
            type:cc.Sprite,
        },
        progressBar4:{
            default: null,
            type:cc.Sprite,
        },
        progressBar5:{
            default: null,
            type:cc.Sprite,
        },
        progressBar6:{
            default: null,
            type:cc.Sprite,
        },
    },

    onLoad:function(){
        this.bolSend = true;
        this.bolSend2 = true;
        this.m_leftTime = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onTouch:function(event){
        var poistion = event.touch.getLocation();
        var locationInNode = this.node.getChildByName("bg").convertToNodeSpace(poistion);    
        var s = this.node.getChildByName("bg").getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            
        }
        else{         
            this.node.active = false;
        }
    },
    
    //个人信息按钮点击
    onPersonInfoClicked:function(event){
        var HallResources = require("HallResources");
        HallResources.getInstance().playButtonEffect();
        this.perInfoFrame.active = true;
        this.node.active = false;
    },

    sendProperty:function(event, IndexID){
        if(this.m_vPropertyInfos.length < 0){
            return;
        }
        if (!this.bolSend)
        {   
            require("Resources").ShowToast("道具正在冷却中，请稍等")
            return;
        }
        if (!this.bolSend2)
        {   
            require("Resources").ShowToast("道具正在冷却中，请稍等")
            return;
        }
        this.bolSend = false;
        this.m_leftTime = 3;
        this.addSendGiftTime();
        this.updateTime();
        var toolID = Number(this.m_vPropertyInfos[IndexID].ToolID);
        var freeCount = Number(this.m_vPropertyInfos[IndexID].FreeCount);
        // var hasUseCount = Number(this.m_vPropertyInfos[IndexID].HasUseCount);
        var price = Number(this.m_vPropertyInfos[IndexID].Price);
        // var UpCharmAmount = Number(this.m_vPropertyInfos[IndexID].UpCharmAmount);

        var self = this;
        var selfChair = self.m_pMyself.getUserChair();
        var otherChair = self.m_pUserInfo.getUserChair();

        var send = function(propertyID, payNum,charmNum){
            var ba = new ByteArray();
            ba.writeInt(propertyID);
            ba.writeInt(payNum);
            ba.writeInt(charmNum);
            ba.writeByte(Number(self.m_pMyself.getUserChair()));
            ba.writeByte(Number(self.m_pUserInfo.getUserChair()));
            ba.writeBoolean(false);
            require('GameLibSink').getInstance().getGameLib().sendGameCmd(GameDefs.CMD_PROPERTY, ba);
            // self.refreshCharm(propertyID, charmNum);
        };
        // if(freeCount - hasUseCount > 0){
        //     send(toolID, 0, UpCharmAmount);
        // }
        // else{
            //检查元宝是否足够
            if(this.checkIsYuanBaoEnough(price)){
                console.log("元宝足够，扣钱发特效")
                send(toolID, price, 0);
            }
            else{
                require("Resources").ShowToast("您当前的金币不足啦")
                //提示元宝不足
            }
        // }
    },

};

PersonInfoPreView.create = function(wUserID, position) {
    this.init(wUserID, position);
}

PersonInfoPreView.init = function(wUserID, position){
    this.m_wUserID = wUserID
    this.m_position = position

    this.node.setPosition(this.m_position)
    this.m_pMyself = require('GameLibSink').getInstance().getGameLib().getMyself();
    this.m_pUserInfo = require('GameLibSink').getInstance().getGameLib().getUser(this.m_wUserID);

    this.refresh();
}

PersonInfoPreView.refresh = function(){
//    this.node.getChildByName("charmValue").getComponent(cc.Label).string = this.m_pUserInfo.getGameTitleScore();

   //刷新道具
   this.refreshProperty();
   //刷新按钮
//    this.refreshStateBtn();
}

PersonInfoPreView.requestProperty = function(){
    var vPropertyList = new Array();
    var self = this;
    var onResponse = function(success, data){
        if(success){
           var jsonObject = JSON.parse(data).table
            for (var i = 0;i <jsonObject.length;i++)
            {
                var property = {};
                property.ToolID = jsonObject[i].ToolType // 道具id
                property.ToolName = jsonObject[i].ToolName // 道具名
                property.Price =  jsonObject[i].Amount // 需要消耗的元宝
                property.FreeCount = 0 // 免费次数
                // property.HasUseCount = jsonObject[i].hasusecount // 已经使用的次数
                // property.UpCharmAmount = jsonObject[i].upcharmamount // 魅力值加减值
                property.Remark =  jsonObject[i].Remark // 备注

                vPropertyList.push(property);
            }

        }
        else{
            console.log("HallWebRequest.getProperty load xml data fail！");
            return;
        }

        self.m_vPropertyInfos = vPropertyList
        console.log(vPropertyList)
        if(self.m_vPropertyInfos.length > 0){
            self.dealPeroPertyInfo();
        }
    };

    require("HallWebRequest").getInstance().getProperty(onResponse)
}

PersonInfoPreView.dealPeroPertyInfo = function(){

    if(this.m_vPropertyInfos.length < 0){
        return;
    }

    var propertyListNode = this.node.getChildByName("property_list");
    var contentNode = propertyListNode.getChildByName("view").getChildByName("content");
    for(var i = 0; i < contentNode.childrenCount; i++){
        if(this.m_vPropertyInfos[i]){
            // var effectValue = this.m_vPropertyInfos[i].UpCharmAmount;
            // contentNode.children[i].getChildByName("charm_effect_value").getComponent(cc.Label).string = effectValue > 0 ? "+" + effectValue : effectValue;
            // var leftCount = this.m_vPropertyInfos[i].FreeCount - this.m_vPropertyInfos[i].HasUseCount;
            // if(leftCount > 0){
            //     contentNode.children[i].getChildByName("property_consu_item").active = false;
            //     contentNode.children[i].getChildByName("property_price").getComponent(cc.Label).string = "免费" + leftCount + "/10";
            //     contentNode.children[i].getChildByName("property_price").color = new cc.Color(255, 255, 255);
            //     contentNode.children[i].getChildByName("property_price").anchorX = 0.5;
            //     contentNode.children[i].getChildByName("property_price").x = 0.5
            // }
            // else{
                contentNode.children[i].getChildByName("property_consu_item").active = true;
                contentNode.children[i].getChildByName("property_price").getComponent(cc.Label).string = this.m_vPropertyInfos[i].Price;
                contentNode.children[i].getChildByName("property_price").color = new cc.Color(230, 195, 41);
                contentNode.children[i].getChildByName("property_price").anchorX = 0;
                contentNode.children[i].getChildByName("property_price").x = 0
            // }
        }
        else{
            console.log("the property list data is Loss ");
            break;
        }
    }
}

//刷新道具界面
PersonInfoPreView.refreshProperty = function(){
    this.requestProperty();
}

//检查元宝是否足够
PersonInfoPreView.checkIsYuanBaoEnough = function(price){
    //如果是金豆场 则不需要考虑最小金额
    var GameSceneCanvas = cc.find("Canvas");
    var DeskScene = GameSceneCanvas.getComponent("DeskScene");
    var roomInfo = DeskScene.m_roomInfo;
    if(!roomInfo){
        return false;
    }

    var isEnoughMoney = false;

    var myGoldNum = require('GameLibSink').getInstance().getGameLib().getMyself().getGold();

    //表示元宝场
    if(roomInfo.cbRoomType == 2){
        if(myGoldNum > price + roomInfo.nMinRoomGold)
            isEnoughMoney = true;  
    }
    else{
        if(myGoldNum >= price)
            isEnoughMoney = true;  
    }

    return isEnoughMoney;
}

//刷新魅力值
PersonInfoPreView.refreshCharm = function(propertyID, charmNum){

    var IndexID = propertyID % 10 - 1;
    var toolID = Number(this.m_vPropertyInfos[IndexID].ToolID);
    var freeCount = Number(this.m_vPropertyInfos[IndexID].FreeCount);
    // var hasUseCount = Number(this.m_vPropertyInfos[IndexID].HasUseCount);
    var price = Number(this.m_vPropertyInfos[IndexID].Price);
    // var UpCharmAmount = Number(this.m_vPropertyInfos[IndexID].UpCharmAmount);
    // hasUseCount += 1;
    // this.m_vPropertyInfos[IndexID].HasUseCount = hasUseCount;
    // var leftCount = freeCount - hasUseCount;

    var propertyListNode = this.node.getChildByName("property_list");
    var contentNode = propertyListNode.getChildByName("view").getChildByName("content");

    // if(leftCount <= 0){
        contentNode.children[IndexID].getChildByName("property_consu_item").active = true;
        contentNode.children[IndexID].getChildByName("property_price").getComponent(cc.Label).string = this.m_vPropertyInfos[i].Price;
        contentNode.children[IndexID].getChildByName("property_price").color = new cc.Color(230, 195, 41);
        contentNode.children[IndexID].getChildByName("property_price").anchorX = 0;
        contentNode.children[IndexID].getChildByName("property_price").x = 0
    // }
    // else{
    //     contentNode.children[IndexID].getChildByName("property_consu_item").active = false;
    //     contentNode.children[IndexID].getChildByName("property_price").getComponent(cc.Label).string = "免费" + leftCount + "/10";
    //     contentNode.children[IndexID].getChildByName("property_price").color = new cc.Color(255, 255, 255);
    //     contentNode.children[IndexID].getChildByName("property_price").anchorX = 0.5;
    //     contentNode.children[IndexID].getChildByName("property_price").x = 0.5
    // }

    // var preCharmNum = Number(this.node.getChildByName("charmValue").getComponent(cc.Label).string);
    // preCharmNum += charmNum;
    // this.node.getChildByName("charmValue").getComponent(cc.Label).string = preCharmNum;
}

//刷新作弊拉黑按钮
PersonInfoPreView.refreshStateBtn = function(){
    this.requestIsBeReport();
}

PersonInfoPreView.addSendGiftTime = function(){
    var self = this;
    var callback = function(){

        self.m_leftTime -= 1;

        if(self.m_leftTime > 0){
            self.bolSend = false;
            TSCommon.performWithDelay(self, callback, 1);
        }
        else{
            self.bolSend = true;
            self.m_leftTime = 3;
        }
    }

    TSCommon.performWithDelay(this, callback, 1);
}

PersonInfoPreView.updateTime = function(){
    if (this.progressBar1.node.active){
        if (!this.bolSend)
        {   
            return;
        }
        if (!this.bolSend2)
        {   
            return;
        }
    }
    var self = this;
    self.bolSend2 = false;
    self.progressBar1.node.active = true;
    self.progressBar2.node.active = true;
    self.progressBar3.node.active = true;
    self.progressBar4.node.active = true;
    self.progressBar5.node.active = true;
    self.progressBar6.node.active = true;
    
    self.m_RightTime = 0;
    // self.progressBar.fillRange = 1;
    var callback = function () {
        if(!self.progressBar1)
            return;
        if (self.m_RightTime < 3) {
            self.progressBar1.fillRange =1- (self.m_RightTime)/3;
            self.progressBar2.fillRange =1- (self.m_RightTime)/3;
            self.progressBar3.fillRange =1- (self.m_RightTime)/3;
            self.progressBar4.fillRange =1- (self.m_RightTime)/3;
            self.progressBar5.fillRange =1- (self.m_RightTime)/3;
            self.progressBar6.fillRange =1- (self.m_RightTime)/3;
            self.bolSend2 = false;
            TSCommon.performWithDelay(self, callback, 0.05);
        }
        else {
            self.progressBar1.node.active = false;
            self.progressBar2.node.active = false;
            self.progressBar3.node.active = false;
            self.progressBar4.node.active = false;
            self.progressBar5.node.active = false;
            self.progressBar6.node.active = false;
            self.bolSend2 = true;
        }
        self.m_RightTime += 0.05;
    }

    callback();
}

PersonInfoPreView.requestIsBeReport = function(){
    var vBeReportList = new Array();
    var self = this;
    var onResponse = function(success, data){
        if(success){
            var XmlToJson = require('XmlToJson');           
            var xmlToJson = new  XmlToJson();       
            var jsonData = JSON.stringify(xmlToJson.parse(data));  
            var jsonObject = JSON.parse(jsonData);

            var root = jsonObject;

            var property = {};
            property.RetCode = root.retcode // 道具id
            property.JuBao = 0;
            property.LaHei = 0;
            if (property.RetCode == 1)
            {
                property.JuBao =  root.ischeat
                property.LaHei =  root.isblack
            }
            vBeReportList.push(property);
        }
        else{
            console.log("HallWebRequest.requestIsBeReport load xml data fail！");
            return;
        }

        self.m_vBeReportInfos = vBeReportList

    };

    require("HallWebRequest").getInstance().requestIsBeReport(this.m_pUserInfo.getUserDBID(),onResponse)
}

cc.Class(PersonInfoPreView);

module.exports = PersonInfoPreView;

