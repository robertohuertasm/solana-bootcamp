import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceComponent } from '../components/balance.component';
import { TransactionsComponent } from '../components/transactions.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import {
  Balance,
  ShyftService,
  TokenBalance,
  Transaction,
} from '../services/shyft.service';
import { WalletStore, ConnectionStore } from '@heavy-duty/wallet-adapter';
import { PublicKey } from '@solana/web3.js';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BalanceComponent,
    TransactionsComponent,
  ],
  selector: 'sb-balance-page',
  template: ` <select
      (change)="onSelect($event)"
      class="block bg-black border border-green-400 hover:border-green-500 px-2 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      @for (network of networks; track $index) {
      <option [value]="network" [selected]="network === selectedNetwork$.value">
        {{ network }}
      </option>
      }
    </select>
    <div class="flex flex-col space-y-5 p-10">
      <sb-balance [tokenBalance$]="tokenBalance$"></sb-balance>
      <sb-transactions [transactions$]="transactions$"></sb-transactions>
    </div>`,
})
export class BalancePageComponent implements OnInit {
  private shyftService = inject(ShyftService);
  private walletStore = inject(WalletStore);
  private connectionStore = inject(ConnectionStore);

  public networks = ['mainnet-beta', 'testnet', 'devnet'];
  public selectedNetwork$ = new BehaviorSubject<string>(this.networks[0]);

  private publicKey$ = this.selectedNetwork$.pipe(
    switchMap(() => this.walletStore.publicKey$)
  );

  private serviceOp<T = unknown>(
    op: (publicKey: PublicKey | null) => Observable<T>
  ): Observable<T> {
    return this.publicKey$.pipe(switchMap(op));
  }

  public ngOnInit() {
    // set the RPC endpoint
    this.connectionStore.setEndpoint(this.shyftService.getRpcEndpoint());
  }

  public onSelect(e?: Event): void {
    if (!e) return;
    const target = e.target as HTMLSelectElement;
    this.shyftService.network = target.value;
    this.selectedNetwork$.next(target.value);
  }

  public tokenBalance$: Observable<TokenBalance | undefined> = this.serviceOp(
    (a) => this.shyftService.getTokenBalance(a?.toBase58())
  );

  public balance$: Observable<Balance | undefined> = this.serviceOp((a) =>
    this.shyftService.getBalance(a?.toBase58())
  );

  public transactions$: Observable<Transaction[]> = this.serviceOp((a) =>
    this.shyftService.getTransactions(a?.toBase58())
  );
}
