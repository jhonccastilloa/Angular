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
    this.initData();
  }

  initData() {
    const peopleStorage = localStorage.getItem('people');
    const favoritePeopleStorage = localStorage.getItem('favoritePeople');

    this.favoritePeople = favoritePeopleStorage
      ? JSON.parse(favoritePeopleStorage)
      : [];
    this.newPeople = peopleStorage
      ? JSON.parse(peopleStorage)
      : people.map((person) => ({
          isChecked: false,
          ...person,
        }));
  }
  addFavorite(person: Person) {
    this.favoritePeople = person.isChecked
      ? [...this.favoritePeople, person]
      : this.favoritePeople.filter((per) => per.id !== person.id);
    DOMException;
    this.onLocalStorage();
  }

  removeFavorite(person: Person) {
    this.favoritePeople = this.favoritePeople.filter(
      (per) => per.id !== person.id
    );
    this.onLocalStorage();
    return this.favoritePeople;
  }

  onLocalStorage() {
    console.log(this.newPeople)
    localStorage.setItem('favoritePeople', JSON.stringify(this.favoritePeople));
    localStorage.setItem('people', JSON.stringify(this.newPeople));
  }
}
