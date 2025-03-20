import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { getUsers } from '../../database/users';
import User from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss',
})
export class AllUsersComponent implements OnInit, OnChanges {
  users: User[] = [];
  allUsers: User[] = [];
  loading: boolean = false;
  recentCustomers: User[] = [];
  totalUsers: number = 0;
  @Input() search = '';
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
      this.allUsers = users;
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


  
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes?.['search']) {
  //     const search = changes?.['search']?.currentValue; // Get new value of search state input

  //     // Filter users based on a property like 'name' or 'email'
  //     this.users = this.allUsers.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(search.toLowerCase()) ||
  //         user.email.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }
  // }


   ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['search']) {
      this.filterUsers();
    }
  }

  onSearchChange() {
    this.filterUsers();
  }

  filterUsers() {
    const searchTerm = this.search.toLowerCase();
    this.users = this.allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  
  editUserClick(user: User): void {
    this.router.navigate(['users', 'edit', user.id]);
  }

  deleteUserClick(user: User, index: number): void {
    this.users.splice(index, 1);
    alert(`User ${user.name} Deleted Successfully`);
  }
}



