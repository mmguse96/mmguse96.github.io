import { Component, OnInit, SimpleChanges,ChangeDetectorRef } from '@angular/core';
import { PointsHandlerService } from '../card-handler.service';
import { SharedDataService } from '../shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-points-board',
  templateUrl: './points-board.component.html',
  styleUrls: ['./points-board.component.scss']
})
export class PointsBoardComponent implements OnInit {

  Points: string = "0";
  Total: string = "0";
  selectedCard :boolean = false;
  TotalInt = 0;
  CardCost = 100;
  Prize = 200;
  isEnough : boolean = false;
  private PointsHandlerSubscription!: Subscription;
  
  

  constructor(
    private pointsHandler:PointsHandlerService,
    private sharedData:SharedDataService,
    private cdr: ChangeDetectorRef
    
  ){}
  
  subscribeToPointsHandler(){
    this.PointsHandlerSubscription = this.pointsHandler.selectedCard$.subscribe(selectedCard => {(this.selectedCard = selectedCard);
    if (this.selectedCard == true){
      this.addToTotal();
    }
    else{
      this.RemoveFromTotal();
    } 

    this.sharedData.getPoints(this.Points);
    this.sharedData.getTotal(this.Total);
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
    this.Points = '1000';
  }
  else{
    this.Points = points;
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

  this.cdr.detectChanges();
}

removePoints(){
  let points = localStorage.getItem('points');

  if(points !== '' && points !== null){
    let numOfPoints = +points;
    numOfPoints = numOfPoints - 100;
    localStorage.setItem('points', numOfPoints.toString());
  }
  this.getPoints();

  this.cdr.detectChanges();
}


addToTotal(){
  this.TotalInt = parseInt(this.Total);
  this.TotalInt = this.TotalInt + this.CardCost;
  this.Total = this.TotalInt.toString();

  this.cdr.detectChanges();
}

RemoveFromTotal(){
  this.TotalInt = parseInt(this.Total);
  if(this.TotalInt == 0){
    this.Total = "0";
  }
  else{
    this.TotalInt = this.TotalInt - this.CardCost;
    this.Total = this.TotalInt.toString();

    this.cdr.detectChanges();
  }
  
}

CheckTotalVsBalance(): Boolean{
  
  if(parseInt(this.Total) <= parseInt(this.Points)){
    return this.isEnough = true;
  }

  return this.isEnough = false;
}
}
