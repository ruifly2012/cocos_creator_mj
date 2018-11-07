
var RankExtendedListItem = cc.Class({
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
        playName:{
            default: null,
            type: cc.Label,
        },
        playScore:{
            default: null,
            type: cc.Label,
        },
        playCount:{
            default: null,
            type: cc.Label,
        },
        playLabelRank:{
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    cutString:function(str, maxWidth, fontSize, parent){
        var splitStr = str.split("")
        var node = new cc.Node();
        parent.addChild(node)
    
        var label = node.addComponent(cc.Label);
        label.fontSize = fontSize;
        label.string = "...";
        var lastStrWidth = node.width;       //最后三个...号的宽度
        var i = 0;
        var isOverMaxWidth = false;          //是否超过了最大超度
        var countLength = 0;
        var resultStr = "";
        while(i < splitStr.length && !isOverMaxWidth){
            label.string = splitStr[i];
            if(lastStrWidth + countLength + node.width < maxWidth){
                countLength += node.width
                resultStr += splitStr[i]; 
            }
            else{
                isOverMaxWidth = true;
            }
            i += 1;
        }
        if(isOverMaxWidth){
            resultStr += "..." 
        }
    
        node.destroy();
        return resultStr;
    },

    initView:function(data){
        var self = this;
        self.playName.string = this.cutString(data.nickname,100,24,self.playName.node);
        self.playCount.string = "胜局数："+data.playScore;
        if(data.rank <= 3)
        {
            cc.loader.loadRes("texture/rank/place_"+data.rank,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {   
                    self.rankIcon.spriteFrame = spriteFrame;
                }
            });
        }
        else{
            self.rankIcon.node.active = false;
            self.playLabelRank.node.active = true;
            self.playLabelRank.string = data.rank;
        }
        if(data.avatarUrl){
            var imgurl=data.avatarUrl+"?aaa=aa.jpg";
            cc.loader.load(imgurl, function(err, texture){
                self.playIcon.spriteFrame = new cc.SpriteFrame(texture);
                // self.playIcon.node.setScale(0.53);
            
            });
        }
    },

});

module.exports = RankExtendedListItem;