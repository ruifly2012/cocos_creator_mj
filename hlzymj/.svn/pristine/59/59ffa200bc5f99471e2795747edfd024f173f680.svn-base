var HallResources = require("HallResources")
var GameEntrance = cc.Class({
	
});
GameEntrance.start = function(gameID,logonIP,logonPort,webRoot)
{
    var gameLibSink  =  require('GameLibSink').getInstance();
    gameLibSink.run(gameID,logonIP,logonPort,webRoot);

    //记录日志
    HallResources.recordPlayerLogToServer(HallResources.recordList.room_res_start);
};

