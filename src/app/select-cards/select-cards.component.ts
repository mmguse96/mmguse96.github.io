import { Component, OnInit , Input} from '@angular/core';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-select-cards',
  templateUrl: './select-cards.component.html',
  styleUrls: ['./select-cards.component.scss'],
  
})
export class SelectCardsComponent implements OnInit {

  NumOfCards: string = "";
  intNumOfCards: number = 1;
  

  constructor(
    private sharedData: SharedDataService
  ){}
  
  ngOnInit(): void {
    this.sharedData.getNumOfCards(this.intNumOfCards);
  }

  onRadioChange(event: Event): void {
    this.NumOfCards = (event.target as HTMLInputElement).value;
    
    if(this.NumOfCards == '1'){

      this.intNumOfCards = 1;
      this.sharedData.getNumOfCards(this.intNumOfCards);
    
    }

    else if (this.NumOfCards == '2'){

      this.intNumOfCards = 2;
      this.sharedData.getNumOfCards(this.intNumOfCards);
    }

    else if (this.NumOfCards == '3'){

      this.intNumOfCards = 3;
      this.sharedData.getNumOfCards(this.intNumOfCards);
    }

    else if (this.NumOfCards == '4'){

      this.intNumOfCards = 4;
      this.sharedData.getNumOfCards(this.intNumOfCards);
    }
  }
}
