import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenBalance } from '../services/shyft.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sb-balance',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (tokenBalance$ | async; as tokenBalance) {
    <section>
      <h2 class="font-bold py-4">Balance</h2>
      <div class="top-4 left-4 flex items-center gap-2">
        <img [src]="tokenBalance.info.image" class="h-5 w-8" />
        <p class="text-2xl">
          {{ tokenBalance.balance | number }} {{ tokenBalance.info.symbol }}
        </p>
      </div>
    </section>
    }
  `,
})
export class BalanceComponent {
  @Input({ required: true }) public tokenBalance$!: Observable<
    TokenBalance | undefined
  >;
}
