Main.manifest = [];

//scripts
Main.manifest.push(

    "js/playingArea.js",
    
    "js/items/item.js",
    "js/items/buyableItem.js",
    "js/items/coin.js",
    "js/items/health.js",
    "js/items/key.js",
    
    "js/weapons/line.js",
    "js/weapons/enemyProjectile.js",
    
    "js/effects/circlingParticleEffect.js",
    "js/effects/colorEffect.js",
    "js/effects/expandingParticleEffect.js",
    "js/effects/textEffect.js",
    "js/effects/ringEffect.js",
    "js/effects/scaleEffect.js",
    
    "js/managers/collisionManager.js",
    "js/managers/controlsManager.js",
    "js/managers/effectsManager.js",
    "js/managers/hitManager.js",
    "js/managers/itemManager.js",
    "js/managers/movementManager.js",
    "js/managers/spriteManager.js",
    "js/managers/weaponManager.js",
    
    "js/player/illusion.js",
    "js/player/player.js",
    
    "js/enemies/enemy.js",
    "js/enemies/enemyHealthMeter.js",
    "js/enemies/statedef.js",
    
    "js/enemies/enemydefs/ghost.js",
    "js/enemies/enemydefs/ghostArmored.js",
    "js/enemies/enemydefs/ghostBig.js",
    "js/enemies/enemydefs/ghostFast.js",
    "js/enemies/enemydefs/ghostTutorial1.js",
    "js/enemies/enemydefs/ghostTutorial2.js",
    "js/enemies/enemydefs/ghostTutorial3.js",
    
    "js/terrain/background.js",
    "js/terrain/chest.js",
    "js/terrain/trigger.js",
    "js/terrain/transitionTrigger.js",
    "js/terrain/turret.js",
    "js/terrain/vendor.js",
    "js/terrain/wall.js",
    
    "js/hud/coinCounter.js",
    "js/hud/dashMeter.js",
    "js/hud/healthMeter.js",
    "js/hud/hudArea.js",
    "js/hud/keyCounter.js",
    
    "js/levels/room.js",
    "js/levels/level.js",
    "js/levels/leveldefs/world1/r120.js",
    "js/levels/leveldefs/world1/r121.js",
    "js/levels/leveldefs/world1/r130.js",
    "js/levels/leveldefs/world1/r131.js",
    "js/levels/leveldefs/world1/r132.js",
    "js/levels/leveldefs/world1/r140.js",
    "js/levels/leveldefs/world1/r141.js",
    "js/levels/leveldefs/world1/r142.js",
    "js/levels/leveldefs/world1.js"
);

//images
Main.manifest.push(
    
    {id: 'chest', src: 'img/chest.png'},
    {id: 'chestlocked', src: 'img/chestlocked.png'},
    {id: 'coin', src: 'img/coin.png'},
    
    {id: 'fire', src: 'img/fire.png'},
    
    {id: 'ghost', src: 'img/ghost.png'},
    {id: 'ghostBlue', src: 'img/ghostBlue.png'},
    {id: 'ghostOrange', src: 'img/ghostOrange.png'},
    {id: 'ghostRed', src: 'img/ghostBlue.png'},
    
    {id: 'heart', src: 'img/heart.png'},
    {id: 'heartplus', src: 'img/heartplus.png'},
    
    {id: 'key', src: 'img/key.png'},
        
    {id: 'orbcoin', src: 'img/orbcoin.png'},
    {id: 'orbenergy', src: 'img/orbenergy.png'},
    {id: 'orbhealth', src: 'img/orbhealth.png'},
    
    {id: 'player', src: 'img/player.png'},
    {id: 'playerIllusion', src: 'img/playerIllusion.png'},
    
    {id: 'qmark', src: 'img/qmark.png'},
    
    {id: 'star', src: 'img/star.png'},    
    
    {id: 'turret', src: 'img/turret.png'},
    
    {id: 'vendor', src: 'img/vendor.png'}

    
);