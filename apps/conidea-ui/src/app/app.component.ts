import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'conidea-root',
  template: `<router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class AppComponent {}
