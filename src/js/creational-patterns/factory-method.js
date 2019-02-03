function Control() {

}

Control.prototype.render = function(type) {
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
    this.control = "<input type='button' value='" + this.name + "' />";
}
Control.Text = function() {
    this.name = "Text";
    this.control = "<input type='text' value='' placeholder='" + this.name + "' />";
}

var button1 = Control.create("Button");
var text1 = Control.create("Text");

document.write(text1.render());
document.write(button1.render());