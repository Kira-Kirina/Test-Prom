import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IFilmCard } from 'src/models/film-card.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmCardService } from '../services/film-card.service';
import { GENRES_MOCK } from 'src/genres-mock';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss'],
})
export class DialogCardComponent implements OnInit {
  card!: IFilmCard;
  genres = GENRES_MOCK;
  filmGenres: string[] = [];
  constructor(
    private filmCardService: FilmCardService,
    private dialogRef: MatDialogRef<DialogCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: IFilmCard }
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.card = this.data.card;
    }

    this.filmCardService.getGenres(
      this.genres,
      this.card.genre,
      this.filmGenres
    );
  }
  setBestFilm() {
    this.filmCardService.setBestFilm(this.card);
  }
}
