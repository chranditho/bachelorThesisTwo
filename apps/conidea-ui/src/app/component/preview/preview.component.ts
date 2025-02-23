import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conidea-preview',
  imports: [CommonModule],
  template: `<h5 class="italic">preview feature</h5>
    <ng-content></ng-content>`,
  styles: [
    `
      :host {
        @apply block w-full rounded-xl border-2 border-dashed border-yellow-300 p-3;
      }
    `,
  ],
})
export class PreviewComponent {}
