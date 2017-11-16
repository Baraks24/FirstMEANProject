import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import {Observable } from 'rxjs/Rx';
import {SnakeClass} from './classes/snake-class';
import {Point} from './interfaces/point';
import {PointWithDirection} from './interfaces/point-with-direction';

export enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW=38,
  RIGHT_ARROW = 39,
  DOWN_ARROW=40
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnakeComponent implements OnInit {
  width:number;
  height:number;
  submit:boolean;
  grid:number[][];
  snake:SnakeClass;
  food:Point;
  constructor() {
    this.submit=false;
    this.grid=[];
   }

   @HostListener('window:keyup', ['$event'])
   keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.snake.setDirection(0,-1);
    }
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.snake.setDirection(-1,0);
    }
     if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.snake.setDirection(0,1);
     }
 
     if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.snake.setDirection(1,0);
     }
   }

  ngOnInit() {
  }

  pointInSnake(point:Point):boolean{
    for(let s of this.snake.points){
      if(s.location.x==point.x && s.location.y==point.y){
        return false;
      }
      return true;
    }
  }

  randomPoint():Point{
    let point:Point = {
      x : Math.floor(Math.random() * (this.width)), 
      y : Math.floor(Math.random() * (this.height)) 
    }
    while(!this.pointInSnake(point)){
      point.x = Math.floor(Math.random() * (this.width+1));  
      point.y = Math.floor(Math.random() * (this.height+1)); 
    }
    return point;
  }

  initSnake():void{
    let init_x:number = Math.floor(this.width/2);
    let init_y:number = Math.floor(this.height/2);
    this.snake=new SnakeClass(init_x,init_y,1,0,this.width,this.height);
    this.grid[init_x][init_y]=1;
  }

  putFood():void{
    this.food = this.randomPoint();
    this.grid[this.food.x][this.food.y]=2;
  }

  draw():void{
    let i:number;
    let j:number;
    for(i=0;i<this.height;i++){
      this.grid[i]=[];
      for(j=0;j<this.width;j++){
        this.grid[i][j]=0;
      }
    }
    for(let o of this.snake.points){
      this.grid[o.location.x][o.location.y]=1;
    }
    this.grid[this.food.x][this.food.y]=2;
  }

  moveAndEat():void{
    let prevTailPoint:Point = this.snake.getTail();
    this.snake.move();
    let headPoint:Point = this.snake.getHead();
    let eat:boolean=this.grid[headPoint.x][headPoint.y]==2;
    this.grid[headPoint.x][headPoint.y]=1;
    this.grid[prevTailPoint.x][prevTailPoint.y]=eat?1:0;
    if(eat){
      this.snake.eat();
      this.putFood(); 
    }

  }

  submitGridDims():void{
    if(this.width&&this.height){
      this.submit=true;
    }
    let i:number;
    let j:number;
    for(i=0;i<this.height;i++){
      this.grid[i]=[];
      for(j=0;j<this.width;j++){
        this.grid[i][j]=0;
      }
    }
    this.initSnake();
    this.putFood();
    Observable.interval(100).subscribe(() => this.moveAndEat());
    Observable.interval(1000).subscribe(() => this.draw());
  }

}
