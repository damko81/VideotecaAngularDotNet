import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FileUploadService } from './file-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  exprFiles?: Observable<any>;
  fileForLoginInfos?: Observable<any>;
  fileInfos?: Observable<any>;
  currentFile?: File;
  authLoginSuccess: boolean = false;
  isLoggedIn = false;
  deleteFileName?: string | null;
  progress = 0;
  message = '';

  constructor( private uploadService: FileUploadService,
               private authenticationService: AuthService, 
               private cookieService: CookieService
             ) { }

  ngOnInit(): void {
    if(this.cookieService.get('authLoginSuccess') == 'T'){this.authLoginSuccess = true;}
    else{this.authLoginSuccess = false;}
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.exprFiles = this.uploadService.getDownloadFiles();
    this.fileForLoginInfos = this.uploadService.getForLoginFiles(this.cookieService.get('userName'));
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public delete(name: string): void {
    this.uploadService.delete(name).subscribe(
      (event: any) => {
        this.message = event.message;
        this.fileInfos = this.uploadService.getFiles();
        this.fileForLoginInfos = this.uploadService.getForLoginFiles(this.cookieService.get('userName'));
      },
      (err: any) => {
        console.log(err);
        this.message = err.message;
      }
    );
  }

  export(): void {

  }

  upload(): void {

  }

  loadMoviesFromXml(name: string): void {

  }

  public onOpenModal(filename: string  | null,mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteFileName = filename;
      button.setAttribute('data-target', '#deleteFileModal');
    }
    container?.appendChild(button);
    button.click();

  }

}
