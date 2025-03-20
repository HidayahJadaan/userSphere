import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUser, registerUser } from '../../features/users/database/users';
import User from '../../features/users/models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  // ============================================= REGISTER

  regName: string = '';
  regEmail: string = '';
  regPassword: string = '';
  regRole: string = '';

  regLoading: boolean = false;
  regSuccessMessage: string = '';
  regErrorMessage: string = '';

  // ============================================= REGISTER
  // ============================================= LOGIN
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  loadingVerify: boolean = false;
  signUpMode = false;
  // to use router service, we need to inject router service
  // into constructor parameters
  constructor(private router: Router) {}

  // ============================================= LOGIN
  userLogin(): void {
    this.error = '';
    this.loading = false;
    if (this.email.trim() && this.password.trim()) {
      // Success Login

      this.loading = true;

      loginUser(this.email, this.password)
        .then((user: User) => {
          this.loading = false;
          alert('Welcome User: ' + user.name);

          this.router.navigate(['users']);
        })
        .catch((error: string) => {
          this.loading = false;
          // this.loading = false;
          this.error = error;
        });
    } else {
      this.error = 'Invalid Email Or Password';
    }
  }

  // ============================================= REGISTER

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

  // ============================================= OTHERS

  toggleSignUpMode() {
    this.signUpMode = !this.signUpMode;
    console.log(this.signUpMode);
  }

  // moveSlider(index: number) {
  //   const images = document.querySelectorAll('.image');
  //   const textSlider = document.querySelector('.text-group') as HTMLElement;
  //   const bullets = document.querySelectorAll('.bullets span');

  //   images.forEach((img) => img.classList.remove('show'));
  //   const currentImage = document.querySelector(`.img-${index}`) as HTMLElement;
  //   currentImage.classList.add('show');

  //   textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  //   bullets.forEach((bull) => bull.classList.remove('active'));
  //   bullets[index - 1].classList.add('active');
  // }

  onFocus(event: any) {
    event.target.classList.add('active');
  }

  onBlur(event: any) {
    if (event.target.value === '') {
      event.target.classList.remove('active');
    }
  }

  // ============================================= SLIDER
  currentIndex: number = 1;
  intervalId: any;


  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  // Auto-slide function
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex % 3) + 1;
      this.moveSlider(this.currentIndex);
    }, 2800); // Changes every 2.5 seconds
  }

  // Move slider manually
  moveSlider(index: number) {
    this.currentIndex = index;
    clearInterval(this.intervalId); // Stop auto-slide when manually changed
    this.startAutoSlide(); // Restart auto-slide

    const images = document.querySelectorAll('.image');
    const textSlider = document.querySelector('.text-group') as HTMLElement;
    const bullets = document.querySelectorAll('.bullets span');

    images.forEach((img) => img.classList.remove('show'));
    const currentImage = document.querySelector(`.img-${index}`) as HTMLElement;
    currentImage.classList.add('show');

    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove('active'));
    bullets[index - 1].classList.add('active');
  }




}
