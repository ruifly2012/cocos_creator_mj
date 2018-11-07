
var RankGroupListItem = cc.Class({
    extends: cc.Component,

    properties: {
        rankLabel:{
            default:null,
            type:cc.Label,
        },
        nameLabel:{
            default:null,
            type:cc.Label,
        },
        countLabel:{
            default:null,
            type:cc.Label,
        },
        playIcon:{
            default:null,
            type:cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onInit:function(data){
        var self = this;
        self.rankLabel.string = data.rank;
        self.nameLabel.string = this.cutString(data.nickname,100,24,self.nameLabel.node);
        self.countLabel.string = data.playScore;

        if(data.avatarUrl){
            var imgurl=data.avatarUrl+"?aaa=aa.jpg";
            cc.loader.load(imgurl, function(err, texture){
                self.playIcon.spriteFrame = new cc.SpriteFrame(texture);
                // self.playIcon.node.setScale(0.53);
            
            });
        }
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
});

module.exports = RankGroupListItem;