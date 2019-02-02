//strategy

"use strict";
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