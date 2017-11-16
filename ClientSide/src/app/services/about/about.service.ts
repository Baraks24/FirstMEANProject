import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Config} from '../../config/config';
@Injectable()
export class AboutService {

  constructor(public http:Http,public config:Config) {
    
   }

   getAbout(){
    return this.http.get(this.config.apiUrl+'/about').map((res:Response) => res.json().data);
   }
    
}


