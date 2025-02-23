import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'conidea-role-switch',
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
  template: `
    <mat-slide-toggle
      [(ngModel)]="isToggleChecked"
      (change)="onChange()"
      color="primary"
      >Reviewer-Mode
    </mat-slide-toggle>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class RoleSwitchComponent {
  @Input({ required: true })
  isToggleChecked!: boolean;

  @Output()
  toggleChecked: EventEmitter<boolean> = new EventEmitter();

  onChange() {
    this.toggleChecked.emit(this.isToggleChecked);
  }
}
