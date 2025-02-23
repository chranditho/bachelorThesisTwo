import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { Router, RouterModule } from '@angular/router';
import { IdeaService } from '../../service/idea.service';
import { Observable, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CreateDraftDto, CreateIdeaDto, User } from '@conidea/model';
import { BackButtonComponent } from '../../component/backButton/back-button.component';
import { RoleService } from '../../service/role.service';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DraftService } from '../../service/draft.service';

@Component({
  selector: 'conidea-add-idea-page',
  imports: [
    QuillEditorComponent,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    BackButtonComponent,
    AsyncPipe,
  ],
  template: `
    <article class="space-y-6">
      <conidea-back-button />
      <h1 class="text-center">What idea is on your mind?</h1>
      @if (user$ | async; as user) {
        <form [formGroup]="ideaForm" class="flex flex-col items-center gap-8">
          <input
            class="w-full bg-secondary rounded-lg p-4 font-bold placeholder:italic placeholder:text-primary"
            [formControlName]="'title'"
            placeholder="title"
          />
          <quill-editor
            id="description"
            class="w-full bg-secondary rounded-lg h-96"
            [formControlName]="'description'"
            placeholder="description"
          >
          </quill-editor>
          <div class="flex gap-4">
            <button
              id="submit"
              mat-flat-button
              color="primary"
              type="submit"
              [disabled]="ideaForm.invalid"
              (click)="onSubmit(user._id)"
            >
              Submit
            </button>
            <button
              id="save"
              mat-button
              type="submit"
              [disabled]="ideaForm.invalid"
              (click)="onSave(user._id)"
            >
              Save as draft
            </button>
          </div>
        </form>
      }
    </article>
  `,
  styles: [
    `
      :host {
        @apply block space-y-6 max-w-3xl mx-auto;
      }
    `,
  ],
})
export class AddIdeaPageComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  ideaForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  private ideaSubscription?: Subscription;

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private draftService: DraftService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.user$ = this.roleService.getCurrentUser();
  }

  onSubmit(userId: string) {
    if (this.ideaForm.valid) {
      const newIdea: CreateIdeaDto = {
        title: this.ideaForm.controls.title.value,
        description: this.ideaForm.controls.description.value,
        userId,
      };

      this.ideaService.postIdea(newIdea).subscribe({
        next: () =>
          this.showSnackBar('Idea posted successfully', 'success-snackbar'),
        error: () => this.showSnackBar('Error posting idea', 'error-snackbar'),
        complete: () => this.navigateToFeed(),
      });
    }
  }

  onSave(userId: string) {
    if (this.ideaForm.valid) {
      const newDraft: CreateDraftDto = {
        title: this.ideaForm.controls.title.value,
        description: this.ideaForm.controls.description.value,
        userId,
      };

      this.draftService.create(newDraft).subscribe({
        next: () =>
          this.showSnackBar('Draft saved successfully', 'success-snackbar'),
        error: () => this.showSnackBar('Error saving draft', 'error-snackbar'),
        complete: () => this.navigateToFeed(),
      });
    }
  }

  navigateToFeed() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.ideaSubscription) {
      this.ideaSubscription.unsubscribe();
    }
  }

  private showSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [panelClass],
    });
  }
}
