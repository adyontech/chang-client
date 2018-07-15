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
  public backLog: Task[];
  public completed: Task[];

  constructor(
    private elRef: ElementRef,
    private taskBoardService: TaskBoardService
  ) {
    this.todo = taskBoardService.todo;
    this.inProcess = taskBoardService.inProcess;
    this.backLog = taskBoardService.backLog;
    this.completed = taskBoardService.completed;
  }
  transferDataSuccess($event: any) {
    console.log($event);
    this.inProcess.push($event.dragData);
    console.log(this.inProcess);
  }
}
