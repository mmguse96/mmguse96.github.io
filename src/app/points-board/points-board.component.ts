import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-points-board',
  templateUrl: './points-board.component.html',
  styleUrls: ['./points-board.component.scss']
})
export class PointsBoardComponent implements OnInit {

  Score: string = '';

ngOnInit(): void {
  this.getPoints();
  
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
}
