import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  constructor(private router: Router, private http: HttpClient) {}

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
