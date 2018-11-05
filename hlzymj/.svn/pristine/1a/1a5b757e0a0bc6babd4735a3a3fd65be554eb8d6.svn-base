import {Table} from "../Table";
export class TableManager {
    private _tableCount: number;
    private _chairCount: number;
    private _tables: Table[];
    constructor(tableCount:number,chairCount:number) {
        this._chairCount = chairCount;
        this._tableCount = tableCount;
        this._tables = new Array<Table>();
        for (var i = 0; i < tableCount; i++)
            this._tables[i] = new Table(chairCount, i);
    }

    public getTableCount() {
        return this._tableCount;
    }

    public getChairCount() {
        return this._chairCount;
    }

    public getTableList(): Table[] {
        return this._tables;
    }

    public getTable(tableID: number) {
        if (tableID < 0 || tableID >= this._tableCount)
            return null;
        return this._tables[tableID];
    }
}
