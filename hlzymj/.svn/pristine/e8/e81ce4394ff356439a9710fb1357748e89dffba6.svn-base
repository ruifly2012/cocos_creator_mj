import {ByteArray} from "../../common/ByteArray";
import {TSCommon} from "../../TSCommon";
export class CMD_GP_LogonSuccess_Ex2 {
    public nUserDBID: number;
    public dwGold :number;
    public nScore :number;
    public nWin :number;
    public nLose :number;
    public nDraw :number;
    public nFlee :number;
    public szLeaveWord: string; // 128
    public nVIPLevel:number;
    public cbGameTitleLevel:number;
    public nGameTitleScore:number;
    public nFrag:number;
    public lBankAmount:number;
    public nWeekWinAmount:number;
    public nMaxWinAmount: number;
    public nGuessWin: number;
    public nGiftVIPLevel: number;
    public bIsLoginGift: number;	

    public deserialize(ba: ByteArray) {        
        this.nUserDBID = ba.readInt();
        this.dwGold = ba.readInt();
        this.nScore = ba.readInt();
        this.nWin = ba.readInt();
        this.nLose = ba.readInt();
        this.nDraw = ba.readInt();
        this.nFlee = ba.readInt();
        this.szLeaveWord = TSCommon.readGbkString(ba, 32);//ba.readUTFBytes(128);
        this.nVIPLevel = 0;
        this.cbGameTitleLevel = 0;
        this.nGameTitleScore = 0;
        this.nFrag = 0;
        this.lBankAmount = 0;
        this.nWeekWinAmount = 0;
        this.nMaxWinAmount = 0;
        this.nGuessWin = 0;
        this.nGiftVIPLevel = 0;
        this.bIsLoginGift = 0;	
    }
}