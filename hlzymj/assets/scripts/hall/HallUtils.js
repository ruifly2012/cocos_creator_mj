import {Domain} from "./Domain";
var HallUtils = cc.Class({
    ctor: function () {
    },
});


HallUtils.judeIsPhoneQQBrowser=function()
{
    if(cc.sys.browserType == "mqqbrowser")
    {
        return true;
    }
    else{
        return false;
    }
};

HallUtils.judeIsPhoneWXBrowser=function()
{
    if(cc.sys.browserType == "wechat")
    {
        return true;
    }
    else{
        return false;
    }
};

HallUtils.judeIsPhoneWXGameBrowser=function()
{
    if(cc.sys.browserType == "wechatgame")
    {
        return true;
    }
    else{
        return false;
    }
};

//判定是否是类似iPhone X的分辨率
HallUtils.isIPhoneX=function(){
    if((screen.height / screen.width) >= 2.0){
        return true;
    }
    if((screen.width / screen.height) >= 2.0){
        return true;
    }
    return false;
};

//判定是否是真实iPhone X
HallUtils.isRealIphoneX = function(){
    if(cc.sys.os == cc.sys.OS_IOS){
        if((screen.height / screen.width) >= 2.0){
            return true;
        }
        if((screen.width / screen.height) >= 2.0){
            return true;
        }
    }
    return false;
},


HallUtils.getDoMainFromIp = function(strIp){
    if(strIp==null || strIp == undefined)
    {
        return "";
    }
    var strDoMain = strIp;
    var ipDoMainArray=[];
    if (Domain.BolTest){
        ipDoMainArray[0]=["139.196.194.248","h5.ss2007.com"];
    }
    else{
    // ipDoMainArray[1]=["139.196.194.248","h5.ss2007.com"];
        ipDoMainArray[0]=["106.14.98.151","h5.ss2007.com"];
    }



    for(var i=0;i<ipDoMainArray.length;i++)
    {   
        var ipDoMainInfo = ipDoMainArray[i];
        if(ipDoMainInfo && strIp == ipDoMainInfo[0])
        {
            strDoMain = ipDoMainInfo[1];
            break;
        }
    }
    return strDoMain;
},

HallUtils.hmac_sha256 = function(key,stringSignTemp)
{
    var sig=hmac_sha256(secret,stringSignTemp);
    return sig;
},


HallUtils.encodeURIComponent = function(urlData){
    return encodeURIComponent(urlData);
}

module.exports = HallUtils;


