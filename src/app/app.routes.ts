import { Route } from '@angular/router';
import { BalancePageComponent } from './pages/balancePage.component';

export const appRoutes: Route[] = [
  { path: '', component: BalancePageComponent },
  { path: '**', redirectTo: '' },
];
