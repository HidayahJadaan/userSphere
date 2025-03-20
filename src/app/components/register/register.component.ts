import { Component } from '@angular/core';
import User from '../../features/users/models/user.model';
import { FormsModule } from '@angular/forms';
import { registerUser } from '../../features/users/database/users';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  regName: string = '';
  regEmail: string = '';
  regPassword: string = '';
  regRole: string = '';

  regLoading: boolean = false;
  regSuccessMessage: string = '';
  regErrorMessage: string = '';

  constructor(private router: Router) {}


  registerUser() {
    if (!this.regName || !this.regEmail || !this.regPassword) {
      this.regErrorMessage = 'All fields are required!';
      return;
    }

    this.regLoading = true;
    this.regErrorMessage = '';
    this.regSuccessMessage = '';

    const newUser: User = {
      id: '', // Auto-generated
      name: this.regName,
      email: this.regEmail,
      password: this.regPassword,
      role: this.regRole,
      created_at: new Date(),
    };

    registerUser(newUser)
      .then((user: User) => {
        console.log('Registration successful', user);
        this.regSuccessMessage = 'Registration successful! Please login.';
        this.regLoading = false;
      })
      .catch((err: string) => {
        this.regErrorMessage = err;
        this.regLoading = false;
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
