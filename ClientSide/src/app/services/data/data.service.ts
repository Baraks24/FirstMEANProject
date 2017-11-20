import { Injectable } from '@angular/core';
import {Http,Response,RequestOptions} from '@angular/http';
import {Config} from '../../config/config';
@Injectable()
export class DataService {

  constructor(public http:Http,public config:Config) {
    
   }

   getAbout(){
    return this.http.get(this.config.apiUrl+'/about',{withCredentials: true}).map((res:Response) => res.json().data);
   }

   getUsers(){
    return this.http.get(this.config.apiUrl+'/users').map((res:Response) => res.json());
   }
    
}


