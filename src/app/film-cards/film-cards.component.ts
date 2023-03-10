import { Component, OnInit } from '@angular/core';
import { IFilmCard } from 'src/models/film-card.interface';
import { FilmCardService } from '../services/film-card.service';

@Component({
  selector: 'app-film-cards',
  templateUrl: './film-cards.component.html',
  styleUrls: ['./film-cards.component.scss']
})
export class FilmCardsComponent implements OnInit {
  filmCards: IFilmCard[] = [];

  constructor(private filmCardService: FilmCardService) {}

  ngOnInit(): void {
    this.filmCardService.getFilmData().subscribe(data => {this.filmCards = data; console.log(this.filmCards);
    })
  }
  

}
