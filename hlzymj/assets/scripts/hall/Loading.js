var Loading =  cc.Class({
    extends: cc.Component,

    properties: {
        point1: {
            default: null,
            type: cc.Node
        },
    },
    onLoad: function () {
        this.initUI();
    },

    initUI:function(){
        var effectNode = this.node.getChildByName("shadow_sp").getChildByName("guang_quan_sp");
        var rotate = cc.rotateBy(2, 360);
        var repeatForever = cc.repeatForever(rotate);
        effectNode.runAction(repeatForever);
    },

    showActive: function () {
        var self = this;
        self.time = 0;
        var func =  cc.callFunc(function () {
            self.time = self.time+1;
            if (self.time > 99){
                self.time = 99;
            }
            self.point1.getComponent("cc.Label").string = self.time+"%";
            console.log();
        });
        var delayTime = cc.delayTime(0.05);
        var sequence = cc.repeatForever(cc.sequence(func, delayTime));

        var repeatForever = cc.repeatForever(sequence);
        this.point1.runAction(repeatForever);
        
        // this.point2.active = true; 
        // this.point3.active = true; 
        // var delayTime2 = cc.delayTime(1);
        // var showPoint2 = cc.callFunc(function () {
        //    this.point2.active = true; 
        // }, this);
        // var delayTime = cc.delayTime(0.5);
        // var hidePoint2 = cc.callFunc(function () {
        //     this.point2.active = false; 
        //  }, this);
        // var sequence1 = cc.repeatForever(cc.sequence(delayTime,showPoint2, delayTime2, hidePoint2));
        // this.point2.runAction(sequence1);

        // var showPoint3 = cc.callFunc(function () {
        //     this.point3.active = true; 
        //  }, this);
         
        //  var hidePoint3 = cc.callFunc(function () {
        //      this.point3.active = false; 
        //   }, this);
        //  var sequence2 = cc.repeatForever(cc.sequence(delayTime2,showPoint3, delayTime, hidePoint3));
        //  this.point3.runAction(sequence2);
    },

});
module.exports = Loading;
