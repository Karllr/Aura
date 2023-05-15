{
    var backgroundd = {
        titleTrans:0,
        transSpeed:2,
        x: 200,
        y: 200,
        antiX: 200,
        antiY: 200,
        radi: 200,
        r: 0,
        recTion: {
            height: [],
            x: [],
            AntiHeight:[]
        },
        otherHeights: {
            now: [],
            goal: []
        },
        execute:function(){
            textFont(font, 50);
            for (var i = 0; i < this.recTion.x.length; i++) {
                colorMode(HSB, 360, 100, 100, 100);
                fill(hu.now[i], 50, 50, 100);
                stroke(10);
                strokeWeight(5);
                rect(this.recTion.x[i], height / 2 - this.recTion.height[i] / 2, width / 20 - 10, this.recTion.height[i], 10);
                this.recTion.x[i] -= 0 + amp.getLevel() * 20;
                this.recTion.height[i]=lerp(this.recTion.height[i],this.recTion.AntiHeight[i],0.05);
                if(frameCount%5===0){
                    this.recTion.AntiHeight[i]=randomGaussian(amp.getLevel()*1000,100);
                }
                if (this.recTion.x[i] < -width / 20 + 10) {
                    this.recTion.x[i] = width * 2;
                }
            }
            colorMode(RGB, 255, 255, 255, 255);
            push();
            translate(this.x, this.y);
            translate(0, 14 * sin(frameCount / 21));
            fill(40);
            stroke(10);
            strokeWeight(5);
            ellipse(0, 0, this.radi, this.radi);
            noStroke();
            fill(255);
            text("KARLLR", 0, 0);
            rotate(this.r)
            for (var i = 0; i < 10; i++) {
                colorMode(HSB, 360, 100, 100, 100)
                fill(hu.now[i], 50, 100, 100);
                rotate(PI / 5);
                rect(this.radi / 2 + 10, -25, this.otherHeights.now[i], 50, 10);
                gradient(color(hu.now[i], 50, 100, 100), color(hu.now[i], 30, 100, 100), this.radi / 2 + 10, -25, this.otherHeights.now[i], 50, 2);
                hu.now[i] = lerp(hu.now[i], hu.goal[i], 0.05);
                colorMode(RGB, 255, 255, 255, 255);
                noFill();
                stroke(20);
                strokeWeight(5);
                rect(this.radi / 2 + 10, -25, this.otherHeights.now[i], 50);
                stroke(10);
                rect(this.radi / 2 + 10, -25, this.otherHeights.now[i], 50, 10);
                this.otherHeights.now[i] = lerp(this.otherHeights.now[i], this.otherHeights.goal[i], 0.1);
            }
            pop();
            this.x = lerp(this.x, this.antiX, 0.05);
            this.y = lerp(this.y, this.antiY, 0.05);
            this.radi = lerp(this.radi, 200, 0.05);
            this.r += PI / 180;
            if (amp.getLevel() * 100 > 35) {
                this.radi = 200 + amp.getLevel() * 200;
                for (var i = 0; i < hu.goal.length; i++) {
                    hu.goal[i] = random(0, 360);
                    this.otherHeights.goal[i] = randomGaussian(100, 25);
                }
            }
            fill(20, 0);
            rect(0, 0, width, height);
            this.antiX+=0.5+amp.getLevel()*20;
            if(this.antiX>width+amp.getLevel()*200+200){
                this.x=-amp.getLevel()*200-200;
                this.antiX=-amp.getLevel()*200-200;
            }
            if(level.value>=worldMap.length-1){
                this.antiX=width/2;
                this.antiY=height/2;
                fill(255);
                noStroke();
                text("Thanks for Playing!",width/2, height*6/8);
                text("Reload to Play Again",width/2, height*7/8);
            }
            noStroke();
            fill(255,this.titleTrans);
            textSize(30);
            text("Arrows to move, Use spacebar on green blocks",width/2, height*1/8);
            this.titleTrans+=this.transSpeed;
            if(this.titleTrans>255){
                this.transSpeed=-5;
            }
            if(this.titleTrans<0&&frameCount<2000){
                this.transSpeed=5;
            }
        }
    };
    var hu = {
        now: [],
        goal: []
    };
    //The great old apex function
    function gradient(col1, col2, x, y, w, h, quality, r) {
        noStroke();
        push();
        translate(x + (w / 2), y + (h / 2));
        rotate(r);
        translate(-w / 2, -h / 2);
        for (var A = 0; A < h; A += quality) {
            fill(lerpColor(col1, col2, A / h));
            rect(0, A, w, quality);
        }
        pop();
    }
}
function Game() {
    push();
    translate(width/2,height/2);
    translate(-level.width*25,-level.height*25);
    player.update(blocks);
    player.show();
    blocks.forEach(function(elements,i,blocks){
        blocks[i].show();
    });
    pop();
    if(player.hitPortal){
        level.value++;
        Erase(blocks);
        Load(blocks,worldMap[level.value]);
        player.yvel=0.1;
        player.hitPortal=false;
    }
}