import {ByteArray} from "../common/ByteArray";
import {Chair} from "./Chair";
export class Table {
    public static TABLE_PLAYING: number = 2;
    public static TABLE_LOCKED: number = 1;

    public _chairCount: number;
    public _tableID: number;
    public _isPlaying: boolean;
    public _isLocked: boolean;
    public _chairs: Chair[];
    public _tableBuffer: ByteArray;
    constructor(chairCount: number, tableID: number) {
        this._chairCount = chairCount;
        this._tableID = tableID;
        this._isLocked = false;
        this._isPlaying = false;
        this._chairs = new Array<Chair>();
        for (var i: number = 0; i < chairCount; i++) {
            this._chairs[i] = new Chair();
        }
    }

    public getChair(chairID: number): Chair {
        if (chairID < 0 || chairID >= this._chairCount)
            return null;
        return this._chairs[chairID];
    }

    public getEmptyChairCount(): number {
        var count = 0;
        for (var key in this._chairs) {
            if (this._chairs[key].isEmpty())
                count++;
        }
        return count;
    }

    public getPlayerCount(): number {
        return this._chairCount - this.getEmptyChairCount();
    }

    public setTableBuffer(buf: ByteArray) {
        this._tableBuffer = buf;
    }

    public getTableBuffer() {
        return this._tableBuffer;
    }

    public dump() {
        for (var i = 0; i < this._chairCount; i++) {
            var chair: Chair = this._chairs[i];
            console.log("chair " + i + " " + chair.isEmpty() ? "empty" : "taken");
        }
    }
}