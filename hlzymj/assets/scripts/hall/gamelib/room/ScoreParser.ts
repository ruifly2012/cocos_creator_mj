import {TSCommon} from "../../TSCommon";
import {ByteArray} from "../../common/ByteArray";
export class tagScoreColumnDesc {
    public cbLength:number;				//数据长度
    public cbScoreField: number;			//分数字段
    public cbDataType: number;				//数据类型
    public szDesc: string;   // 列描述，占16个长度
    constructor() {
        this.cbLength = 0;
    }
    public GetLength(): number{
        return 19;
    }
    public Deserialize(buf:ByteArray, nOffset:number):boolean{
        buf.position = nOffset;
        this.cbLength = buf.readUnsignedByte();
        this.cbScoreField = buf.readUnsignedByte();
        this.cbDataType = buf.readUnsignedByte();

        var sz: ByteArray = new ByteArray();
        buf.readBytes(sz, 0, 16);
        sz.position = 0;
        this.szDesc = TSCommon.readGbkString(sz, 16);//sz.readUTFBytes(16);
        return true;
    }
}

export class ScoreColumnDetailInfo {
    public column: tagScoreColumnDesc;
    public dwOffset: number;
    constructor() {
        this.column = new tagScoreColumnDesc();
        this.dwOffset = 0;
    }
}

export class ScoreParser {
    private static _instance: ScoreParser;
    public static getInstance(): ScoreParser {
        if (this._instance == null)
            this._instance = new ScoreParser();
        return this._instance;
    }

    public static enScore_Score: number = 0;	//成绩
    public static enScore_Win: number = 1;				//胜利局数
    public static enScore_Loss: number = 2;				//失败局数
    public static enScore_Draw: number = 3;				//打平局数
    public static enScore_Flee: number = 4;				//逃跑局数
    public static enScore_SetCount: number = 5;			//总共局数

    public static enScore_Custom: number = 16;	//...前面的保留，后面的自定义
    public static enScore_Gold: number = 17;				//金币
    public static enScore_Tax: number = 18;				//税
    public static enScore_Ranking: number = 19;			//等级分

    private _pHeader: ByteArray = new ByteArray();
    private _nHeaderLen:number;	// 头的长度
    private _nScoreBufLen:number;	// 分数buffer的长度
    private _bInitialized: boolean;	// 是否初始化成功过
    // 存储所有的列信息
    private _mapHeaders: ScoreColumnDetailInfo[];

    public constructor(){		
        this._nHeaderLen = 0;
        this._nScoreBufLen = 0;
        this._bInitialized = false;
    }
   
    // 至少提供以下方法
    // 得到某一字段的分数,因为不知道数据类型,所以填充void指针
    public GetScoreField(lpScoreBuffer: ByteArray/*in*/, nField: number/*in*/, lpScore: ByteArray/*out*/): boolean {
        // 应该强制给的buffer的长度是对的
        var nMaxLen: number = lpScore.length;
        var nBufLen: number = lpScoreBuffer.length;
        if (this._nScoreBufLen == 0 || this._nHeaderLen == 0) {
            // 还没有初始化
            return false;
        }
        if (nBufLen <= 0) {
            return false;
        }
        if (nBufLen != this._nScoreBufLen) {
            TSCommon.log("ScoreParser:getScoreField(),nBufLen != _nScoreBufLen");
            return false;
        }

        var info: ScoreColumnDetailInfo = this._mapHeaders[nField];

        if (info == null) {
            // 没有找到
            return false;
        }
        // 给的输出函数长度是否足够
        if (nMaxLen < info.column.cbLength) {
            return false;
        }
        // 从其偏移位置中取出数据
        // 先初始化
        lpScore.position = 0;
        lpScore.writeBytes(lpScoreBuffer, info.dwOffset, nMaxLen);
        lpScore.position = 0;
        return true;
    }

    public getScoreFieldInt(lpScoreBuffer: ByteArray/*in*/, Field: number): number {
        var nRetVal: number = -1;
        var byRetVal: ByteArray = new ByteArray();
        byRetVal.length = 4;
        if (!this.GetScoreField(lpScoreBuffer, Field, byRetVal))
            return nRetVal;
        byRetVal.position = 0;
        nRetVal = byRetVal.readInt();
        return nRetVal;
    }

    public getScoreHeader(): ByteArray {
        if (this._nHeaderLen <= 0)
            return null;
        var btRet: ByteArray = new ByteArray();
        btRet.writeBytes(this._pHeader, 0, this._nHeaderLen);
        return btRet;
    }

    public setScoreHeader(lpScoreHeader: ByteArray): Boolean {
        this._bInitialized = false;
        var nLen: number = lpScoreHeader.length;
        if (nLen <= 0) {
            return false;
        }

        var descTemp: tagScoreColumnDesc = new tagScoreColumnDesc();
        var descLen: number = descTemp.GetLength();

        // 给的长度是否符合列长度的倍数
        if (nLen % descLen != 0) {
            return false;
        }

        this._nHeaderLen = nLen;
        this._pHeader.position = 0;
        this._pHeader.writeBytes(lpScoreHeader);


        // 这里对这个头进行分析
        // 删除所有
        this._mapHeaders = new Array<ScoreColumnDetailInfo>();

        // 列数量
        var nColumnCount: number = this._nHeaderLen / descLen;
        // 偏移
        this._nScoreBufLen = 0;
        var nOffSet: number = 0;
        for (var i: number = 0; i < nColumnCount; i++) {
            var desc: ScoreColumnDetailInfo = new ScoreColumnDetailInfo();
            desc.column.Deserialize(this._pHeader, nOffSet);
            nOffSet += desc.column.GetLength();
            desc.dwOffset = this._nScoreBufLen;
            this._nScoreBufLen += desc.column.cbLength;

            // add to the map
            var nKey: number = desc.column.cbScoreField;
            this._mapHeaders[nKey] = desc;
        }
        // 设置成功
        this._bInitialized = true;
        return true;
    }

    public IsInitialized(): Boolean {
        return this._bInitialized;
    }	
}