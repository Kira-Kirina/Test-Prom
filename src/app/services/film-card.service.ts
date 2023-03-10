import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFilmCard } from 'src/models/film-card.interface';
import data from '../../data.json';

@Injectable({
  providedIn: 'root'
})
export class FilmCardService {

  FILMS_MOCK: IFilmCard[] = data;

  constructor() { }

  getFilmData(): Observable<IFilmCard[]> {
    return of(this.FILMS_MOCK)
  }
}
