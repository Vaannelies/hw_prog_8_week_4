"use strict";
var Jibby = (function () {
    function Jibby(parent) {
        var _this = this;
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 50;
        this.div.style.backgroundImage = "url('images/idle.png')";
        this.div.addEventListener("click", function () { return _this.onPet(); });
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", function () { return _this.onEat(); });
        document.getElementsByTagName("washbutton")[0].addEventListener("click", function () { return _this.onWash(); });
        this._behavior = new Wash(this);
        this._behavior.performBehavior;
    }
    Jibby.prototype.update = function () {
        if (this.hygiene <= 0 || this.food <= 0 || this.happyness <= 0) {
            this.Dead();
        }
        else {
            this.Idle();
        }
    };
    Jibby.prototype.onPet = function () {
        console.log("you clicked on jibby!");
        this.div.style.backgroundImage = "url('images/happy.png')";
        this.happyness += 2;
    };
    Jibby.prototype.onWash = function () {
        this._behavior = new Wash(this);
        this._behavior.performBehavior;
    };
    Jibby.prototype.onEat = function () {
        console.log("jibby is eating!");
        this.div.style.backgroundImage = "url('images/eating.gif')";
        this.food += 10;
    };
    Jibby.prototype.Dead = function () {
        this.div.style.backgroundImage = "url('images/dead.png')";
        this.hygiene = 0;
        this.food = 0;
        this.happyness = 0;
    };
    Jibby.prototype.Idle = function () {
        this.hygiene -= 0.01;
        this.food -= 0.02;
        this.happyness -= 0.015;
        this._behavior = new Wash(this);
        this._behavior.performBehavior;
        if (this.hygiene <= 10) {
            this.div.style.backgroundImage = "url('images/dirty.png')";
        }
        else if (this.food <= 10) {
            this.div.style.backgroundImage = "url('images/hungry.png')";
        }
        else if (this.happyness <= 10) {
            this.div.style.backgroundImage = "url('images/sad.png')";
        }
    };
    return Jibby;
}());
var Game = (function () {
    function Game() {
        var container = document.getElementById("container");
        this.jibby = new Jibby(container);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.jibby.update();
        this.updateUI();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateUI = function () {
        document.getElementsByTagName("food")[0].innerHTML = Math.round(this.jibby.food).toString();
        document.getElementsByTagName("happyness")[0].innerHTML = Math.round(this.jibby.happyness).toString();
        document.getElementsByTagName("hygiene")[0].innerHTML = Math.round(this.jibby.hygiene).toString();
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Wash = (function () {
    function Wash(jibby) {
        this.jibby = jibby;
    }
    Wash.prototype.performBehavior = function () {
        console.log("washing jibby!");
        this.jibby.div.style.backgroundImage = "url('images/washing.png')";
        this.jibby.hygiene += 10;
        this.jibby.happyness += 5;
    };
    Wash.prototype.onWash = function () {
        throw new Error("Method not implemented.");
    };
    Wash.prototype.onEat = function () {
        throw new Error("Method not implemented.");
    };
    Wash.prototype.onPet = function () {
        throw new Error("Method not implemented.");
    };
    Wash.prototype.update = function () {
        this.performBehavior();
    };
    return Wash;
}());
//# sourceMappingURL=main.js.map