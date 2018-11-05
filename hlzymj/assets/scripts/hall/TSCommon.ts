import { StringConvert } from "./common/StringConvert";
import { ByteArray } from "./common/ByteArray";
import { EgretEvent } from "./event/EgretEvent";
import { EventDispatcher } from "./event/EventDispatcher";
import { MyTimer } from "./common/MyTimer";

export class TSCommon {
    private static dispatcher: EventDispatcher;

    public static onPayFailed: string = "onPayFailed";
    public static onPaySucceeded: string = "onPaySucceeded";
    public static onPayFinished: string = "onPayFinished";
    public static onNewPayment: string = "onNewPayment";
    public static onGoldChanged: string = "onGoldChanged";
    public static onDiamondChanged: string = "onDiamondChanged";
    public static onFragChanged: string = "onFragChanged";

    public static onGeWXtUserInfoLogin: string = "onGeWXtUserInfoLogin";

    private static parseByte(c: string): number {
        var s0 = "0";
        var digiStart: number = s0.charCodeAt(0);
        var sa = "a";
        var aStart: number = sa.charCodeAt(0);
        var sA = "A";
        var AStart: number = sA.charCodeAt(0);
        var cCharCode = c.charCodeAt[0];
        if (cCharCode > sA)
            return 10 + cCharCode - AStart;
        if (cCharCode > sa)
            return 10 + cCharCode - aStart;
        if (cCharCode > s0)
            return cCharCode - digiStart;
        return 0;
    }

    public static HexToData(hex: string): ArrayBuffer {
        var ba: ByteArray = new ByteArray();
        for (var i: number = 0; i < hex.length - 1; i += 2) {
            var b1 = TSCommon.parseByte(hex.charAt(i));
            var b2 = TSCommon.parseByte(hex.charAt(i + 1));
            ba.writeByte(b1 * 0x10 + b2);
        }
        return ba.buffer;
        //return ba;
    }

    public static writeStringWithLength(byteArray: ByteArray, str: string, len: number) {
        var s: String = new String(str);
        for (var i: number = 0; i < len; i++) {
            if (i < s.length)
                byteArray.writeByte(s.charCodeAt(i));
            else
                byteArray.writeByte(0);
        }
    }

    public static readGbkString(ba: ByteArray, len: number): string {
        var cc: number[] = new Array<number>();
        for (var i: number = 0; i < len; i++) {
            var c = ba.readUnsignedByte()
            cc.push(c);
        }
        return StringConvert.getUtf8(cc);
    }

    public static writeUtf8String(ba: ByteArray, s: string, len: number) {
        var cc: number[] = StringConvert.getGBK(s);
        if (len > 0) {
            while (cc.length > len - 1) {
                cc.pop();
            }
        }
        else
            len = cc.length + 1;
        for (var key in cc) {
            ba.writeByte(cc[key]);
        }
        for (var i: number = 0; i < len - cc.length; i++) {
            ba.writeByte(0);
        }
        return len
    }

    public static log(msg: string) {
        console.log(TSCommon.getTime() + ":" + msg);
    }

    public static getTickCount() {
        return new Date().getTime();
    }

    public static getTime() {
        var time = new Date();
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " " + time.getMilliseconds();
    }


    private static createEventDispatcher() {
        if (this.dispatcher == null)
            this.dispatcher = new EventDispatcher();
    }

    public static addEvent(type: string, listener: Function, thisObject: any) {
        this.createEventDispatcher();
        this.dispatcher.addEventListener(type, listener, thisObject);
    }

    public static removeEvent(type: string, listener: Function, thisObject: any) {
        this.createEventDispatcher();
        this.dispatcher.removeEventListener(type, listener, thisObject);
    }

    public static dispatchEvent(type: string, data?: any) {
        this.createEventDispatcher();
        this.dispatcher.dispatchEvent(new EgretEvent(type, false, false, data));
    }

    public static performWithDelay(target: any, callback: Function, delay: number) {
        MyTimer.startTimer(target, callback, delay);
    }
}