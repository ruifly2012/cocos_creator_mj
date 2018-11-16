
var NewSeasonRankItem = cc.Class({
    extends: cc.Component,

    properties: {
        cupIcon: {
            default: null,
            type: cc.Sprite,
        },
        cupName: {
            default: null,
            type: cc.Label,
        },
        cupMessage: {
            default: null,
            type: cc.Label,
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },

    initData:function(cupLv){
        var HallResources = require("HallResources");
        var self = this;
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup"+(cupLv + 1),cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.cupIcon.spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+(cupLv + 1),cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.cupIcon.spriteFrame = spriteFrame;
                    }
                });
            }
        });
        var strMsg = ""
        if (cupLv == 0)
            strMsg = "麻将初学者，懂基础规则，知道麻将大致怎么玩。"
        else if (cupLv == 1)
            strMsg = "普通大众的麻将水平，业余玩家C级，对牌型有一定的认识。知道怎么胡牌。"
        else if (cupLv == 2)
            strMsg = "领先50%业余玩家的水平，为业余玩家B即，会有技巧性地胡牌。"
        else if (cupLv == 3)
            strMsg = "业余玩家A级水平，打牌有章法。懂得如何选择听牌，放铳少，能做到下风期少输，上风期多赢。"
        else if (cupLv == 4)
            strMsg = "地区性冠军选手，技术领先95%的麻将玩家，牌桌上的常胜将军，极少放铳，也会有效地阻断其他玩家听牌、胡牌，乃真正意义上的麻将大师。"
        else if (cupLv == 5)
            strMsg = "职业选手，超一流的特级大师，世界冠军竞争者，技术炉火纯青，出牌毫无破绽，通常还会有一些主角光环以及难以置信的运气。"
        this.cupMessage.string = strMsg;

        var strName = ""
        var rankData = HallResources.getInstance().getDivisionData();
        strName = strName  + rankData[cupLv].rankName + "(" + this.formatGold(rankData[cupLv].minScore) + "-" + this.formatGold(rankData[cupLv].maxScore) + ")";
        this.cupName.string = strName;
    },

    //格式化数字
    formatGold:function(gold, remaindot){
        if(Math.abs(gold) < 100000){
            return gold;
        }
    
        if(Math.abs(gold) >= 100000 && Math.abs(gold) < 100000000){
            if(remaindot){
                var leftNum = gold % 10000;
                if(leftNum == 0){
                    var retGold = Math.floor(gold / 10000) + "万";
                    return retGold;
                }
                else{
                    gold = gold / 10000
                    var retGold = Math.floor(gold*10)/10 + "万";
                    return retGold;
                }
            }
            else{
                gold = gold / 10000
                var retGold = Math.floor(gold*10)/10 + "万";
                return retGold;
            }
        }
        else if(Math.abs(gold) >= 100000000 && Math.abs(gold) <= 2000000000){
            if(remaindot){
                var leftNum = gold % 100000000;
                if(leftNum == 0){
                    var retGold = Math.floor(gold / 100000000) + "亿";
                    return retGold;
                }
                else{
                    gold = gold / 100000000
                    var retGold = Math.floor(gold*10)/10 + "万";
                    return retGold;
                }
            }
            else{
                gold = gold / 100000000
                var retGold = Math.floor(gold*10)/10 + "万";
                return retGold;
            }
        }
    
        if(Math.abs(gold) <= 100000000000){
            var retGold = Math.floor(gold / 100000000) + "亿";
        }
    
        if(remaindot){
            return "无限";
        }
    },
});

module.exports = NewSeasonRankItem;