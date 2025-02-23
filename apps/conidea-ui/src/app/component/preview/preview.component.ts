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
        @apply block w-full border-2 border-yellow-300 rounded-xl p-3 border-dashed;
      }
    `,
  ],
})
export class PreviewComponent {}
