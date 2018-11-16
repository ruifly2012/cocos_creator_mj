
var OtherRankLevelItem = cc.Class({
    extends: cc.Component,

    properties: {
        nextRankArrow: {
            default: null,
            type: cc.Sprite,
        },
        rankName: {
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
        rewardLabel: {
            default: null,
            type: cc.Label,
        },
        rewardDiamond: {
            default: null,
            type: cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    },

    setArrowShow: function (bol) {
        this.nextRankArrow.node.active = bol;
    },

    initData:function(data){
        var self = this;
        this.rewardLabel.string = "x " + data.diamond;
        this.needScore.string = this.formatGold(data.minScore) + "-" + this.formatGold(data.maxScore) + "分";
        cc.loader.loadRes("texture/hallRes/qualifyingCup/cup"+data.cupId,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.cupIcon.spriteFrame = spriteFrame;
            }
            else{
                cc.loader.loadRes("cupData/cup"+data.cupId,cc.SpriteFrame,function(err,spriteFrame){
                    if(!err)
                    {   
                        self.cupIcon.spriteFrame = spriteFrame;
                    }
                });
            }
        });
        cc.loader.loadRes("cupData/cup/rank_name_"+data.cupId,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.rankName.spriteFrame = spriteFrame;
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

module.exports = OtherRankLevelItem;