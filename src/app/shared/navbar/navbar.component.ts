import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentLang = 'en';
  public creator: string;

  toggleClass = 'ft-maximize';
  constructor(public _authService: AuthService) {
    this.creator = JSON.parse(window.localStorage.getItem("user")).userName;
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  logout() {
    console.log('logging out')
    this._authService.logout();
  }
}
