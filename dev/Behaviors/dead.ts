class Dead extends Behavior {
        constructor(jibby : Jibby) {
        super(jibby)
    }

    performBehavior(): void {
        this.jibby.div.style.backgroundImage = "url('images/dead.png')"
        this.jibby.hygiene = 0
        this.jibby.food = 0
        this.jibby.happyness = 0
    }
    onWash(): void {
 
    }
    onEat(): void {
     
    }
    onPet(): void {
        this.jibby._behavior = new Zombie(this.jibby)
    }

}