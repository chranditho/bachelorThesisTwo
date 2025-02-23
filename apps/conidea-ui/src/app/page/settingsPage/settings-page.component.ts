import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSwitchComponent } from '../../component/roleSwitch/role-switch.component';
import { RoleService } from '../../service/role.service';
import { Observable, tap } from 'rxjs';
import { User, UserRole } from '@conidea/model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../../component/backButton/back-button.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'conidea-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    RoleSwitchComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    BackButtonComponent,
    MatTabsModule,
  ],
  templateUrl: './settings-page.component.html',
  styles: [
    `
      :host {
        @apply block space-y-2 sm:space-y-4 max-w-3xl mx-auto;
      }
    `,
  ],
})
export class SettingsPageComponent implements OnInit {
  users$!: Observable<User[]>;
  protected selectedTab = new FormControl(0);
  protected readonly UserRole = UserRole;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.users$ = this.roleService.getAllUsersSortedByEmail().pipe(
      tap((users) => {
        const loggedInUserIndex = this.getLoggedInUserIndex(users);

        if (loggedInUserIndex !== -1) {
          this.selectedTab.setValue(loggedInUserIndex);
        }
      })
    );
  }

  getLoggedInUserIndex(users: User[]): number {
    return users.findIndex((user) => user.isLoggedIn);
  }

  logInUser(users: User[], tabIndex: number) {
    if (tabIndex >= 0 && tabIndex < users.length) {
      const selectedUser: User = users[tabIndex];

      this.roleService.logIn(selectedUser._id).subscribe({
        next: (user) =>
          this.showSnackBar(`Logged in as ${user.email}`, 'success-snackbar'),
        error: () => this.showSnackBar('Error logging in', 'error-snackbar'),
        complete: () => this.selectedTab.setValue(tabIndex),
      });
    } else {
      console.error('Invalid tabIndex:', tabIndex);
      this.showSnackBar('Invalid tabIndex', 'error-snackbar');
    }
  }

  switchRole(isToggleChecked: boolean, userId: string) {
    const targetRole = isToggleChecked ? UserRole.Reviewer : UserRole.User;
    this.roleService.switchUserRole(userId, targetRole).subscribe({
      next: (next) =>
        this.showSnackBar(
          `Role switched to ${next.role} successfully`,
          'success-snackbar'
        ),
      error: () => this.showSnackBar('Error switching roles', 'error-snackbar'),
    });
  }

  private showSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [panelClass],
    });
  }

  getFullname(user: User) {
    return `${user.firstname} ${user.lastname}`;
  }
}
