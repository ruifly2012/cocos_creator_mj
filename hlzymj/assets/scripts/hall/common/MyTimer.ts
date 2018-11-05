export class MyTimer extends cc.Node {
    private m_callback: Function;
    private m_target: any
    private m_delay: number;
    public static startTimer(target,callback: Function, delay: number) {
        var timer = new MyTimer();
        timer.openTimer(target,callback, delay);
    }
    private timCallBack() {
        if(this.m_target && this.m_callback)      
            this.m_callback.call(this.m_target);
        else
            cc.log("new timer timCallBack no callback");
    }
    private openTimer(target:any,callback: Function, delay: number) {        
        this.m_target = target;
        this.m_callback = callback;
        this.m_delay = delay;
        cc.director.getScheduler().scheduleCallbackForTarget(this,this.timCallBack,delay,0,delay,false,false);        
    }
}