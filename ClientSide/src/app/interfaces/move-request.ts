import {XO} from '../enums/xo.enum';
export interface MoveRequest {
    grid:XO[][];
    serverSign:XO;
}
