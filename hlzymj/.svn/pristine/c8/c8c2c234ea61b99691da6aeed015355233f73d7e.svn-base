// 监听大厅播放点击特效
cc.Class({
    extends: cc.Component,
    isPlay: false,

    properties: {
        clickAct:{
            default: null,
            type: cc.Node,
        },
    },

    onLoad () {
        this.isPlay = true;
        // 监听界面
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        // 停止点击事件吞噬
        this.node._touchListener.setSwallowTouches(false);
        if(require("HallUtils").isIPhoneX())
        {   
            var windowSize = cc.view.getVisibleSize();
            this.node.width = windowSize.width;
            this.node.height = windowSize.height;
        }
    },

    start () {
        this.dragonDisplay = this.clickAct.getComponent(dragonBones.ArmatureDisplay);
    },

    callback: function(){
        this.dragonDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.callback, this);
        this.isPlay = false;
        this.clickAct.active = false;
    },

    playerAct: function(touch,actName){
        // 动画播放完毕没有，如果没有播放完，就不要再播放了
        if (this.isPlay == true){
            this.callback();
        }        
        this.clickAct.active = true;
        this.clickAct.x = touch.x;
        this.clickAct.y = touch.y;
        // 播放一次动画
        this.dragonDisplay.playAnimation(actName , 1);
        // 监听
        this.dragonDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.callback, this);
        // 动画播放中
        this.isPlay = true;
    },

    onTouch: function (event) {
        // 获得点击位置
        var poisition = event.touch.getLocation();
        // 获取1-3的随机数
        var randomNumer = Math.ceil(Math.random()*3);
        // 播放动画
        this.playerAct(poisition , "piao" + randomNumer);
    },
});
