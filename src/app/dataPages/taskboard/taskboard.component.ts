import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
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
  public toCloseRef: any;
  public closeResult: string;
  public dataCopy: any;
  public paramId: string;
  public ownerName: string;
  public creator: string;

  public todoId;
  public todoMessage;
  public todoTitle;
  public todoAssigned = '';
  public todoStatus;

  public todo = [];
  public inProcess = [];
  public completed = [];
  public backLog = [];
  public helperArray = [];
  public allowedStatus = ['todo', 'inProcess', 'completed', 'backLog'];

  constructor(
    private route: ActivatedRoute,
    private _taskBoardService: TaskBoardService,
    public _toastrService: ToastrService,
    private modalService: NgbModal
  ) {
    this.creator = JSON.parse(window.localStorage.getItem('user')).userName;
  }

  ngOnInit() {
    this.getRouteParam();
    this.getAllTasks();
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

  open(content, dataObj) {
    console.log(dataObj);
    this.todoId = dataObj._id;
    this.todoMessage = dataObj.message;
    this.todoTitle = dataObj.title;
    this.todoAssigned = dataObj.assignedTo;
    this.todoStatus = dataObj.status;
    this.toCloseRef = this.modalService.open(content);
    this.toCloseRef.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        console.log(reason);
      }
    );
  }

  updateTask() {
    if (this.todoMessage === '' || this.todoTitle === '') {
      return;
    }
    let taskData = new Object();
    taskData = {
      _id: this.todoId,
      message: this.todoMessage,
      title: this.todoTitle,
      assignedTo: this.todoAssigned,
      status: this.todoStatus,
    };
    alertFunctions.SaveData().then(datsa => {
      if (datsa) {
        console.log(taskData);
        // adding ledger id to body for easy backend retrival
        this._taskBoardService
          .updateTask(taskData, this.paramId, this.ownerName)
          .subscribe(data => {
            if (data.success) {
              this._toastrService.typeSuccess(
                'success',
                'Todo successfully added'
              );
              this.getAllTasks();
              this.todoMessage = '';
              this.todoTitle = '';
              this.todoAssigned = '';
              this.toCloseRef.close();
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

  getHelpersName() {
    this.dataCopy = this._taskBoardService
      .getHelpersName(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.helperArray = data.helperList;
      });
  }

  getAllTasks() {
    this.dataCopy = this._taskBoardService
      .getAllTasks(this.paramId, this.ownerName)
      .map(response => response.json())
      .subscribe(data => {
        // console.log(data);
        this.todo = data.todoArray;
        this.inProcess = data.inprogressArray;
        this.backLog = data.backlogArray;
        this.completed = data.completedArray;
        // this.helperArray = data.helperList;
      });
  }

  changeStatus(value, to) {
    let taskData = new Object();
    taskData = {
      _id: value._id,
      status: to,
    };
    this._taskBoardService
      .changeStatus(taskData, this.paramId, this.ownerName)
      .subscribe(data => {
        if (data.success) {
          this._toastrService.typeSuccess('success', 'Todo status updated');
          this.todoMessage = '';
          this.todoTitle = '';
          this.todoAssigned = '';
          // the code is to check whether the window is a pop-up
          // or not, if pop-up then it will close it.
        } else {
          this._toastrService.typeError('Error', data.message);
        }
      });
  }

  transferDataSuccess($event: any, to) {
    const from = $event.dragData.status;
    this.changeStatus($event.dragData, to);
    // console.log($event.dragData);
    if (to === from) {
      return;
    }
    $event.dragData.status = to;
    // entering in the row
    if (to === 'todo') {
      this.todo.unshift($event.dragData);
    } else if (to === 'inProcess') {
      // console.log(this.todo);
      this.inProcess.unshift($event.dragData);
    } else if (to === 'completed') {
      this.completed.unshift($event.dragData);
    } else if (to === 'backLog') {
      this.backLog.unshift($event.dragData);
    }

    // deleting for the row
    if (from === 'todo') {
      // console.log($event.dragData);
      this.todo = this.todo.filter(el => el._id !== $event.dragData._id);

      // console.log(this.todo);
    } else if (from === 'inProcess') {
      // console.log(this.inProcess);
      this.inProcess = this.inProcess.filter(
        el => el._id !== $event.dragData._id
      );
    } else if (from === 'completed') {
      this.completed = this.completed.filter(
        el => el._id !== $event.dragData._id
      );
    } else if (from === 'backLog') {
      this.backLog = this.backLog.filter(el => el._id !== $event.dragData._id);
    }
  }

  onAddTask() {
    if (this.todoMessage === '' || this.todoTitle === '') {
      return;
    }
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
              this.todo.unshift(taskData);
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

  deleteTodo(deleteId) {
    this._taskBoardService
      .deleteTodo(deleteId, this.paramId, this.ownerName)
      .subscribe(res => {
        if (res.success === true) {
          this.getAllTasks();
          this._toastrService.typeSuccess('success', 'Todo deleted.');
        }
      });
  }
}
