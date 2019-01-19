//Base class
function Door(width, height) {
    if(!(this instanceof Door))
        return new Door(width, height);
    this.width = width;
    this.height = height;
    this.isLocked = false;
}

//Base method to lock door
Door.prototype.lock = function() {
    this.isLocked = true;
    console.log('Door locked');
}

//Derived class
function WoodenDoor(width, height) {
    if(!(this instanceof WoodenDoor))
        return new WoodenDoor(width, height);
    Door.apply(this, arguments);
}

//Inheritance
WoodenDoor.prototype = Object.create(Door.prototype);
WoodenDoor.prototype.constructor = WoodenDoor;

WoodenDoor.prototype.creak = function() {
    console.log('Wooden door creaks');
}

//Override
WoodenDoor.prototype.lock = function() {
    Door.prototype.lock.apply(this, arguments);
    this.creak();
}

//Simple factory
var DoorFactory = {
    makeDoor: function(width, height) {
        return new WoodenDoor(width, height);
    }
}

//To use 
var door = DoorFactory.makeDoor(220, 200);
door.creak();
door.lock();

console.log(door.width);


