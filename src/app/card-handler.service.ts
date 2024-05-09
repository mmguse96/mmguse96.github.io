import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsHandlerService {

  private selectedCard = new BehaviorSubject<boolean>(false);
  selectedCard$ = this.selectedCard.asObservable();


  setCardSelection(selectedCard:boolean){
    this.selectedCard.next(selectedCard);
  }
 
}
