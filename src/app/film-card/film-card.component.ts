import { Component, Input, OnInit } from '@angular/core';
import { GENRES_MOCK } from 'src/genres-mock';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;
  @Input() year!: number;
  @Input() description!: string;
  @Input() genre!: number[];
  genres = GENRES_MOCK;
  filmGenres: string[] = [];

  constructor() {}
  ngOnInit(): void {
    this.genres.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        if (this.genre.includes(+key)) {
          this.filmGenres.push(value);
        }
      }
    });
  }
}
