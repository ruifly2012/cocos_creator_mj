
var MoreGameLayer = cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onTouch: function (event) {
        var poisition = event.touch.getLocation();
        var locationInNode = this.bg.convertToNodeSpace(poisition);
        var s = this.bg.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            // this.node.active = true;
        }
        else {
            this.node.active = false;
        }
    },
    initData: function (data) {
        var self = this;
        cc.loader.load(data, function(err, texture){
            self.bg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            var scale = (texture.height / 720)
            self.bg.getComponent(cc.Sprite).node.height = (texture.height > 720)?720:texture.height;
            self.bg.getComponent(cc.Sprite).node.width = texture.width*scale;
        });

    },
});

module.exports = MoreGameLayer;