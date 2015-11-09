ig.module(
    'game.entities.wall'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityWall = ig.Entity.extend({

            // The players (collision) size is a bit smaller than the animation
            // frames, so we have to move the collision box a bit (offset)
            size: {x: 20, y: 20},
            //offset: {x: 17, y: 10},

            //maxVel: {x: 400, y: 800},
            //friction: {x: 800, y: 0},

            //type: ig.Entity.TYPE.FIXED, // Player friendly group
            //checkAgainst: ig.Entity.TYPE.FIXED,
            collides: ig.Entity.COLLIDES.FIXED,

            animSheet: new ig.AnimationSheet( 'media/wall.png', 20, 20),

            health: 10,
            placed: false,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'normal', 1, [0]);
                this.currentAnim = this.anims.normal;

                //Set a reference to the player on the game instance
                //ig.game.player = this;
            },


            update: function() {
                if(!this.placed) {
                    this.pos.x = Math.floor( (ig.input.mouse.x) / this.size.x) * this.size.x ;
                    this.pos.y = Math.floor( (ig.input.mouse.y) / this.size.y) * this.size.y;
                }
                // Move!
                this.parent();
            },

            kill: function() {
                this.parent();
            }


            //receiveDamage: function( amount, from ) {
            //    if( this.currentAnim == this.anims.pain ) {
            //        // Already in pain? Do nothing.
            //        return;
            //    }
            //
            //    // We don't call the parent implementation here, because it
            //    // would call this.kill() as soon as the health is zero.
            //    // We want to play our death (pain) animation first.
            //    this.health -= amount;
            //    this.currentAnim = this.anims.pain.rewind();
            //
            //    // Knockback
            //    this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
            //    this.vel.y = -300;
            //
            //    // Sound
            //    this.sfxHurt.play();
            //}
        });


    });