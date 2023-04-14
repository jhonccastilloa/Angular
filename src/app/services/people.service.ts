import { Injectable } from '@angular/core';
import { people } from '../data/people.data';
import { Person } from '../models/people.models';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  newPeople: Person[] = [];
  favoritePeople: Person[] = [];
  constructor() {
    this.newPeople = people.map((person) => ({
      isChecked: false,
      ...person,
    }));
  }

  addFavorite(person: Person) {
    this.favoritePeople = person.isChecked
      ? [...this.favoritePeople, person]
      : this.favoritePeople.filter((per) => per.id !== person.id);
  }
}
