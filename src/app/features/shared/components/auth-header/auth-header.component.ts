import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  standalone: false,
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss',
})
export class AuthHeaderComponent {
  activeIndex: number | null = null;

  menuItems = [
    { title: 'UserSphere', img: './assets/imgs/logo.png', link: '/login' },
    { title: 'Dashboard', icon: 'bi bi-house-door', link: '/users/list' },
    { title: 'All Employees', icon: 'bi bi-people', link: '/users/allEmp' },
    { title: 'Add New User', icon: 'bi bi-chat-dots', link: '/users/add' },
    { title: 'Help', icon: 'bi bi-question-circle', link: '#' },
    { title: 'Settings', icon: 'bi bi-gear', link: '#' },
    { title: 'Sign Out', icon: 'bi bi-box-arrow-right', link: '/login' },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
}
