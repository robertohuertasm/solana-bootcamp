import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceComponent } from '../components/balance.component';
import { TransactionsComponent } from '../components/transactions.component';
import { Observable, switchMap } from 'rxjs';
import {
  Balance,
  ShyftService,
  TokenBalance,
  Transaction,
} from '../services/shyft.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { TransferFormComponent } from '../components/transferForm.component';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    BalanceComponent,
    TransactionsComponent,
    TransferFormComponent,
  ],
  selector: 'sb-balance-page',
  template: ` <div class="flex flex-col space-y-5 p-10">
    <sb-balance [tokenBalance$]="tokenBalance$"></sb-balance>
    <sb-transactions [transactions$]="transactions$"></sb-transactions>
  </div>`,
})
export class BalancePageComponent {
  private shyftService = inject(ShyftService);
  public walletStore = inject(WalletStore);

  public tokenBalance$: Observable<TokenBalance | undefined> =
    this.walletStore.publicKey$.pipe(
      switchMap((a) => this.shyftService.getTokenBalance(a?.toBase58()))
    );

  public balance$: Observable<Balance | undefined> =
    this.walletStore.publicKey$.pipe(
      switchMap((a) => this.shyftService.getBalance(a?.toBase58()))
    );

  public transactions$: Observable<Transaction[]> =
    this.walletStore.publicKey$.pipe(
      switchMap((a) => this.shyftService.getTransactions(a?.toBase58()))
    );
}
