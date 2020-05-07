import {Injectable} from '@angular/core';
import {Book} from '../models/book';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public bookAdded: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  addBook(book: Book) {
    const url = 'http://localhost:8181/book/add';
    const reqHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.post(url, JSON.stringify(book), {headers: reqHeaders});
  }

  getBookList(){
    const url = 'http://localhost:8181/book/list';
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.get(url, {headers: reqHeaders});
  }

  reset(){
    this.bookAdded = false;
  }
}
