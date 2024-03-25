import { Component,OnInit,OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { SharedDataService } from './shared-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'bingo-game';
 
  
  NumOfCards: number = 4;

  constructor(
    private sharedData: SharedDataService
  ){}
  
  ngOnInit(): void {
    this.sharedData.NumOfCards$.subscribe((NumOfCards) => {
      this.NumOfCards = NumOfCards;
      console.log(NumOfCards);
      
    });

    
  }
  getRange(NumOfCards: number): number[] {
    return new Array(NumOfCards);
  }
}
