import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Movie } from './movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiServerUrl}/api/MovieAPI`);
  }

  public updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.apiServerUrl}/api/MovieAPI/${movie.id}`,movie);
  }

  public deleteMovie(movieid?: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/MovieAPI/${movieid}`);
  }

}
