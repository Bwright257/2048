'use strict'

let tileValues = ["0","2","4","8","16","32","64","128","256","512","1024","2048"];

class Tile{
    constructor(index,xCen,yCen){
        this.Reset();
        this.index = index;
        this.xCen = xCen;
        this.yCen = yCen;
    }

    Reset(){
        this.occupied = false;
        this.value = 0;
    }

    GetIndex(){
        return this.index;
    }

    SetOccupied(occupied){
        this.occupied = occupied;

        if (this.occupied == false){
            this.SetValue(0);
        } else if (this.occupied == true){
            this.SetValue(1);
        } else {
            this.occupied = false;
            this.SetValue(0);
        }
    }

    GetOccupied(){
        return this.occupied;
    }

    SetValue(value){
        this.value = value;

        if (this.value > 11){
            this.value = 11;
        } else if (this.value < 0){
            this.value = 0;
        }
    }

    GetValue(){
        return this.value;
    }

    Display(ctx){
        if (this.occupied){
            ctx.beginPath();
        
            ctx.font = "bold 40pt Arial";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";

            let xTran = 0;
            switch (this.value){
                case 0: case 1: case 2: case 3:
                    xTran = -15;
                    break;
                case 4: case 5: case 6:
                    xTran = -30;
                    break;
                case 7: case 8: case 9:
                    xTran = -45;
                    break;
                case 10: case 11:
                    xTran = -60;
                    break;
            }

            ctx.fillText(tileValues[this.value],xTran+this.xCen,this.yCen+15);
            ctx.strokeText(tileValues[this.value],xTran+this.xCen,this.yCen+15);
        }
    }
}