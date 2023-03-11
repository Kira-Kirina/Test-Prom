import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, startWith, tap } from 'rxjs';
import { GENRES_MOCK } from 'src/genres-mock';
import { IFilmCard } from 'src/models/film-card.interface';
import { DialogCardComponent } from '../dialog-card/dialog-card.component';
import { FilmCardService } from '../services/film-card.service';

@Component({
  selector: 'app-film-cards',
  templateUrl: './film-cards.component.html',
  styleUrls: ['./film-cards.component.scss'],
})
export class FilmCardsComponent implements OnInit {
  filmCards$!: Observable<IFilmCard[]>;
  filteredFilmCards$!: Observable<IFilmCard[]>;
  filter$!: Observable<any>;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
  });
  genres: string[] = [];
  constructor(
    private filmCardService: FilmCardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    GENRES_MOCK.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        this.genres.push(value);
      }
    });

    this.filmCards$ = this.filmCardService.getFilmData();
    this.filter$ = this.form.valueChanges.pipe(startWith(''));

    this.filteredFilmCards$ = this.filmCardService.filterFilms(
      this.filmCards$,
      this.filter$
    );
  }

  openFilmCard(card: IFilmCard) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '50%';
    dialogConfig.data = {
      card: card,
    };
    this.dialog.open(DialogCardComponent, dialogConfig);
  }
}
