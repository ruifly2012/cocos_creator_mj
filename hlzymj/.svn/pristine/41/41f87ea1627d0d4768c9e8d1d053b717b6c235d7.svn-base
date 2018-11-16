import {gamelibcommon} from "../gamelib/gamelibcommon";
var Resources = {

};
Resources.FACE_EFFECT = ["face_1_xiao.mp3", "face_2_hehe.mp3", "face_3_biaoyang.mp3", "face_4_qiushen.mp3", "face_5_shengqi.mp3", "face_6_ku.mp3"]

Resources.QUICK_SEND_CHATS = ["快嘀嘎撒，你枪摸儿", "你机二火太好打咧", "打耸过摸耸过，我要滴字就认摸不倒", "机二火好好，乱打乱来", "你列是耸过破网拉，又断线打", "都趁打几个癞字，小心被别个捉斗打列"];

Resources.FACE_CHAT_MAX_NUM = 25;
Resources.WORDS_CHAT_MAX_NUM = 10;
Resources.VIP_FACE_CHAT_MAX_NUM = 20;

Resources.IS_PUTONG = true;

Resources.OPERATE_CHI = 0;
Resources.OPERATE_PENG = 1;
Resources.OPERATE_GANG = 2;
Resources.OPERATE_HU = 3;
Resources.OPERATE_ZIMO = 4;
Resources.OPERATE_CHAOTIAN = 5;


Resources.TOAST_TAG = 1000;
Resources.GOLD_TAG = 1001;

//判定是否是方言
Resources.getIsFangYan = function(){
    var luange = cc.sys.localStorage.getItem("fangyan") || 0;
    luange = parseInt(luange);
    return luange;
}


Resources.getOneRandom = function(nRandomMax){
    var nRand = Math.floor(Math.random()*(nRandomMax - 1))
    return nRand;
}

Resources.getMjSoundEffectUrl = function(sex, mjValue){

    var url;
    if(!Resources.getIsFangYan()){
        if(sex == gamelibcommon.SX_BOY){
            url = "resources/sound/game/putong/boy/tile/" + mjValue + ".mp3";
        }
        else{
            url = "resources/sound/game/putong/girl/tile/" + mjValue + ".mp3";
        }
        
    }
    else{
        if(sex == gamelibcommon.SX_BOY){
            url = "resources/sound/game/fangyan/boy/tile/" + mjValue + ".mp3";
        }
        else{
            url = "resources/sound/game/fangyan/girl/tile/" + mjValue + ".mp3";
        }
    }
    return cc.url.raw(url)
}

/**
 * 播放吃杠碰操作的音效
 * @param {*} sex 
 * @param {*} operateIndex 
 */
Resources.getOperateSoundEffectUrl = function(sex, operateIndex, randIndex){
    var url;
    var operateName;
    if(operateIndex == Resources.OPERATE_CHI){  //吃
        operateName = "eat";
    }
    else if(operateIndex == Resources.OPERATE_GANG){ //杠
        operateName = "gang";
    }
    else if(operateIndex == Resources.OPERATE_HU){ //胡
        operateName = "he";
    }
    else if(operateIndex == Resources.OPERATE_PENG){ //碰
        operateName = "peng";
    }
    else if(operateIndex == Resources.OPERATE_ZIMO){ //自摸
        operateName = "zimo";
    }

    if(!Resources.getIsFangYan()){
        if(sex == gamelibcommon.SX_BOY){
            url = "resources/sound/game/putong/boy/" + operateName + "/"+ randIndex + ".mp3";
        }
        else{
            url = "resources/sound/game/putong/girl/"+ operateName + "/"+ randIndex + ".mp3";
        }
    }
    else{
        if(sex == gamelibcommon.SX_BOY){
            url = "resources/sound/game/fangyan/boy/" + operateName + "/"+ randIndex + ".mp3"
        }
        else{
            url = "resources/sound/game/fangyan/girl/"+ operateName + "/"+ randIndex + ".mp3";
        }
    }

    return cc.url.raw(url)
}

Resources.getQWSoundEffectUrl = function(sex, quickWord){
    var url;
    quickWord = parseInt(quickWord);
    if(sex == gamelibcommon.SX_BOY){
        url = "resources/sound/game/qw/boy/" + quickWord + ".mp3";
    }
    else{
        url = "resources/sound/game/qw/girl/" + quickWord + ".mp3";
    }
        

    return cc.url.raw(url)
}

