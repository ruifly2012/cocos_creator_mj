var GameDefs = require("GameDefs");
cc.Class({
    extends: cc.Component,

    properties: {
        huName: {
            default: null,
            type: cc.Label
        },
        hformDirection: {
            default: null,
            type: cc.Label
        },
        beishu: {
            default: null,
            type: cc.Label
        },
        huScore: {
            default: null,
            type: cc.Label
        },
    },
    onLoad: function () {
    },

    getDirectionName(a,b)
    {
        var pos = a - b;
        var showWinDir = "对家"
        if ((pos == -2)||(pos == 2))
        {
            showWinDir = "对家";
        }else if ((pos == -1)||(pos == 3))
        {
            showWinDir = "下家";
        }else if ((pos == -3)||(pos == 1))
        {
            showWinDir = "上家";
        }
        return showWinDir
    },

    initData:function(stSinleScore,myChair){
        
        this.beishu.string = Math.pow(2,stSinleScore.cbFan) +"倍";
        //查花猪和查大叫不显示倍数
        if (stSinleScore.cbScoreType == 6 || stSinleScore.cbScoreType == 5)
            this.beishu.string = ""
        if (stSinleScore.nScore > 0)
            this.huScore.string = "+" + stSinleScore.nScore;
        else
        this.huScore.string = stSinleScore.nScore;
            
        var strType =  GameDefs.SCORE_TYPE_STRING[stSinleScore.cbScoreType];
        if (myChair == stSinleScore.cbFangpaoChair && stSinleScore.nScore < 0)
            strType = GameDefs.OTHER_SCORE_TYPE_STRING[stSinleScore.cbScoreType];

        //记录赢家是哪一家，或者放炮给我的是哪一家，自己自摸和暗杠续杠就不记录(因为赢的是三家的)
        var showWinDir = "";
        if (myChair == stSinleScore.cbWinChair){
            if (stSinleScore.cbScoreType == 1||stSinleScore.cbScoreType == 2||stSinleScore.cbScoreType == 4){
                showWinDir = "三家"
            }else{
                showWinDir = this.getDirectionName(stSinleScore.cbFangpaoChair,stSinleScore.cbWinChair);
            }
        }
        if (myChair == stSinleScore.cbFangpaoChair && myChair != stSinleScore.cbWinChair)
        {
            showWinDir = this.getDirectionName(stSinleScore.cbFangpaoChair,stSinleScore.cbWinChair);
        }

        //------------------------------------------------------------------------------
        //暗杠看不到cbFangpaoChair，查大叫和查花猪看不到cbWinChair，这三个单独处理
        if(stSinleScore.cbScoreType == 2)
        {
            if (stSinleScore.nScore > 0)
            {
                showWinDir = "三家";
            }else{
                showWinDir = this.getDirectionName(myChair,stSinleScore.cbWinChair);
                strType = GameDefs.OTHER_SCORE_TYPE_STRING[stSinleScore.cbScoreType];
            }
        }
        else if(stSinleScore.cbScoreType == 5 || stSinleScore.cbScoreType == 6)
        {
            if (stSinleScore.nScore < 0)
            {
                showWinDir = "三家";
            }else{
                showWinDir = this.getDirectionName(stSinleScore.cbFangpaoChair,myChair);
            }
        }
        
        this.hformDirection.string = showWinDir;
        var  huMsg = "";
        if(stSinleScore.cbHuTypeCount > 0)
        {
            huMsg = "(";
            for (var i = 0; i < stSinleScore.cbHuTypeCount;i++)
            {
                if (stSinleScore.cbHuType[i] != 23 && stSinleScore.cbHuType[i]!=24) {
                    if (i > 0)
                        huMsg = huMsg + ",";
                    huMsg = huMsg + GameDefs.HUTYPE_STRING[stSinleScore.cbHuType[i] - 1];
                }
            }
            if (stSinleScore.cbGen > 0)
                huMsg = huMsg + "," + stSinleScore.cbGen + "根";
            huMsg = huMsg + ")";
        }

        this.huName.string = strType + huMsg;
    }
});
