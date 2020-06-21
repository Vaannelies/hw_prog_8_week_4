class Eat extends Behavior {
    
    public timer : number

    constructor(jibby : Jibby) {
        super(jibby)
        this.timer = 100
        console.log("jibby is eating!")
        this.jibby.div.style.backgroundImage = "url('images/eating.gif')"
        this.jibby.food += 10

    }
    

  
    onPet():void {
        console.log("Hey!!!")
        this.jibby._behavior = new Angry(this.jibby)
    }

    onWash():void {
       
    }

    onEat():void {
        
    }

}