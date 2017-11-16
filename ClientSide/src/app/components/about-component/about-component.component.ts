import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data/data.service';
@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponentComponent implements OnInit {
  aboutData:string;
  constructor(private dataService:DataService) {
    this.dataService.getAbout().subscribe((data) => {
      this.aboutData=data;
    });
   }

  ngOnInit() {
  }

}
