import {IEventDispatcher} from "./IEventDispatcher";
export interface EventBin {

    type:string;
    /**
     * @private
     */
    listener: Function;
    /**
     * @private
     */
    thisObject:any;
    /**
     * @private
     */
    priority:number;
    /**
     * @private
     */
    target:IEventDispatcher;
    /**
     * @private
     */
    useCapture:boolean;
    /**
     * @private
     */
    dispatchOnce:boolean;
}