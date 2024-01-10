import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GetBallsService } from '../get-balls.service';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  cardNums: string [][] = [];
  cardBools: boolean[][] = [];
  cardHead = ['B','I','N','G','O'];
  possNums:string[] = [];
  bingoNum:string = '';
  exist:boolean = true;
  ballNum = '';
  match:boolean = false;
  dabbedColour = '';
  didWin:boolean= false;
  message= "you Win!";

  constructor(
    private getBallsService: GetBallsService,
    private location: Location,
    private sharedService: SharedDataService
   
  ){}

  ngOnInit(): void {
    let jsonPath;
    const url = this.location.path();
      if (url.includes('jsonPath')) {
        jsonPath = url.split('jsonPath=')[1];
        }
      this.getBallsService.getBalls(jsonPath).subscribe((response) => {
      this.possNums = response.Balls;
      console.log(this.possNums);


      this.genBingoCard();

      this.sharedService.ballNum$.subscribe((ballNum) => {
        this.ballNum = ballNum;
        this.checkForCalledBall();
      });
      console.log(this.cardHead);
      console.log(this.cardNums);
      

  });
}

  genBingoCard(){
    let num = 0;
    this.cardNums = [];  // Initialize cardNums as an empty array
    this.cardBools = [];

    for(let i =0; i<5; i++){

      this.cardNums[i] = [];   // Initialize each inner array
      this.cardBools[i] = [];
      for(let j =0; j<5; j++){
        if(i == 2 && j == 2){
          this.cardNums[i][j] = "free";
          this.cardBools[i][j] = true;
        }
        //B numbers 0 to 14
        else if(j == 0){
          num = Math.floor(Math.random()*14)+ 0;
          this.bingoNum = this.possNums[num];
          //console.log(this.bingoNum);
          this.checkForExistNums();
           while(this.exist){
            num = Math.floor(Math.random()*14)+ 0;
            this.bingoNum = this.possNums[num];
            this.checkForExistNums();
          } 

          this.cardNums[i][j] = this.bingoNum;
          this.cardBools[i][j] = false;
          
        }
        //I numbers 15 to 30
        else if(j == 1){
          num = Math.floor(Math.random()*15)+ 15;
          this.bingoNum = this.possNums[num];
          //console.log(this.bingoNum);
          this.checkForExistNums();
          while(this.exist){
            num = Math.floor(Math.random()*15)+ 15;
            this.bingoNum = this.possNums[num];
            this.checkForExistNums();
          } 

          this.cardNums[i][j] = this.bingoNum;
          this.cardBools[i][j] = false;
        }
        //N numbers 31 to 45
        else if(j == 2){
          num = Math.floor(Math.random()*15)+ 30;
          this.bingoNum = this.possNums[num];
          //console.log(this.bingoNum);
          this.checkForExistNums();
          while(this.exist){
            num = Math.floor(Math.random()*15)+ 30;
            this.bingoNum = this.possNums[num];
            this.checkForExistNums();
          } 

          this.cardNums[i][j] = this.bingoNum;
          this.cardBools[i][j] = false;
        }
        //G numbers 46 to 60
        else if(j == 3){
          num = Math.floor(Math.random()*15)+ 45;
          this.bingoNum = this.possNums[num];
          //console.log(this.bingoNum);
          this.checkForExistNums();
          while(this.exist){
            num = Math.floor(Math.random()*15)+ 45;
            this.bingoNum = this.possNums[num];
            this.checkForExistNums();
          } 

          this.cardNums[i][j] = this.bingoNum;
          this.cardBools[i][j] = false;
        }
        //O numbers 61 to 75
        else if(j == 4){
          num = Math.floor(Math.random()*15)+ 60;
          this.bingoNum = this.possNums[num];
          //console.log(this.bingoNum);
          this.checkForExistNums();
           while(this.exist){
            num = Math.floor(Math.random()*15)+ 60;
            this.bingoNum = this.possNums[num];
            this.checkForExistNums();
          } 

          this.cardNums[i][j] = this.bingoNum;
          this.cardBools[i][j] = false;
        }
      }
    }
} 

checkForExistNums(){

    this.exist = false;

  for (let i = 0; i < this.cardNums.length; i++) {
    for (let j = 0; j < this.cardNums[i].length; j++) {
      if (this.cardNums[i][j] === this.bingoNum) {
        this.exist = true;
        return;
      }
    }

  }
}

checkForCalledBall(){
  
  console.log(this.ballNum);
  for (let i = 0; i < this.cardNums.length; i++) {
    for (let j = 0; j < this.cardNums[i].length; j++) {
      if (this.cardNums[i][j] === this.ballNum) {
        this.match = true;
        this.cardBools[i][j] = true;
        console.log("match");

        return;
      }
    }
  }
}

checkForWin(){
  //horizontal check
  for (let i = 0; i < 5; i++)
  {
      this.didWin = true;
      for (let j = 0; j < 5; j++)
      {
          
          //if (card[i,j].dabbed == true) { Console.WriteLine("spot dabbed hCheck: " + card[i, j].cNumber); }
          if (this.cardBools[i][j] == false)
          {
              
              this.didWin = false;
              //Console.WriteLine("false");
              break;
          }
      }
      if (this.didWin == true)
      {
          return true;
      }
  }

  if (!this.didWin)
  {
      //vertical check
      for (let i = 0; i < 5; i++)
      {
          this.didWin = true;

          for (let j = 0; j < 5; j++)
          {
              
              

              if (this.cardBools[j][i] == false)
              {
                  
                  this.didWin = false;
                  //Console.WriteLine("false");
                  break;
              }
          }

          if (this.didWin == true)
          {
              
              return true;
          }
      }
  }
  if (!this.didWin)
  {
      //left diagonal
      for (let i = 0; i < 5; i++)
      {
          this.didWin = true;
        
          

          if (this.cardBools[i][i] == false)
          {
              
              this.didWin = false;
              
              break;
          }
      }

      if (this.didWin == true)
      {
          
          return true;
      }
  }

  if (!this.didWin)
  {
      //right diagonal
      for (let i = 4; i >= 0; i--)
      {
          this.didWin = true;
          
          

          if (this.cardBools[i][i] == false)
          {
              
              this.didWin = false;
             
              break;
          }

      }
      if (this.didWin== true)
      {
          
          return true;
      }
  }
  return false;
}
}
  


