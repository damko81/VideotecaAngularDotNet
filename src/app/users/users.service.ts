import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Users } from './users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.apiServerUrl}/api/UsersAPI`);
  }

  public updateUsers(user: Users): Observable<Users>{
    return this.http.put<Users>(`${this.apiServerUrl}/api/UsersAPI`,user);
  }

  public deleteUsers(id?: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/UsersAPI/${id}`);
  }

}
