import { Injectable } from '@angular/core';
import { CreateDraftDto, DraftDto, UpdateDraftDto } from '@conidea/model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  draftsApiUrl = 'http://localhost:3000/api/drafts';

  constructor(private httpClient: HttpClient) {}

  create(newDraft: CreateDraftDto) {
    return this.httpClient.post<{ message: string }>(
      `${this.draftsApiUrl}`,
      newDraft,
    );
  }

  getDrafts() {
    return this.httpClient
      .get<DraftDto[]>(`${this.draftsApiUrl}`)
      .pipe(
        map((drafts) =>
          drafts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        ),
      );
  }

  updateDraft$(_id: string, updatedDraft: UpdateDraftDto) {
    return this.httpClient.patch(`${this.draftsApiUrl}/${_id}`, updatedDraft);
  }

  delete$(draftId: string) {
    return this.httpClient.delete(`${this.draftsApiUrl}/${draftId}`);
  }
}
