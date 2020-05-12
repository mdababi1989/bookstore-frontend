import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  filesToUpload: Array<File>;

  constructor(private httpClient: HttpClient) {
    this.filesToUpload = [];
  }


  upload(bookId: number) {
    if (this.filesToUpload.length > 0) {
      this.makeFileRequest('http://localhost:8181/book/add/image?id=' + bookId, [], this.filesToUpload)
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // react to file changes made by the user. A change occurs if the user selects a file
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files; // get access to the files and store them
  }

  private makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for (var i = 0; i < files.length; i++) {
          formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              console.log("image uploaded successfully!");
            } else {
              reject(xhr.response);
            }
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
        xhr.send(formData);
      }
    );
  }
}
