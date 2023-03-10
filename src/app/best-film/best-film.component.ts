import { Component, OnInit } from '@angular/core';
import { IFilmCard } from 'src/models/film-card.interface';
import { FilmCardService } from '../services/film-card.service';

@Component({
  selector: 'app-best-film',
  templateUrl: './best-film.component.html',
  styleUrls: ['./best-film.component.scss'],
})
export class BestFilmComponent implements OnInit {
  card!: IFilmCard;

  constructor(private filmCardService: FilmCardService) {}
  ngOnInit(): void {
     this.filmCardService.getBestFilm().subscribe(
      card => this.card = card
    );
    console.log(this.card);
  }
}
