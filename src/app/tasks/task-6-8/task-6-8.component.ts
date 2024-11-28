import { Component, DestroyRef, inject } from '@angular/core';
import { catchError, interval, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-6-8',
  standalone: true,
  imports: [],
  templateUrl: './task-6-8.component.html',
  styleUrl: './task-6-8.component.css',
})
export class Task68Component {
  //task6
  getSomeData(id: string): Observable<string> {
    return of(`Data for ID: ${id}`);
  }
  getUserData(data: string): Observable<string> {
    return of(`User data based on: ${data}`);
  }

  fetchData(id: string) {
    return this.getSomeData(id)
      .pipe(switchMap((data) => this.getUserData(data)))
      .subscribe({
        // next: (val) => console.log(val),
      });
  }

  // ngOnInit() {
  //   this.fetchData('14');
  // }

  //task7
  subject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  // ngOnInit() {
  //   const sub1 = this.subject.subscribe({
  //     //next: (val) => console.log(val),
  //   });
  //   const sub2 = this.subject.pipe(map((val) => val.toUpperCase())).subscribe({
  //     //next: (val) => console.log(val),
  //   });

  //   this.subject.next('Hello World');

  //   this.destroyRef.onDestroy(() => {
  //     sub1.unsubscribe();
  //     sub2.unsubscribe();
  //   });

  //   //task6
  //   this.fetchData('14');
  // }

  //task8
  // В цьому випадку потік буде завершено,
  //але ми маємо можливість обробити помилку і передати запасні дані.

  // observable = new Observable((subs) => {
  //   const randomValue = Math.random();
  //   if (randomValue < 0.3) {
  //     subs.error('Error!!!!!');
  //   } else {
  //     subs.next(randomValue);
  //   }
  // }).pipe(
  //   catchError((err) => {
  //     console.log(err);
  //     return of(1, 2, 3, 4);
  //   })
  // );
  // result = this.observable.subscribe({
  //   next: (val) => console.log(val),
  // });

  observable = new Observable<number>((subs) => {
    const randomValue = Math.random();
    if (randomValue < 0.3) {
      subs.error('Error!!!!!');
    } else {
      subs.next(randomValue);
      subs.complete();
    }
  });

  ngOnInit() {
    const subscription = interval(2000)
      .pipe(
        switchMap(() =>
          this.observable.pipe(
            catchError((error) => {
              console.error(error);
              return of(0);
            })
          )
        )
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
