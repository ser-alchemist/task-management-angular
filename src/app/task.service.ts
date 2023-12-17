import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // tslint:disable-next-line:ban-types
  createTask(task: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, task);
  }

  // tslint:disable-next-line:ban-types
  updateTask(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
