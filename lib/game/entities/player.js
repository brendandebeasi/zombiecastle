ig.module(
    'game.entities.player'
)
    .requires(
    'impact.entity',
    'game.entities.wall'
)
    .defines(function(){

        EntityPlayer = ig.Entity.extend({

            // The players (collision) size is a bit smaller than the animation
            // frames, so we have to move the collision box a bit (offset)
            size: {x: 30, y: 30},
            //offset: {x: 17, y: 10},

            //maxVel: {x: 400, y: 800},
            //friction: {x: 800, y: 0},

            type: ig.Entity.TYPE.A, // Player friendly group
            //checkAgainst: ig.Entity.TYPE.PASSIVE,
            collides: ig.Entity.COLLIDES.PASSIVE,

            animSheet: new ig.AnimationSheet( 'media/player.png', 30, 30),

            health: 3,
            speedNormal: 300,
            speedRun: 600,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'player', 1, [0]);
                this.currentAnim = this.anims.player;

                 //Set a reference to the player on the game instance
                //ig.game.player = this;
            },


            update: function() {
                var speed;

                if(ig.input.state('run')) {
                    speed = this.speedRun;
                } else {
                    speed = this.speedNormal;
                }
                this.maxVel = {x: speed,y:speed};

                if( ig.input.state('up') ) {
                    this.vel.y = -speed;
                }
                else if( ig.input.state('down') ) {
                    this.vel.y = speed;
                }
                else {
                    this.vel.y = 0;
                }

                if( ig.input.state('left') ) {
                    this.vel.x = -speed;
                }
                else if( ig.input.state('right') ) {
                    this.vel.x = speed;
                }
                else {
                    this.vel.x = 0
                }


                // Move!
                this.parent();
            },

            kill: function() {
                this.parent();
            },


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