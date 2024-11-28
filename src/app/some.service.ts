import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

const mockUsers = [
  { id: 1, name: 'Philip', age: 22 },
  { id: 2, name: 'Liam', age: 20 },
  { id: 3, name: 'Emma', age: 18 },
  { id: 4, name: 'Charlotte', age: 32 },
];

export interface IUser {
  id: number;
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class SomeService {
  constructor() {}

  public getSomeData(id: string): Observable<any> {
    return of(id).pipe(delay(1000));
  }

  public getUserData(id: string): Observable<IUser | undefined> {
    return of<IUser[]>(mockUsers).pipe(
      delay(1500),
      map((u) => {
        return u.find((user: IUser) => user.id === +id);
      })
    );
  }

  public getMetadata(name: string): Observable<string> {
    return of(name);
  }
}
