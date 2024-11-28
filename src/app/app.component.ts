import { Component } from '@angular/core';

import { Task12Component } from './tasks/task-12/task-12.component';
import { Task15Component } from './tasks/task-1-5/task-1-5.component';
import { Task68Component } from './tasks/task-6-8/task-6-8.component';
import { Task11Component } from './tasks/task-11/task-11.component';
import { Task910Component } from './tasks/task-9-10/task-9-10.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Task12Component,
    Task15Component,
    Task68Component,
    Task11Component,
    Task910Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RxJS-tasks';

  public showComponent = true;

  public toggleComponent(): void {
    this.showComponent = !this.showComponent;
  }
}
