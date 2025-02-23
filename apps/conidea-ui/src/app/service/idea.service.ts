import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateIdeaDto,
  Idea,
} from '@conidea/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getIdeas(): Observable<Idea[]> {
    return this.httpClient
      .get<Idea[]>(`${this.apiUrl}/ideas`)
      .pipe(
        map((ideas) =>
          ideas.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      );
  }

  postIdea(newIdea: CreateIdeaDto) {
    return this.httpClient.post<{ message: string }>(
      `${this.apiUrl}/ideas/new`,
      newIdea
    );
  }

  patchIdea$(changedStatusDto: ChangeStatusDto) {
    return this.httpClient.patch<Idea>(
      `${this.apiUrl}/ideas/update`,
      changedStatusDto
    );
  }

  createComment$(createCommentDto: CreateCommentDto) {
    return this.httpClient.post<Idea>(
      `${this.apiUrl}/ideas/comment`,
      createCommentDto
    );
  }

  submitDraft$(draftId: string): Observable<Idea> {
    return this.httpClient.post<Idea>(
      `${this.apiUrl}/ideas/draft/${draftId}`,
      {}
    );
  }
}
