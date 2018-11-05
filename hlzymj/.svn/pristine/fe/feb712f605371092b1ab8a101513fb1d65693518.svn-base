import { GameServerList } from "./GameServerList";
import { tagGameStationEx } from "../tagGameStationEx";
import { tagGameServerEx } from "../tagGameServerEx";
import { TSCommon } from "../../TSCommon";
export class GameIDList {
    private m_list: GameServerList[];
    public constructor() {
        this.m_list = new Array<GameServerList>();
    }

    public clearServerList() {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            v.clearServerList();
        };
        this.m_list = new Array<GameServerList>();
    }

    public addGameID(gameid: number) {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameid)
                return;
        };

        var serverList = new GameServerList(gameid);
        this.m_list.push(serverList);
    }

    public addStation(pStation: tagGameStationEx): tagGameStationEx {
        if (pStation == null || pStation.dwParentID == null)
            return null;
            for (var key in this.m_list) {
                var v = this.m_list[key];
            if (v.GameID == pStation.dwParentID)
                return v.addStation(pStation);
        };

        return null;
    }

    public addGameServer(pGameServer: tagGameServerEx): tagGameServerEx {
        if (pGameServer == null || pGameServer.dwKindID == null)
            return null; 
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == pGameServer.dwKindID){                
                return v.addGameServer(pGameServer);
            }
        }       
          
        return null;
    }

    public getStation(stationID: number): tagGameStationEx {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            var station = v.getStation(stationID);
            if (station)
                return station;
        };
        return null;
    }

    public getGameServer(nServerID: number): tagGameServerEx {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            var station = v.getGameServer(nServerID);
            if (station)
                return station;
        };

        return null;
    }

    public getGameStationByName(gameID: number, stationName: string): tagGameStationEx {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getGameStationByName(stationName);
        };

        return null;
    }


    public getStationList(gameID: number): tagGameStationEx[] {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getStatonList();
        };
        return new Array<tagGameStationEx>();
    }

    public getGameServerList(gameID: number, stationID: number): tagGameServerEx[] {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getGameServerList(stationID);
        };
        return new Array<tagGameServerEx>();
    }

    public getAllGameServerList(gameID): tagGameServerEx[] {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getAllGameServerList();
        };
        return new Array<tagGameServerEx>();
    }

    public getOneGameServerInStation(gameID: number, nStationID: number): tagGameServerEx {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getOneGameServerInStation(nStationID);
        };
        return null;
    }

    public getStationOnlineCount(gameID: number, nStationID: number): number {
        for (var key in this.m_list) {
            var v = this.m_list[key];
            if (v.GameID == gameID)
                return v.getStationOnlineCount(nStationID);
        };
        return 0;
    }
}