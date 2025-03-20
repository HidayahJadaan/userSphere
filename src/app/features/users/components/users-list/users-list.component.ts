import { Component, OnInit } from '@angular/core';
import { getUsers } from '../../database/users';
import User from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  recentCustomers: User[] = [];
  totalUsers: number = 0;

  // Role-specific counts
  backendCount: number = 0;
  frontendCount: number = 0;
  fullstackCount: number = 0;
  designerCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    getUsers().then((users: User[]) => {
      this.users = users;
      this.totalUsers = users.length;

      // Reset role counts
      this.backendCount = 0;
      this.frontendCount = 0;
      this.fullstackCount = 0;

      // Count users for each role
      users.forEach((user) => {
        if (user.role === 'Backend Dev') this.backendCount++;
        else if (user.role === 'Frontend Dev') this.frontendCount++;
        else if (user.role === 'Full Stack Dev') this.fullstackCount++;
      });

      // Get the most recent 5 customers based on created_at
      this.recentCustomers = this.users
        .slice()
        .sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5);

      this.loading = false;
    });
  }

  editUserClick(user: User): void {
    this.router.navigate(['users', 'edit', user.id]);
  }

  deleteUserClick(user: User, index: number): void {
    this.users.splice(index, 1);
    alert(`User ${user.name} Deleted Successfully`);
  }
}
