import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { WalletStore, ConnectionStore } from '@heavy-duty/wallet-adapter';
import { TransferModalComponent } from './transferModal.component';
import { ShyftService } from '../services/shyft.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sb-header',
  standalone: true,
  imports: [HdWalletMultiButtonComponent, CommonModule],
  template: `
    <div
      class="flex justify-between items-center p-6 border-green-500 border-4 rounded"
    >
      <h1 class="text-lg font-bold">Crypto Bank</h1>
      @if(this.walletStore.publicKey$ | async){
      <button (click)="onOpenModal()">Transfer</button>
      }
      <hd-wallet-multi-button color="primary"></hd-wallet-multi-button>
    </div>
  `,
})
export class HeaderComponent implements OnInit {
  private shyftService = inject(ShyftService);
  private connectionStore = inject(ConnectionStore);
  private transferDialog = inject(MatDialog);
  public walletStore = inject(WalletStore);

  ngOnInit() {
    // set the RPC endpoint
    this.connectionStore.setEndpoint(this.shyftService.getRpcEndpoint());
  }

  public onOpenModal(): void {
    const ref = this.transferDialog.open(TransferModalComponent, {
      width: '50%',
      height: '50%',
      disableClose: true,
    });
    ref.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('Transfer result:', result);
      }
    });
  }
}
