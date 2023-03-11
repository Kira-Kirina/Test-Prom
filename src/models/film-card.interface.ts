export interface IFilmCard {
  id: number;
  name: string;
  year: number;
  description: string;
  genre: number[];
  mappedGenres?: string[];
  isBest?: boolean;
}
