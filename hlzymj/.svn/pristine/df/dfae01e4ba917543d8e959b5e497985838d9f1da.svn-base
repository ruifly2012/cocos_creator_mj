
var GameCfg = {

}

GameCfg.GAME_PLAYER = 4 

GameCfg.EffectList = {
    No_1pen: "No_1pen",  //(碰)
    No_2chi: "No_2chi",  //(吃)
    No_2gang: "No_2gang",    //(杠)
    No_2hu: "No_2hu",    //3(胡)
    No_2he: "No_2he",    //(和)
    No_2CouZhuang: "No_2CouZhuang",  //(臭庄)
    No_2LiuJu: "No_2LiuJu",  //(流局)
    No_2TianHu: "No_2TianHu",    //(天和)
    No_2TianHe: "No_2TianHe",    //(天胡)
    No_2FanPao: "No_2FanPao",    //(放炮)
    No_2QianGan: "No_2QianGan",  //(抢杠)
    No_2QianJin: "No_2QianJin",  //(抢金)
    No_2SanYou: "No_2SanYou",    //(三游)
    No_2SanSa: "No_2SanSa",  //(三杀)
    No_2SuanYou: "No_2SuanYou",  //(双游)
    No_2YouJin: "No_2YouJin",    //(游金)
    No_2ZiMo: "No_2ZiMo",    //(自摸)
    No_2SanJinDao: "No_2SanJinDao",  //(三金倒)
    No_1zhong: "No_1zhong",     //(红中杠)
    No_1lai: "No_1lai",     //(癞子杠)
    No_2laiyou: "No_2laiyou",   //(濑油)
    No_1tin: "No_1tin", //(听)
    No_1liang: "No_1liang", //(亮)
    No_2caotian: "No_2caotian", //(朝天)
    No_2ChaDaJiao:"No_2ChaDaJiao",//(查大叫)
    No_2ChaHuaZhu:"No_2ChaHuaZhu",//(查花猪)
    NULL: 25
}

GameCfg.Pub_IsValidChair = function(cbChair){
    var ret = false;
    if(cbChair < GameCfg.GAME_PLAYER)
        ret = true;

    return ret;
}

//获取花色
GameCfg.getMjColor = function(nValue){
    if (nValue >= 0) {
        return Math.floor(nValue/9);
    }
    return -1;
}

GameCfg.getStyleBySort = function(nCardValue,nStyle){
    if (GameCfg.getMjColor(nCardValue) == nStyle){
        return nCardValue + 100;
    }
    return nCardValue
}


GameCfg.GAME_RESTART = "game_restart";      //游戏重新开始
GameCfg.sendChatEnd = "SEND_CHAT_END";  //发送快捷聊天
GameCfg.changeDeskBg = "CHANGE_DESK_BG";    //改变桌面背景
GameCfg.selectedMj = "SELECTED_MJ";         //选中的麻将
GameCfg.unSelectedMj = "UNSELECTED_MJ";     //未选中麻将
GameCfg.openBgMusic = "OPEN_BG_MUSIC";      //打开背景音乐
GameCfg.closeBgMusic = "CLOSE_BG_MUSIC";    //关闭背景音乐
GameCfg.NOTIFICATION_LISTENCARD = "NOTIFICATION_LISTENCARD";    //听牌
GameCfg.NOTIFICATION_ROBOT = "NOTIFICATION_ROBOT";          //托管
GameCfg.PROTECT_SCORE_SUCCESS   = "PROTECT_SCORE_SUCCESS";     //保分成功

module.exports = GameCfg;
