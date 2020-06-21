
abstract class Behavior {
    jibby : Jibby
    public timer : number

    constructor(jibby : Jibby) {
        this.jibby = jibby
        this.timer = 100
    }

    performBehavior() : void {
        
        this.timer--
        console.log(this.timer)
        if(this.timer <= 0) {
            console.log("timer finished");
            this.onTimerFinished();
        }
    }

    onTimerFinished() {
        this.jibby._behavior = new Idle(this.jibby)
        this.jibby._behavior.performBehavior()
    }

    abstract onWash():void
    abstract onEat():void
    abstract onPet():void


}