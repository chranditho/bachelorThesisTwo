import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { IdeaFeedComponent } from './component/ideaFeed/idea-feed.component';
import { PreviewComponent } from './component/preview/preview.component';

@Component({
    imports: [RouterModule, AsyncPipe, NgIf, IdeaFeedComponent, PreviewComponent],
    selector: 'conidea-root',
    template: `<router-outlet></router-outlet> `,
    styles: [
        `
      :host {
        @apply block;
      }
    `,
    ]
})
export class AppComponent {}
