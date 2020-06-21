class Zombie extends Behavior {
    onWash(): void {
       
    }
    onEat(): void {
       
    }
    onPet(): void {
        
    }
    constructor(jibby : Jibby) {
        super(jibby)
        this.jibby.div.style.backgroundImage = "url('images/zombie.png')"
        console.log("miep")
    }
}