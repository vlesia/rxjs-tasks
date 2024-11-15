import { Component } from '@angular/core';
import {
  catchError,
  from,
  interval,
  mergeMap,
  of,
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
  //oneSource = throwError(() => new Error('1 second http request failed'))
  oneSource = of('1 second http request');
  twoSource = of('2 second http request');
  threeSource = of('3 second http request');

  sources = [this.oneSource, this.twoSource, this.threeSource];

  ngOnInit() {
    from(this.sources)
      .pipe(
        mergeMap((source) =>
          source.pipe(
            catchError((err) => {
              console.log(err);
              return throwError(() => new Error('Stopping the stream'));
            })
          )
        )
      )
      .subscribe({
        next: (val) => console.log(val),
        error: (err) => console.log(err.message),
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
      next: (val) => console.log(val),
    });
}
