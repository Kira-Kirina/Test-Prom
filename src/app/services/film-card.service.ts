import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFilmCard } from 'src/models/film-card.interface';
import data from '../../data.json';
import { GENRES_MOCK } from 'src/genres-mock';

@Injectable({
  providedIn: 'root',
})
export class FilmCardService {
  FILMS_MOCK: IFilmCard[] = data;

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
}
