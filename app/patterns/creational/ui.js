//factory method

"use strict";
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