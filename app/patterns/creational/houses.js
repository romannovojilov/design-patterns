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