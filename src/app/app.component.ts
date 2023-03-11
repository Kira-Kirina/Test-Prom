import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GENRES_MOCK } from 'src/genres-mock';
import { IFilmCard } from 'src/models/film-card.interface';
import { FilmCardService } from './services/film-card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
  });
  genres: string[] = [];
  // filmCards: IFilmCard[] = [];
  constructor(private filmCardService: FilmCardService) {}
  ngOnInit(): void {
    GENRES_MOCK.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        this.genres.push(value);
      }
    });
    // this.filmCardService.getFilmData().subscribe((data) => {
    //   this.filmCards = data;
    //   this.filmCards.forEach((card) => {
    //     this.filmCardService.getGenres(
    //       this.genres,
    //       card.genre,
    //       (card.mappedGenres = [])
    //     );
    //   });
    // });
  }
}
