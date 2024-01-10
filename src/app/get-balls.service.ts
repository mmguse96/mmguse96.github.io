import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const defaultJSONPath = 'assets/BingoBalls/Balls.JSON'

@Injectable({
  providedIn: 'root'
})
export class GetBallsService {

  constructor(private http: HttpClient) { }

  getBalls(jsonPath : string = defaultJSONPath){
    return this.http.get<{Balls: string[]}>(jsonPath);
  }
}
