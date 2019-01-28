"use strict";
var app = app || {};
Object.defineProperty(app, "define", {
    value: function(namespace) {
        var parts = namespace.split('.'),
            parent = app,
            i = 0;
        
        if(parts[0] == "app")
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

(function() {
    var module1 = app.define("app.utils.ajax");
    console.log(module1 == app.utils.ajax);

    module1.test = function(message) {
        console.log('ajax test message: ' + message);
    }

    app.utils.ajax.test('it is test');
    
    var module2 = app.define("app.utils.dom");
    console.log(module2 == app.utils.dom);

}());