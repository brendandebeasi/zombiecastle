ig.module(
    'game.entities.zombiecastle'
)
    .requires(
    'impact.entity',
    'game.entities.zombie'
)
    .defines(function(){

        EntityZombieCastle = ig.Entity.extend({

            // The players (collision) size is a bit smaller than the animation
            // frames, so we have to move the collision box a bit (offset)
            size: {x: 20, y: 20},

            type: ig.Entity.TYPE.B, // Player friendly group
            collides: ig.Entity.COLLIDES.NONE,

            animSheet: new ig.AnimationSheet( 'media/zombieCastle.png', 20, 20),

            objectBeingPlaced: null,
            zombies: [],

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'normal', 1, [0]);
                this.currentAnim = this.anims.normal;

            },

            update: function() {
                this.parent();

                var random = Math.random();
                if(random > .99) {
                    this.zombies.push(ig.game.spawnEntity(EntityZombie, this.pos.x-20, this.pos.y-20))
                }
            },

            kill: function() {
                this.parent();
            }
        });


    });