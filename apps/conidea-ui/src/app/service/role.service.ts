import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, UserRole } from '@conidea/model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}
  getAllUsersSortedByEmail(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(
        map((users) => users.sort((a, b) => b.email.localeCompare(a.email))),
      );
  }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/current`);
  }

  logIn(userId: string) {
    return this.http.put<User>(`${this.apiUrl}/${userId}/login`, {});
  }

  switchUserRole(userId: string, newRole: UserRole): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/role`, {
      role: newRole,
    });
  }
}
