import { Component } from '@angular/core';
import {
  concatMap,
  delay,
  exhaustMap,
  from,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-task-12',
  standalone: true,
  imports: [],
  templateUrl: './task-12.component.html',
  styleUrl: './task-12.component.css',
})
export class Task12Component {
  oneSecondSource = of('1 second http request').pipe(delay(1000));
  twoSecondSource = of('2 second http request').pipe(delay(2000));
  threeSecondSource = of('3 second http request').pipe(delay(3000));
  fourSecondSource = of('4 second http request').pipe(delay(4000));
  fiveSecondSource = of('5 second http request').pipe(delay(5000));

  sources = [
    this.oneSecondSource,
    this.twoSecondSource,
    this.threeSecondSource,
    this.fourSecondSource,
  ];
  ngOnInit() {
    from(this.sources)
      .pipe(switchMap((source) => source))
      .subscribe({
        //next: (val) => console.log(val),
      });

    //видасть лише результат останнього стріму,
    //не залежно від часу затримки (якщо змінити порядок).

    from(this.sources)
      .pipe(mergeMap((source) => source))
      .subscribe({
        //next: (val) => console.log(val),
      });

    //порядку розташування стрімів у sources не впливає на порядок виведення результату.
    //Оскільки всі стріми виконуються одночасно то порядок вивведення результату залежить тільки від часу затримки.

    from(this.sources)
      .pipe(concatMap((source) => source))
      .subscribe({
        //next: (val) => console.log(val),
      });
    //порядку розташування стрімів у sources впливає на порядок виведення результату.
    //Оскільки стріми виконуються послідовно один за одним. Кожен стрім виконуєьбся тільки після завершення попереднього.

    from(this.sources)
      .pipe(exhaustMap((source) => source))
      .subscribe({
        //next: (val) => console.log(val),
      });
    //видасть лише результат першого стріму, не залежно від порядку розташування стрімів у sources,
    //всі інші проігноруються поки не виконається перший.

    this.fiveSecondSource
      .pipe(
        //tap((value) => console.log(value)),
        exhaustMap(() =>
          from(this.sources).pipe(exhaustMap((source) => source))
        )
      )
      .subscribe({
        //next: (val) => console.log(val),
      });
    //виконається fiveSecondSource з затримкою в 5 секунд,
    //після чого виконається тільки перший із вкладениї стрімів
  }
}
