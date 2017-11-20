import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Classes} from './interfaces/classes';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponentComponent implements OnInit {
  whatIsActive:string = 'home';
  constructor(public authenticationService:AuthenticationService) {
    const userToParse = localStorage.getItem('user');
    let user =  userToParse? JSON.parse(userToParse) : undefined;
    if (user) {
      this.authenticationService.user = user;
      
    }
   }
  ngOnInit() {
  }

  clicked(entity:string) : void {
    this.whatIsActive=entity;
  }

  disconnect():void{
    this.authenticationService.disconnect().subscribe((data) => {
      this.authenticationService.user = null;
      localStorage.removeItem('user');
    });
  }

  

}
