import { Route } from '@angular/router';
import { IdeaFeedPageComponent } from './page/ideaFeedPage/ideaFeedPage.component';
import { AddIdeaPageComponent } from './page/addIdeaPage/addIdeaPage.component';
import { SettingsPageComponent } from './page/settingsPage/settings-page.component';

export const appRoutes: Route[] = [
  { path: '', component: IdeaFeedPageComponent },
  { path: 'add', component: AddIdeaPageComponent },
  { path: 'settings', component: SettingsPageComponent },
];
