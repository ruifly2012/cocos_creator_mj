import { tagGameStationEx } from "../tagGameStationEx";
import { tagGameServerEx } from "../tagGameServerEx";
export class GameServerList {
    private m_gameID: number;
    private m_stationList: tagGameStationEx[];
    private m_roomList: tagGameServerEx[];
    public constructor(gameID?: number) {
        this.m_gameID = gameID || 0;
        this.m_stationList = new Array<tagGameStationEx>();
        this.m_roomList = new Array<tagGameServerEx>();
    }

    public get GameID(): number {
        return this.m_gameID;
    }

    public addStation(pStation: tagGameStationEx): tagGameStationEx {
        if (pStation == null)
            return null;

        // 先看是否存在
        var pExist = this.getGameStationByName(pStation.szStationName);
        if (pExist == null) {
            this.m_stationList.push(pStation);
            return pStation;
        }
        pExist = pStation;
        return pStation;
    }

    public getGameStationByName(stationName: string): tagGameStationEx {
        for (var key in this.m_stationList) {
            var station = this.m_stationList[key];        
            if (stationName == station.szStationName)
                return station;
        };
        return null;
    }

    public addGameServer(pGameServer: tagGameServerEx): tagGameServerEx {        
        if (pGameServer == null)
        {            
            return null;
        }

        // 先看是否存在
        var pExist = this.getGameServer(pGameServer.dwServerID);
        if (pExist == null) {
            this.m_roomList.push(pGameServer);            
            return pGameServer;
        }
        pExist = pGameServer;
        return pGameServer;
    }

    public getGameServer(nServerID: number): tagGameServerEx {
        for (var key in this.m_roomList) {
            var room = this.m_roomList[key];
            if (nServerID == room.dwServerID)
                return room;
        };
        return null;
    }

    public getStation(nStationID: number): tagGameStationEx {
        for (var key in this.m_stationList) {
            var room = this.m_stationList[key];
            if (nStationID == room.dwStationID)
                return room;
        };
        return null;
    }

    public getStatonList(): tagGameStationEx[] {
        return this.m_stationList;
    }

    public getAllGameServerList(): tagGameServerEx[] {
        return this.m_roomList;
    }

    public getStationOnlineCount(nStationID): number {
        var ret = 0;
        for (var key in this.m_roomList) {
            var room = this.m_roomList[key];
            if (nStationID != -1 && nStationID == room.dwStationID)
                ret += room.wOnLineCount;
        };
        return ret;
    }

    public getGameServerList(stationID: number): tagGameServerEx[] {
        var ret: tagGameServerEx[] = new Array<tagGameServerEx>();
        for (var key in this.m_roomList) {
            var room = this.m_roomList[key];
            if (stationID != -1 && stationID == room.dwStationID)
                ret.push(room);
        };
        return ret;
    }

    public getOneGameServerInStation(nStationID): tagGameServerEx {
        var ret = 0;
        for (var key in this.m_roomList) {
            var room = this.m_roomList[key];
            if (nStationID == room.dwStationID)
                return room;
        };
        return null;
    }

    public clearServerList() {
        this.m_roomList = new Array<tagGameServerEx>();
        this.m_stationList = new Array<tagGameStationEx>();
    }
}