import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {
  wrapperIsActive:boolean = true;
  arrow:string = 'arrow_back';
  constructor() { }

  ngOnInit() {
  }

  moveMenu():void{
    this.arrow=this.arrow=='arrow_back'?this.arrow='arrow_forward':'arrow_back';
  }

}
