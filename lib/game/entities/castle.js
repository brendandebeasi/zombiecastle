ig.module(
    'game.entities.castle'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityCastle = ig.Entity.extend({

            // The players (collision) size is a bit smaller than the animation
            // frames, so we have to move the collision box a bit (offset)
            size: {x: 20, y: 20},

            type: ig.Entity.TYPE.A, // Player friendly group
            checkAgainst: ig.Entity.TYPE.PASSIVE,
            collides: ig.Entity.COLLIDES.FIXED,

            animSheet: new ig.AnimationSheet( 'media/castle.png', 20, 20),

            assets: {
                stone: 300,
                wood: 300,
                water: 300,
                food: 300
            },

            walls: [],
            objectBeingPlaced: null,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'normal', 1, [0]);
                this.currentAnim = this.anims.normal;

            },

            update: function() {
                this.parent();

                if(ig.input.pressed('buildWall')) {
                    if(this.objectBeingPlaced == null && this.assets.stone >= 20) {
                        this.objectBeingPlaced = ig.game.spawnEntity(EntityWall, ig.input.mouse.x, ig.input.mouse.y);
                    }
                    else {
                        this.objectBeingPlaced.placed = true;
                        this.walls.push(this.objectBeingPlaced);
                        this.objectBeingPlaced = null;
                        this.assets.stone -= 20;
                    }
                }

            },

            kill: function() {
                this.parent();
            }
        });


    });