import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../services/about/about.service';
@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponentComponent implements OnInit {
  aboutData:string;
  constructor(private aboutService:AboutService) {
    this.aboutService.getAbout().subscribe((data) => {
      this.aboutData=data;
    });
   }

  ngOnInit() {
  }

}
