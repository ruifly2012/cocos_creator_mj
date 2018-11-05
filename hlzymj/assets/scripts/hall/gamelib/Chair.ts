export class Chair {
    private _userID: number;
    private _empty: boolean;

    constructor(){
        this._userID = 0;
        this._empty = true;
    }

    public setUserID(userID: number) {
        this._userID = userID;
    }

    public setEmpty(value: boolean) {
        this._empty = value;
    }

    public getUserID() {
        return this._userID;
    }

    public isEmpty() {
        return this._empty;
    }
}