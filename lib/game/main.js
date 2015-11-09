ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'impact.debug.debug',

	'plugins.camera',

	'game.entities.player',
	'game.entities.castle',
	'game.entities.zombiecastle'
)
.defines(function(){

var MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	//images
	imgZombie: new ig.Image('media/zombie.png'),
	imgWall: new ig.Image('media/wall.png'),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.initMouse();
		ig.input.bind( ig.KEY.SHIFT, 'run');
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );

		ig.input.bind( ig.KEY.Q, 'buildWall');

		this.loadLevel();
	},

	loadLevel: function() {
		// The first part of the map is always the same
		var tileSize = 20;
		var mapSize = 2000;
		var tiles = mapSize/tileSize;

		var map = [];
		var bgMap = [];

		for(var i=0;i< tiles;i++) {

			var row = [];
			var bgRow = [];

			for(var j=0;j<tiles;j++) {

				//if we're on the top or bottom row, make solid
				if(i==0 || i == (tiles - 2)) {
					row.push(1);
					bgRow.push(2);
				}
				//if we're on the left or right edge, make solid
				else if(j==0 || j == (tiles-1)) {
					row.push(1);
					bgRow.push(2);
				}
				else {
					row.push(0);
					bgRow.push(1);
				}
			}
			map.push(row);
			bgMap.push(bgRow);
		}
		this.map = map;
		this.bgMap = bgMap;

		// The map is used as CollisionMap AND BackgroundMap
		this.collisionMap = new ig.CollisionMap( 20, this.map );
		this.backgroundMaps.push( new ig.BackgroundMap(20, this.bgMap, 'media/tiles.png' ) );


		this.player = ig.game.spawnEntity(EntityPlayer, 100, 100);
		this.castle = ig.game.spawnEntity(EntityCastle, 80, 80);
		this.zombieCastle = ig.game.spawnEntity(EntityZombieCastle, mapSize - (tileSize*10), mapSize - (tileSize*10));
		this.setupCamera();
	},

	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.
		this.camera = new ig.Camera( ig.system.width/3, ig.system.height/3, 3 );

		// The camera's trap (the deadzone in which the player can move with the
		// camera staying fixed) is set to according to the screen size as well.
		this.camera.trap.size.x = ig.system.width/10;
		this.camera.trap.size.y = ig.system.height/3;

		// The lookahead always shifts the camera in walking position; you can
		// set it to 0 to disable.
		this.camera.lookAhead.x = 0;

		// Set camera's screen bounds and reposition the trap on the player
		this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
		this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
		this.camera.set( this.player );
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		this.camera.follow( this.player );
	},

	draw: function() {
		this.parent();
		this.font.draw('Health: ' + this.player.health, 20, 20);
		this.font.draw('Stone: ' + this.castle.assets.stone, 20, 30);
		this.font.draw('Wood: ' + this.castle.assets.wood, 20, 40);
		this.font.draw('Water: ' + this.castle.assets.water, 20, 50);
		this.font.draw('Food: ' + this.castle.assets.food, 20, 60);
		this.font.draw('Build Wall: Q' , 20, 70);
	}
});

	window.addEventListener('resize', function(){
		// If the game hasn't started yet, there's nothing to do here
		if( !ig.system ) { return; }

		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );

		// Re-center the camera - it's dependend on the screen size.
		if( ig.game && ig.game.setupCamera ) {
			ig.game.setupCamera();
		}

		//// Also repositon the touch buttons, if we have any
		//if( window.myTouchButtons ) {
		//	window.myTouchButtons.align();
		//}
	}, false);

	var scale = 1;


	// We want to run the game in "fullscreen", so let's use the window's size
	// directly as the canvas' style size.
	var canvas = document.getElementById('canvas');
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';



	var width = window.innerWidth * scale,
	height = window.innerHeight * scale;

	ig.main( '#canvas', MyGame, 60, width, height, 1);

});
