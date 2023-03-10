import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmCardsComponent } from './film-cards/film-cards.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { BestFilmComponent } from './best-film/best-film.component';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    FilmCardsComponent,
    FilmCardComponent,
    BestFilmComponent,
    DialogCardComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
