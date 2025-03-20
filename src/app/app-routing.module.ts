import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './features/shared/components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'users',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
