import { PointWithDirection } from '../interfaces/point-with-direction';
import { Point } from '../interfaces/point';

export class SnakeClass {
    points:PointWithDirection[];
    width:number;
    height:number;
    changesInd:number[];
    constructor(public init_x:number,public init_y:number,public init_direction_x:number,public init_direction_y:number,width:number,height:number){
        this.width=width;
        this.height=height;
        this.points=[];
        this.changesInd=[];
        let location:Point = {
            x:init_x,
            y:init_y
        };
        let direction:Point = {
            x:init_direction_x,
            y:init_direction_y
        };
        this.points.push({
            location:location,
            direction:direction
        });
    }

    getHead():Point{
        return {
            x:this.points[0].location.x,
            y:this.points[0].location.y
        };
    }

    getTail():Point{
        return {
            x:this.points[this.points.length-1].location.x,
            y:this.points[this.points.length-1].location.y
        };
    }

    setDirection(x:number,y:number):void{
        let prevDirection = this.points[0].direction;
        let scalarMult = prevDirection.x*x+prevDirection.y*y;
        if(!(scalarMult==1 || scalarMult==-1)){
            this.points[0].direction={
                x:x,
                y:y
            };
            this.changesInd.push(0);
        }
       
    }

    eat():void{
        let lastPoint = this.points[this.points.length-1];
        let newPointLocation = {
            x:(lastPoint.location.x-lastPoint.direction.x)%this.width,
            y:(lastPoint.location.y-lastPoint.direction.y)%this.height
        };
        let newPointDirection = {
            x:lastPoint.direction.x,
            y:lastPoint.direction.y
        };
        let newPoint:PointWithDirection={
            location:newPointLocation,
            direction:newPointDirection
        };
        this.points.push(newPoint);
    }

    movePoint(location:Point,direction:Point):Point{
        let newPointLocation = {
            x:(this.width+location.x+direction.x)%this.width,
            y:(this.height+location.y+direction.y)%this.height
        };
        return newPointLocation;
    }

    move():void{   
        let i:number;
        for(let i=0;i<this.points.length;i++){
            this.points[i].location = this.movePoint(this.points[i].location,this.points[i].direction);
        }
        for(let i in this.changesInd){
            let index = this.changesInd[i];
            if(index>=this.points.length-1){
                this.changesInd[i]=null;
            }
            else{
                this.points[index+1].direction=this.points[index].direction; 
                this.changesInd[i]++;
            }
        }
        this.changesInd =  this.changesInd.filter(x => x!=null);
    }


}
