
var LoadingUI= cc.Class({
    extends: cc.Component,
    ctor:function()
    {   
        this._RUN_TIMER = 15;
    },
    properties: {
        _loadSp:{
            default:null,
            type:cc.Sprite,
        },
    },

    onLoad:function(){

        var winSize = cc.director.getWinSize();
        var self = this ;
        this.node.width = winSize.width;
        this.node.height = winSize.height;
        this.node.x = winSize.width/2;
        this.node.y = winSize.height/2;
        self.node.addComponent(cc.BlockInputEvents);

        var nodeSp = new cc.Node('nodeSp');
        this.node.addChild(nodeSp);

        this._loadSp = nodeSp.addComponent(cc.Sprite);
        this._loadSp.spriteFrame = null;
        this._loadSp.node.setPosition(0,0);
        
        var rotateTo = cc.rotateTo(2, -720);
        this._loadSp.node.runAction(cc.repeatForever(rotateTo));

        cc.loader.loadRes('hallRes/hall_NetIcon',cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {
                self._loadSp.spriteFrame = spriteFrame;
            }
        });

        this.schedule(function(){
            this.node.destroy();
        }, 0,0, this._RUN_TIMER);
    },

    start:function(){
    },

    update:function(dt){
    },

    onDestroy:function()
    {
        
    },
});

cc.LoadingUI= module.exports = LoadingUI;