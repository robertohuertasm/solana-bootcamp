import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sb-transfer-modal',
  standalone: true,
  imports: [CommonModule, MatButton],
  template: `
    <div>hola</div>
    <button mat-raised-button color="primary">Transfer</button>
    <button mat-raised-button (click)="onClose()">Close</button>
  `,
})
export class TransferModalComponent {
  private readonly matDialogRef = inject(MatDialogRef);

  public onClose(): void {
    this.matDialogRef.close();
  }
}
