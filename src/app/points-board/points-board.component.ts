import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PointsHandlerService } from '../points-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-points-board',
  templateUrl: './points-board.component.html',
  styleUrls: ['./points-board.component.scss']
})
export class PointsBoardComponent implements OnInit {

  Score: string = "0";
  Total: string = "0";
  selectedCard :boolean = false;
  TotalInt = 0;
  CardCost = 100;
  Prize = 200;
  private PointsHandlerSubscription!: Subscription;
  

  constructor(
    private pointsHandler:PointsHandlerService,
    
  ){}
  
  subscribeToPointsHandler(){
    this.PointsHandlerSubscription = this.pointsHandler.selectedCard$.subscribe(selectedCard => {(this.selectedCard = selectedCard);
    if (this.selectedCard == true){
      this.addToTotal();
    }
    else{
      this.RemoveFromTotal();
    }
  });
  }

ngOnInit(): void {
  this.getPoints();
  this.subscribeToPointsHandler();
  
}

ngOnChanges(changes: SimpleChanges): void {
    
}

getPoints(){
  let points = localStorage.getItem('points');

  if(points === '' ||points === null){
    localStorage.setItem('points', '1000');
    this.Score = '1000';
  }
  else{
    this.Score = points;
  }
}

addPoints(){
  let points = localStorage.getItem('points');

  if(points !== '' && points !== null){
    let numOfPoints = +points;
    numOfPoints = numOfPoints + 100;
    localStorage.setItem('points', numOfPoints.toString());
  }
  this.getPoints();
}

removePoints(){
  let points = localStorage.getItem('points');

  if(points !== '' && points !== null){
    let numOfPoints = +points;
    numOfPoints = numOfPoints - 100;
    localStorage.setItem('points', numOfPoints.toString());
  }
  this.getPoints();
}


addToTotal(){
  this.TotalInt = parseInt(this.Total);
  this.TotalInt = this.TotalInt + this.CardCost;
  this.Total = this.TotalInt.toString();
}

RemoveFromTotal(){
  this.TotalInt = parseInt(this.Total);
  if(this.TotalInt == 0){
    this.Total = "0";
  }
  else{
    this.TotalInt = this.TotalInt - this.CardCost;
    this.Total = this.TotalInt.toString();
  }
  
}
}
