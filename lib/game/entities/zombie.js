ig.module(
    'game.entities.zombie'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityZombie = ig.Entity.extend({

            // The players (collision) size is a bit smaller than the animation
            // frames, so we have to move the collision box a bit (offset)
            size: {x: 24, y: 30},

            maxVel: {x: 300, y: 300},
            minSpeed: 80,
            //friction: {x: 800, y: 0},

            type: ig.Entity.TYPE.B, // Player friendly group
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,

            animSheet: new ig.AnimationSheet( 'media/zombie.png', 24, 30),

            health: 2,
            timer: null,
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'normal', 1, [0]);
                this.currentAnim = this.anims.normal;

                this.timer = new ig.Timer();
                this.chooseDirection();
                this.timer.set(1.5);
            },

            chooseDirection: function() {
                var direction;
                var speed;
                //x
                direction = Math.floor(Math.random() * 2)+1;
                speed = Math.floor(Math.random() * 300);
                if(speed<this.minSpeed) speed = this.minSpeed;

                if(direction == 1) {
                    this.vel.x = speed;
                } else if(direction == 2) {
                    this.vel.x = -speed;
                } else {
                    this.vel.x = 0;
                }
                //y
                direction = Math.floor(Math.random() * 2)+1;
                speed = Math.floor(Math.random() * 300);
                if(speed<this.minSpeed) speed = this.minSpeed;

                if(direction == 1) {
                    this.vel.y = speed;
                } else if(direction == 2) {
                    this.vel.y = -speed;
                } else {
                    this.vel.y = 0;
                }

                if(this.vel.x == 0 && this.vel.y == 0) this.chooseDirection();
            },
            check: function( other ) {
                this.chooseDirection();
            },
            update: function() {
                if(this.timer.delta() > 0) {
                    this.chooseDirection();
                    this.timer.set(1.5);
                }

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