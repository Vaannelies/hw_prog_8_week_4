class Wash implements Behavior {

    private jibby : Jibby

    constructor(jibby : Jibby) {
        this.jibby = jibby
    }
    public performBehavior(): void {
        console.log("washing jibby!")
        this.jibby.div.style.backgroundImage = "url('images/washing.png')"
        this.jibby.hygiene += 10
        this.jibby.happyness += 5
    }
    public onWash(): void {
        throw new Error("Method not implemented.");
    }
    public onEat(): void {
        throw new Error("Method not implemented.");
    }
    public onPet(): void {
        throw new Error("Method not implemented.");
    }

    public update() {
        this.performBehavior()
    }

}