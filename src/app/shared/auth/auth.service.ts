import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  userData: UserInterface;
  paramId: string;
  token: string;
  accessAllowed: Boolean = false;

  constructor() {}

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
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    if (this.accessAllowed) {
      return false;
    } else {
      return true;
    }
  }

  setUserData(userName: string, token: string) {
    this.userData.userName = userName;
    this.userData.token = token;
    window.localStorage.setItem('user', JSON.stringify(this.userData));
    this.accessAllowed = true;
    console.log(window.localStorage);
  }

  removeUserData() {
    this.userData.userName = '';
    this.userData.token = '';
    window.localStorage.setItem('user', JSON.stringify(this.userData));
    this.accessAllowed = false;
    console.log(window.localStorage);
  }
}

interface UserInterface {
  userName: string;
  token: string;
}
