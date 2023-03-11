import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject, tap } from 'rxjs';
import { IFilmCard } from 'src/models/film-card.interface';
import data from '../../data.json';
import { GENRES_MOCK } from 'src/genres-mock';

@Injectable({
  providedIn: 'root',
})
export class FilmCardService {
  FILMS_MOCK: IFilmCard[] = data;
  private beastFilmSubject = new Subject<IFilmCard>();
  beastFilmObservable = this.beastFilmSubject.asObservable();

  constructor() {}

  getFilmData(): Observable<IFilmCard[]> {
    return of(this.FILMS_MOCK);
  }
  getGenres(genres = GENRES_MOCK, genre: number[], filmGenres: string[]) {
    genres.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        if (genre.includes(+key)) {
          filmGenres.push(value);
        }
      }
    });
  }

  setBestFilm(card: IFilmCard) {
    console.log(card);
    const cardJSON = JSON.stringify(card);
    localStorage.setItem('card', cardJSON);
    this.beastFilmSubject.next(card);
  }

  getBestFilm(): Observable<IFilmCard> {
    // JSON.parse(localStorage.getItem('card')!);
    return this.beastFilmObservable;
    // return JSON.parse(localStorage.getItem('card')!);
  }
}
