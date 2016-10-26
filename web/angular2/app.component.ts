import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <login></login>
    <login-twitter></login-twitter>
    <picture_original_urls></picture_original_urls>
  `,
  styles: [`
    my-app {
      background: #37678F;
    }
  `]
})
export class AppComponent {}