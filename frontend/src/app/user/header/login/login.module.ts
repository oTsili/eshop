import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../../shared/spinner/spinner.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatInputModule, FormsModule, SpinnerModule],
  exports: [LoginComponent],
})
export class LoginModule {}
