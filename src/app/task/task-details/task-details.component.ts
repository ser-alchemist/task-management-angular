import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  id: number;
  task: Task;
  constructor(private route: ActivatedRoute, private router: Router,
              private taskService: TaskService) { }

  ngOnInit() {
    this.task = new Task();

    this.id = this.route.snapshot.params['id'];

    this.taskService.getTask(this.id)
      .subscribe(data => {
        // console.log(data);
        this.task = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['tasks']);
  }
}
