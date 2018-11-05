
var inviteFriendItem = cc.Class({
    extends: cc.Component,

    properties: {
        inviteFriendBtn: {
            default: null,
            type: cc.Button,
        },
        inviteFriendIconBtn: {
            default: null,
            type: cc.Button,
        },
        inviteFriendSp: {
            default: null,
            type: cc.Sprite,
        },
        inviteSuccessGold:{
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.inviteFriendBtn.node.on('click', this.callback, this);
    },

    callback:function()
    {
        this.callbackFunc();
    },
    initData:function(data)
    {
        var self = this;
        if (data.imgurl)
        {
            self.inviteFriendIconBtn.node.active = true;
            // cc.loader.load(data.imgurl, function(err, texture){
            //     self.inviteFriendIconBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            // });
            cc.loader.load(data.imgurl, function(err, texture){
                self.inviteFriendSp.spriteFrame = new cc.SpriteFrame(texture);
            });
            
        }
        else{
            self.callbackFunc = data.callbackFunc;
        }
        self.inviteSuccessGold.string = data.gold+"金币";
    },

    start: function () {

    },
    // update (dt) {},
});

module.exports = inviteFriendItem;