import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChangeStatusDto,
  CreateCommentDto,
  CreateIdeaDto,
  IdeaDto,
} from '@conidea/model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getIdeas(): Observable<IdeaDto[]> {
    return this.httpClient
      .get<IdeaDto[]>(`${this.apiUrl}/ideas`)
      .pipe(
        map((ideas) =>
          ideas.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        ),
      );
  }

  postIdea(newIdea: CreateIdeaDto) {
    return this.httpClient.post<{ message: string }>(
      `${this.apiUrl}/ideas/new`,
      newIdea,
    );
  }

  patchIdea$(changedStatusDto: ChangeStatusDto) {
    return this.httpClient.patch<IdeaDto>(
      `${this.apiUrl}/ideas/update`,
      changedStatusDto,
    );
  }

  createComment$(createCommentDto: CreateCommentDto) {
    return this.httpClient.post<IdeaDto>(
      `${this.apiUrl}/ideas/comment`,
      createCommentDto,
    );
  }

  submitDraft$(draftId: string): Observable<IdeaDto> {
    return this.httpClient.post<IdeaDto>(
      `${this.apiUrl}/ideas/draft/${draftId}`,
      {},
    );
  }
}
