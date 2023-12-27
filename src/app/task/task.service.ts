import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from './task';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  // tslint:disable-next-line:ban-types
  createTask(task: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  // tslint:disable-next-line:ban-types
  updateTask(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, value);
  }

  makeTaskCompleted(id: number): Observable<any> {
    console.log('url:' + `${this.baseUrl}/tasks/makeComplete/${id}`);
    return this.http.put(`${this.baseUrl}/tasks/makeComplete/${id}`, null);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, { responseType: 'text' });
  }

  getTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/`);
  }
  getTaskList2(request) {
    const params = request;
    return this.http.get(environment.apiUrl + 'tasks', {params});
  }
  getTaskListC(request, filter, sortBy, type) {
    const params = request;
    console.log('url:' + environment.apiUrl + 'tasks/' + filter + '/sort/' + sortBy + '/' + type);
    return this.http.get(environment.apiUrl + 'tasks/' + filter + '/sort/' + sortBy + '/' + type, {params});
  }
  sortByDueDateAsc(request) {
    const params = request;
    return this.http.get(environment.apiUrl + 'tasks/sort/date/asc', {params});
  }

  sortByDueDateDesc(request) {
    const params = request;
    return this.http.get(environment.apiUrl + 'tasks/sort/date/desc', {params});
  }

  sortByPriorityAsc(request) {
    const params = request;
    return this.http.get(environment.apiUrl + 'tasks/sort/priority/asc', {params});
  }

  sortByPriorityDesc(request) {
    const params = request;
    return this.http.get(environment.apiUrl + 'tasks/sort/priority/desc', {params});
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'tasks/');
  }

}
