var GameInfo = cc.Class({
    ctor: function () {
        this.m_iId = 0;    //游戏ID
        this.m_sCn = "";  //游戏中文名字
        this.m_sEn = "";   //游戏英文名字
        this.m_iIv = 0;    //Icon版本
        this.m_sServeIp = "";  //游戏服务器IP
        this.m_iPort = 0;      //游戏端口
        this.m_sVersion = "1.0.1";  //游戏版本
        this.m_sDir = "";     //游戏下载路径
        this.m_sWr = "";
    },
})
cc.GameInfo = module.exprots = GameInfo