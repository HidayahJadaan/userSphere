import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';

import { AllUsersComponent } from './components/all-users/all-users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersListComponent, UserFormComponent, UserDetailsComponent, AllUsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, FormsModule],
})
export class UsersModule {}
