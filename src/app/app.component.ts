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
      background-color: black;
      height: 100%;
      width: 100%;
      display: block;
      color: white; 
    }
  `,
})
export class AppComponent {}
