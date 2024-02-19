import { Component, Input } from '@angular/core';
import { Transaction } from '../services/shyft.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sb-transactions',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (transactions$ | async; as transactions) { @if( transactions.length){

    <section>
      <h2 class="font-bold">Transactions</h2>

      <div class="grid grid-cols-6 gap-4 p-5">
        <div class="font-bold">Transaction Signature</div>
        <div class="font-bold">Block</div>
        <div class="font-bold">Type</div>
        <div class="font-bold">Timestamp</div>
        <div class="font-bold">Fee</div>
        <div class="font-bold">Result</div>

        @for (transaction of transactions; track transaction.timestamp) { @if
        (transaction.signatures.length) {
        <div>
          <a
            class="text-emerald-500 hover:text-emerald-700 active:text-emerald-900"
            target="_blank"
            href="https://explorer.solana.com/tx/{{
              transaction.signatures[0]
            }}"
            >{{ transaction.signatures[0].substring(0, 20) }}...</a
          >
        </div>
        } @else {
        <div>Unknown</div>
        }
        <div>
          <a
            class="text-emerald-500 hover:text-emerald-700 active:text-emerald-900"
            target="_blank"
            href="https://explorer.solana.com/block/{{ transaction.raw.slot }}"
            >{{ transaction.raw.slot }}</a
          >
        </div>
        <div>{{ transaction.type }}</div>
        <div>{{ transaction.timestamp | date : 'long' }}</div>
        <div>{{ transaction.fee }} (SOL)</div>
        <div>{{ transaction.status }}</div>
        }
      </div>
    </section>
    } }
  `,
})
export class TransactionsComponent {
  @Input({ required: true }) public transactions$!: Observable<Transaction[]>;
}
