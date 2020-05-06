import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credential = {username: '', password: ''};

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      () => {
        this.loginService.loggedIn = true;
      },
      () => {
        this.loginService.loggedIn = false;
      }
    );
  }

  onSubmit() {
    console.log(this.credential.username + ':' + this.credential.password);
    this.loginService.sendCredentials(this.credential.username, this.credential.password)
      .subscribe(res => {
          console.log(res);
          localStorage.setItem('xAuthToken', res['token']);
          this.loginService.loggedIn = true;
          // location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }
}
