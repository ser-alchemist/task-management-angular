import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]>;
  showActiveOnly = false;
  hideExpired = false;
  constructor(private taskService: TaskService,
              private router: Router) {}
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks = this.taskService.getTaskList();
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

}
