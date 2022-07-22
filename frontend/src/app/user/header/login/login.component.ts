import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  userIsAuthenticated = false;
  constructor() {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value.email, form.value.password);
    this.isLoading = false;
  }
}
