function Tile(vars){
    
    this.Container_constructor(vars);
    
    this.type = vars.type ? vars.type : 'floor';
    this.width = 50;
    this.height = 50;
    this.room = vars.room;
    
    this.pushPriority = 99999;
    
    this.caresAbout = this.caresAbout ? this.caresAbout : {};

    this.rect = new createjs.Shape();
    this.addChild(this.rect);
    
    this.spriteName = vars.spriteName ? vars.spriteName : this.spriteName;
    this.color = vars.color ? vars.color : this.color;
    
    if(this.spriteName){
        this.sprite = SpriteManager.makeSprite(this.spriteName, false);
        this.addChild(this.sprite);
    }
    
    if(this.color){
        this.rect.graphics.beginFill(this.color).drawRect(this.width / -2, this.height / -2, 51, 51);
    }
};

(function(){
        
    var prototype = createjs.extend(Tile, createjs.Container);
    
    Tile = createjs.promote(Tile, 'Container');
    Tile.initialized = true;
    
})();