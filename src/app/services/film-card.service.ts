import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  tap,
  map,
  merge,
  combineLatest,
} from 'rxjs';
import { IFilmCard } from 'src/models/film-card.interface';
import data from '../../data.json';
import { GENRES_MOCK } from 'src/genres-mock';

@Injectable({
  providedIn: 'root',
})
export class FilmCardService {
  FILMS_MOCK: IFilmCard[] = data;
  private bestFilmSubject = new Subject<IFilmCard | null>();
  bestFilmObservable = this.bestFilmSubject.asObservable();

  private filmsSubject = new BehaviorSubject<IFilmCard[]>(this.FILMS_MOCK);
  filmsObservable = this.filmsSubject.asObservable();

  constructor() {}
  getFilmData(): Observable<IFilmCard[]> {
    return this.filmsObservable;
  }
  // getFilmData(): Observable<IFilmCard[]> {
  //   return of(this.FILMS_MOCK);
  // }
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
    let storedCard = JSON.parse(localStorage.getItem('card')!);

    if (storedCard?.id === card.id) {
      localStorage.removeItem('card');
      card.isBest = false;
      this.bestFilmSubject.next(null);
    } else {
      const cardJSON = JSON.stringify(card);
      localStorage.setItem('card', cardJSON);
      card.isBest = true;
      let films = this.FILMS_MOCK.map((item) => {
        if (card.id !== item.id) {
          item.isBest = false;
        }
        return item;
      });
      this.filmsSubject.next(films);
      this.bestFilmSubject.next(card);
    }
  }

  getBestFilm(): Observable<IFilmCard | null> {
    // JSON.parse(localStorage.getItem('card')!);
    return this.bestFilmObservable;
  }

  filterFilms(filmCards: Observable<IFilmCard[]>, filter: Observable<any>) {
    return combineLatest([filmCards, filter]).pipe(
      map(([filmCards, filter]) => {
        return filmCards.filter((card) => {
          if (filter.title || filter.genre) {
            return (
              (!filter.title ||
                card.name.toLowerCase().indexOf(filter.title.toLowerCase()) >=
                  0) &&
              (!filter.genre ||
                card.mappedGenres?.some((genre) => {
                  return genre.toLowerCase() === filter.genre.toLowerCase();
                }))
            );
          }
          return card;
        });
      })
    );
  }
}
