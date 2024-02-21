import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

export type TransferFormModel = { email?: string };

@Component({
  selector: 'sb-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatIcon,
    MatInput,
  ],
  template: `
    <form #form="ngForm">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input
          matInput
          [(ngModel)]="model.email"
          required
          #emailControl="ngModel"
          name="email"
          type="email"
          #recipient="ngModel"
        />
        <mat-icon matSuffix>email</mat-icon>
        @if (form.submitted && emailControl.errors) {
        <mat-error>
          @if(emailControl.errors['required']) { Email is required }
        </mat-error>
        } @else {
        <mat-hint>We will send you information to your email account.</mat-hint>
        }
      </mat-form-field>
    </form>
  `,
})
export class TransferFormComponent {
  public model: TransferFormModel = { email: undefined };
}
