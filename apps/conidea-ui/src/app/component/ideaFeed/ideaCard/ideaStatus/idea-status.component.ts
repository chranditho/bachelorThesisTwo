import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from '@conidea/model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'conidea-idea-status',
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: 'idea-status.component.html'
})
export class IdeaStatusComponent {
  @Input({ required: true })
  status!: Status;
  @Input({ required: true })
  isStatusChangeable!: boolean;

  @Output() statusChange = new EventEmitter<Status>();

  protected readonly Status = Status;
}
