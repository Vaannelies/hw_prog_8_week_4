class Pet extends Behavior {


    constructor(jibby : Jibby) {
        super(jibby) 
    
        console.log("you clicked on jibby!")
        this.jibby.div.style.backgroundImage = "url('images/happy.png')"
        this.jibby.happyness += 2

    }

  
  
    onPet():void {
        this.jibby._behavior = new Pet(this.jibby)
    }

    onWash():void {

    }

    onEat():void {

    }


   
}