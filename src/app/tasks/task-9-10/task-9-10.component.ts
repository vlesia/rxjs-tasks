import { Component } from '@angular/core';
import {
  catchError,
  from,
  interval,
  mergeMap,
  Observable,
  scan,
  takeUntil,
  throwError,
  timer,
  timestamp,
} from 'rxjs';

@Component({
  selector: 'app-task-9-10',
  standalone: true,
  imports: [],
  templateUrl: './task-9-10.component.html',
  styleUrl: './task-9-10.component.css',
})
export class Task910Component {
  //task9
  createSource(value: string): Observable<string> {
    return new Observable((subs) => {
      const randomValue = Math.random();
      if (randomValue < 0.3) {
        subs.error('Error');
      } else {
        subs.next(value);
        subs.complete();
      }
    });
  }

  oneSource = this.createSource('1 second http request');
  twoSource = this.createSource('2 second http request');
  threeSource = this.createSource('3 second http request');

  sources = [this.oneSource, this.twoSource, this.threeSource];

  ngOnInit() {
    from(this.sources)
      .pipe(
        mergeMap((source) =>
          source.pipe(
            catchError((err) =>
              throwError(() => new Error('Stopping the stream'))
            )
          )
        )
      )
      .subscribe({
        // next: (val) => console.log(val),
        // error: (err) => console.log(err.message),
      });
  }

  //task10

  source$ = interval(300)
    .pipe(
      timestamp(),
      scan(
        (acc, curr) => {
          const elapsed = curr.timestamp - acc.startTime;
          return {
            ...curr,
            elapsed,
            startTime: acc.startTime,
          };
        },
        { startTime: Date.now(), elapsed: 0 }
      ),
      takeUntil(timer(2000))
    )
    .subscribe({
      //next: (val) => console.log(val),
    });
}
