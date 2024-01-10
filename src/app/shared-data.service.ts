import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private ballNumSource = new BehaviorSubject<string>('');
  ballNum$ = this.ballNumSource.asObservable();

  setBallNum(ballNum: string) {
    this.ballNumSource.next(ballNum);
    //console.log(this.ballNumSource);
  }
}
