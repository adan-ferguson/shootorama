function HudArea(){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();    
    
    function setupVars(){
    };
    
    function setupComponents(){
        
        var boundary = new createjs.Shape();
        boundary.graphics.beginStroke('Black').drawRect(0, 600, 1000, 120); 
        this.addChild(boundary);
        
        this.healthMeter = new HealthMeter({
            x:20,
            y:630,
            player: Game.player
        });
        this.addChild(this.healthMeter);
        
        this.dashMeter = new DashMeter({
            x:20,
            y:670,
            player: Game.player
        });
        this.addChild(this.dashMeter);        
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
}

(function(){
    
    var prototype = createjs.extend(HudArea, createjs.Container);

    //prototypez
    prototype.tick = function(){
        
        if(!Game.player)
            return;
    
        for(var i = 0; i < this.children.length; i++)
            if(this.children[i].tick)
                this.children[i].tick();
    };

    HudArea = createjs.promote(HudArea, 'Container');
    HudArea.initialized = true;
})();