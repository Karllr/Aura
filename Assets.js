function Block(x, y, type1, type2) {
    this.x = x;
    this.y = y;
    this.type1 = type1;
    this.type2 = type2;
    this.Sz = 50;
    this.show = function () {
        noStroke();
        switch (this.type1) {
            case 1:
                //Normal Block
                fill(50);
                stroke(50);
            break;
            case 2:
                //Death Blocks
                fill(255, 95, 95);
                stroke(255, 95, 95);
            break;
            case 3:
                //Portal
                fill(255, 147, 231);
            break;
            case 4:
                //Trampoline
                fill(120, 255, 169);
                stroke(120, 255, 169);
            break;
        }
        rect(this.x, this.y, this.Sz, this.Sz);
        if (this.type2 === 2) {
            switch (this.type1) {
                case 1:
                    fill(50, 100);
                break;
                case 2:
                    fill(255, 95, 95, 100);
                break;
                case 4:
                    fill(120, 255, 169, 100);
                break;
            }
            rect(this.x - this.Sz, this.y - this.Sz, this.Sz * 3, this.Sz * 3);
            fill(255);
            ellipse(this.x + this.Sz / 2, this.y + this.Sz / 2, 15, 15);
        }
    };
}