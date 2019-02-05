"use strict";
var App = App || {};
Object.defineProperty(App, "define", {
    value: function(namespace) {
        var parts = namespace.split('.'),
            parent = App,
            i = 0;
        
        if(parts[0] == "App")
            parts = parts.slice(1);
            
        for(; i < parts.length; i++) {
            
            if(typeof parent[parts[i]] === "undefined")
                parent[parts[i]] = {};
                
            parent = parent[parts[i]];
        }   
    
        return parent;
    },
    writable: false
});
//strategy
(function () {
    var namespace = App.define("patterns.behavioral.validators");

    function Validator(cfg) {
        if (!(this instanceof Validator)) {
            return new Validator(cfg);
        }
    
        var config = cfg;
    
        this.messages = [];
        this.validate = function (data) {
            var type;
            this.messages = [];
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    type = config[i];
                    if (!type)
                        continue;
                    var checker;
                    for (var j = 0; j < type.strategies.length; j++) {
                        var strategy = type.strategies[j];
                        var args = [data[i]];
                        if (typeof strategy === "string") {
                            checker = this.strategies[strategy];
                        } else {
                            checker = this.strategies[strategy.name];
                            if (Array.isArray(strategy.args))
                                args = args.concat(strategy.args);
                        }
                        if (!checker) {
                            throw {
                                name: "ValidatorError",
                                message: "Validator " + type.strategies[j] + " is not found."
                            }
                        }
                        if (checker.validate.apply(checker, args))
                            this.messages.push({ name: i, value: "Invalid value of the field \"" + type.title + "\", " + checker.message });
                    }
                }
            }
            return this.messages.length !== 0
        }
    };

    Validator.prototype.strategies = {};
    
    Validator.prototype.strategies.required = {
        validate: function (val) {
            if(typeof val === "undefined" || val === null)
                val = "";
            return val.toString().trim() === ""
        },
        message: "this field must not be empty."
    };
    
    Validator.prototype.strategies.number = new function () {
        var MSG = "this field value must be a number.";
        this.validate = function (val, min, max) {
            if(typeof val === "undefined" || val === null)
                val = "";
            var _min = Number.MIN_VALUE, _max = Number.MAX_VALUE;
            this.message = MSG;
            if (typeof min === "number") {
                _min = min;
                this.message += " Min " + _min + ".";
            }
            if (typeof max === "number") {
                _max = max;
                this.message += " Max " + _max + ".";
            }
            if (val.toString().length == 0)
                return false;
            var t = /\d+/.test(val);
            if (t) {
                val = parseInt(val);
                if (val > _max || val < _min)
                    return true;
            }
            return !t;
        };
        this.message = MSG;
    };

    Validator.prototype.strategies.email = {
        validate: function (val) {
            if(typeof val === "undefined" || val === null)
                val = "";
            return !/.+@.+\..+/i.test(val) && val.toString().length > 0;
        },
        message: "this field value must be a e-mail."
    };

    namespace.Validator = Validator;
})();
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
//builder
(function () {
    var namespace = App.define("patterns.creational.houses");

    function House(settings) {
        var _name = settings.name || "";
        var _roof = settings.roof || false;
        var _walls = settings.walls || false;
        var _windows = settings.windows || false;
        var _doors = settings.doors || false;
    
    
        this.getName = function () {
            return _name;
        }
    
        this.getRoof = function () {
            return _roof;
        }
    
        this.getWalls = function () {
            return _walls;
        }
    
        this.getWindows = function () {
            return _windows;
        }
    
        this.getDoors = function () {
            return _doors;
        }
    };
    
    House.Builder = function (name) {
        var settings = {
            name: name
        };
    
        this.withRoof = function (roof) {
            settings.roof = roof;
            return this;
        };
        this.withWalls = function (walls) {
            settings.walls = walls;
            return this;
        };
        this.withWindows = function (windows) {
            settings.windows = windows;
            return this;
        };
        this.withDoors = function (doors) {
            settings.doors = doors;
            return this;
        };
        this.build = function () {
            if(typeof settings.name === "undefined")
                throw new Error("name param is required");
            return new House(settings);
        }
    };
    
    namespace.House = House;
})();
//factory method
(function () {
    var namespace = App.define("patterns.creational.ui");

    function Control() {

    }
    
    Control.prototype.render = function() {
        this.update();
        return "Control: " + this.name + " <br /> " + this.control + " <br /><br />";
    }
    
    //factory method
    Control.create = function(type) {
        if( typeof Control[type] !== "function")
            throw {
                name: "Error",
                message: "Constructor " + type + " not found."
            };
    
        if(!(Control[type].prototype instanceof Control))
            Control[type].prototype = new Control();
    
        return new Control[type]();
    }
    
    Control.Button = function() {
        this.name = "Button";
        this.update = function() {
            this.control = "<input type='button' value='" + this.name + "' />";
        }
    }
    Control.Text = function() {
        this.name = "Text";
        this.update = function() {
            this.control = "<input type='text' value='' placeholder='" + this.name + "' />";
        }
    }
    
    namespace.Control = Control;
})();