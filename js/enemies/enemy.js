function Enemy(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    setupEvents.call(this);
    
    function setupVars(){
      
        this.x = vars.x;
        this.y = vars.y;
        this.maxHealth = this.health;
        this.pushPriority = 0;
        this.stunTime = this.stunTime ? this.stunTime : 120;
        
        if(!this.scale)
            this.scale = 1;
        
        this.size = 40 * this.scale;
        
        this.hitbox = {
            type: 'enemy',
            collidesWith: ['player','wall','ghost'],
            width: this.size * 0.85,
            height: this.size * 0.85
        };
        
        this.hitManager = new HitManager(this);        
        this.statedef = new Statedef(this);
        this.effectsManager = new EffectsManager(this);
    };
    
    function setupComponents(){
                  
        this.sprite = 
            SpriteManager.makeSprite(this.spriteName).set({
            scaleX: this.scale,
            scaleY: this.scale
        });                
        this.addChild(this.sprite);
        
//        this.rect = new createjs.Shape();
//        this.rect.graphics.beginStroke("Red")
//            .drawRect(this.hitbox.width / -2, 
//                      this.hitbox.height / -2, 
//                      this.hitbox.width, 
//                      this.hitbox.height); 
//        this.addChild(this.rect);
        
        this.healthMeter = new EnemyHealthMeter(this);
        this.addChild(this.healthMeter);
        
        this.comboRingInner = new createjs.Shape();
        this.addChild(this.comboRingInner);
        
        this.comboRingOuter = new createjs.Shape();
        this.addChild(this.comboRingOuter);
    };
    
    function setupEvents(){
    
        this.on('tick', this.tick);
    }
};

(function(){
        
    var prototype = createjs.extend(Enemy, createjs.Container);
      
    prototype.refreshCache = function(){
    
        this.sprite.cache(0, 0, this.size, this.size);        
    };
    
    prototype.flashColor = function(duration, r, g, b){
      
        this.effectsManager.addEffect(
            new ColorEffect(this.sprite, {
                duration: duration, r: r, g: g, b: b
            })
        );
    };
    
    prototype.tick = function(){    
        
        this.hitManager.tick();
        this.healthMeter.tick();
        manageState.call(this);
        this.effectsManager.tick();
        
        function manageState(){

            if(this['state_' + this.statedef.id])
                this['state_' + this.statedef.id]();
            else{
                console.error('State not found: ' + this.statedef.id);
                this.statedef.changeState('initial');
            }            

            this.statedef.time++;
        }        
    };
    
    prototype.handleCollision = function(obj){
    
        if (obj.hitbox.type == 'enemy' || obj.hitbox.type == 'wall')
            CollisionManager.push(this, obj);
        
        if (obj.hitbox.type == 'player' && this.playerDamage)            
            obj.hit(this);
    };
    
    prototype.hit = function(source){
    
        if (this.dead)
            return;

        var damage = this.hitManager.hit(source);

        var event = new createjs.Event('healthChanged');
        event.oldHealth = this.health;
        
        this.health -= damage;
        event.newHealth = this.health;

        if (this.health <= 0 ) {

            this.health = 0;
            this.die();
        };
        
        this.dispatchEvent(event);
    };
    
    prototype.die = function(){
    
        this.statedef.changeState('dying');        
        this.dead = true;       
    };
    
    prototype.move = function(vector, angle){
        
        while(angle < 0)
            angle += 360;
        
        angle = angle % 360;  
        
        var diff = this.facing - angle;
        
        if(diff < -180)
            diff += 360;
        else if(diff > 180)
            diff -= 360;
        
        var newAngle = angle;
        
        if(diff > 5)
            newAngle = this.facing - 5;
        else if(diff < -5)
            newAngle = this.facing + 5;
        
        this.x += vector.x * 0.75;
        this.y += vector.y * 0.75;
        this.facing = newAngle;
        this.sprite.rotation = newAngle;
    };
    
    //distance from player in ticks
    prototype.playerDistance = function(){  
        
        var vector = this.playerVector();
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    };
    
    //Distance from player in a vector. If a 'length' is specified, the
    //vector will be of that length instead.
    prototype.playerVector = function(length){
        
        var vector = {x: Game.player.x - this.x, y: Game.player.y - this.y};
        
        if(!length)
            return vector;
        
        var pLength = this.playerDistance();
        vector.x = length * vector.x / pLength;
        vector.y = length * vector.y / pLength;
        
        return vector;
    };
    
    //angle from player. radians by default unless inDegrees = true
    prototype.playerAngle = function(inDegrees){
        
        if(!inDegrees)
            inDegrees = false;
        
        var vector = this.playerVector();
        var rads = Math.atan2(vector.y, vector.x);
        
        if(inDegrees)
            return rads * (180 / Math.PI);
        else
            return rads;
    };
    
    prototype.triggerGhost = function(){
    
    };    
    
    prototype.state_initial = function(){
        
        this.statedef.changeState(this.defaultState);
    };
    
    prototype.state_stunned = function(){
        
        if(this.statedef.time == 1){

            this.stunned = true;
            var stunEffect = new CirclingParticleEffect(this);
            this.effectsManager.addEffect(stunEffect);
            
            this.statedef.onExitState = function(){
                this.stunned = false;
                this.effectsManager.clearEffect(stunEffect);
            }
        }
        
        if(this.statedef.time > this.stunTime) {
            
            this.statedef.changeState(this.defaultState);            
        }     
    };
    
    prototype.state_dying = function(){
        
        this.alpha -= 0.05;
        
        if(this.statedef.time == 20) 
            this.parent.removeChild(this);       
    }
        
    prototype.state_idle = function(){
        
    };
    
    Enemy = createjs.promote(Enemy, 'Container');
    Enemy.initialized = true;
})();