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