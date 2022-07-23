import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SpinnerModule, ReactiveFormsModule, MatInputModule],
  exports: [SignupComponent],
})
export class SignupModule {}