/*
*播放麻将音效
*@sex  表示性别
*@mjValue  表示麻将的牌牌值
*/
Resources.playMjSoundEffect = function(sex, mjValue){
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getMjSoundEffectUrl(sex, mjValue);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放快捷聊天语
 * @param {*} sex 性别
 * @param {*} quickWord 快捷语的index
 */
Resources.playQWSoundEffect = function(sex, quickWord){
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getQWSoundEffectUrl(sex, quickWord);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放杠的音效
 * @param {*} sex 性别
 * @param {*} randIndex 随机播放的音效索引值
 */
Resources.playGangEffect = function(sex, randIndex){
    randIndex = randIndex || 0;
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getOperateSoundEffectUrl(sex, Resources.OPERATE_GANG, randIndex);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放碰的音效
 * @param {*} sex 
 * @param {*} randIndex 
 */
Resources.playPengEffect = function(sex, randIndex){
    randIndex = randIndex || 0;
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getOperateSoundEffectUrl(sex, Resources.OPERATE_PENG, randIndex);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放吃的音效
 * @param {*} sex 
 * @param {*} randIndex 
 */
Resources.playChiEffect = function(sex, randIndex){
    randIndex = randIndex || 0;
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getOperateSoundEffectUrl(sex, Resources.OPERATE_CHI, randIndex);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放胡的音效
 * @param {*} sex 
 * @param {*} randIndex 
 */
Resources.playHuEffect = function(sex, randIndex){
    randIndex = randIndex || 0;
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getOperateSoundEffectUrl(sex, Resources.OPERATE_HU, randIndex);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放自摸的音效
 * @param {*} sex 
 * @param {*} randIndex 
 */
Resources.PlayZiMoEffect = function(sex, randIndex){
    randIndex = randIndex || 0;
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = Resources.getOperateSoundEffectUrl(sex, Resources.OPERATE_ZIMO, randIndex);
        cc.audioEngine.play(audioUrl);
    }
}

//播放公共的音效
Resources.playCommonEffect = function(effectName){
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = cc.url.raw("resources/sound/game/common/" + effectName);
        cc.audioEngine.play(audioUrl);
    }
}

/**
 * 播放表情音效
 * @param {*} faceEffectName 
 */
Resources.playFaceEffect = function(faceEffectName){
    if (parseInt(cc.sys.localStorage.getItem("voiceEffect") || 0)){
        var audioUrl = cc.url.raw("resources/sound/game/face/" + faceEffectName);
        cc.audioEngine.play(audioUrl);
    }
}

Resources.formatGold = function(gold, remaindot){
    if(Math.abs(gold) < 100000){
        return gold;
    }

    if(Math.abs(gold) >= 100000 && Math.abs(gold) < 100000000){
        if(remaindot){
            var leftNum = gold % 10000;
            if(leftNum == 0){
                var retGold = Math.floor(gold / 10000) + "万";
                return retGold;
            }
            else{
                gold = gold / 10000
                var retGold = Math.floor(gold*10)/10 + "万";
                return retGold;
            }
        }
        else{
            gold = gold / 10000
            var retGold = Math.floor(gold*10)/10 + "万";
            return retGold;
        }
    }
    else if(Math.abs(gold) >= 100000000 && Math.abs(gold) <= 2000000000){
        if(remaindot){
            var leftNum = gold % 100000000;
            if(leftNum == 0){
                var retGold = Math.floor(gold / 100000000) + "亿";
                return retGold;
            }
            else{
                gold = gold / 100000000
                var retGold = Math.floor(gold*10)/10 + "万";
                return retGold;
            }
        }
        else{
            gold = gold / 100000000
            var retGold = Math.floor(gold*10)/10 + "万";
            return retGold;
        }
    }

    if(Math.abs(gold) <= 100000000000){
        var retGold = Math.floor(gold / 100000000) + "亿";
    }

    if(remaindot){
        return "无限";
    }
}

Resources.get_frameName = function (foreName, mjValue) {
    var name;
    if (mjValue < 27) {

        var type = Math.floor(mjValue / 9) + 1;

        var value = mjValue % 9 + 1

        name = foreName + type + "_" + value;

    }
    else if (mjValue == 27) { //表示红中
        name = foreName + "zhong"
    }
    else if (mjValue == 28) { //表示发财
        name = foreName + "fa"
    }
    else if (mjValue == 29) { //表示白板
        name = foreName + "bai"
    }
    else if (mjValue == 30) { //表示东
        name = foreName + "dong"
    }
    else if (mjValue == 31) { //表示南
        name = foreName + "nan"
    }
    else if (mjValue == 32) { //表示西
        name = foreName + "xi"
    }
    else if (mjValue == 33) { //表示北
        name = foreName + "bei"
    }
    return name;
};

Resources.ShowToast = function(msg, isFlyUp){

    var scene = cc.director.getScene();

    if(scene.getChildByTag(Resources.TOAST_TAG)){
        return;
    }

    var winSize = cc.director.getWinSize();
    var toastNode = new cc.Node();
    var toastSprite = toastNode.addComponent(cc.Sprite);
    cc.loader.loadRes("game/toast",cc.SpriteFrame, function (err, spriteFrame){
        if(!err){
            toastSprite.spriteFrame = spriteFrame;
        }
    });

    toastSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    
    var tipsNode = new cc.Node();
    var tipsLabel = tipsNode.addComponent(cc.Label);
    tipsLabel.string = msg;
    tipsLabel.fontSize = 25;

    toastNode.addChild(tipsNode);
    

    var delayTime = cc.delayTime(1);
    var fadeOut = cc.fadeOut(2);
    var moveBy = cc.moveBy(1, 0, 30);
    var onEnd = cc.callFunc(()=>{
        toastNode.stopAction();
        toastNode.removeFromParent(true);
    })
    var sequence;
    if(isFlyUp){
        var spawn = cc.spawn(fadeOut, moveBy)
        sequence = cc.sequence(delayTime, spawn, onEnd);
    }
    else{
        sequence = cc.sequence(delayTime, fadeOut, onEnd);
    }
    
    toastNode.runAction(sequence);
    toastNode.x = winSize.width / 2;
    toastNode.y = winSize.height / 2;
    scene.addChild(toastNode, 1, Resources.TOAST_TAG);

    toastNode.width = tipsNode.width + 10;
    toastNode.height = tipsNode.height + 10;

    tipsNode.x = 0;
    tipsNode.y = -5;

}


Resources.showRewardTips = function(msg, isFlyUp, isDiamond, isOnlyShowText){
    var scene = cc.director.getScene();

    if(scene.getChildByTag(Resources.GOLD_TAG)){
        return;
    }

    var winSize = cc.director.getWinSize();
    var toastNode = new cc.Node();

    var toastSprite = toastNode.addComponent(cc.Sprite);
    cc.loader.loadRes("texture/commonRes/commontipsBg",cc.SpriteFrame, function (err, spriteFrame){
        if(!err){
            toastSprite.spriteFrame = spriteFrame;
        }
    });

    var iconNode = new cc.Node();
    var iconSprite = iconNode.addComponent(cc.Sprite);
    
    if(isDiamond){
        cc.loader.loadRes("texture/commonRes/money/diamondCoin", cc.SpriteFrame, function(err, spriteFrame){
            if(!err){
                iconSprite.spriteFrame = spriteFrame;
            }
        })  
    }
    else{
        cc.loader.loadRes("texture/commonRes/money/goldCoin", cc.SpriteFrame, function(err, spriteFrame){
            if(!err){
                iconSprite.spriteFrame = spriteFrame;
            }
        })
    }

    iconNode.anchorX = 1;
    iconNode.x = -8;
   

    var tipsNode = new cc.Node();
    var tipsLabel = tipsNode.addComponent(cc.Label);
    tipsLabel.string = msg;
    tipsLabel.fontSize = 30;
    tipsNode.anchorX = 0;

    if(isOnlyShowText){
        tipsNode.anchorX = 0.5;
        tipsNode.x = 0;
        tipsNode.y = -5;

        toastNode.addChild(tipsNode);
    }
    else{
        tipsNode.x = 8;
        tipsNode.y = -5;

        toastNode.addChild(iconNode);
        toastNode.addChild(tipsNode);
    }

    
    var delayTime = cc.delayTime(1);
    var fadeOut = cc.fadeOut(2);
    var moveBy = cc.moveBy(1, 0, 30);
    var onEnd = cc.callFunc(()=>{
        toastNode.stopAction();
        toastNode.removeFromParent(true);
    })
    var sequence;
    if(isFlyUp){
        var spawn = cc.spawn(fadeOut, moveBy)
        sequence = cc.sequence(delayTime, spawn, onEnd);
    }
    else{
        sequence = cc.sequence(delayTime, fadeOut, onEnd);
    }
    
    toastNode.runAction(sequence);
    toastNode.x = winSize.width / 2;
    toastNode.y = winSize.height / 2;
    scene.addChild(toastNode, 1, Resources.GOLD_TAG);
}

/*
Resources.getScreenShotImagePath = function(){
    var fullPath = jsb.fileUtils.getWritablePath() + 'screenShotShare.png';
    if(cc.sys.os == cc.sys.OS_ANDROID){
        fullPath = '/sdcard/screenShotShare.png';
    }
    if (jsb.fileUtils.isFileExist(fullPath)) {  
        jsb.fileUtils.removeFile(fullPath);  
    }
    return fullPath;
}

Resources.screenShoot = function(node, hasMask, onEnd){

    var renderTexture;
    if(!hasMask){
        renderTexture = cc.RenderTexture.create(node.width,node.height);
    }
    else{
        renderTexture = cc.RenderTexture.create(node.width,node.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
    }

    if(renderTexture){
        renderTexture.begin();
        node._sgNode.visit();
        renderTexture.end();

        var imagePath = Resources.getScreenShotImagePath();

        renderTexture.saveToFile("screenShotShare.png", cc.ImageFormat.PNG, true, function () {
            if (jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + "screenShotShare.png")) {
                if(cc.sys.os == cc.sys.OS_ANDROID){//安卓的分享路径比较坑，只能重新写文件
                    var fileData = jsb.fileUtils.getDataFromFile(jsb.fileUtils.getWritablePath() + "screenShotShare.png");
                    jsb.fileUtils.writeDataToFile(fileData, imagePath);
                    jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + "screenShotShare.png");//写了新文件后删除旧文件
                }

                if(onEnd){
                    onEnd(imagePath);
                }
            }
        });
    }
    else{
        console.log("renderTexture create failed in screenShoot");
    }
}
*/

module.exports = Resources