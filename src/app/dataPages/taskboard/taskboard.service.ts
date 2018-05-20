import { Injectable } from "@angular/core";
import { Task } from "./taskboard.model";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { GlobalVaribles } from "./../../../app/shared/globalVariables/globalVariable";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";

@Injectable()
export class TaskBoardService {
  result: {};
  windowStorage: any;
  _url: string;
  token: string;
  public creator: string;
  constructor(
    private http: Http,
    public _globalVariableService: GlobalVaribles,
    public _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.creator = JSON.parse(window.localStorage.getItem("user")).userName;
    this.setToken();
  }

  public todo: Task[] = [
    new Task(
      "Responsive",
      "Etiam porta sem malesuada magna mollis euismod.",
      87979,
      "Elizabeth Elliott",
      "assets/img/portrait/small/avatar-s-3.png",
      "New"
    ),
    new Task(
      "QA Testing",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Elizabeth Elliott",
      "assets/img/portrait/small/avatar-s-3.png",
      "New"
    ),
    new Task(
      "Budget",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Elizabeth Elliott",
      "assets/img/portrait/small/avatar-s-3.png",
      "New"
    )
  ];

  public inProcess: Task[] = [
    new Task(
      "checklist",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Bruce Reid",
      "assets/img/portrait/small/avatar-s-1.png",
      "In Process"
    ),
    new Task(
      "Navigation",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Bruce Reid",
      "assets/img/portrait/small/avatar-s-1.png",
      "In Process"
    ),
    new Task(
      "Bootstrap 4",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Bruce Reid",
      "assets/img/portrait/small/avatar-s-1.png",
      "In Process"
    )
  ];

  public backLog: Task[] = [
    new Task(
      "Assessment",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Kelly Reyes",
      "assets/img/portrait/small/avatar-s-5.png",
      "Pending"
    ),
    new Task(
      "Schedule",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Kelly Reyes",
      "assets/img/portrait/small/avatar-s-5.png",
      "Pending"
    ),
    new Task(
      "Unit tests",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Kelly Reyes",
      "assets/img/portrait/small/avatar-s-5.png",
      "Pending"
    )
  ];

  public completed: Task[] = [
    new Task(
      "Angular 5",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Sara Ali",
      "assets/img/portrait/small/avatar-s-7.png",
      "Completed"
    ),
    new Task(
      "Fields",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Sara Ali",
      "assets/img/portrait/small/avatar-s-7.png",
      "Completed"
    ),
    new Task(
      "Task board",
      "Etiam porta sem malesuada magna mollis euismod.",
      4564,
      "Sara Ali",
      "assets/img/portrait/small/avatar-s-7.png",
      "Completed"
    )
  ];

  setToken() {
    this.windowStorage = JSON.parse(window.localStorage.getItem("user"));
    if (this.windowStorage === null || this.windowStorage === undefined) {
      this.router.navigate(["/app/login"]);
    } else {
      this.token = this.windowStorage.token;
      // console.log(this.token);
    }
  }

  addNewTask(title: string, message: string) {
    let todoObj = new Object();
    todoObj = {
      title: title,
      message: message,
      date: Date.now(),
      creator: this.creator,
      assignedto: "aadii",
      status: "status"
    };
    this._url = `${
      this._globalVariableService.baseServerUrl
    }/task/addTask?token=${this.token}`;
    console.log(todoObj);
    this.http.post(this._url, todoObj)
    .map((res: Response) => {
      console.log("jjjjj");
      this.result = res.json();
      return this.result;
    });
  }
  gettodo() {
    return this.todo;
  }
}
