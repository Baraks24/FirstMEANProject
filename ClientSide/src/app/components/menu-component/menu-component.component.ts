import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Classes} from './interfaces/classes'


@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponentComponent implements OnInit {
  whatIsActive:string = 'home';
  constructor() {
   }
  ngOnInit() {
  }

  clicked(entity:string) : void {
    this.whatIsActive=entity;
  }

  

}
