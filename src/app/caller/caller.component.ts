import { Component,OnInit,OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GetBallsService } from '../get-balls.service';
import { SharedDataService } from '../shared-data.service';
import { PointsBoardComponent } from '../points-board/points-board.component';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.scss']
})
export class CallerComponent implements OnChanges, OnInit{
  ballNum: string = '';
  balls: string[] = [];
  ball = 0;
  prevBall = '';
  calledBalls:string[] = [];
  didWin:boolean = false;
  startBalls: boolean = false;

  @ViewChild(PointsBoardComponent) PointsBoard!: PointsBoardComponent;

  points:number = 0;
  total:number = 0;
  canPlay:boolean = false;

  constructor(
    private getBallsService: GetBallsService,
    private location: Location,
    private sharedService: SharedDataService,
    
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    let jsonPath;
    const url = this.location.path();
    if (url.includes('jsonPath')) {
      jsonPath = url.split('jsonPath=')[1];
    }
    this.getBallsService.getBalls(jsonPath).subscribe((response) => {
      this.balls = response.Balls;
      //console.log(this.balls);
      this.shuffleBalls();
      this.ballNum = this.balls[0];
    
    });
    this.sharedService.didWin$.subscribe((didWin) => {
      this.didWin = didWin;
      this.checkIfEnoughPoints();
    });
    this.sharedService.didWin$.subscribe((didWin) => {
      this.didWin = didWin;
      this.checkIfEnoughPoints();
    });
    this.sharedService.didWin$.subscribe((didWin) => {
      this.didWin = didWin;
      this.checkIfEnoughPoints();
    });
    this.sharedService.Points$.subscribe((points) => {
      this.points = parseInt(points);
      console.log("Points:", this.points);
      this.checkIfEnoughPoints();
    });
    this.sharedService.Total$.subscribe((total) => {
      this.total = parseInt(total);
      console.log("Total:", this.total);
      this.checkIfEnoughPoints();
  });
}

getPoints(){
  this.PointsBoard.getPoints();
}

callBalls() {
  // Asynchronously check if the user can play
  this.checkIfEnoughPoints().then(canPlay => {
      if (canPlay) {
          // User has enough points, start calling balls


          console.log("Points before deduction:", this.points);
            console.log("Total before deduction:", this.total);


          this.points -= this.total; // Deduct total from points
          this.sharedService.setPoints(this.points.toString()); 
          localStorage.setItem('points', this.points.toString());
          this.getPoints();

          console.log("Points after deduction:", this.points);
          this.startBalls = true;

          const intervalID = setInterval(() => {
              if (this.ball < 45) {
                  this.prevBall = this.ballNum;
                  this.calledBalls.push(this.prevBall);
                  this.ball++;
                  this.ballNum = this.balls[this.ball];
                  this.sharedService.setBallNum(this.ballNum);
                  if (this.didWin) {
                      clearInterval(intervalID);
                  }
              } else {
                  clearInterval(intervalID);
              }
          }, 1000);
      } else {
          // User doesn't have enough points, prevent starting the game
          console.log("Cannot play: Not enough points");
      }
  }).catch(error => {
      // Handle any errors that might occur during the check
      console.error("Error while checking points:", error);
  });
}



  shuffleBalls(){
    
    let lastIndex = this.balls.length - 1;
    let random;
    let temp;

    while(lastIndex >0){

      random = Math.floor(Math.random() * (lastIndex -1));
      temp = this.balls[lastIndex];
      this.balls[lastIndex] = this.balls[random];
      this.balls[random] = temp;
      lastIndex--;
    }
    //console.log(this.balls);

  }

  restartGame(){
    window.location.reload();
  }

  checkIfEnoughPoints(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        
        if (this.total <= this.points) {
            console.log("enough points");
            this.canPlay = true;
            resolve(true); // Resolve with true if enough points
        } else {
            console.log("not enough points");
            this.canPlay = false;
            resolve(false); // Resolve with false if not enough points
        }
    });
}

}
