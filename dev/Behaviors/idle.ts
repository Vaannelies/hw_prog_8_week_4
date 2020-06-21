class Idle extends Behavior {
    
    public timer: number
    public sleepTimer : number

    constructor(jibby : Jibby) {
        super(jibby)
        this.timer = 100
        this.sleepTimer = 100
    }

    onTimerFinished(): void {
        throw new Error("Method not implemented.")
    }
    public performBehavior(): void {
        
        this.jibby.div.style.backgroundImage = "url('images/idle.png')"

        this.jibby.hygiene -= 0.01
        this.jibby.food -= 0.02
        this.jibby.happyness -= 0.015
        this.sleepTimer -= 0.1
    

        if(this.jibby.hygiene <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/dirty.png')"
        } else if(this.jibby.food <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/hungry.png')"
        } else if(this.jibby.happyness <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/sad.png')"
        }

        if(this.sleepTimer <= 0) {
            this.jibby._behavior = new Sleep(this.jibby)
        }

        
        if(this.jibby.hygiene <= 0 || this.jibby.food <= 0 || this.jibby.happyness <= 0) {
            this.jibby._behavior = new Dead(this.jibby)
            // this._behavior = new Dead(this)
            // this._behavior.performBehavior()
      }
    }

  
  
    onPet():void {
        this.jibby._behavior = new Pet(this.jibby)
    }

    onWash():void {
        this.jibby._behavior = new Wash(this.jibby)
    }

    onEat():void {
        this.jibby._behavior = new Eat(this.jibby)
    }

}