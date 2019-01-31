

function Home(settings) {
    var _name = settings.name;
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

Home.Builder = function (name) {
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
        if(typeof name === "undefined")
            throw new Error("name is required field");
        return new Home(settings);
    }
};

(function(){
    var home = new Home.Builder("built house")
        .withRoof(true)
        .withWalls(true)
        .build();
    
        console.log("home name: " + home.getName());
        console.log("with roof: " + home.getRoof());
        console.log("with walls: " + home.getWalls());
        console.log("with windows: " + home.getWindows());
        console.log("with doors: " + home.getDoors());
})();