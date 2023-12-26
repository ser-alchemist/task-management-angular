import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../task';
import { SharedService } from '../../shared.service';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]>;
  showActiveOnly = false;
  hideExpired = false;
  totalElements = 0;
  request = {page: "0", size: "10"};
  constraint = 'default';
  sortBy = 'Default';
  sortByC = 'default';
  filter = 'all';
  type = 'desc';
  uid: number;

  constructor(private taskService: TaskService, private router: Router, private sharedService: SharedService) {}
  ngOnInit() {
    this.uid = this.sharedService.getUid();
    console.log('UID:', this.uid);
    this.reloadData();
  }

  reloadData() {
    this.taskService.getTaskListC(this.uid, this.request, this.filter, this.sortByC, this.type)
                                  .subscribe(data => {
                                      this.tasks = data['content'];
                                      this.totalElements = data['totalElements'];
                                    }
                                    , error => {
                                      console.log(error.error.message);
                                    }
                                  );
    // this.tasks = this.taskService.getTaskList();
    /*switch (this.constraint) {
      case 'sort-dueDate-asc':
        this.sortByDueDateO2L();
        break;
      case 'sort-dueDate-desc':
        this.sortByDueDateL2O();
        break;
      case 'sort-priority-asc':
        this.sortByPriorityH2L();
        break;
      case 'sort-priority-desc':
        this.sortByPriorityL2H();
        break;
      case 'sort-default':
        this.getTasks2();
        break;
      default:
        this.getTasks2();
    }*/
  }

  getTasks2() {
    this.constraint = 'sort-default';
    this.sortBy = 'Default';
    this.sortByC = 'default';
    this.taskService.getTaskList2(this.request)
      .subscribe(data => {
          this.tasks = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }
  nextPage(event: PageEvent) {
    this.request['page'] = event.pageIndex.toString();
    this.request['size'] = event.pageSize.toString();
    this.reloadData();
  }

  toggleFilterStatus(event: any) {
    this.showActiveOnly = event.target.checked;
    if (this.showActiveOnly) {
      if (this.filter === 'valid') {
        this.filter = 'active&valid';
      } else {
        this.filter = 'active';
      }
    } else {
      if (this.filter === 'active&valid') {
        this.filter = 'valid';
      } else {
        this.filter = 'all';
      }
    }
    this.reloadData();
  }

  toggleFilterDate(event: any) {
    this.hideExpired = event.target.checked;
    if (this.hideExpired) {
      if (this.filter === 'active') {
        this.filter = 'active&valid';
      } else {
        this.filter = 'valid';
      }
    } else {
      if (this.filter === 'active&valid') {
        this.filter = 'active';
      } else {
        this.filter = 'all';
      }
    }
    this.reloadData();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  taskDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateTask(id: number) {
    this.router.navigate(['update', id]);
  }

  makeTaskComplete(id: number) {
    this.taskService.makeTaskCompleted(id);
  }
  sortByDueDateO2L() {
    this.sortByC = 'date';
    this.type = 'asc';
    this.constraint = 'sort-dueDate-asc';
    this.sortBy = 'Due Date (Oldest to Latest)';
    this.reloadData();
    /*this.taskService.sortByDueDateAsc(this.request)
      .subscribe(data => {
          this.tasks = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );*/
  }

  sortByDueDateL2O() {
    this.sortByC = 'date';
    this.type = 'desc';
    this.constraint = 'sort-dueDate-desc';
    this.sortBy = 'Due Date (Latest to Oldest)';
    this.reloadData();
    /*this.taskService.sortByDueDateDesc(this.request)
      .subscribe(data => {
          this.tasks = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );*/
  }

  sortByPriorityH2L() {
    this.sortByC = 'priority';
    this.type = 'asc';
    this.constraint = 'sort-priority-asc';
    this.sortBy = 'Priority (High to Low)';
    this.reloadData();
    /*this.taskService.sortByPriorityAsc(this.request)
      .subscribe(data => {
          this.tasks = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );*/
  }

  sortByPriorityL2H() {
    this.sortByC = 'priority';
    this.type = 'desc';
    this.constraint = 'sort-priority-desc';
    this.sortBy = 'Priority (Low to High)';
    this.reloadData();
    /*this.taskService.sortByPriorityDesc(this.request)
      .subscribe(data => {
          this.tasks = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );*/
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';
      case 'INACTIVE':
        return 'status-inactive';
      case 'COMPLETED':
        return 'status-completed';
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return '';
    }
  }

  getDateStatus(dueDate: string): string {
    // console.log('due date: ' + new Date(dueDate). + ' new date: ' + new Date());
    const taskDueDate = new Date(dueDate);
    taskDueDate.setHours(23, 59, 59, 999);
    if (taskDueDate < new Date()) {
      return 'status-expired';
    } else {
      return 'status-valid';
    }
  }
}
