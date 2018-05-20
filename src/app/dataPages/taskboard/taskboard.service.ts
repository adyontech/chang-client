import { Injectable } from "@angular/core";
import { Task } from "./taskboard.model";

@Injectable()
export class TaskBoardService {
  public creator: string;
  constructor() {
    this.creator = JSON.parse(window.localStorage.getItem("user")).userName;
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

  addNewTask(title: string, message: string) {
    this.todo.push(
      new Task(
        title,
        message,
        Date.now(),
        this.creator,
        "assets/img/portrait/small/avatar-s-3.png",
        "New"
      )
    );
  }
  gettodo() {
    return this.todo;
  }
}
