import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TaskBoardService } from './taskboard.service';
import { Task } from './taskboard.model';
import { DragulaService } from 'ng2-dragula';
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
    private taskBoardService: TaskBoardService,
    public _dragulaService: DragulaService
  ) {
    this.todo = taskBoardService.todo;
    this.inProcess = taskBoardService.inProcess;
    this.backLog = taskBoardService.backLog;
    this.completed = taskBoardService.completed;

    this._dragulaService.dropModel.subscribe(value => {
      this.onDropModel(value.slice(1));
    });
    this._dragulaService.removeModel.subscribe(value => {
      this.onRemoveModel(value.slice(1));
    });
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;

    // do something else
  }

  onAddTask() {
    if (
      this.messageInputRef.nativeElement.value != '' &&
      this.titleInputRef.nativeElement.value != ''
    ) {
      this.taskBoardService.addNewTask(
        this.titleInputRef.nativeElement.value,
        this.messageInputRef.nativeElement.value
      );
      this.todo = this.taskBoardService.gettodo();
    }
    this.titleInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
    this.titleInputRef.nativeElement.focus();
  }
}
