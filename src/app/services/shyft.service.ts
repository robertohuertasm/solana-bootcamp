import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export type TokenBalance = {
  address: string;
  isFrozen: boolean;
  balance: number;
  info: { image: string; name: string; symbol: string; decimals: number };
};

export type Balance = {
  balance: number;
};

export type Transaction = {
  timestamp: string;
  fee: number;
  fee_payer: string;
  type: string;
  signatures: string[];
  status: string;
  actions: {
    type: string;
    source_protocol: string;
    info: {
      sender?: string;
      receiver?: string;
      amount?: number;
      mint?: string;
    };
  }[];
  raw: { slot: number };
};

type Response<T> = { result: T };

@Injectable({
  providedIn: 'root',
})
export class ShyftService {
  private apiKey = '0tSbU8CBJArXjfwH';
  private httpClient = inject(HttpClient);
  private headers = { 'x-api-key': this.apiKey, redirect: 'follow' };
  public readonly tokenDecimals = 9;
  public readonly token = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs'; // sily dragon
  // public readonly token = 'So11111111111111111111111111111111111111112'; // wrapped sol
  public network = 'mainnet-beta';

  public getRpcEndpoint(): string {
    return `https://rpc.shyft.to?api_key=${this.apiKey}`;
  }

  public getTokenBalance(
    publicKey?: string
  ): Observable<TokenBalance | undefined> {
    if (!publicKey) {
      return of(undefined);
    }

    const url = new URL(`https://api.shyft.to/sol/v1/wallet/token_balance`);
    url.searchParams.append('network', this.network);
    url.searchParams.append('wallet', publicKey);
    url.searchParams.append('token', this.token);

    return this.httpClient
      .get<Response<TokenBalance>>(url.toString(), { headers: this.headers })
      .pipe(
        map((x) => x.result),
        catchError(() => of(undefined))
      );
  }

  public getBalance(publicKey?: string): Observable<Balance | undefined> {
    if (!publicKey) {
      return of(undefined);
    }

    const url = new URL(`https://api.shyft.to/sol/v1/wallet/balance`);
    url.searchParams.append('network', this.network);
    url.searchParams.append('wallet', publicKey);

    return this.httpClient
      .get<Response<Balance>>(url.toString(), { headers: this.headers })
      .pipe(
        map((x) => x.result),
        catchError(() => of(undefined))
      );
  }

  public getTransactions(publicKey?: string): Observable<Transaction[]> {
    if (!publicKey) {
      return of([]);
    }

    const url = new URL(`https://api.shyft.to/sol/v1/transaction/history`);
    url.searchParams.append('network', this.network);
    url.searchParams.append('account', publicKey);
    url.searchParams.append('enable_raw', 'true');

    return this.httpClient
      .get<Response<Transaction[]>>(url.toString(), { headers: this.headers })
      .pipe(
        map((x) => x.result),
        catchError(() => of([]))
      );
  }
}
