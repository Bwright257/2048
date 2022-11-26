'use strict'

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let cx = canvas.width/2;
let cy = canvas.height/2;
canvas.tabIndex = 0;
canvas.addEventListener("keydown", MyHandler);

let backCanvas = document.getElementById("backCanvas");
let bctx = backCanvas.getContext('2d');

let tiles = [];

InitBoard();

function InitBoard(){
    let yCen = [75,225,375,525];
    for (let i = 0; i < 16; i++){
        let xCen = ((75+(150*i))%600);
        let tile = new Tile(i,xCen,yCen[Math.ceil((i+1)/4)-1]);
        tiles.push(tile);
    }
    GenerateTiles(2);
}

function GenerateTiles(count){
    for (let i = 0; i < count; i++){
        let tile = Math.floor(Math.random()*16)

        if (BoardFull()){
            i = count;
        }

        if (!tiles[tile].GetOccupied()){
            tiles[tile].SetOccupied(true);
        } else {
            i--;
        } 
    }
    DisplayTiles();
}

function DisplayTiles(){
    for (let i = 0; i < tiles.length; i++){
        tiles[i].Display(ctx);
    }
    Background();
}

function ResetTiles(){
    for (let i = 0; i < 16; i++){
        if (tiles[i].GetOccupied()){
            tiles[i].Reset();
        }
    }
    moveCount = 0;
    GenerateTiles(2);
}

function ClearCanvas(){
    bctx.clearRect(0,0,2*cx,2*cy);
    ctx.clearRect(0,0,2*cx,2*cy);
}

function BoardFull(){
    let occuArray = [];
    for (let i = 0; i < tiles.length; i++){
        occuArray[i] = tiles[i].GetOccupied();
    }
    occuArray.sort((x,y) => Number(x)-Number(y));

    return occuArray[0];
}

function Background(){
    bctx.beginPath();
    bctx.fillStyle = "rgba(255, 255, 255, 1.0)";
    bctx.lineWidth = 2;

    DrawRects(0, 0);
    DrawRects(cy/2, 4);
    DrawRects(cy, 8);
    DrawRects(3*cy/2, 12);

    bctx.lineWidth = 1;
}

function DrawRects(y, index){
    let sx = [2,cx/2+2,cx+2,3*cx/2+2];

    bctx.globalAlpha = 0.3;
    for (let i = 0; i < 4; i++){
        if (tiles[index + i].GetOccupied()){
            bctx.fillRect(sx[i],y+2,cx/2-4,cy/2-4);
        }
        bctx.fillRect(sx[i],y+2,cx/2-4,cy/2-4);
    }

    bctx.globalAlpha = 1.0;
    bctx.strokeRect(2,y+2,cx/2-4,cy/2-4);
    bctx.strokeRect(cx/2+2,y+2,cx/2-4,cy/2-4);
    bctx.strokeRect(cx+2,y+2,cx/2-4,cy/2-4);
    bctx.strokeRect(3*cx/2+2,y+2,cx/2-4,cy/2-4);
}