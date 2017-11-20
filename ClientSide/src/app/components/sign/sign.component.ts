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
  }


  login(): void {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.authenticationService.user = data;
    });
  }

}
