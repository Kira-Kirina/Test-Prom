import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IFilmCard } from 'src/models/film-card.interface';
import { DialogCardComponent } from '../dialog-card/dialog-card.component';
import { FilmCardService } from '../services/film-card.service';

@Component({
  selector: 'app-film-cards',
  templateUrl: './film-cards.component.html',
  styleUrls: ['./film-cards.component.scss'],
})
export class FilmCardsComponent implements OnInit {
  filmCards: IFilmCard[] = [];

  constructor(
    private filmCardService: FilmCardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filmCardService.getFilmData().subscribe((data) => {
      this.filmCards = data;
    });
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
