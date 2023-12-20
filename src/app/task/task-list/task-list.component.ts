import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../task';
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
  // tasks: Task[];
  showActiveOnly = false;
  hideExpired = false;
  totalElements = 0;
  constructor(private taskService: TaskService,
              private router: Router) {}
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    // this.tasks = this.taskService.getTaskList();
    this.getTasks2({page: "0", size: "10"});
  }

  private getTasks2(request) {
    this.taskService.getTaskList2(request)
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
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getTasks2(request);
  }

  filterTasksByStatus() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.filter(task => task.status === 'ACTIVE'))
    );
  }
  filterTasksByDate() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.filter(task => new Date(task.dueDate) >= new Date()))
    );
  }

  toggleFilterStatus(event: any) {
    this.showActiveOnly = event.target.checked;
    if (this.showActiveOnly) {
      this.filterTasksByStatus();
    } else {
      this.reloadData();
    }
  }

  toggleFilterDate(event: any) {
    this.hideExpired = event.target.checked;
    if (this.hideExpired) {
      this.filterTasksByDate();
    } else {
      this.reloadData();
    }
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

  sortByDueDateO2L() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()))
    );
  }

  sortByDueDateL2O() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()))
    );
  }

  sortByPriorityH2L() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.sort((a, b) => this.mapPriority(a.priority) - this.mapPriority(b.priority)))
    );
  }

  sortByPriorityL2H() {
    this.tasks = this.tasks.pipe(
      map(tasks => tasks.sort((a, b) => this.mapPriority(b.priority) - this.mapPriority(a.priority)))
    );
  }

  mapPriority(priority: string): number {
    switch (priority) {
      case 'LOW':
        return 2;
      case 'MEDIUM':
        return 1;
      case 'HIGH':
        return 0;
      default:
        return 999; // Handle other cases if necessary
    }
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
    if (new Date(dueDate) >= new Date()) {
      return 'status-valid';
    } else {
      return 'status-expired';
    }
  }



}
