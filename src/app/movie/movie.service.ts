import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent} from '@angular/common/http';
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

}
