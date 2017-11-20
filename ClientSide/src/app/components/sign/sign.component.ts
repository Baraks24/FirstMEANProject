import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignComponent implements OnInit {
  signForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  updateForm = new FormGroup({
    email: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  isSigned: boolean;
  constructor(public authenticationService: AuthenticationService) {
    if (!this.authenticationService.user) {
      const userToParse = localStorage.getItem('user');
      let user = userToParse ? JSON.parse(userToParse) : undefined;
      if (user) {
        this.authenticationService.user = user;
      }
    }

  }

  ngOnInit() {
  }

  submitForm(): void {
    this.authenticationService.signUp(this.signForm.value.email, this.signForm.value.password, this.signForm.value.firstName, this.signForm.value.lastName).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.authenticationService.user = data;
    });
  };

  updateUser():void{
    this.authenticationService.updateUser(this.updateForm.value.email,this.updateForm.value.firstName,this.updateForm.value.lastName).subscribe(
      (data) => {
        if(data.message == 'OK'){
          this.authenticationService.user['email'] = this.updateForm.value.email!=null?this.updateForm.value.email:this.authenticationService.user['email'];
          this.authenticationService.user['firstName'] = this.updateForm.value.firstName!=null?this.updateForm.value.firstName:this.authenticationService.user['firstName'];
          this.authenticationService.user['lastName'] = this.updateForm.value.lastName!=null?this.updateForm.value.lastName:this.authenticationService.user['lastName'];
          localStorage.setItem('user', JSON.stringify(this.authenticationService.user));
        }
       
      }
    );
  };


  login(): void {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.authenticationService.user = data;
    });
  }

}
