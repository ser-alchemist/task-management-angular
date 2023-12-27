import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../task';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  id: number;
  task: Task;

  constructor(private route: ActivatedRoute, private router: Router,
              private taskService: TaskService) { }

  ngOnInit() {
    this.task = new Task();

    this.id = this.route.snapshot.params['id'];
    console.log('ID: ');
    console.log(this.id);
    this.taskService.getTask(this.id)
      .subscribe(data => {
        console.log(data);
        this.task = data;
      }, error => console.log(error));
  }

  updateTask() {
    // this.task.status = 'ACTIVE';
    this.taskService.updateTask(this.id, this.task)
      .subscribe(data => {
        console.log(data);
        this.task = new Task();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.updateTask();
      console.log('Form submitted successfully:', this.task);
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }

}
