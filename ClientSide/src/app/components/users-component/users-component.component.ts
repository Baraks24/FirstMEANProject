import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data/data.service';
interface User{
  firstName:string;
  lastName:string;
  email:string;
}
@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class UsersComponentComponent implements OnInit {
  usersList:User[] = [];
  constructor(private dataService:DataService) {
    this.dataService.getUsers().subscribe((data) => {
      for(let user of data){
        this.usersList.push({
          firstName:user.firstName,
          lastName:user.lastName,
          email:user.email
        });
      }
    });

   }

  ngOnInit() {
  }

}


