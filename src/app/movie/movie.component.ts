import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movies?: Movie[];
  public editMovie?: Movie | null;
  public deleteMovie?: Movie | null;
  loadProgress = false;
  message = '';

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
    this.loadProgress = false;
  }

  public onAddMovie(addForm: NgForm): void{
    document.getElementById('add-movie-form')?.click();
    this.movieService.addMovie(addForm.value).subscribe(
      (response: Movie) => {
        console.log(response);
        this.getMovies();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMovie(movie: Movie): void{
    this.movieService.updateMovie(movie).subscribe(
      (response: Movie) => {
        console.log(response);
        this.getMovies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMovie(movieId?: number): void{
    this.movieService.deleteMovie(movieId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMovies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMovieByDisc(disc: string): void{
    document.getElementById('delete-movieByDisc-form')?.click();
    this.movieService.deleteMovieByDisc(disc).subscribe(
      (response: void) => {
        console.log(response);
        this.getMovies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmMethodDelete(disc: string): void{
    if(confirm("Are you sure to delete movies on disc "+disc)) {
      this.onDeleteMovieByDisc(disc);
    }
    else{
      document.getElementById('delete-movieByDisc-form')?.click();
    }
  }

  public onLoadMovies(disc: string): void{
    this.loadProgress = true; // Težava zaradi async funkcije na backend in ne deluje pravilno progressbar.
    alert("Load Movies Asynchronously... This can takes some times..."); // Zato damo le opozorilno okno o nalaganju...
    document.getElementById('load-movies-form')?.click();
    this.movieService.loadMovies(disc).subscribe(
      (event: any) => {
        this.message = event.message;
        this.getMovies();
      },
      (err: any) => {
        console.log(err);
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not upload the movies!';
        }
      }
    );
   
  }

  public onOpenModal(movie: Movie | null, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMovieModal');
    }
    if (mode === 'edit') {
      this.editMovie = movie;
      button.setAttribute('data-target', '#updateMovieModal');
    }
    if (mode === 'delete') {
      this.deleteMovie = movie;
      button.setAttribute('data-target', '#deleteMovieModal');
    }
    if (mode === 'load') {
      button.setAttribute('data-target', '#loadMoviesModal');
    }
    if (mode === 'deleteMovieByDisc') {
      button.setAttribute('data-target', '#deleteMovieByDiscModal');
    }

    container?.appendChild(button);
    button.click();
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
