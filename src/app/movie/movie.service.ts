import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
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

  public addMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(`${this.apiServerUrl}/api/MovieAPI`,movie);
  }

  public loadMovies(disc: string): Observable<HttpEvent<any>>{
    let discTmp: string = disc.replace(/\\/, '!');
    const req = new HttpRequest('POST', `${this.apiServerUrl}/api/MovieAPI/${discTmp}`,{
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public deleteMovieByDisc(disc: string): Observable<void>{
    let discTmp: string = disc.replace(/\\/, '!');
    return this.http.delete<void>(`${this.apiServerUrl}/api/MovieAPI/${discTmp}`);
  }

  public deleteMovie(movieid?: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/MovieAPI/${movieid}`);
  }

}
