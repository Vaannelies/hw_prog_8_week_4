class Wash extends Behavior {

    public timer : number

    constructor(jibby : Jibby) {
        super(jibby)
        this.timer = 100
        console.log("washing jibby!")
        this.jibby.div.style.backgroundImage = "url('images/washing.png')"
        this.jibby.hygiene += 10
        this.jibby.happyness += 5
    }
  
    onPet():void {
        console.log("Hey!!!")
        this.jibby._behavior = new Angry(this.jibby)
    }

    onWash():void {
        
    }

    onEat():void {
     
    }


    public update() {
        this.performBehavior()
          
  
    }

}