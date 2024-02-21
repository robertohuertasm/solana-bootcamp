import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { format } from 'path';

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
    <h2 class="text-1xl font-bold">Transfer</h2>
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
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
      <button
        type="submit"
        mat-raised-button
        color="primary"
        [disabled]="form.invalid"
      >
        Submit
      </button>
    </form>
  `,
})
export class TransferFormComponent {
  @Output() public readonly submitForm = new EventEmitter<
    Required<TransferFormModel>
  >();
  public model: TransferFormModel = { email: undefined };

  public onSubmit(form: NgForm) {
    if (form.invalid || !this.model.email) {
      console.error('form is invalid');
    } else {
      this.submitForm.emit(this.model as Required<TransferFormModel>);
    }
  }
}
