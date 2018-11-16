cc.Class({
    extends: cc.Component,

    properties: {
        playerName: {
            default: null,
            type: cc.Label
        },
        headIcon: {
            default: null,
            type: cc.Sprite
        },
        frameBg: {
            default: null,
            type: cc.Sprite
        },
        winCount: {
            default: null,
            type: cc.Label
        },
        loseCount: {
            default: null,
            type: cc.Label
        },
        bigWinPlayer: {
            default: null,
            type: cc.Sprite
        },
        poChan: {
            default: null,
            type: cc.Sprite
        },
        goldSp: {
            default: null,
            type: cc.Sprite
        },
        protected: {
            default: null,
            type: cc.Sprite
        },
        levelup: {
            default: null,
            type: cc.Sprite
        },
    },
    onLoad: function () {
    },


    initData:function(name,headUrl,finalScore,bolBigWinScore,index,myIndex,nPoChan,bolIsPrivateRoom,nSrcScore){
        var self = this;
        var pos = myIndex - index;
        this.goldSp.node.active = (!bolIsPrivateRoom);
        var posName = "【对家】"
        if (pos == 0)
        {
            posName = "【三家】"+name;
        }else if ((pos == -2)||(pos == 2))
        {
            posName = "【对家】"+name;
        }else if ((pos == -1)||(pos == 3))
        {
            posName = "【下家】"+name;
        }else if ((pos == -3)||(pos == 1))
        {
            posName = "【上家】"+name;
        }

        var frameData = "game/gameOver/loseFrame";
        if (index == myIndex)
        {
            frameData = "game/gameOver/myFrame"
        }
        //.初始化数据
        this.playerName.string = posName;  
        cc.loader.loadRes(frameData,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.frameBg.spriteFrame = spriteFrame;
            }
        });
        this.bigWinPlayer.node.active = bolBigWinScore;

        var showScore = 0
        if (bolIsPrivateRoom)
            showScore = nSrcScore
        else
            showScore = finalScore
        if (showScore > 0)
        {
            this.winCount.string = showScore;
            this.winCount.node.active = true;
            console.log("晋升之后，原始分数："+nSrcScore+"后来分数："+finalScore)
            if (bolIsPrivateRoom){
                if (finalScore < nSrcScore)
                    this.levelup.node.active = true;
            }
        }
        else{
            this.loseCount.string = showScore;
            this.loseCount.node.active = true;
            console.log("保分之后，原始分数："+nSrcScore+"后来分数："+finalScore)
            // if (!bolIsPrivateRoom){
                if (finalScore > nSrcScore)
                    this.protected.node.active = true;
            // }
        }
        
        var imgurl = headUrl;
        if(imgurl){
            cc.loader.load({ url: imgurl, type: "jpg" }, function (err, texture) {
                if(!err){
                    self.headIcon.spriteFrame = new cc.SpriteFrame(texture);                                       
                }                    
            });
        }
        if (nPoChan == 1)
        {
            this.poChan.node.active = true;
        }
    }
});
