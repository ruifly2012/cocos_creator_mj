
import { TSCommon } from "../../TSCommon";

var GameCfg = require("GameCfg");
cc.Class({
    extends: cc.Component,

    properties: {
        listenFont: {
            default: null,
            type: cc.Font,
        },
        fanshuFont: {
            default: null,
            type: cc.Font,
        }
    },

    //监听将牌抬起的消息
    onLoad: function () {

        // var self = this;
        // cc.loader.loadRes("game/tips/listen_blue", cc.Atlas, function (error, font) {
        //     self.m_listenFont = font;

        //     this.reloadUI();
        // })
    },

    //听牌数据会发生变化的时间是 打出去了某一张 以及自己出牌时候 将牌给抬起的时候
    init: function (tingCardList, tingFan, tingLeft) {
        this.m_tingCardList = tingCardList || new Array();
        this.m_tingFan = tingFan;
        this.m_tingLeft = tingLeft;
        this.reloadUI();
    },

    onDestroy: function () {

    },

    setlaiziValue: function (laiziValue) {
        this.m_laiziValue = laiziValue;
    },

    reloadUI: function () {
        var startX = -414
        var startY = -192
        var distanceX = 70;
        var tingcardsNode = this.node.getChildByName("ting_cards");

        tingcardsNode.removeAllChildren();

        for (var i = 0; i < this.m_tingCardList.length; i++) {
            var mjNode = new cc.Node();
            mjNode.setScale(0.5);
            var sprite = mjNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").get_face_li_SpriteFrame("mj1", this.m_tingCardList[i]);

            mjNode.x = startX + i * distanceX;

            mjNode.y = startY;
            tingcardsNode.addChild(mjNode);

            if(this.m_tingLeft[i] == 0){
                mjNode.color = new cc.Color(137, 137, 137);
            }

            //如果这张牌是癞子 则加上癞子角标
            // if (this.m_tingCardList[i] == this.m_laiziValue) {
            //     var laiziNode = new cc.Node();

            //     var sprite = laiziNode.addComponent(cc.Sprite);
            //     sprite.spriteFrame = this.node.parent.getComponent("MjResourceMgr").m_mj_hh_li_laizi;

            //     laiziNode.x = 15.5;
            //     laiziNode.y = 18.5;
            //     mjNode.addChild(laiziNode);
            // }


            var zhangNode = new cc.Node();
            zhangNode.setAnchorPoint(cc.p(0.5, 0.5));

            var zhangLabel = zhangNode.addComponent(cc.Label);
            zhangLabel.font = this.listenFont;
            zhangLabel.string = this.m_tingLeft[i] + "张";

            zhangNode.x = mjNode.x;
            zhangNode.y = mjNode.y + 35;
            tingcardsNode.addChild(zhangNode);

            var zhangNode2 = new cc.Node();
            zhangNode2.setAnchorPoint(cc.p(0.5, 0.5));

            var fanshuLabel = zhangNode2.addComponent(cc.Label);
            fanshuLabel.font = this.fanshuFont;
            fanshuLabel.string = Math.pow(2,this.m_tingFan[i]) + "倍";

            zhangNode2.x = mjNode.x;
            zhangNode2.y = mjNode.y - 50;
            tingcardsNode.addChild(zhangNode2);
        }

        var bg2Node = this.node.getChildByName("bg_2");
        var width = 132 / 2 * this.m_tingCardList.length + (this.m_tingCardList.length + 1) * 6;
        bg2Node.setContentSize(cc.size(width, 109));

        var bg3Node = this.node.getChildByName("bg_3");
        bg3Node.x = bg2Node.x + bg2Node.getContentSize().width;
        bg3Node.y = bg2Node.y;
    },

});
