import { Component,OnInit,OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { GetBallsService } from '../get-balls.service';

import { SharedDataService } from '../shared-data.service';

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
 


  constructor(
    private getBallsService: GetBallsService,
    private location: Location,
    private sharedService: SharedDataService
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
  }

  callBalls(){

    const intervalID = setInterval(()=> {
      if(this.ball < 45){

        this.prevBall = this.ballNum;
        this.calledBalls.push(this.prevBall);
        this.ball++;
        this.ballNum =this.balls[this.ball];
        this.sharedService.setBallNum(this.ballNum);
        
      } else{
        clearInterval(intervalID);
      }
    }, 1000);
    

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

}
