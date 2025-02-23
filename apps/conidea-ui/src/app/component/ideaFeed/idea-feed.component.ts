import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusDto, CreateCommentDto, Idea } from '@conidea/model';
import { IdeaCardComponent } from './ideaCard/idea-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'conidea-idea-feed',
  imports: [
    CommonModule,
    IdeaCardComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="All Ideas">
        <section class="flex flex-col items-center gap-2 pt-4 sm:gap-4">
          @for (idea of ideas; track idea._id) {
            <div
              class="w-full divide-y divide-dashed rounded-xl border bg-white"
            >
              <conidea-idea-card
                [idea]="idea"
                [isStatusChangeable]="isStatusChangeable"
                (statusChange)="onStatusChange($event)"
              />
              <article class="flex w-full flex-col gap-4 p-4">
                <mat-accordion>
                  <mat-expansion-panel hideToggle>
                    <mat-expansion-panel-header>
                      <mat-panel-title
                        ><h6 class="w-full text-center">
                          Comments
                        </h6></mat-panel-title
                      >
                    </mat-expansion-panel-header>
                    <div class="flex w-full flex-col gap-2">
                      @for (comment of idea.comments; track comment) {
                        <mat-card>
                          <mat-card-content class="text-sm"
                            >{{ comment }}
                          </mat-card-content>
                        </mat-card>
                      }
                    </div>
                  </mat-expansion-panel>
                </mat-accordion>
                <div class="w-full">
                  <form
                    (ngSubmit)="onSubmit(idea._id)"
                    [formGroup]="commentForm"
                    class="flex flex-col items-center gap-8"
                  >
                    <input
                      [formControlName]="'text'"
                      class="placeholder:text-primary w-full rounded-lg bg-slate-100 p-4"
                      placeholder="new comment"
                    />
                  </form>
                </div>
              </article>
            </div>
          }
        </section>
      </mat-tab>
      <mat-tab label="My Ideas">
        <section class="flex flex-col items-center gap-2 pt-4 sm:gap-4">
          @if (ideaFilter(ideas).length > 0) {
            @for (idea of ideaFilter(ideas); track idea._id) {
              <div
                class="w-full divide-y divide-dashed rounded-xl border bg-white"
              >
                <conidea-idea-card
                  [idea]="idea"
                  [isStatusChangeable]="isStatusChangeable"
                  (statusChange)="onStatusChange($event)"
                />
                <article class="flex w-full flex-col gap-4 p-4">
                  <mat-accordion>
                    <mat-expansion-panel hideToggle>
                      <mat-expansion-panel-header>
                        <mat-panel-title
                          ><h6 class="w-full text-center">
                            Comments
                          </h6></mat-panel-title
                        >
                      </mat-expansion-panel-header>
                      <div class="flex w-full flex-col gap-2">
                        @for (comment of idea.comments; track comment) {
                          <mat-card>
                            <mat-card-content class="text-sm"
                              >{{ comment }}
                            </mat-card-content>
                          </mat-card>
                        }
                      </div>
                    </mat-expansion-panel>
                  </mat-accordion>
                  <div class="w-full">
                    <form
                      (ngSubmit)="onSubmit(idea._id)"
                      [formGroup]="commentForm"
                      class="flex flex-col items-center gap-8"
                    >
                      <input
                        [formControlName]="'text'"
                        class="placeholder:text-primary w-full rounded-lg bg-slate-100 p-4"
                        placeholder="new comment"
                      />
                    </form>
                  </div>
                </article>
              </div>
            }
          } @else {
            Once posted your ideas appear here.
          }
        </section>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      :host {
        @apply mx-auto block space-y-2 sm:space-y-4;
      }
    `,
  ],
})
export class IdeaFeedComponent {
  @Input({ required: true })
  ideas!: Idea[];
  @Input({ required: true })
  isStatusChangeable!: boolean;

  @Output()
  statusChange = new EventEmitter<ChangeStatusDto>();

  @Output()
  commentCreation = new EventEmitter<CreateCommentDto>();

  commentForm = new FormGroup({
    text: new FormControl('', { nonNullable: true }),
  });

  onStatusChange(changeStatus: ChangeStatusDto) {
    this.statusChange.emit(changeStatus);
  }

  ideaFilter(ideasToFilter: Idea[]) {
    return ideasToFilter.filter(
      (idea) => idea.author && idea.author.isLoggedIn,
    );
  }

  onSubmit(ideaId: string) {
    if (this.commentForm.valid) {
      this.commentCreation.emit({
        ideaId: ideaId,
        comment: this.comment(),
      });
      this.updateComments(ideaId);
      this.commentForm.reset();
    }
  }

  private updateComments(ideaId: string) {
    this.ideas
      .filter((i) => i._id === ideaId)
      .forEach((i) => i.comments.push(this.comment()));
  }

  private comment = (): string => this.commentForm.controls.text.value;
}
