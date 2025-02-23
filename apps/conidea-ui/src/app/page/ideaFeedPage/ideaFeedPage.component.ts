import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaFeedComponent } from '../../component/ideaFeed/idea-feed.component';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateIdeaDto,
  DraftDto,
  Idea,
  UpdateDraftDto,
  User,
  UserRole,
} from '@conidea/model';
import { IdeaService } from '../../service/idea.service';
import { RoleService } from '../../service/role.service';
import { DraftService } from '../../service/draft.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'conidea-idea-feed-page',
  imports: [
    CommonModule,
    IdeaFeedComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: 'ideaFeedPage.component.html',
  styles: [
    `
      :host {
        @apply block space-y-6;
      }
    `,
  ],
})
export class IdeaFeedPageComponent implements OnInit {
  drafts$!: Observable<DraftDto[]>;
  user$!: Observable<User>;
  isEditing: { [key: string]: boolean } = {};
  protected readonly UserRole = UserRole;
  private ideasSubject = new BehaviorSubject<Idea[]>([]);
  ideas$ = this.ideasSubject.asObservable();

  constructor(
    private ideaService: IdeaService,
    private draftService: DraftService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.ideas$ = this.ideaService.getIdeas();
    this.drafts$ = this.draftService.getDrafts();
    this.user$ = this.roleService.getCurrentUser();
  }

  toggleEdit(draftId: string): void {
    this.isEditing[draftId] = !this.isEditing[draftId];
  }

  submitDraft(draftId: string, createIdeaDto: CreateIdeaDto): void {
    this.ideaService.postIdea(createIdeaDto).subscribe({
      next: () => this.draftService.delete$(draftId).subscribe(),
      error: () =>
        this.snackBar.open(
          'Error submitting draft. Please try again.',
          'Dismiss',
          {
            duration: 5000,
          },
        ),
      complete: () =>
        this.snackBar
          .open('Idea submitted successfully, please reload page.', 'Reload', {
            duration: 5000,
          })
          .onAction()
          .subscribe(() => location.reload()),
    });
  }

  updateDraft(draftId: string, updatedDraft: UpdateDraftDto) {
    this.draftService
      .updateDraft$(draftId, updatedDraft)
      .subscribe(() => this.toggleEdit(draftId));
  }

  // Failed to delete draft. Please try again.
  deleteDraft(ideaId: string) {
    this.draftService.delete$(ideaId).subscribe({
      next: () =>
        this.snackBar
          .open('Draft deleted successfully, please reload page.', 'Reload', {
            duration: 5000,
          })
          .onAction()
          .subscribe(() => location.reload()),
      error: () =>
        this.snackBar.open(
          'Error deleting draft. Please try again.',
          'Dismiss',
          {
            duration: 5000,
          },
        ),
    });
  }

  onStatusChange(changeStatus: ChangeStatusDto) {
    this.updateIdeas$(this.changeStatus$(changeStatus)).subscribe(
      (updatedIdeas) => this.ideasSubject.next(updatedIdeas),
    );
  }

  onCommentCreation(createCommentDto: CreateCommentDto) {
    this.updateIdeas$(this.createComment$(createCommentDto)).subscribe(
      (updatedIdeas) => this.ideasSubject.next(updatedIdeas),
    );
  }

  private changeStatus$ = (changeStatus: ChangeStatusDto) =>
    this.ideaService.patchIdea$(changeStatus);

  private createComment$ = (createCommentDto: CreateCommentDto) =>
    this.ideaService.createComment$(createCommentDto);

  private updateIdeas$(idea$: Observable<Idea>) {
    return idea$.pipe(
      withLatestFrom(this.ideas$),
      map(([newIdea, currentIdeas]) => this.addToIdeas(newIdea, currentIdeas)),
    );
  }

  private addToIdeas(newIdea: Idea, currentIdeas: Idea[]) {
    const index = currentIdeas.findIndex(
      (idea: Idea) => idea._id === newIdea._id,
    );

    return index === -1
      ? currentIdeas
      : [
          ...currentIdeas.slice(0, index),
          newIdea,
          ...currentIdeas.slice(index + 1),
        ];
  }
}
