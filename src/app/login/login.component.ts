import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  constructor(private router: Router, private http: HttpClient, private sharedService: SharedService) {}

  ngOnInit(): void {
  }

  Login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:8080/api/v1/user/login", bodyData).subscribe(  (resultData: any) => {
      console.log(resultData);

      if (resultData.message === "Email not exits") {
        alert("Email not exits");
      } else if (resultData.message === "Login Success") {
        const params = new HttpParams().set('email', this.email);
        this.http.get("http://localhost:8080/api/v1/user/getUid", { params }).subscribe((uid: number) => {
          console.log("uid is :" + uid);
          this.sharedService.setUid(uid);
          });
        this.router.navigateByUrl('/tasks');
      } else {
        alert("Email and Password not match");
      }
    });
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register');
  }
}
