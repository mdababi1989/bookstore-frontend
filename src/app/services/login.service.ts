import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;

  constructor(private httpClient: HttpClient) {
  }

  sendCredentials(username: string, password: string) {
    const url = 'http://localhost:8181/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const reqHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);

    return this.httpClient.get(url, {headers: reqHeaders});
  }

  checkSession() {
    const url = 'http://localhost:8181/checkSession';
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.get(url, {headers: reqHeaders});
  }

  logout() {
    const url = 'http://localhost:8181/user/logout';
    const reqHeaders = new HttpHeaders().set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.httpClient.post(url, '', {headers: reqHeaders});

  }

}
