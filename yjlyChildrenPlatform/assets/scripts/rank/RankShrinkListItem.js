
var RankShrinkListItem = cc.Class({
    extends: cc.Component,

    properties: {
        rankIcon:{
            default:null,
            type:cc.Sprite,
        },
        playIcon:{
            default:null,
            type:cc.Sprite,
        },
        playRankLabel:{
            default:null,
            type:cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onInit:function(data){
        var self = this;
        self.playRankLabel.string = data.rank;
        if(data.rank <= 3)
        {
            cc.loader.loadRes("texture/rank/rankIcon"+data.rank,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.rankIcon.spriteFrame = spriteFrame;
                }
            });
            self.rankIcon.node.active = true;
            self.playRankLabel.node.active = false;
        }
        else{
            self.rankIcon.node.active = false;
            self.playRankLabel.node.active = true;
        }
        if(data.avatarUrl){
            var imgurl=data.avatarUrl+"?aaa=aa.jpg";
            cc.loader.load(imgurl, function(err, texture){
                self.playIcon.spriteFrame = new cc.SpriteFrame(texture);
                // self.playIcon.node.setScale(0.68);
            
            });
        }
    },

});

module.exports = RankShrinkListItem;