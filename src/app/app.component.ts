import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  selector: 'sb-root',
  template: `
    <header>
      <sb-header></sb-header>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
      :host {
        @apply text-green-500 font-mono bg-black border-green-500 border-4 rounded p-4 space-y-4;
     
      height: 100%;
      width: 100%;
      display: block;
    }
  `,
})
export class AppComponent {}
