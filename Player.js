var player = {
    x: 200,
    y: 200,
    Sz: 20,
    accel: 5,
    speed: 0,
    falling: false,
    jumpHeight: 9.7,
    hitPortal: false,
    superJump:false,
    respawn: {
        x: 200,
        y: 200
    },
    gravity: 0.8,
    yvel: 0,
    collideWith: function (xv, yv, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (this.y + this.Sz > b.y &&
                this.y < b.y + b.Sz &&
                this.x + this.Sz > b.x &&
                this.x < b.x + b.Sz && b.type2 === 1) {
                
                switch (b.type1) {
                    case 1:
                        if (yv > 0) {
                            this.yvel = 0;
                            this.falling = false;
                            this.y = b.y - this.Sz;
                        }
                        // TOP
                        if (yv < 0) {
                            this.yvel = 0;
                            this.falling = true;
                            this.y = b.y + b.Sz;
                        }
                        // RIGHT
                        if (xv > 0) {
                            this.speed = 0;
                            this.x = b.x - this.Sz;
                        }
                        // LEFT
                        if (xv < 0) {
                            this.speed = 0;
                            this.x = b.x + b.Sz;
                        }
                        break;
                    case 2:
                        this.x = this.respawn.x;
                        this.y = this.respawn.y;
                        this.yvel = 0;
                        break;
                    case 3:
                        this.hitPortal = true;
                        break;
                    case 4:
                        if (yv > 0) {
                            this.yvel = 0;
                            this.falling = false;
                            this.y = b.y - this.Sz;
                            this.superJump=true;
                        }
                        // TOP
                        if (yv < 0) {
                            this.yvel = 0;
                            this.falling = true;
                            this.y = b.y + b.Sz;
                        }
                        // RIGHT
                        if (xv > 0) {
                            this.speed = 0;
                            this.x = b.x - this.Sz;
                        }
                        // LEFT
                        if (xv < 0) {
                            this.speed = 0;
                            this.x = b.x + b.Sz;
                        }
                        break;
                }
            }

            if (this.y + this.Sz > b.y - b.Sz &&
                this.y < b.y + b.Sz * 2 &&
                this.x + this.Sz > b.x - b.Sz &&
                this.x < b.x + b.Sz * 2 && b.type2 === 2) {
                
                switch (b.type1) {
                    case 1:
                        if (yv > 0) {
                            this.yvel = 0;
                            this.falling = false;
                            this.y = b.y - b.Sz - this.Sz;
                        }
                        // TOP
                        if (yv < 0) {
                            this.yvel = 0;
                            this.falling = true;
                            this.y = b.y + b.Sz * 2;
                        }
                        // RIGHT
                        if (xv > 0) {
                            this.speed = 0;
                            this.x = b.x - b.Sz - this.Sz;
                        }
                        // LEFT
                        if (xv < 0) {
                            this.speed = 0;
                            this.x = b.x + b.Sz * 2;
                        }
                        break;
                    case 2:
                        this.x = this.respawn.x;
                        this.y = this.respawn.y;
                        this.yvel = 0;
                        break;
                    case 4:
                        if (yv > 0) {
                            this.yvel = 0;
                            this.falling = true;
                            this.y = b.y - b.Sz - this.Sz;
                            this.superJump=true;
                        }
                        // TOP
                        if (yv < 0) {
                            this.yvel = 0;
                            this.falling = true;
                            this.y = b.y + b.Sz * 2;
                        }
                        // RIGHT
                        if (xv > 0) {
                            this.speed = 0;
                            this.x = b.x - b.Sz - this.Sz;
                        }
                        // LEFT
                        if (xv < 0) {
                            this.speed = 0;
                            this.x = b.x + b.Sz * 2;
                        }
                        break;
                }
            }
        }
    },
    update: function (blocks) {
        if (keys[LEFT_ARROW]) {
            this.speed = -this.accel;
        } else if (keys[RIGHT_ARROW]) {
            this.speed = this.accel;
        } else {
            this.speed = 0;
        }
        if (keys[UP_ARROW] && !this.falling) {
            this.yvel = -this.jumpHeight;
        }
        if(this.superJump&&keys[32]){
            this.yvel=-14;
        }
        if (keys[82]) {
            this.x = this.respawn.x;
            this.y = this.respawn.y;
            this.yvel = 0;
        }
        this.x += this.speed;
        this.collideWith(this.speed, 0, blocks);
        this.y += this.yvel;
        this.yvel += this.gravity;
        this.falling = true;
        this.accel = 5;
        this.superJump=false;
        //this.feeding=false;
        this.collideWith(0, this.yvel, blocks);
    },
    show: function () {
        colorMode(RGB, 255, 255, 255, 255);
        stroke(255);
        strokeWeight(2)
        fill(128, 141, 255);
        if(level.value<=worldMap.length-2){
            rect(this.x, this.y, this.Sz, this.Sz);
        }
    },
    present: function () {
        this.update();
        this.show();
    }
};