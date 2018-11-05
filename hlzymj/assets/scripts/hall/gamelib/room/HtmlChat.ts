
import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
export class HtmlChat{
    _dwSubCode: number;
    _dwSpeaker: number;
    _dwListener: number;
    _dwChannelIDLength: number;
    _szContent: string;

    deserialize(buf: ByteArray) {
        this._dwSubCode = buf.readUnsignedInt();
        this._dwSpeaker = buf.readUnsignedInt();
        this._dwListener = buf.readUnsignedInt();
        this._dwChannelIDLength = buf.readUnsignedInt();
        buf.position += this._dwChannelIDLength;
        this._szContent = TSCommon.readGbkString(buf, buf.length - buf.position);//buf.readUTFBytes(buf.length - buf.position);
    }

    serialize(): ByteArray {
        var ba = new ByteArray();
        ba.writeInt(this._dwSubCode);
        ba.writeInt(this._dwSpeaker);
        ba.writeInt(this._dwListener);
        ba.writeInt(this._dwChannelIDLength);
        ba.writeInt(0);
        TSCommon.writeUtf8String(ba, this._szContent,0);
        return ba;
    }

    getChatMsg():string{
        return this._szContent;
    }
}