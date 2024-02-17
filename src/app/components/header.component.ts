import { Component } from '@angular/core';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

@Component({
  selector: 'sb-header',
  standalone: true,
  imports: [HdWalletMultiButtonComponent],
  template: `
    <div class="flex justify-between items-center p-6 bg-emerald-700">
      <h1 class="text-lg font-bold">Crypto Bank</h1>
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>
  `,
})
export class HeaderComponent {}
