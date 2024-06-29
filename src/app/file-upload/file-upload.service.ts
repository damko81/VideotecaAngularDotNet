import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private cookieService: CookieService
             ) { }

  getDownloadFiles(): Observable<any> {
     return this.http.get(`${this.baseUrl}/api/FilesAPI/Download`);
  }
  
  getForLoginFiles(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/FilesAPI/${username}`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/FilesAPI`);
  }

  public delete(name: string): Observable<HttpEvent<any>>{
    return this.http.delete<HttpEvent<any>>(`${this.baseUrl}/api/FilesAPI/${name}`);
  }
             
}
