import { Component, OnInit } from '@angular/core';
import { addUser, editUser, getUser } from '../../database/users';
import User from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  created_at: Date | undefined = undefined;

  errors: string[] = [];
  loading: boolean = false;
  loadingForGet: boolean = false;
  success: string = '';
  id: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadingForGet = true;
      getUser(this.id)
        .then((user: User) => {
          this.loadingForGet = false;

          this.name = user.name;
          this.email = user.email;
          this.role = user.role;
          this.created_at = user.created_at
            ? new Date(user.created_at)
            : undefined;

          // console.log('Loaded user with role:', this.role);
        })
        .catch((error: string) => {
          this.errors.push(error);
        });
    }
  }

  saveBtnClick(): void {
    this.loading = false;
    this.errors.length = 0;

    if (this.name.trim() && this.email.trim() && this.password.trim()) {
      let user: User = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      this.loading = true;

      if (this.id) {
        // Edit User
        user.id = this.id;
        user.created_at = this.created_at;

        editUser(user)
          .then(() => {
            this.loading = false;
            this.success = 'User Updated Successfully';
          })
          .catch((error: string) => {
            this.errors.push(error);
            this.loading = false;
          });
      } else {
        // Add User (email validation is handled inside addUser)
        addUser(user)
          .then(() => {
            this.loading = false;
            this.success = 'User Added Successfully';
          })
          .catch((error: string) => {
            this.errors.push(error);
            this.loading = false;
          });
      }
    } else {
      if (!this.name.trim()) this.errors.push('Name Is Required');
      if (!this.email.trim()) this.errors.push('Email Is Required');
      if (!this.password.trim()) this.errors.push('Password Is Required');
      if (!this.role) this.errors.push('Role Is Required');
    }
  }
}
