import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { format } from 'path';
import { Observable, Subscription } from 'rxjs';

export type TransferFormModel = {
  receiver?: string;
  amount?: number;
  memo?: string;
};

export type Result = 'ok' | 'ko' | undefined;

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
    <form
      class="w-full max-w-lg"
      #form="ngForm"
      (ngSubmit)="onSubmit(form)"
      disabled
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3  ">
          <label class="label" for="amount"> Receiver <sup>*</sup> </label>
          <input
            class="console-big focus:outline-none focus:shadow-outline"
            id="receiver"
            type="text"
            [(ngModel)]="model.receiver"
            [disabled]="isInTransfer"
            name="receiver"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 md:w-1/2 ">
          <label class="label" for="amount"> Amount <sup>*</sup> </label>
          <input
            class="console-big focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            [(ngModel)]="model.amount"
            [disabled]="isInTransfer"
            name="amount"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="label" for="memo"> Message </label>
          <input
            class="console-big focus:outline-none focus:shadow-outline"
            id="memo"
            type="text"
            [(ngModel)]="model.memo"
            [disabled]="isInTransfer"
            name="memo"
          />
          <p class="text-green-600 text-xs italic">
            Attach a message to the transaction
          </p>
        </div>
      </div>

      @if (isInTransfer) {
      <p class="text-green-600 text-xl font-bold">Tranfer in progress...</p>
      } @else { @if(form.invalid || !isValid()) {
      <p class="text-green-200 text-xs italic pb-5">
        The form is not valid. Please fill the required forms
      </p>
      } @if(isValid()) {
      <button
        type="submit"
        class="font-semibold hover:bg-emerald-500 hover:text-black px-4"
        [disabled]="form.invalid || isInTransfer"
      >
        Transfer
      </button>
      }

      <button
        type="button"
        class="font-semibold hover:bg-emerald-500 hover:text-black px-4"
        (click)="onCancel()"
        [disabled]="isInTransfer"
      >
        Cancel
      </button>
      } @switch (result$ | async) { @case ('ok') {
      <p class="text-green-200 text-xs italic pb-5">
        The transference has been successful.
      </p>
      } @case ('ko') {
      <p class="text-green-200 text-xl italic pt-5">Some error occurred!</p>
      } @default { } }
    </form>
  `,
  styles: `
    .console {
      @apply bg-black border border-green-400 hover:border-green-500 px-2 py-2 pr-8 shadow leading-tight ;
    }

    .console-big {
      @apply bg-black border border-green-400 hover:border-green-500 appearance-none block w-full py-3 px-4 mb-3 leading-tight;
    }

    .label {
      @apply block uppercase tracking-wide text-green-700 text-xs font-bold mb-2;
    }
  `,
})
export class TransferFormComponent implements OnInit, OnDestroy {
  @Input() public isInTransfer = false;
  @Input({ required: true }) public result$!: Observable<Result>;
  @Output() public readonly submitForm = new EventEmitter<
    Required<TransferFormModel>
  >();
  @Output() public readonly cancel = new EventEmitter<void>();

  public model: TransferFormModel = {};

  private resultSubscription: Subscription | undefined;

  public ngOnInit(): void {
    this.resultSubscription = this.result$.subscribe((result) => {
      if (result === 'ok') {
        this.model = {};
      }
    });
  }

  public ngOnDestroy() {
    this.resultSubscription?.unsubscribe();
  }

  public isValid() {
    return this.model.receiver && this.model.amount;
  }

  public onSubmit(form: NgForm) {
    if (form.invalid || !this.isValid()) {
      console.error('form is invalid');
      // TODO: (ROB) validate form
    } else {
      this.submitForm.emit(this.model as Required<TransferFormModel>);
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
