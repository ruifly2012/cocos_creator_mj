// 原生管理类
var NativeManager = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {

    },

    copyToClipBoard: function(str) {
        if(str != null){
            if(this.isWeChatPlatform()){ // 只支持微信小游戏登陆后
                wx.setClipboardData({
                    data: str,
                    success: function(res) {
                        wx.getClipboardData({
                            success: function(res) {
                                console.log("复制成功：", res.data);
                            }
                        });
                    }
                });
            }else{  // 只支持网页
                var save = function (e) {
                    e.clipboardData.setData('text/plain', str);
                    e.preventDefault();
                    console.log("复制成功：", str);
                }
                document.addEventListener('copy', save);
                document.execCommand('copy');
                document.removeEventListener('copy', save);
            }
            return true;
        }else{
            return false;
        }
    },

    //判断微信小游戏登录
    isWeChatPlatform:function()
    {
        var ret = false;
        if(cc.sys.browserType == "mqqbrowser" || "wechatgame" == cc.sys.browserType){
            ret = true;
        }
        return ret;
    },
    
});

NativeManager.getInstance = function () {
    if (NativeManager.instance == null) {
        NativeManager.instance = new NativeManager();
    }
    return NativeManager.instance;
};

module.exports = NativeManager;
