import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Buffer } from 'buffer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).global = window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Buffer = Buffer;

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
