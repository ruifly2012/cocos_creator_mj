import {ByteArray} from "../../common/ByteArray";
export class GAME_DATA {
    public cChairID: number;
    public cCmdID: number;
    public data: ByteArray;

    constructor(buf: ByteArray) {
        this.cChairID = buf.readUnsignedByte();
        this.cCmdID = buf.readUnsignedByte();
        this.data = new ByteArray();      
        buf.readBytes(this.data);
    }    
}