import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private generatedIDs = new Set<number>();
  private users = new BehaviorSubject<User[]>([
    {
      id: 1,
      name: 'Felipe',
      lastName: 'Arias',
      email: 'felipe.arias@gmail.com',
      password: '123123123',
    },
    {
      id: 2,
      name: 'Juan',
      lastName: 'Perez',
      email: 'jperez@gmail.com',
      password: '123123123',
    },
  ]);

  constructor() {
    this.users.getValue().forEach((user) => this.generatedIDs.add(user.id));
  }

  public getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  public getUserById(id: number): Observable<User | undefined> {
    return this.users.pipe(
      take(1),
      map((users) => users.find((user) => user.id === id))
    );
  }

  public createUser(newUser: User): void {
    this.users.next([
      ...this.users.value,
      {
        id: this.generateUniqueID(),
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      },
    ]);
  }

  public editUser(userToUpdate: User): void {
    this.users.next(
      this.users.getValue().map((user: User) => {
        return user.id === userToUpdate.id ? userToUpdate : user;
      })
    );
  }

  public deleteUser(userId: number): void {
    this.users.next(this.users.getValue().filter((user) => user.id !== userId));
  }

  private generateUniqueID(): number {
    const randomNumber = Math.floor(Math.random() * 1000);
    if (this.generatedIDs.has(randomNumber)) {
      return this.generateUniqueID();
    }
    this.generatedIDs.add(randomNumber);
    return randomNumber;
  }
}
