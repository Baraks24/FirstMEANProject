import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Config} from '../../config/config';

interface User{
  email:string;
  password:string;
  firstName:string;
  lastName:string;
}

interface loginReq{
  email:string;
  password:string;
}

@Injectable()
export class AuthenticationService {
  user:User;
  constructor(public http:Http,public config:Config) { }

  signUp(email:string,password:string,firstName:string,lastName:string){
    const userReq:User = {
      email:email,
      password:password,
      firstName:firstName,
      lastName:lastName
    };
    return this.http.post(this.config.apiUrl+'/signUp',userReq,{withCredentials: true}).map((res:Response) => res.json());
  }

  login(email:string,password:string){
    const userReq:loginReq = {
      email:email,
      password:password
    };

    return this.http.post(this.config.apiUrl+'/login',userReq,{withCredentials: true}).map((res:Response) => res.json());
  }
  
}
