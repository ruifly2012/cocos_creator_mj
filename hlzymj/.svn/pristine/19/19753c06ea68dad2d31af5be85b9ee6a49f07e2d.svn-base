
var Dialog = cc.Class({
    extends: cc.Component,
    _suerBtnCallBack:null,
    _cancelBtnCallBack:null,
    properties: {
        contentLabel:{
            default:null,
            type:cc.Label,
        },
        suerBtn:{
            default:null,
            type:cc.Button,
        },
        cancelBtn:{
            default:null,
            type:cc.Button,
        },
    },
    onLoad:function(){
     },

    start:function(){
        
    },

    update:function(dt){

    },

    onDestroy:function()
    {
    },

    //点击确定按钮事件
    clickSuerBtn:function(event)
    {
        if(this._suerBtnCallBack!=null)
        {
            this._suerBtnCallBack();
        }
        this.node.removeFromParent(true);
        this.destroy();
    },

    //点击取消按钮事件
    clickCancelBtn:function(event)
    {
        if(this._cancelBtnCallBack!=null)
        {
            this._cancelBtnCallBack();
        }
       this.node.removeFromParent(true);
       this.destroy();
    },

    setSuerBtnCallBack:function(onSuerBtnCallBack)
    {
        this._suerBtnCallBack = onSuerBtnCallBack;
    },

    setSuerBtnCallBack:function(onCancelBtnCallBack)
    {
        this._cancelBtnCallBack = onCancelBtnCallBack;
    },

    //设置内容
    setContentLabelStr:function(strContent)
    {
        this.contentLabel.string = strContent;
    },

});