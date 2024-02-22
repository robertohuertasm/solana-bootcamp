import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  TransactionSenderSignal,
  injectTransactionSender,
} from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { PublicKey } from '@solana/web3.js';
import { TransferFormComponent } from './transferForm.component';

@Component({
  selector: 'sb-transfer-modal',
  standalone: true,
  imports: [CommonModule, MatButton, TransferFormComponent],
  template: `
    <div class="bg-slate-600">
      <sb-transfer-form></sb-transfer-form>
      <button mat-raised-button color="primary" (click)="onTransfer()">
        Transfer
      </button>
      <button mat-raised-button (click)="onClose()">Close</button>
    </div>
  `,
})
export class TransferModalComponent {
  private readonly matDialogRef = inject(MatDialogRef);
  private transactionSender: TransactionSenderSignal =
    injectTransactionSender();

  public onTransfer(): void {
    this.transactionSender
      .send(({ publicKey }) => {
        console.log('publicKey', publicKey);
        const t = createTransferInstructions({
          senderAddress: publicKey.toBase58(),
          receiverAddress: PublicKey.default.toBase58(), // TODO: get receiver address
          mintAddress: PublicKey.default.toBase58(), // TODO: get mint address
          amount: 10,
          memo: 'NICE TRANSACTION',
          fundReceiver: true,
        });
        return t;
      })
      .subscribe({
        next: (signature) => console.log(`Transaction sent ${signature}`),
        error: (e) => console.error(e),
        complete: () => console.log('Transaction completed'),
      });
  }

  public onClose(): void {
    this.matDialogRef.close('output value');
  }
}
