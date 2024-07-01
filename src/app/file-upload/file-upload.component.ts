import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FileUploadService } from './file-upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileUrl: any;
  selectedFiles?: FileList;
  exprFiles?: Observable<any>;
  fileForLoginInfos?: Observable<any>;
  fileInfos?: Observable<any>;
  currentFile?: File;
  authLoginSuccess: boolean = false;
  isLoggedIn = false;
  deleteId?: number | null;
  deleteFileName?: string | null;
  progress = 0;
  message = '';

  constructor( private uploadService: FileUploadService,
               private authenticationService: AuthService, 
               private cookieService: CookieService,
               private sanitizer: DomSanitizer
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

  public delete(id: number): void {
    this.uploadService.delete(id).subscribe(
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
    this.progress = 0;
    this.uploadService.export().subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.exprFiles = this.uploadService.getDownloadFiles();
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not export the file!';
        }
      });  
  }

  upload(): void {

    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        if(this.currentFile.name != 'Filmi.xml'){
          this.message = 'You have to choose file Filmi.xml !';
        }
      else{
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              this.fileForLoginInfos = this.uploadService.getForLoginFiles(this.cookieService.get('userName'));
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
        }
      }
      this.selectedFiles = undefined;
    }
  }

  loadMoviesFromXml(name: string): void {
    this.uploadService.loadMoviesFromXml(name).subscribe(
      (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              this.fileForLoginInfos = this.uploadService.getForLoginFiles(this.cookieService.get('userName'));
            }
      },
      (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
      }
    );
  }

  downloadFile(file: any): void {
    var content= this.base64ToArrayBuffer(file.data);
    const blob = new Blob([content], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  base64ToArrayBuffer(base64: any): ArrayBuffer {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  public onOpenModal(id: number | null,filename: string | null,mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteId = id;
      this.deleteFileName = filename;
      button.setAttribute('data-target', '#deleteFileModal');
    }
    container?.appendChild(button);
    button.click();

  }

}
