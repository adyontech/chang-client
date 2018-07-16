import { Injectable } from '@angular/core';
import { Task } from './taskboard.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from './../../../app/shared/globalVariables/globalVariable';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Injectable()
export class TaskBoardService {
  result: {};
  windowStorage: any;
  _url: string;
  token: string;
  public creator: string;

  public todo: Task[] = [
    new Task(
      'todo  ',
      'Etiam porta sem malesuada magna mollis euismod.',
      87979,
      'Elizabeth Elliott',
      'assets/img/portrait/small/avatar-s-3.png',
      'todo',
      1
    ),
    new Task(
      'QA Testing',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Elizabeth Elliott',
      'assets/img/portrait/small/avatar-s-3.png',
      'todo',
      2
    ),
    new Task(
      'Budget',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Elizabeth Elliott',
      'assets/img/portrait/small/avatar-s-3.png',
      'todo',
      3
    ),
  ];

  public inProcess: Task[] = [
    new Task(
      'inProcess',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Bruce Reid',
      'assets/img/portrait/small/avatar-s-1.png',
      'inProcess',
      1
    ),
    new Task(
      'Navigation',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Bruce Reid',
      'assets/img/portrait/small/avatar-s-1.png',
      'inProcess',
      2
    ),
    new Task(
      'Bootstrap 4',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Bruce Reid',
      'assets/img/portrait/small/avatar-s-1.png',
      'inProcess',
      3
    ),
  ];

  public backLog: Task[] = [
    new Task(
      'backLog',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Kelly Reyes',
      'assets/img/portrait/small/avatar-s-5.png',
      'backLog',
      1
    ),
    new Task(
      'Schedule',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Kelly Reyes',
      'assets/img/portrait/small/avatar-s-5.png',
      'backLog',
      2
    ),
    new Task(
      'Unit tests',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Kelly Reyes',
      'assets/img/portrait/small/avatar-s-5.png',
      'backLog',
      3
    ),
  ];

  public completed: Task[] = [
    new Task(
      'Angular 5',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Sara Ali',
      'assets/img/portrait/small/avatar-s-7.png',
      'completed',
      1
    ),
    new Task(
      'Fields',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Sara Ali',
      'assets/img/portrait/small/avatar-s-7.png',
      'completed',
      2
    ),
    new Task(
      'completed',
      'Etiam porta sem malesuada magna mollis euismod.',
      4564,
      'Sara Ali',
      'assets/img/portrait/small/avatar-s-7.png',
      'completed',
      3
    ),
  ];

  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.creator = JSON.parse(window.localStorage.getItem('user')).userName;
    this.setToken();
  }

  setToken() {
    this.windowStorage = JSON.parse(window.localStorage.getItem('user'));
    if (this.windowStorage === null || this.windowStorage === undefined) {
      this.router.navigate(['/app/login']);
    } else {
      this.token = this.windowStorage.token;
    }
  }

  addNewTask(title: string, message: string) {
    let todoObj = new Object();
    todoObj = {
      title: title,
      message: message,
      date: Date.now(),
      creator: this.creator,
      assignedto: 'aadii',
      status: 'status',
    };
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/addTask?token=${this.token}`;

    this.http.post(this._url, todoObj).subscribe((res: Response) => {
      this.result = res.json();
      return this.result;
    });
  }
  gettodo() {
    return this.todo;
  }
}
