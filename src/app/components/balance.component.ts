import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenBalance } from '../services/shyft.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transferModal.component';

@Component({
  selector: 'sb-balance',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (tokenBalance$ | async; as tokenBalance) {
    <section class="border-b border-green-500 pb-5">
      <h2 class="font-bold py-4">Balance</h2>
      <div class="flex items-center gap-4">
        <img [src]="tokenBalance.info.image" class="h-5 w-8" />
        <p class="text-2xl">
          {{ tokenBalance.balance | number }} {{ tokenBalance.info.symbol }}
        </p>
        <button
          type="button"
          (click)="onOpenModal()"
          class="font-semibold hover:bg-emerald-500 hover:text-black px-4"
        >
          Transfer {{ tokenBalance.info.name }}
        </button>
      </div>
    </section>
    }
  `,
})
export class BalanceComponent {
  private transferDialog = inject(MatDialog);

  @Input({ required: true }) public tokenBalance$!: Observable<
    TokenBalance | undefined
  >;

  public onOpenModal(): void {
    const ref = this.transferDialog.open(TransferModalComponent, {
      width: '50%',

      disableClose: true,
    });
    ref.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('Transfer result:', result);
      }
    });
  }
}
