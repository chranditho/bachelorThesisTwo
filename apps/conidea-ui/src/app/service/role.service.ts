import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserDto, UserRole } from '@conidea/model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsersSortedByEmail(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>(this.apiUrl)
      .pipe(
        map((users) => users.sort((a, b) => b.email.localeCompare(a.email))),
      );
  }

  getCurrentUser() {
    return this.http.get<UserDto>(`${this.apiUrl}/current`);
  }

  logIn(userId: string) {
    return this.http.put<UserDto>(`${this.apiUrl}/${userId}/login`, {});
  }

  switchUserRole(userId: string, newRole: UserRole): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${userId}/role`, {
      role: newRole,
    });
  }
}
