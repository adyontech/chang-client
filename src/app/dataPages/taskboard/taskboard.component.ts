import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskBoardService } from './taskboard.service';
import { Task } from './taskboard.model';
import * as alertFunctions from './../../shared/data/sweet-alerts';
import { ToastrService } from './../../utilities/toastr.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  providers: [TaskBoardService],
  encapsulation: ViewEncapsulation.None,
})
export class TaskboardComponent implements OnInit {
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public creator: string;

  public todoMessage;
  public todoTitle;
  public todoAssigned;

  public todo: Task[];
  public inProcess: Task[];
  public completed: Task[];
  public backLog: Task[];
  public helperArray = [];

  constructor(
    private route: ActivatedRoute,
    private _taskBoardService: TaskBoardService,
    public _toastrService: ToastrService
  ) {
    this.creator = JSON.parse(window.localStorage.getItem('user')).userName;
    this.todo = _taskBoardService.todo;
    this.inProcess = _taskBoardService.inProcess;
    this.backLog = _taskBoardService.backLog;
    this.completed = _taskBoardService.completed;
  }

  ngOnInit() {
    this.getRouteParam();
    this.getHelpersName();
  }
  getRouteParam() {
    this.route.params.subscribe(params => {
      this.paramId = params.id.split('%20').join(' ');
      this.ownerName = params.owner.split('%20').join(' ');
      console.log(this.paramId);
      // this._dashboardSettingService.setParamId(this.paramId);
    });
    // this.breadcrumbs = [
    //   { name: 'Edit sLedger' },
    //   {
    //     name: 'Dashboard',
    //     link: `/${this.ownerName}/${this.paramId}/dashboard`,
    //   },
    // ];
  }

  getHelpersName() {
    this.dataCopy = this._taskBoardService
      .getHelpersName(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.helperArray = data.helperList;
      });
  }

  transferDataSuccess($event: any, to) {
    const from = $event.dragData.status;
    console.log(to + from);
    if (to === from) {
      return;
    }
    // entering in the row
    if (to === 'todo') {
      this.todo.unshift($event.dragData);
    } else if (to === 'inProcess') {
      this.inProcess.unshift($event.dragData);
    } else if (to === 'completed') {
      this.completed.unshift($event.dragData);
    } else if (to === 'backLog') {
      this.backLog.unshift($event.dragData);
    }

    // deleting for the row
    if (from === 'todo') {
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

  onAddTask() {
    let taskData = new Object();
    taskData = {
      message: this.todoMessage,
      title: this.todoTitle,
      assignedTo: this.todoAssigned,
      date: Date.now(),
      status: 'todo',
      creator: this.creator,
    };
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        console.log(taskData);
        // adding ledger id to body for easy backend retrival
        this._taskBoardService
          .addTask(taskData, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Todo successfully added'
              );
              this.todoMessage = '';
              this.todoTitle = '';
              this.todoAssigned = '';
              // the code is to check whether the window is a pop-up
              // or not, if pop-up then it will close it.
            } else {
              this._toastrService.typeError('Error', data.message);
            }
          });
      } else {
        return;
      }
    });
  }
}
