import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task: Task = new Task();
  defaultDate = new Date().toISOString().split('T')[0];

  submitted = false;
  constructor(private taskService: TaskService,
              private router: Router) { }

  ngOnInit() {
  }
  newETask(): void {
    this.submitted = false;
    this.task = new Task();
  }

  save() {
    this.task.status = 'ACTIVE';
    this.taskService
      .createTask(this.task).subscribe(data => {
        console.log(data);
        this.task = new Task();
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      this.save();
      console.log('Form submitted successfully:', this.task);
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }


}
