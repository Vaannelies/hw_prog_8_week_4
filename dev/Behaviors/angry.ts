///<reference path="behavior.ts"/>
    
    class Angry extends Behavior {
    constructor(jibby : Jibby) {
        super(jibby)
        this.jibby.div.style.backgroundImage = "url('images/angry.png')"
    }

    onWash(): void {
        throw new Error("Method not implemented.")
    }
    onEat(): void {
        throw new Error("Method not implemented.")
    }
    onPet(): void {
        throw new Error("Method not implemented.")
    }

}