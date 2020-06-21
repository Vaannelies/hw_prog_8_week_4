"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Jibby = (function () {
    function Jibby(parent) {
        var _this = this;
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 5;
        this._behavior = new Idle(this);
        this.div.addEventListener("click", function () { return _this.onPet(); });
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", function () { return _this.onEat(); });
        document.getElementsByTagName("washbutton")[0].addEventListener("click", function () { return _this.onWash(); });
    }
    Jibby.prototype.update = function () {
        this._behavior.performBehavior();
    };
    Jibby.prototype.onPet = function () {
        this._behavior.onPet();
    };
    Jibby.prototype.onWash = function () {
        this._behavior.onWash();
    };
    Jibby.prototype.onEat = function () {
        this._behavior.onEat();
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
var Behavior = (function () {
    function Behavior(jibby) {
        this.jibby = jibby;
        this.timer = 100;
    }
    Behavior.prototype.performBehavior = function () {
        this.timer--;
        console.log(this.timer);
        if (this.timer <= 0) {
            console.log("timer finished");
            this.onTimerFinished();
        }
    };
    Behavior.prototype.onTimerFinished = function () {
        this.jibby._behavior = new Idle(this.jibby);
        this.jibby._behavior.performBehavior();
    };
    return Behavior;
}());
var Angry = (function (_super) {
    __extends(Angry, _super);
    function Angry(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.jibby.div.style.backgroundImage = "url('images/angry.png')";
        return _this;
    }
    Angry.prototype.onWash = function () {
        throw new Error("Method not implemented.");
    };
    Angry.prototype.onEat = function () {
        throw new Error("Method not implemented.");
    };
    Angry.prototype.onPet = function () {
        throw new Error("Method not implemented.");
    };
    return Angry;
}(Behavior));
var Dead = (function (_super) {
    __extends(Dead, _super);
    function Dead(jibby) {
        return _super.call(this, jibby) || this;
    }
    Dead.prototype.performBehavior = function () {
        this.jibby.div.style.backgroundImage = "url('images/dead.png')";
        this.jibby.hygiene = 0;
        this.jibby.food = 0;
        this.jibby.happyness = 0;
    };
    Dead.prototype.onWash = function () {
    };
    Dead.prototype.onEat = function () {
    };
    Dead.prototype.onPet = function () {
        this.jibby._behavior = new Zombie(this.jibby);
    };
    return Dead;
}(Behavior));
var Eat = (function (_super) {
    __extends(Eat, _super);
    function Eat(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.timer = 100;
        console.log("jibby is eating!");
        _this.jibby.div.style.backgroundImage = "url('images/eating.gif')";
        _this.jibby.food += 10;
        return _this;
    }
    Eat.prototype.onPet = function () {
        console.log("Hey!!!");
        this.jibby._behavior = new Angry(this.jibby);
    };
    Eat.prototype.onWash = function () {
    };
    Eat.prototype.onEat = function () {
    };
    return Eat;
}(Behavior));
var Idle = (function (_super) {
    __extends(Idle, _super);
    function Idle(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.timer = 100;
        _this.sleepTimer = 100;
        return _this;
    }
    Idle.prototype.onTimerFinished = function () {
        throw new Error("Method not implemented.");
    };
    Idle.prototype.performBehavior = function () {
        this.jibby.div.style.backgroundImage = "url('images/idle.png')";
        this.jibby.hygiene -= 0.01;
        this.jibby.food -= 0.02;
        this.jibby.happyness -= 0.015;
        this.sleepTimer -= 0.1;
        if (this.jibby.hygiene <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/dirty.png')";
        }
        else if (this.jibby.food <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/hungry.png')";
        }
        else if (this.jibby.happyness <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/sad.png')";
        }
        if (this.sleepTimer <= 0) {
            this.jibby._behavior = new Sleep(this.jibby);
        }
        if (this.jibby.hygiene <= 0 || this.jibby.food <= 0 || this.jibby.happyness <= 0) {
            this.jibby._behavior = new Dead(this.jibby);
        }
    };
    Idle.prototype.onPet = function () {
        this.jibby._behavior = new Pet(this.jibby);
    };
    Idle.prototype.onWash = function () {
        this.jibby._behavior = new Wash(this.jibby);
    };
    Idle.prototype.onEat = function () {
        this.jibby._behavior = new Eat(this.jibby);
    };
    return Idle;
}(Behavior));
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet(jibby) {
        var _this = _super.call(this, jibby) || this;
        console.log("you clicked on jibby!");
        _this.jibby.div.style.backgroundImage = "url('images/happy.png')";
        _this.jibby.happyness += 2;
        return _this;
    }
    Pet.prototype.onPet = function () {
        this.jibby._behavior = new Pet(this.jibby);
    };
    Pet.prototype.onWash = function () {
    };
    Pet.prototype.onEat = function () {
    };
    return Pet;
}(Behavior));
var Sleep = (function (_super) {
    __extends(Sleep, _super);
    function Sleep(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.jibby.div.style.backgroundImage = "url('images/sleeping.png')";
        return _this;
    }
    Sleep.prototype.onPet = function () {
        this.jibby._behavior = new Pet(this.jibby);
    };
    Sleep.prototype.onWash = function () {
        console.log("Hey!!!");
        this.jibby._behavior = new Angry(this.jibby);
    };
    Sleep.prototype.onEat = function () {
        this.jibby._behavior = new Eat(this.jibby);
    };
    Sleep.prototype.onTimerFinished = function () {
        this.jibby._behavior = new Sleep(this.jibby);
    };
    Sleep.prototype.performBehavior = function () {
        this.jibby.hygiene -= 0.005;
        this.jibby.food -= 0.01;
        this.jibby.happyness -= 0.007;
    };
    return Sleep;
}(Behavior));
var Wash = (function (_super) {
    __extends(Wash, _super);
    function Wash(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.timer = 100;
        console.log("washing jibby!");
        _this.jibby.div.style.backgroundImage = "url('images/washing.png')";
        _this.jibby.hygiene += 10;
        _this.jibby.happyness += 5;
        return _this;
    }
    Wash.prototype.onPet = function () {
        console.log("Hey!!!");
        this.jibby._behavior = new Angry(this.jibby);
    };
    Wash.prototype.onWash = function () {
    };
    Wash.prototype.onEat = function () {
    };
    Wash.prototype.update = function () {
        this.performBehavior();
    };
    return Wash;
}(Behavior));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(jibby) {
        var _this = _super.call(this, jibby) || this;
        _this.jibby.div.style.backgroundImage = "url('images/zombie.png')";
        console.log("miep");
        return _this;
    }
    Zombie.prototype.onWash = function () {
    };
    Zombie.prototype.onEat = function () {
    };
    Zombie.prototype.onPet = function () {
    };
    return Zombie;
}(Behavior));
//# sourceMappingURL=main.js.map