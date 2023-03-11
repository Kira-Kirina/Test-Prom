import { Component, Input, OnInit } from '@angular/core';
import { GENRES_MOCK } from 'src/genres-mock';
import { IFilmCard } from 'src/models/film-card.interface';
import { FilmCardService } from '../services/film-card.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  // @Input() id!: number;
  // @Input() name!: string;
  // @Input() year!: number;
  // @Input() description!: string;
  // @Input() genre!: number[];
  @Input() card!: IFilmCard;
  bestFilmCard!: IFilmCard;
  genres = GENRES_MOCK;
  // filmGenres: string[] = [];

  constructor(private filmCardService: FilmCardService) {}
  ngOnInit(): void {
    this.bestFilmCard = JSON.parse(localStorage.getItem('card')!);

    if (this.card.id === this.bestFilmCard?.id) {
      this.card.isBest = true;
    } else {
      this.card.isBest = false;
    }

    this.filmCardService.getGenres(
      this.genres,
      this.card.genre,
      (this.card.mappedGenres = [])
    );

    // this.genres.forEach((item) => {
    //   for (const [key, value] of Object.entries(item)) {
    //     if (this.genre.includes(+key)) {
    //       this.filmGenres.push(value);
    //     }
    //   }
    // });
  }

  setBestFilm(e: Event) {
    e.stopPropagation();
    this.card.isBest = true;
    this.filmCardService.setBestFilm(this.card);
  }
}
