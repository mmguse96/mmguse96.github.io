import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HangmanDisplayComponent } from './components/hangman-display/hangman-display.component';
import { HangmanQuestionComponent } from './components/hangman-question/hangman-question.component';
import { HangmanKeyboardComponent } from './components/hangman-keyboard/hangman-keyboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    HangmanDisplayComponent,
    HangmanQuestionComponent,
    HangmanKeyboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
