function Load(set,map){
    map.forEach(function(elements,i,map){
        for(var j=0;j<map[i].length;j++){
            var id=map[i][j];
            switch(id){
                case '1':
                    set.push(new Block(j*50,i*50,1,1));
                break;
                case '2':
                    set.push(new Block(j*50,i*50,1,2));
                break;
                case 'X':
                    set.push(new Block(j*50,i*50,2,1));
                break;
                case 'x':
                    set.push(new Block(j*50,i*50,2,2));
                break;
                case 'I':
                    set.push(new Block(j*50,i*50,4,1));
                break;
                case 'i':
                    set.push(new Block(j*50,i*50,4,2));
                break;
                case 'O':
                    set.push(new Block(j*50,i*50,3,1));
                break;
                case 'P':
                    player.x=j*50;
                    player.y=i*50;
                    player.respawn.x=j*50;
                    player.respawn.y=i*50;
                break;
            }
        }
    });
    level.width=map[0].length;
    level.height=map.length;
}
function Erase(set){
    set.length=0;
}