//simple factory
(function () {
    var namespace = App.define("patterns.creational.doors");

    //Base class
    function Door(width, height) {
        if (!(this instanceof Door))
            return new Door(width, height);
        this.width = width;
        this.height = height;
        this.isLocked = false;
    }

    //Base method to lock door
    Door.prototype.lock = function () {
        this.isLocked = !this.isLocked;
        console.log("Door " + (this.isLocked ? "locked": "unlocked"));
    }

    //Derived class
    function WoodenDoor(width, height) {
        if (!(this instanceof WoodenDoor))
            return new WoodenDoor(width, height);
        Door.apply(this, arguments);
    }

    //Inheritance
    WoodenDoor.prototype = Object.create(Door.prototype);
    WoodenDoor.prototype.constructor = WoodenDoor;

    WoodenDoor.prototype.creak = function () {
        console.log('Wooden door creaks');
    }

    //Override
    WoodenDoor.prototype.lock = function () {
        Door.prototype.lock.apply(this, arguments);
        this.creak();
    }

    //Simple factory
    var doorFactory = (function () {
        var _makeDoor = function (width, height, type) {
            switch(type) {
                case "WoodenDoor": return new WoodenDoor(width, height);
                default: return new Door(width, height);
            }
        };
        return {
            makeDoor: function (width, height, type) {
                return _makeDoor(width, height, type);
            }
        }
    })();
    
    namespace.Door = Door;
    namespace.WoodenDoor = WoodenDoor;
    namespace.doorFactory = doorFactory;

})();