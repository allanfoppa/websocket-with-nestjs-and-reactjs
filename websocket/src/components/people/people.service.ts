import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PeopleService {
  private people: { id: string; name: string }[] = [
    { id: 'fecd409b-1c9c-4b4d-bd63-d3d308d36035', name: 'Allan' },
    { id: '42cd4f85-0411-49be-a02c-7271c03fc596', name: 'Júlia' },
    { id: '77fe480f-2fb1-43da-bbb7-2f0ef3c2df3c', name: 'Bernardo' },
  ];

  getPeople(): { id: string; name: string }[] {
    return this.people;
  }

  addPerson(name: string): { id: string; name: string } {
    const newPerson = { id: uuidv4(), name };
    this.people.push(newPerson);
    return newPerson;
  }

  updatePerson(id: string, newName: string): { id: string; name: string } {
    const personIndex = this.people.findIndex(person => person.id === id);
    if (personIndex === -1) {
      throw new Error('Person not found');
    }
    this.people[personIndex].name = newName;
    return this.people[personIndex];
  }

  deletePerson(id: string) {
    const personIndex = this.people.findIndex(person => person.id === id);
    if (personIndex === -1) {
      throw new Error('Person not found');
    }
    return this.people.splice(personIndex, 1);
  }
}
