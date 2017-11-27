import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { XO } from '../../../../enums/xo.enum';
import { Opponent } from '../../../../enums/opponent.enum';
import { XoService } from '../../../../services/XO/xo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule,MatButtonModule,MatCardModule} from '@angular/material';



@Component({
  selector: 'app-xo',
  templateUrl: './xo.component.html',
  styleUrls: ['./xo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XoComponent implements OnInit {
  table: XO[][];
  XorO:string[] = ['X','O'];
  whoStarts:string[] = ['Me','The Server'];
  constructor(private xoService: XoService) {
    xoService.initTable();
  }

  ngOnInit() {
  }

  overButton(i: number, j: number): void {
    let elem: any = document.getElementsByClassName(`${i}${j}`)[0];
    elem.style.opacity = 0.5;


  }
  leaveButton(i: number, j: number): void {
    let elem: any = document.getElementsByClassName(`${i}${j}`)[0];
    elem.style.opacity = 1;
  }

}
