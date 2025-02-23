import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'conidea-back-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  template: ` <button mat-stroked-button type="button" routerLink="../">
    <mat-icon
      aria-hidden="false"
      aria-label="Arrow Back"
      fontIcon="arrow_back"
    ></mat-icon>
    Back
  </button>`,
  styles: `
    :host {
      @apply block;
    }
  `,
})
export class BackButtonComponent {}
