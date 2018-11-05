cc.Class({
    extends: cc.Component,

    properties: {
        getCount: {
            default: null,
            type: cc.Label
        },
        getIcon: {
            default: null,
            type: cc.Sprite
        },
        needIcon: {
            default: null,
            type: cc.Sprite
        },
        needCount: {
            default: null,
            type: cc.Label
        },
        bgBtn: {
            default: null,
            type: cc.Button
        },
    },
    onLoad: function () {
        this.bgBtn.node.on('click', this.btnClickFunc, this);
    },

    // update (dt) {},
    btnClickFunc:function()
    {
        var self = this;
        self.clickFunc(self.needCount.string,self.getCount.string,self.wxRmb);
    },

    initView:function(data){
        var self = this;
        //.初始化数据
        this.getCount.string = data.count;  
        this.needCount.string = data.need;
        this.clickFunc = data.clickFunc;
        this.wxRmb = data.wxRmb
        cc.loader.loadRes(data.getIcon,cc.SpriteFrame,function(err,spriteFrame){
            if(!err)
            {   
                self.getIcon.spriteFrame = spriteFrame;
            }
        });

        if(data.needIcon == "")
        {
            self.needIcon.node.active = false;
            this.needCount.string = "¥ "+this.needCount.string;
        }
        else
        {
            cc.loader.loadRes(data.needIcon,cc.SpriteFrame,function(err,spriteFrame){
                if(!err)
                {
                    self.needIcon.spriteFrame = spriteFrame;
                }
            });
        }
        
    }
});
