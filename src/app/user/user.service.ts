import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: BehaviorSubject<User[]>;
  users: Array<User> = [];
  id: number = 10;
  constructor() {
    this.users$ = new BehaviorSubject([]);
    this.users = this.usersData;
  }

  getAll() {
    this.users$.next(this.users);
  }

  add(user: User) {
    this.id++;
    user.id = this.id;
    this.users.push(user);
    this.users$.next(this.users);
  }

  edit(user: User) {
    let findElem = this.users.find((p) => p.id == user.id);
    findElem.name = user.name;
    findElem.dateOfBirth = user.dateOfBirth;
    findElem.job = user.job;
    findElem.description = user.description;
    findElem.gender = user.gender;
    this.users$.next(this.users);
  }

  remove(id: number) {
    this.users = this.users.filter((p) => {
      return p.id != id;
    });

    this.users$.next(this.users);
  }

  usersData: User[] = [
    new User(1, 'User A', new Date('2009-01-16'), 'male', 'Software Developer', 'I am Software Developer'),
    new User(2, 'User B', new Date('2010-02-16'), 'female', 'Dentist', 'I am Dentist'),
    new User(3, 'User C', new Date('2011-03-16'), 'male','Physician Assistant', 'Physician Assistant'),
    new User(4, 'User D', new Date('2012-04-16'), 'female','Software Developer', 'I am Software Developer'),
    new User(5, 'User E', new Date('2012-05-16'), 'male','Software Developer', 'I am Software Developer'),
    new User(6, 'User F', new Date('2013-06-16'),'female', 'Nurse', 'I am Nurse'),
    new User(7, 'User H', new Date('2011-07-16'),'female', 'Software Developer', 'I am Software Developer'),
    new User(8, 'User J', new Date('2014-08-16'), 'male','Physician', 'I am Physician'),
    new User(9, 'User K', new Date('2007-09-16'), 'female','Software Developer', 'I am Software Developer'),
    new User(10, 'User L', new Date('2009-11-16'), 'male','Software Developer', 'I am Software Developer')
  ];
}
