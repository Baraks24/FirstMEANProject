import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Config } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { XO } from '../../enums/xo.enum';
import { Move } from '../../interfaces/move';
import { MoveRequest } from '../../interfaces/move-request';
import { Opponent } from '../../enums/opponent.enum';
import * as io from 'socket.io-client';

@Injectable()
export class XoService {
  LENGTH: number = 3;
  currPlayer: XO;
  playerSign: XO;
  serverSign: XO;
  whoStarts: Opponent;
  gameStarted: boolean;
  grid: XO[][];

  constructor(private config: Config, private http: Http) { }


  start(): void {
    this.gameStarted = true;
    this.serverSign = this.playerSign == XO.X ? XO.O : XO.X;
    this.currPlayer = this.whoStarts == Opponent.Player ? this.playerSign : this.serverSign;
    if (this.currPlayer == this.serverSign) {
      this.getServerMove(this.grid).subscribe((data) => {
        this.grid[data.row][data.column] = data.sign;
        this.currPlayer = this.playerSign;
      });
    }


  }

  initTable(): void {
    this.grid = [];
    for (let i = 0; i < this.LENGTH; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.LENGTH; j++) {
        this.grid[i].push(XO.EMPTY);
      }
    }
  }

  tableStatus(): [boolean, XO] {
    let table: XO[][] = this.grid;
    for (let i = 0; i < this.LENGTH; i++) {
      let equalRow: boolean = true;
      let equalCol: boolean = true;
      for (let j = 1; j < this.LENGTH; j++) {
        equalRow = equalRow && (table[i][j] == table[i][j - 1] && table[i][j] != XO.EMPTY);
        equalCol = equalCol && (table[j][i] == table[j - 1][i] && table[j][i] != XO.EMPTY);
      }
      if (equalCol) {
        return [true, table[0][i]];
      }
      if (equalRow) {
        return [true, table[i][0]];
      }
    }
    let equalPrimaryDiagonal: boolean = true;
    let equalSecondDiagonal: boolean = true;
    for (let i = 1; i < this.LENGTH; i++) {
      equalPrimaryDiagonal = equalPrimaryDiagonal && (table[i][i] == table[i - 1][i - 1] && table[i][i] != XO.EMPTY);
      equalSecondDiagonal = equalSecondDiagonal && (table[this.LENGTH - i - 1][i] == table[this.LENGTH - i][i - 1] && table[this.LENGTH - i - 1][i] != XO.EMPTY);
    }
    if (equalPrimaryDiagonal) {
      return [true, table[0][0]];
    }
    if (equalSecondDiagonal) {
      return [true, table[this.LENGTH][0]];
    }

    return [false, XO.EMPTY];
  }

  click(i: number, j: number): void {
    if (this.currPlayer == this.playerSign && this.grid[i][j]==XO.EMPTY) {
      this.grid[i][j] = this.playerSign;
      this.currPlayer = this.serverSign;
      this.getServerMove(this.grid).subscribe((data) => {
        this.grid[data.row][data.column] = data.sign;
        this.currPlayer = this.playerSign;
      });

    }
  }

  getServerMove(grid: XO[][]) {
    let moveRequest: MoveRequest = {
      grid: grid,
      serverSign: this.serverSign
    };
    return this.http.post(this.config.apiUrl + '/getServerMove', moveRequest, { withCredentials: true }).map((res: Response) => res.json());
  }

  isOver(): boolean {
    return this.tableStatus()[0];
  }

  whoWon(): XO {
    return this.tableStatus()[1];
  }
}
