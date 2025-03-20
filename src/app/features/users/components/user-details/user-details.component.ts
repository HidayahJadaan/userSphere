import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUser } from '../../database/users';
import User from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  id: string | null = '';
  error: string = '';
  loading: boolean = false;
  user!: User;
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      getUser(this.id)
        .then((user: User) => {
          this.loading = false;
          this.user = user;
        })
        .catch((error: string) => {
          this.loading = false;
          this.error = error;
        });
    } else {
      this.error = 'Invalid User ID';
    }
  }
}
