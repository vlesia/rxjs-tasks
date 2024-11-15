import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  catchError,
  combineLatest,
  delay,
  filter,
  from,
  fromEvent,
  interval,
  map,
  of,
  take,
  throttleTime,
  throwError,
  timeout,
} from 'rxjs';

@Component({
  selector: 'app-task-1-5',
  standalone: true,
  imports: [],
  templateUrl: './task-1-5.component.html',
  styleUrl: './task-1-5.component.css',
})
export class Task15Component implements OnInit, AfterViewInit {
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    //task1
    const task1 = interval(500)
      .pipe(
        take(5),
        map((num) => num + 1)
      )
      .subscribe({
        // next: (value) => console.log(value),
        // complete: () => console.log('Завершено'),
      });

    //task2
    const task2 = from([1, 2, 3, 4, 5])
      .pipe(
        map((num) => num + 10),
        filter((num) => num % 2 === 0)
      )
      .subscribe({
       // next: (value) => console.log(value),
      });

    //task3
    const task3 = combineLatest([interval(300), interval(500)]).subscribe({
      //next: (value) => console.log(value),
    });

    //task4
    const task4 = of({ data: 'response' })
      .pipe(
        delay(2000),
        timeout(2500),
        catchError((err) =>
          throwError(
            () => new Error('The request has exceeded the waiting time')
          )
        )
      )
      .subscribe({
        // next: (value) => console.log(value),
        // error: (error) => console.log(error.message),
      });

    this.destroyRef.onDestroy(() => {
      task1.unsubscribe();
      task2.unsubscribe();
      task3.unsubscribe();
      task4.unsubscribe();
    });
  }

  //task5
  @ViewChild('button') button?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (this.button) {
      const subscription = fromEvent(this.button.nativeElement, 'click')
        .pipe(throttleTime(1000), take(5))
        .subscribe({
          next: (value) => {
            console.log(value);
            console.log('Кнопку натиснуто');
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
