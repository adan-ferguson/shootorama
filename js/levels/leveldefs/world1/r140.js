RoomDefs.r140 = {
    
    init: function(){
        
        this.room.playerSpawnPoint = {x: 500, y: 250};
        this.room.setBgColor('#EEF');   

        makeTiles.call(this);
        makeObjects.call(this);
        

        function makeTiles(){
            
            var grid = 
                [//0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
                ['b','w',' ',' ','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 0
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 1
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 2
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 3
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 4
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 5
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], // 6
                ['w',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','w'], // 7
                ['b','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','b'], // 8
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 9
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b'], // 10
                ['b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b']]; // 11
            
            var tiles = {
                'w': {type: Wall}, 
                'b': {type: Tile, params: {color: 'black'} }
            };
            
            this.room.tileGrid.setGrid(tiles, grid);
        };
        
        function makeObjects(){
            
            this.room.addText({               

                text: 'Use arrow keys or WSAD to move',
                color: '#FFF',
                x: 500,
                y: 480,
                textAlign: 'center'                    
            });     

            this.room.addText({                   
                text: 'Tutorial ->',
                color: 'rgba(0, 0, 0, 0.4)',
                x: 920,
                y: 282,
                textAlign: 'right'                    
            });
            
            var door = new Door({x: 100, y: 15, width: 100, height: 20, type: 'shootable'});
            this.room.addObject(door);
            
            this.room.addObject(new Turret({x: 300, y: 35, facing: 0, damage: 2}));
        };
    }
};