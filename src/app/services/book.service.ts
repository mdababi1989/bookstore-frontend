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

  updateBook(book: Book) {
    const url = 'http://localhost:8181/book/update';
    const reqHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.put(url, JSON.stringify(book), {headers: reqHeaders});
  }

  getBookList() {
    const url = 'http://localhost:8181/book/list';
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.get(url, {headers: reqHeaders});
  }

  getBook(id: number) {
    const url = 'http://localhost:8181/book/' + id;
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.get(url, {headers: reqHeaders});
  }

  removeBook(id: number) {
    const url = 'http://localhost:8181/book/delete';
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.post(url, id, {headers: reqHeaders, responseType: 'text'});
  }

  reset() {
    this.bookAdded = false;
  }
}
