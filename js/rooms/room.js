function Room(roomdef){
    
    this.Container_constructor();
        
    this.enemies = [];    
    this.fading = [];    
    this.roomdef = roomdef;
    this.playerSpawnPoint = {x: 500, y: 300};
        
    this.transitionTriggers = {

        left: new TransitionTrigger('left', 0, 300, 2, 600),
        right: new TransitionTrigger('right', 1000, 300, 2, 600),
        up: new TransitionTrigger('up', 500, 0, 1000, 2),
        down: new TransitionTrigger('down', 500, 600, 1000, 2)
    };
    
    this.addChild(
        this.transitionTriggers.left,
        this.transitionTriggers.right,
        this.transitionTriggers.up,
        this.transitionTriggers.down);
    
    roomdef.setup(this);
};

(function(){
    
    var prototype = createjs.extend(Room, createjs.Container);
    
    prototype.setupTick = function(){
        
        var currentLayer = 9999;
        
        for(var i = 0; i < this.fading.length; i++)
            if(this.fading[i].layer < currentLayer)
                currentLayer = this.fading[i].layer;
        
        for(var i = this.fading.length - 1; i >= 0; i--){
            
            var fade = this.fading[i];
            
            if(fade.layer > currentLayer)
                continue;
            
            if(fade.type == 'in')            
                fade.obj.alpha += 0.04;
            else
                fade.obj.alpha -= 0.04;
            
            fade.ticks--;
            
            if(fade.ticks == 0){     
                
                this.fading.splice(i, 1);
                
                if(fade.type == 'in')
                    fade.obj.alpha = 1;   
                else
                    this.removeChild(fade.obj);
            };
        };
        
        if(this.fading.length == 0){
            this.ready = true;
            return;
        };
    };
    
    prototype.tick = function(){
        
        CollisionManager.detectCollisions();
        
        for(var i = 0; i < this.children.length; i++){
            
            var c = this.children[i];
            
            if(c.tick)
                c.tick();
        };
    };
    
    prototype.removeChildrenOfType = function(type){
        
        for(var i = this.children.length - 1; i >= 0; i--){
            
            var c = this.children[i];
            
            if(c.type == type)
                this.removeChildAt(i);
        };
    };
    
    prototype.makePlayer = function(){
        
        Game.player = new Player();   
        Game.player.alpha = 0;
        Game.player.x = this.playerSpawnPoint.x;
        Game.player.y = this.playerSpawnPoint.y;
        this.addChild(Game.player);
        
        this.fading.push({
            type: 'in',
            obj: Game.player,
            ticks: 25,
            layer: 0
        });
    };
    
    prototype.addEnemy = function(enemy){
        
        var self = this;
        
        enemy.on('dead', function(e){
            
            self.enemyDead(e.target);
        });
        
        this.addChild(enemy);
        this.enemies.push(enemy);
    };
    
    prototype.enemyDead = function(dead){
        
        for(var i = this.enemies.length - 1; i >= 0; i--){
            
            var e = this.enemies[i];
            
            if(e.id == dead.id)
                this.enemies.splice(i, 1);
        };
        
        if(this.enemies.length == 0 && this.onClear)
            this.onClear(this);
    };
    
    prototype.fadeInObject = function(obj, layer){
        
        if(!layer)
            layer = 0;
        
        obj.alpha = 0;
        this.ready = false;
        
        if(obj.type == 'enemy'){            
            this.addEnemy(obj);
        }
        else{
            this.addChild(obj);
        }
        
        this.fading.push({
            type: 'in',
            obj: obj,
            ticks: 25,
            layer: layer
        });
    };
    
    prototype.fadeOutObject = function(obj, layer){
        
        if(!layer)
            layer = 0;
        
        this.ready = false;
        
        this.fading.push({
            type: 'out',
            obj: obj,
            ticks: 25,
            layer: layer
        });
    };
    
    prototype.addTransition = function(direction, roomId){
        
        this.transitionTriggers[direction].targetId = roomId;
    };
    
    Room = createjs.promote(Room, 'Container');
    Room.initialized = true;
    
})();