import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movies?: Movie[];

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        console.log(this.movies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMovies(key: string): void {
    const results: Movie[]=[];
    for(const movie of this.movies!){
      if(  movie.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || movie.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || movie.director.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || movie.stars.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ){
         results.push(movie);
         }
    }
    this.movies = results;
    if(results.length === 0 || !key){
       this.getMovies();
    }
  }

}
