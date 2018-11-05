
var CCButton = cc.Class({
    extends: cc.Component,
    nodeButton:null,
    _callBack:null,
    _normalUrl:null,
    _pressUrl:null,
    _bIsMove:false,
    objectData:null,
    ctor:function()
    {   
    },
    properties: {
        buttonLabel:{
            default:null,
            type:cc.Label,
        },
        normalSprite:{
            default:null,
            type:cc.Sprite,
        },
        pressSprite:{
            default:null,
            type:cc.Sprite,
        },
        disSprite:{
            default:null,
            type:cc.Sprite,
        },
    },
    onLoad:function(){

        this.nodeButton = new cc.Node('nodeButton');
        this.node.addChild(this.nodeButton);

        this.normalSprite = this.nodeButton.addComponent('cc.Sprite');
        this.normalSprite.spriteFrame = null;

        var nodePressSp = new cc.Node('nodePressSp');
        this.pressSprite = nodePressSp.addComponent('cc.Sprite');
        this.pressSprite.spriteFrame = null;
        this.nodeButton.addChild(nodePressSp);

        var nodeLabel = new cc.Node('nodeLabel');
        this.buttonLabel = nodeLabel.addComponent('cc.Label');
        this.buttonLabel.string="Button";
        this.buttonLabel.enabled = false;
        this.nodeButton.addChild(nodeLabel);

        this.addTouchEvent();
        
     },

    addTouchEvent:function()
    {   
        var self = this;
        this.nodeButton.on(cc.Node.EventType.TOUCH_START, function (touch,event) {
        }, this);

        this.nodeButton.on(cc.Node.EventType.TOUCH_MOVE, function(touch ,event) {
            self._bIsMove = true;
        }, this);

        this.nodeButton.on(cc.Node.EventType.TOUCH_END, function(touch,event) {
            var poistion = touch.getLocation();
            var locationInNode = this.nodeButton.convertToNodeSpace(poistion);    
            var s = this.nodeButton.getBoundingBox();
            var rect = cc.rect(0, 0, s.width, s.height);

            // this is a temp api which will be combined to cc.Node
            if (cc.rectContainsPoint(rect, locationInNode)) {
                var scaleAction = cc.scaleTo(0.05, 1.1, 1.1);
                var scaleActionBack = cc.scaleTo(0.05, 1, 1);
                var seqAction = cc.sequence(scaleAction,scaleActionBack,cc.callFunc(function(){
                   
                }));
                this.nodeButton.runAction(seqAction);
                if(self._callBack)
                {
                    self._callBack(self);
                }
            }
            
        }, this);
        
        this.nodeButton.on(cc.Node.EventType.TOUCH_CANCEL, function(touch,event) {
           
        }, this);
    },

    start:function(){
    },

    update:function(dt){
    },

    onDestroy:function()
    {
    },
    setBtnCallBack:function(onBtnCallBack)
    {
        this._callBack = onBtnCallBack;
    },

    setPosition:function(x,y)
    {
       this.nodeButton.setPosition(cc.p(x,y));

    },

    //设置按钮上的文字
    setBtnLabelStr:function(str)
    {
        this.buttonLabel.string = str;
        this.buttonLabel.enabled = true;
    },

    setObjectData:function(objectData)
    {
        this.objectData = objectData;
    },

    getObjectData:function()
    {
        return this.objectData;
    },


    //normalUrl 正常显示图片url、 按下pressUrl 回调onClickCallBack
    setCCButton:function(normalUrl,pressUrl,onClickCallBack)
    {
        this._normalUrl = normalUrl;
        this._pressUrl = pressUrl;
        this._callBack = onClickCallBack;
        var self = this;
        cc.loader.loadRes(normalUrl, cc.SpriteFrame,function (error, spriteframe)
        {
            if (!error) {
                self.normalSprite.spriteFrame = spriteframe;
            }
        });
    },

});
cc.CCButton = module.exports = CCButton;