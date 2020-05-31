class Jibby {

    public hygiene:number
    public food:number
    public happyness:number

    public div:HTMLElement
    public x:number
    public y:number

    private _behavior : Behavior
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("jibby")
        parent.appendChild(this.div)

        // start instellingen
        this.x = 0
        this.y = 220
        this.hygiene = this.food = this.happyness = 50

        // afbeelding voor idle - vervang dit door het gedrag
        this.div.style.backgroundImage = "url('images/idle.png')"
        // this.myBehavior = new Idle()

        // click listeners
        this.div.addEventListener("click", () => this.onPet())
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", () => this.onEat())
        document.getElementsByTagName("washbutton")[0].addEventListener("click", () => this.onWash())
        
        this._behavior = new Wash(this)
        this._behavior.performBehavior
    }

    public update():void {
    
        if(this.hygiene <= 0 || this.food <= 0 || this.happyness <= 0) {
          this.Dead()
        } else {
            this.Idle()
        }
    }


    private onPet():void {
        console.log("you clicked on jibby!")
        this.div.style.backgroundImage = "url('images/happy.png')"
        this.happyness += 2
    }

    private onWash():void {
        // console.log("washing jibby!")
        // this.div.style.backgroundImage = "url('images/washing.png')"
        // this.hygiene += 10
        // this.happyness += 5
        this._behavior = new Wash(this)
        this._behavior.performBehavior
    }

    private onEat():void {
        console.log("jibby is eating!")
        this.div.style.backgroundImage = "url('images/eating.gif')"
        this.food += 10
    }

    private Dead():void {
        this.div.style.backgroundImage = "url('images/dead.png')"
        this.hygiene = 0
        this.food = 0
        this.happyness = 0
    }

    private Idle():void {
        this.hygiene -= 0.01
        this.food -= 0.02
        this.happyness -= 0.015
        this._behavior = new Wash(this)
        this._behavior.performBehavior

        if(this.hygiene <= 10) {
            this.div.style.backgroundImage = "url('images/dirty.png')"
        } else if(this.food <= 10) {
            this.div.style.backgroundImage = "url('images/hungry.png')"
        } else if(this.happyness <= 10) {
            this.div.style.backgroundImage = "url('images/sad.png')"
        }
    }


}