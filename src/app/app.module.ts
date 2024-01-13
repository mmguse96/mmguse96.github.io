import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CallerComponent } from './caller/caller.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { SelectCardsComponent } from './select-cards/select-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    CallerComponent,
    CardComponent,
    SelectCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
