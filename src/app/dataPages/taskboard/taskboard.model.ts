export class Task {
  public taskTitle: string;
  public taskMessage: string;
  public createdOn: number;
  public createdBy: string;
  public assignedTo: string;
  public status: string;
  public taskId: number;

  constructor(
    taskTitle: string,
    taskMessage: string,
    createdOn: number,
    createdBy: string,
    assignedTo: string,
    status: string,
    taskId: number
  ) {
    this.taskTitle = taskTitle;
    this.taskMessage = taskMessage;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.assignedTo = assignedTo;
    this.status = status;
    this.taskId = taskId;
  }
}
