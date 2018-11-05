var GameDefs = require("GameDefs");

//游戏判定逻辑
var gameJudge = {

};


//判定手上是否有四个一样的牌
gameJudge.handCardIsHaveFourSame = function(vMjPalyer){
    var vTableNum = new Array();
    var asNum = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        asNum[i] = 0;
    }

    for(var i = 0; i < vMjPalyer.cbHoldCardCount; i++){
        var nV = vMjPalyer.cbHoldCards[i];
        if(nV < GameDefs.MAX_MJ_INDEX){
            asNum[nV] = asNum[nV] + 1;
        }
    }

    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        if(asNum[i] == 4){
            vTableNum.push(i);
        }
    }

    if(vTableNum.length > 0){
        return {
            bIsExist:true,
            vCardArray : vTableNum,
        }
    }

    return {
        bIsExist:false,
        vCardArray : vTableNum,
    }
}

//判定手上是否有三个一样的牌
gameJudge.handCardIsHaveThreeSame = function(vMjPalyer,nCurrentMjV){
    var asNum = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        asNum[i] = 0;
    }

    for(var i = 0; i < vMjPalyer.cbHoldCardCount; i++){
        var nV = vMjPalyer.cbHoldCards[i];
        if(nV < GameDefs.MAX_MJ_INDEX){
            asNum[nV] = asNum[nV] + 1;
        }
    }

    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        if(asNum[i] == 3 && i == nCurrentMjV){
            return {
                bIsExist : true,
                vCardValue : i,
            }
        }
    }

    return {
        bIsExist : false,
        vCardValue : -1,
    }
}

//判定手上是否有一张并且已经碰过的牌
gameJudge.handCardIsHaveOneSameToWave = function(vMjPalyer){
    var vTableNum = new Array();

    var asNum = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        asNum[i] = 0;
    }

    for(var i = 0; i < vMjPalyer.cbHoldCardCount; i++){
        var nV = vMjPalyer.cbHoldCards[i];
        if(nV < GameDefs.MAX_MJ_INDEX){
            asNum[nV] = asNum[nV] + 1;
        }
    }

    for(var i = 0; i < GameDefs.MAX_WEAVE; i++){
        var tagWeaveItem = vMjPalyer.showCardSuits[i];
        if(tagWeaveItem.cbWeaveKind == GameDefs.WeaveType.Peng && asNum[tagWeaveItem.cbCardData[0]] == 1){
            vTableNum.push(tagWeaveItem.cbCardData[0]);
        }
    }

    if(vTableNum.length > 0){
        return {
            bIsExist : true,
            vCardArray : vTableNum,
        }
    }

    return {
        bIsExist : false,
        vCardArray : vTableNum,
    }
}


gameJudge.CanShunLeft = function(cbCard,cbHoldCards,cbHoldCardCount,cbLaizi){
	//赖子不能吃
	// if(cbCard == cbLaizi) {
	// 	return false
	// }

	if(cbCard >= GameDefs.HONG_ZHONG) {
        return false
    }

	if(cbCard % 9 > 6) {
        return false;
    }
		

    var cbCardIndex = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        cbCardIndex[i] = 0;
    }
	

	for(var i = 0; i < cbHoldCardCount; i++){
		cbCardIndex[cbHoldCards[i]] = cbCardIndex[cbHoldCards[i]] + 1;
    }

	// if(cbCardIndex[cbCard+1]>0 && cbCardIndex[cbCard+2]>0 && (cbCard+1) != cbLaizi && (cbCard+2) != cbLaizi){
	// 	return true
    // }

	if (cbCardIndex[cbCard+1] > 0 && cbCardIndex[cbCard+2] > 0 ){
        return true
    }

	return false
}

gameJudge.CanShunMid = function(cbCard,cbHoldCards,cbHoldCardCount,cbLaizi){
	//赖子不能吃
	// if(cbCard == cbLaizi) {
	// 	return false
	// }

	if(cbCard >= GameDefs.HONG_ZHONG) {
        return false
    }

	if(cbCard % 9 == 8 || cbCard % 9 == 0) {
        return false
    }


    var cbCardIndex = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        cbCardIndex[i] = 0;
    }
    
    
    for(var i = 0; i < cbHoldCardCount; i++){
        cbCardIndex[cbHoldCards[i]] = cbCardIndex[cbHoldCards[i]] + 1;
    }


	// if(cbCardIndex[cbCard + 1] > 0 && cbCardIndex[cbCard - 1]>0 && (cbCard+1) != cbLaizi && (cbCard-1) != cbLaizi){
    //     return true
    // }
	

	if (cbCardIndex[cbCard + 1] > 0 && cbCardIndex[cbCard - 1] > 0){
        return true;
    }
		
	return false
}

gameJudge.CanShunRight = function(cbCard,cbHoldCards,cbHoldCardCount,cbLaizi){
	//赖子不能吃
	// if(cbCard == cbLaizi) {
	// 	return false
	// }

	if(cbCard >= GameDefs.HONG_ZHONG){
		return false
    }

	if(cbCard % 9 < 2){
		return false
    }

    var cbCardIndex = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        cbCardIndex[i] = 0; 
    }
    
    for(var i = 0; i < cbHoldCardCount; i++){
        cbCardIndex[cbHoldCards[i]] = cbCardIndex[cbHoldCards[i]]+1
    }

	// if(cbCardIndex[cbCard-1] > 0 && cbCardIndex[cbCard-2] > 0 && (cbCard-1) != cbLaizi && (cbCard-2) != cbLaizi ) {
	// 	return true
    // }

	if (cbCardIndex[cbCard-1] > 0 && cbCardIndex[cbCard-2] > 0){
        return true
    }

	return false
}

//是否有三张一样的癞子皮
gameJudge.handCardIsHaveThreeLaiZiPi = function(vMjPalyer, laizipiValue){
    var asNum = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        asNum[i] = 0;
    }

    for(var i = 0; i < vMjPalyer.cbHoldCardCount; i++){
        var nV = vMjPalyer.cbHoldCards[i];
        if(nV < GameDefs.MAX_MJ_INDEX){
            asNum[nV] = asNum[nV] + 1;
        }
    }

    if(asNum[laizipiValue] == 3){
        return {
            bIsExist : true,
            vCardValue : laizipiValue,
        }
    }

    return {
        bIsExist : false,
        vCardValue : -1,
    }
}

//是否有两张一样的癞子皮
gameJudge.handCardIsHaveTwoLaiZiPi = function(vMjPalyer, laizipiValue, nCurrentMjV){
    var asNum = new Array();
    for(var i = 0; i < GameDefs.MAX_MJ_INDEX; i++){
        asNum[i] = 0;
    }

    for(var i = 0; i < vMjPalyer.cbHoldCardCount; i++){
        var nV = vMjPalyer.cbHoldCards[i];
        if(nV < GameDefs.MAX_MJ_INDEX){
            asNum[nV] = asNum[nV] + 1;
        }
    }

    if(asNum[laizipiValue] == 2 && laizipiValue == nCurrentMjV){
        return {
            bIsExist : true,
            vCardValue : laizipiValue,
        }
    }

    return {
        bIsExist : false,
        vCardValue : -1,
    }
}

module.exports = gameJudge