import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.loginService.logout().subscribe(
      () => {
        location.reload();
      },
      error => {
        this.loginService.loggedIn = false;
        console.log(error);
      }
    );
  }
}
