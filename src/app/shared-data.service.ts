import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private ballNumSource = new BehaviorSubject<string>('');
  ballNum$ = this.ballNumSource.asObservable();

  private NumOfCard = new BehaviorSubject<number>(0);
  NumOfCards$ = this.NumOfCard.asObservable();

  private didWin = new BehaviorSubject<boolean>(false);
  didWin$ = this.didWin.asObservable();

  getNumOfCards(numOfCards: number){
    this.NumOfCard.next(numOfCards);
  }

  setBallNum(ballNum: string) {
    this.ballNumSource.next(ballNum);
    //console.log(this.ballNumSource);
  }

  setDidWin(didWin:boolean){
    this.didWin.next(didWin);
  }
}
