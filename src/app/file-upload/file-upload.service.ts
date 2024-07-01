import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  export(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/api/FilesAPI/Export`, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    let fileName: string = this.cookieService.get("userName") + '_' + file.name;
    const formData: FormData = new FormData();

    formData.append('file', file, fileName);

    const req = new HttpRequest('POST', `${this.baseUrl}/api/FilesAPI/Upload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public loadMoviesFromXml(name: string): Observable<HttpEvent<any>>{
    const req = new HttpRequest('POST', `${this.baseUrl}/api/FilesAPI/LoadMoviesFromXml/${name}`,{
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public delete(id: number): Observable<HttpEvent<any>>{
    return this.http.delete<HttpEvent<any>>(`${this.baseUrl}/api/FilesAPI/${id}`);
  }
             
}
