'use strict'

let moveCount = 0;

let canMoveUp = true, 
    canMoveLeft = true, 
    canMoveDown = true, 
    canMoveRight = true, 
    canMove = true;

function MyHandler(evnt){
    let key = evnt.key;

    let direction;
    if (CanMove() && !BeatTheGame()){
        switch(key){
            case 'W': case 'w':
                direction = "up";
                break;
            case 'A': case 'a':
                direction = "left";
                break;
            case 'S': case 's':
                direction = "down";
                break;
            case 'D': case 'd':
                direction = "right";
                break;
            case 'R': case 'r':
                ClearCanvas();
                ResetTiles();
                break;
        }
        
        if ((direction == "up" && canMoveUp) || (direction == "left" && canMoveLeft) || 
            (direction == "down" && canMoveDown) || (direction == "right" && canMoveRight)){
            ClearCanvas();
            /*
            let oldValArray = [];
            for (let i = 0; i < tiles.length; i++){
                oldValArray[i] = tiles[i].GetValue();
            }
            */
            MoveTiles(direction);
            IsGameRunning();
            /*
            let newValArray = [];
            for (let ii = 0; ii < tiles.length; ii++){
                newValArray[ii] = tiles[ii].GetValue();
            }

            let sameArray = [];
            for (let iii = 0; iii < tiles.length; iii++){
                if (newValArray[iii] == oldValArray[iii]){
                    sameArray[iii] = true;
                } else {
                    sameArray[iii] = false;
                }
            }
            
            sameArray.sort((x,y) => Number(x)-Number(y));
            if (sameArray[0] == true){
                canMoveUp = false; //or canMoveLeft = false or canMoveDown = false or canMoveRight = false
            } else {
                canMoveUp = true;
            }
            IsGameRunning();*/
        } 
    }
    console.log(`Move: ${moveCount}`);
}

function MoveTiles(direction){
    moveCount++;

    switch (direction){
        case "up":
            for (let i = 0; i < tiles.length; i++){
                if (tiles[i].GetIndex() > 3){
                    CalcTileMove(i,[0,1,2,3],direction,-4);
                }
            }
            break;
        case "left":
            for (let i = 0; i < tiles.length; i++){
                if (tiles[i%4].GetIndex() != 0){
                    CalcTileMove(i,i%4,direction,-1);
                }
            }
            break;
        case "down":
            for (let i = tiles.length - 1; i >= 0; i--){
                if (tiles[i].GetIndex() < 12){
                    CalcTileMove(i,[3,2,1,0],direction,4);
                }
            }
            break;
        case "right":
            for (let i = tiles.length - 1; i >= 0; i--){
                if (tiles[i%4].GetIndex() != 3){
                    CalcTileMove(i,Swap(i%4),direction,1);
                }
            }
            break;
    }
}

function CalcTileMove(index,valIndex,direction,dirVal){
    let newIndex = index;

    if (tiles[index].GetOccupied()){
        let moveIndex = 0;
        let maxMove = 0;

        if (direction == "up" || direction == "down"){
            maxMove = MaxMoveSwitch(index,valIndex);
        } else if (direction == "left" || direction == "right"){
            maxMove = valIndex;
        } 
    
        for (let i = 1; i <= maxMove; i++){
            if ((direction == "up" && !tiles[index-(i*4)].GetOccupied()) || 
            (direction == "down" && !tiles[index+(i*4)].GetOccupied()) || 
            (direction == "left" && !tiles[index-i].GetOccupied()) || 
            (direction == "right" && !tiles[index+i].GetOccupied())){
                moveIndex++;
            } else {
                i = maxMove + 1;
            }
            newIndex = index+(moveIndex*dirVal);
        }

        MoveAndCombineTiles(index,newIndex,moveIndex,direction,dirVal);
    }
}

function MoveAndCombineTiles(index,newIndex,moveIndex,direction,dirVal){
    if (moveIndex > 0){
        let tmpValue = tiles[index].GetValue();
        tiles[index].SetOccupied(false);
        tiles[newIndex].SetOccupied(true);
        tiles[newIndex].SetValue(tmpValue);
    }

    if ((direction == "up" && tiles[newIndex].GetIndex() > 3) ||
        (direction == "down" && tiles[newIndex].GetIndex() < 12) ||
        (direction == "left" && tiles[newIndex%4].GetIndex() != 0) ||
        (direction == "right" && tiles[newIndex%4].GetIndex() != 3)){
        CombineTiles(newIndex,dirVal);
    }
}

function CombineTiles(newIndex,indexDir){
    if (tiles[newIndex+indexDir].GetOccupied()){
        if (tiles[newIndex].GetValue() == tiles[newIndex+indexDir].GetValue()){
            tiles[newIndex].SetOccupied(false);
            tiles[newIndex+indexDir].SetValue(tiles[newIndex+indexDir].GetValue()+1);
        }
    }
}

function MaxMoveSwitch(index,valIndex){
    let maxMove = 0;
    switch (tiles[index].GetIndex()){
        case 0: case 1: case 2: case 3:
            maxMove = valIndex[0];
            break;
        case 4: case 5: case 6: case 7:
            maxMove = valIndex[1];
            break;
        case 8: case 9: case 10: case 11:
            maxMove = valIndex[2];
            break;
        case 12: case 13: case 14: case 15:
            maxMove = valIndex[3];
            break;
    }
    return maxMove;
}

function Swap(num){
    let swapped = 0;
    switch (num){
        case 0:
            swapped = 3;
            break;
        case 1:
            swapped = 2;
            break;
        case 2:
            swapped = 1;
            break;
        case 3:
            swapped = 0;
            break;
    }
    return swapped;
}

function IsGameRunning(){
    if (BeatTheGame()){
        console.log("You won!");
        DisplayTiles();
    } else if (!CanMove()){
        console.log("You lost.");
    } else {
        GenerateTiles(1);
    }
}

function BeatTheGame(){
    let won = false;
    for (let i = 0; i < tiles.length; i++){
        if (tiles[i].GetValue() == 11){
            won = true;
        }
    }
    return won;
}

function CanMove(){
    if (!canMoveUp && !canMoveLeft && !canMoveDown && !canMoveRight){
        canMove = false;
    }
    return canMove || (BoardFull() && !canMove);
}