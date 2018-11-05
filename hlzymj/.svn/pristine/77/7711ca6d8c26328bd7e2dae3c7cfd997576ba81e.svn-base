
//工具类
var Tools = {
    extends: cc.Component,
};

/* 
* 判断一个对象是否是一个空的对象
* 例如 var a = {}  a就是一个空对象   var b = { key: 5,} 此处b就不是空对象
* 返回值为bool类型
*/
Tools.isEmptyObject = function(obj){

    if(typeof(obj) != "object"){
        cc.log("obj is not object !!!");
        return true;
    }
        
    for(var key in obj){
        return false;
    }

    return true;
},

/*
 * 切割字符串  
 * 从最开始位置获取相应长度的字符串 多余的部分用...代替
 * 如： 可测试的名字是叫做测试  这个字符串切割为：可测试的...
 * 返回值类型为string类型
 */
Tools.cutString = function(str, maxWidth, fontSize, parent){
    var splitStr = str.split("")
    var node = new cc.Node();
    parent.addChild(node)

    var label = node.addComponent(cc.Label);
    label.fontSize = fontSize;
    label.string = "...";
    var lastStrWidth = node.width;       //最后三个...号的宽度
    var i = 0;
    var isOverMaxWidth = false;          //是否超过了最大超度
    var countLength = 0;
    var resultStr = "";
    while(i < splitStr.length && !isOverMaxWidth){
        label.string = splitStr[i];
        if(lastStrWidth + countLength + node.width < maxWidth){
            countLength += node.width
            resultStr += splitStr[i]; 
        }
        else{
            isOverMaxWidth = true;
        }
        i += 1;
    }
    if(isOverMaxWidth){
        resultStr += "..." 
    }

    node.destroy();
    return resultStr;
},

Tools.getFormatNumber = function(preNum){ 
    var result = "";

    var preNum = ""+preNum;

    var newstr = preNum.split("").reverse().join("");
    
    while(newstr.length > 3){

        result += newstr.substring(0,3) + "，";

        newstr = newstr.substring(3);
    }
    
    result += newstr;

    result = result.split("").reverse().join("");
    return result;
}


cc.Class(Tools);
module.exports = Tools
