import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HidePasswordPipe } from './pipes/hide-password.pipe';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    CapitalizePipe,
    HidePasswordPipe,
  ],
  imports: [CommonModule,FormsModule, RouterModule, IonicModule],
  exports: [AuthLayoutComponent, 
    CapitalizePipe, 
    HidePasswordPipe,
  FormsModule,
IonicModule],
})
export class SharedModule {}
