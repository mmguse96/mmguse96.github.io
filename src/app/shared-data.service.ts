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

  private total = new BehaviorSubject<string>("");
  Total$ = this.total.asObservable();

  private points = new BehaviorSubject<string>("");
  Points$ = this.points.asObservable();

  private pointsIsEnough = new BehaviorSubject<boolean>(false);
  pointsIsEnough$ = this.pointsIsEnough.asObservable();


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

  getTotal(total: string){
    this.total.next(total);
  }

  getPoints(points: string){
    this.points.next(points);
  }

  setPoints(points:string){
    this.points.next(points);
  }

}
