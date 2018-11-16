
var NowRankLevelItem = cc.Class({
    extends: cc.Component,

    properties: {
        star1: {
            default: null,
            type: cc.Sprite,
        },
        star2: {
            default: null,
            type: cc.Sprite,
        },
        star3: {
            default: null,
            type: cc.Sprite,
        },
        star4: {
            default: null,
            type: cc.Sprite,
        },
        star5: {
            default: null,
            type: cc.Sprite,
        },
        nextRankArrow: {
            default: null,
            type: cc.Sprite,
        },
        rankLevel: {
            default: null,
            type: cc.Sprite,
        },
        cupIcon: {
            default: null,
            type: cc.Sprite,
        },
        needScore: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },

    setArrowShow: function (bol) {
        this.nextRankArrow.node.active = bol;
    },

    initData:function(data,myScoreData,divisionID){
        var self = this;
        this.needScore.string =  this.formatGold(myScoreData.minScore) + "-" + this.formatGold(myScoreData.maxScore) + "分";
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup"+myScoreData.cup,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.cupIcon.spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+myScoreData.cup,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.cupIcon.spriteFrame = spriteFrame;
                    }
                });
            }
        });
        if (myScoreData.star > 4){this.star5.node.active = true;}
        if (myScoreData.star > 3){this.star4.node.active = true;}
        if (myScoreData.star > 2){this.star3.node.active = true;}
        if (myScoreData.star > 1){this.star2.node.active = true;}
        if (myScoreData.star > 0){this.star1.node.active = true;}
        cc.loader.loadRes("cupData/cup/rank_level_"+divisionID,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.rankLevel.spriteFrame = spriteFrame;
            }
        });
        
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

module.exports = NowRankLevelItem;