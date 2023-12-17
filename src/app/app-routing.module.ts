import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {UpdateTaskComponent} from './update-task/update-task.component';
import {TaskDetailsComponent} from './task-details/task-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add', component: CreateTaskComponent },
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'details/:id', component: TaskDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
