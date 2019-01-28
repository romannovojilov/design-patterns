"use strict";
(function () {
    var Validator = app.define("utils.data").Validator = function Validator(cfg) {
        if (!(this instanceof Validator)) {
            return new Validator(cfg);
        }
    
        var config = cfg;
        var check = function(type, data) {
            var checker;
            for (var i = 0; i < type.strategies.length; i++) {
                var strategy = type.strategies[i];
                var args = [data];
                if(typeof strategy === "string") {
                    checker = this.strategies[strategy];
                } else {
                    checker = this.strategies[strategy.name];
                    if(Array.isArray(strategy.args))
                        args = args.concat(strategy.args);
                }
                if (!checker) {
                    throw {
                        name: "ValidatorError",
                        message: "Validator " + type.strategies[i] + " is not found."
                    }
                }
                if (checker.validate.apply(checker, args))
                    this.messages.push("Invalid value of the field \"" + type.title + "\", " + checker.message);
            }
        }
    
        this.messages = [];
        this.validate = function (data) {
            var type;
            this.messages = [];
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    type = config[i];
                    if (!type)
                        continue;
                    check.call(this, type, data[i]);
                }
            }
            return this.messages.length !== 0
        }
    };
    
    Validator.prototype.strategies = {};
    
    Validator.prototype.strategies.required = {
        validate: function (val) {
            return val.toString().trim() === ""
        },
        message: "this field must not be empty."
    };
    
    Validator.prototype.strategies.number = new function() {
        var _min = Number.MIN_SAFE_INTEGER, _max = Number.MAX_SAFE_INTEGER;
        var MSG = "this field value must be a number.";
        
        this.validate = function (val, min, max) {
            this.message = MSG;
            if(typeof min === "number") {
                _min = min;
                this.message += " Min " + _min + ".";
            }
            if(typeof max === "number") {
                _max = max;
                this.message += " Max " + _max + ".";
            }
            if(val.toString().length == 0)
                return false;
            var t = /\d+/.test(val);
            if(t) {
                val = parseInt(val);
                if(val > _max || val < _min)
                    return true;
            }
            return !t;
        },
        this.message = MSG;
    };
    
    Validator.prototype.strategies.email = {
        validate: function (val) {
            return !/.+@.+\..+/i.test(val) && val.toString().length > 0;
        },
        message: "this field value must be a e-mail."
    };

})();


(function() {
    var Validator = app.define('utils.data.Validator');
    
    var experimentalData = {
        firstName: "Roman",
        lastName: "",
        age: "200",
        email: "roman@test.com"
    }

    var configForTypeOfExperimentalData = {
        firstName: { strategies: ["required"], title: "First name" },
        lastName: { strategies: ["required"], title: "Last name" },
        age: { strategies: ["required", { name: "number", args: [0, 130] }], title: "Age" },
        email: { strategies: ["required", "email"], title: "E-mail" }
    }

    var validator = new Validator(configForTypeOfExperimentalData);

    try {
        if (validator.validate(experimentalData)) {
            var domMes = "";
            for (var i = 0; i < validator.messages.length; i++) {
                domMes += validator.messages[i] + '<br>';
            }
            document.write(domMes);
        }
    } catch (e) {
        console.error(e.message);
    }

})();