class Sleep extends Behavior {
    
    constructor(jibby : Jibby) {
        super(jibby)
        this.jibby.div.style.backgroundImage = "url('images/sleeping.png')"
    }

    onPet():void {
        this.jibby._behavior = new Pet(this.jibby)
    }

    onWash():void {
        console.log("Hey!!!")
        this.jibby._behavior = new Angry(this.jibby)
    }

    onEat():void {
        this.jibby._behavior = new Eat(this.jibby)
    }

    onTimerFinished():void {
        this.jibby._behavior = new Sleep(this.jibby)
    }

    performBehavior():void {
        this.jibby.hygiene -= 0.005
        this.jibby.food -= 0.01
        this.jibby.happyness -= 0.007
    }
}