class Jibby {

    public hygiene:number
    public food:number
    public happyness:number

    public div:HTMLElement
    public x:number
    public y:number

    public _behavior : Behavior
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("jibby")
        parent.appendChild(this.div)

        // start instellingen
        this.x = 0
        this.y = 220
        this.hygiene = this.food = this.happyness = 5

        // afbeelding voor idle - vervang dit door het gedrag
        this._behavior = new Idle(this)
        // this.myBehavior = new Idle()

        // click listeners
        this.div.addEventListener("click", () => this.onPet())
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", () => this.onEat())
        document.getElementsByTagName("washbutton")[0].addEventListener("click", () => this.onWash())
    
    }

    public update():void {
        this._behavior.performBehavior()
   
    } 
 


    private onPet():void {
        this._behavior.onPet()
    }

    private onWash():void {
        this._behavior.onWash()
    }

    private onEat():void {
        this._behavior.onEat()
    }

    // private Dead():void {
    //     this._behavior = new Dead(this)
    // }

    // private Idle():void {
    //     this._behavior = new Idle(this)
    //     // this.hygiene -= 0.01
    //     // this.food -= 0.02
    //     // this.happyness -= 0.015
    //     // this._behavior = new Wash(this)
    //     // this._behavior.performBehavior

    //     // if(this.hygiene <= 10) {
    //     //     this.div.style.backgroundImage = "url('images/dirty.png')"
    //     // } else if(this.food <= 10) {
    //     //     this.div.style.backgroundImage = "url('images/hungry.png')"
    //     // } else if(this.happyness <= 10) {
    //     //     this.div.style.backgroundImage = "url('images/sad.png')"
    //     // }
    // }


}