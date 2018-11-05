
var ToastUI= cc.Class({
    extends: cc.Component,
    ctor:function()
    {   
        this._RUN_TIMER = 2;
        this._contentLabelWidth = 0;
        this._contentLabelHeight = 0;

        this.LABEL_MAX_WIDTH = 300;
        this.strMsg = "";
    },
    properties: {
        _fillSp:{
            default:null,
            type:cc.Sprite,
        },
        _contentLabel:{
            default:null,
            type:cc.Label,
        },
    },

    onLoad:function(){

        var winSize = cc.director.getWinSize();
        var self = this ;

        var nodeSp = new cc.Node('nodeSp');
        this.node.addChild(nodeSp);
        this._fillSp = nodeSp.addComponent(cc.Sprite);
        this._fillSp.type = cc.Sprite.Type.SLICED;
        this._fillSp.node.setPosition(winSize.width/2, winSize.height/2);

        var nodeContentLabel = new cc.Node('nodeContentLabel');
        this.nodeContentLabel = nodeContentLabel;
        this._contentLabel = nodeContentLabel.addComponent(cc.Label);
        nodeSp.addChild(nodeContentLabel);
        this._contentLabel.string = this.strMsg;
        self._fillSp.node.setOpacity(0);
        cc.loader.loadRes('hallRes/toast',cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {
                self._fillSp.spriteFrame = spriteFrame;
                self.setFillSlice();
            }
        });

        self._fillSp.node.runAction(cc.fadeIn(0.5));

        this.schedule(function(){
            this.node.destroy();
        }, 0,0, this._RUN_TIMER);
    },

    setMsg:function(strMsg)
    {
        this.strMsg = strMsg;
        if(this._contentLabel)
        {
            this._contentLabel.string = this.strMsg;
            this.setFillSlice();
        }
    },

    calContentLabelSize:function()
    {
        if(this._contentLabel)
        {
            this._contentLabelWidth = this._contentLabel.node.width;
            this._contentLabelHeight = this._contentLabel.node.height;
        }
    },

    setFillSlice:function()
    {
        this.calContentLabelSize();
        if(this._fillSp)
        {
            this._fillSp.node.width = this._contentLabelWidth;
        }
    },

    start:function(){
    },

    update:function(dt){
    },

    onDestroy:function()
    {
        
    },
});

cc.ToastUI= module.exports = ToastUI;