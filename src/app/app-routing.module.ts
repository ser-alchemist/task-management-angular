import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './task/task-list/task-list.component';
import {CreateTaskComponent} from './task/create-task/create-task.component';
import {UpdateTaskComponent} from './task/update-task/update-task.component';
import {TaskDetailsComponent} from './task/task-details/task-details.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { E403Component } from './errors/e403/e403.component';
import { E404Component } from './errors/e404/e404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add', component: CreateTaskComponent },
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'details/:id', component: TaskDetailsComponent },
  { path: 'details', component: TaskDetailsComponent },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'e403', component: E403Component },
  { path: 'e404', component: E404Component },
  { path: '**', pathMatch: 'full', component: E404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
