import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TaskBoardService } from './taskboard.service';
import { Task } from './taskboard.model';
@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  providers: [TaskBoardService],
  encapsulation: ViewEncapsulation.None,
})
export class TaskboardComponent {
  @ViewChild('todoTitle') titleInputRef: ElementRef;
  @ViewChild('todoMessage') messageInputRef: ElementRef;

  public todo: Task[];
  public inProcess: Task[];
  public completed: Task[];
  public backLog: Task[];

  constructor(private taskBoardService: TaskBoardService) {
    this.todo = taskBoardService.todo;
    this.inProcess = taskBoardService.inProcess;
    this.backLog = taskBoardService.backLog;
    this.completed = taskBoardService.completed;
  }

  transferDataSuccess($event: any, to) {
    const from = $event.dragData.status;
    console.log(to + from);
    if (to === from) {
      return;
    }
    // entering in the row
    if (to === 'todo') {
      this.todo.push($event.dragData);
    } else if (to === 'inProcess') {
      this.inProcess.push($event.dragData);
    } else if (to === 'completed') {
      this.completed.push($event.dragData);
    } else if (to === 'backLog') {
      this.backLog.push($event.dragData);
    }

    // deleting for the row
    if (from === 'New') {
      this.todo = this.todo.filter(el => el.taskId !== $event.dragData.taskId);
    } else if (from === 'inProcess') {
      console.log(this.inProcess);
      this.inProcess = this.inProcess.filter(
        el => el.taskId !== $event.dragData.taskId
      );
    } else if (from === 'completed') {
      this.completed = this.completed.filter(
        el => el.taskId !== $event.dragData.taskId
      );
    } else if (from === 'backLog') {
      this.backLog = this.backLog.filter(
        el => el.taskId !== $event.dragData.taskId
      );
    }
  }
}
