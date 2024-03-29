import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  userData: UserInterface;
  paramId: string;
  token: string;
  accessAllowed: Boolean = false;

  constructor( public router: Router) {}

  dummySetter() {
    this.userData = {
      userName: '',
      token: '',
    };
  }

  signupUser(email: string, password: string) {
    // your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    // your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    window.localStorage.removeItem('user');
    this.router.navigate(['/app/login']);
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    if (window.localStorage.length !== 0) {
      const windowStorages = JSON.parse(window.localStorage.getItem('user'));
      if (windowStorages.token) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setUserData(userName: string, token: string) {
    this.userData.userName = userName;
    this.userData.token = token;
    window.localStorage.setItem('user', JSON.stringify(this.userData));
    this.accessAllowed = true;
  }

  removeUserData() {
    this.userData.userName = '';
    this.userData.token = '';
    window.localStorage.setItem('user', JSON.stringify(this.userData));
    this.accessAllowed = false;
  }
}

interface UserInterface {
  userName: string;
  token: string;
}
