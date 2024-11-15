import { Component, OnDestroy } from '@angular/core';
import { SomeService } from '../../some.service';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-11',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-11.component.html',
  styleUrl: './task-11.component.css',
})
export class Task11Component implements OnDestroy {
  //task11
  public id?: string;
  public name?: string;
  private destroy$ = new Subject<void>();
  constructor(private someService: SomeService) {}

  public getData(): void {
    if (!this.id) {
      return;
    }

    this.someService
      .getSomeData(this.id)
      .pipe(
        switchMap((response) => this.someService.getUserData(response)),
        switchMap((data) =>
          data ? this.someService.getMetadata(data.name) : of('User not found!')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.name = response;
          this.id = '';
        },
        error: (err) => console.log(err),
      });
  }

  ngOnDestroy() {
    console.log('Component destroyed, unsubscribing...');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
