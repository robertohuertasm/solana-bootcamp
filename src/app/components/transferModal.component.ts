import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  TransactionSenderSignal,
  injectTransactionSender,
} from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import {
  Result,
  TransferFormComponent,
  TransferFormModel,
} from './transferForm.component';
import { ShyftService } from '../services/shyft.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-transfer-modal',
  standalone: true,
  imports: [CommonModule, MatButton, TransferFormComponent],
  template: `
    <div class="bg-black border-4 border-green-500 p-10 text-green-500">
      <sb-transfer-form
        (cancel)="onClose()"
        (submitForm)="onTransfer($event)"
        [isInTransfer]="isInTransfer"
        [result$]="result$"
      ></sb-transfer-form>
    </div>
  `,
})
export class TransferModalComponent {
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly shyftService = inject(ShyftService);
  private transactionSender: TransactionSenderSignal =
    injectTransactionSender();

  public isInTransfer = false;
  public readonly result$ = new BehaviorSubject<Result>(undefined);

  public onTransfer(data: Required<TransferFormModel>): void {
    if (this.isInTransfer) return;
    this.isInTransfer = true;
    this.result$.next(undefined);

    this.transactionSender
      .send(({ publicKey }) => {
        const t = createTransferInstructions({
          senderAddress: publicKey.toBase58(),
          receiverAddress: data.receiver,
          mintAddress: this.shyftService.token,
          amount: data.amount * 10 ** this.shyftService.tokenDecimals,
          memo: data.memo,
          fundReceiver: true,
        });
        return t;
      })
      .subscribe({
        next: (signature) => {
          console.log(`Transaction sent ${signature}`);
        },
        error: (e) => {
          this.isInTransfer = false;
          console.error(e);
          this.result$.next('ko');
        },
        complete: () => {
          this.isInTransfer = false;
          this.result$.next('ok');
          this.onClose();
        },
      });
  }

  public onClose(): void {
    if (this.isInTransfer) return;
    this.matDialogRef.close(this.result$.value);
  }
}
