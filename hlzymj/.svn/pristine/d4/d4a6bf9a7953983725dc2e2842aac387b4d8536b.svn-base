
var GameLibSink = require("GameLibSink");

import { gamelibcommon } from "../../gamelib/gamelibcommon";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },

        face_icon: {
            default: null,
            type: cc.Node,
        },

        sex: {
            default: null,
            type: cc.Node,
        },

        name_label: {
            default: null,
            type: cc.Node,
        },

        id_label: {
            default: null,
            type: cc.Node,
        },

        ip_label: {
            default: null,
            type: cc.Node,
        },

        diamond_label: {
            default: null,
            type: cc.Label,
        },
        gold_label: {
            default: null,
            type: cc.Label,
        },

        gold_node: {
            default: null,
            type: cc.Node,
        },

        local_info_label: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);

        this.local_info_label.active = false;
    },

    setGold:function(gold)
    {
        // this.diamond_label.string = diamond;
        this.gold_label.string = gold;
        // this.gold_node.active = !isPrivateRoom;
    },

    onTouch: function (event) {

        var point = event.touch.getLocation();

        var convertPoint = this.bg.convertToNodeSpace(point);

        var size = this.bg.getContentSize();

        var rect = cc.rect(0, 0, size.width, size.height);

        if (!cc.rectContainsPoint(rect, convertPoint)) {
            this.node.active = false;
        }
    },

    onDestroy: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    init: function (playerInfo) {
        this.m_playerInfo = playerInfo;
        this.setUserInfo()
    },

    //设置用户信息
    setUserInfo: function () {

        var userSex = this.m_playerInfo.getSex();

        var name = this.m_playerInfo.getUserName();

        var userID = this.m_playerInfo.getUserDBID();

        var ip = this.m_playerInfo.getLocation();

        var imgurl = this.m_playerInfo.imgurl;

        var self = this;
        if(imgurl){
            cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                self.face_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                //self.face_icon.setScale(0.45);
    
            });
        }
        
        var sexFame;
        //表示是男的
        if (userSex == gamelibcommon.SX_BOY) {
            cc.loader.loadRes("game/player/male", cc.SpriteFrame, function(err, spriteFrame){
                self.sex.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            })
        }
        else {
            cc.loader.loadRes("game/player/female", cc.SpriteFrame, function(err, spriteFrame){
                self.sex.getComponent(cc.Sprite).spriteFrame = spriteFrame; 
            })
        }

        if (sexFame) {
            this.sex.getComponent(cc.Sprite).spriteFrame = sexFame;
        }

        this.name_label.getComponent(cc.Label).string = name;

        this.id_label.getComponent(cc.Label).string = userID;

        this.ip_label.getComponent(cc.Label).string = ip;
    },
});
