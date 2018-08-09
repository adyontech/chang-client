import { Injectable } from '@angular/core';
import { Task } from './taskboard.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GlobalVaribles } from '../../shared/globalVariables/globalVariable';
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

  public todo: Task[] = [];

  public inProcess: Task[] = [];

  public backLog: Task[] = [];

  public completed: Task[] = [];

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

  getHelpersName(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/api/companyCollabList?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  getAllTasks(compName, owner) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/alltasks?token=${
      this.token
    }&&companyName=${compName}&&ownerName=${owner}`;
    return this.http.get(this._url);
  }

  addTask(todoObj, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/addTask?token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, todoObj).map((res: Response) => {
      return res.json();
    });
  }

  updateTask(todoObj, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/updateTask?token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, todoObj).map((res: Response) => {
      return res.json();
    });
  }

  changeStatus(todoObj, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/changeStatus?token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;
    return this.http.post(this._url, todoObj).map((res: Response) => {
      return res.json();
    });
  }

  deleteTodo(deleteId, companyName, ownerName) {
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/deleteTodo?deleteId=${deleteId}&&token=${
      this.token
    }&companyName=${companyName}&&ownerName=${ownerName}`;

    return this.http
      .delete(this._url)
      .map((response: Response) => response.json());
  }
}
// don't be so rude
