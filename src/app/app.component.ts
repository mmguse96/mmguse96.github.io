import { Component,OnInit,OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnChanges, OnInit{
  title = 'bingo-game';
  

 
 
  ngOnChanges(changes: SimpleChanges): void {
    
    
  }
  
  ngOnInit(): void {
    
  }
}
