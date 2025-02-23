import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusDto, Idea, Status } from '@conidea/model';
import { MatIconModule } from '@angular/material/icon';
import { IdeaStatusComponent } from './ideaStatus/idea-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'conidea-idea-card',
  standalone: true,
  imports: [
    CommonModule,
    IdeaStatusComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './idea-card.component.html',
  styles: [
    `
      :host {
        @apply block rounded-xl bg-white p-6 w-full;
        word-wrap: break-word;
      }
    `,
  ],
})
export class IdeaCardComponent {
  @Input({ required: true })
  idea!: Idea;

  @Input({ required: true })
  isStatusChangeable!: boolean;

  @Output()
  statusChange = new EventEmitter<ChangeStatusDto>();

  onStatusChange(status: Status) {
    this.statusChange.emit({ ideaId: this.idea._id, status });
  }
}
