import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";

interface People {
  id: string;
  name: string;
}

@Injectable()
export class PeopleService {
  private people: People[] = [
    { id: 'fecd409b-1c9c-4b4d-bd63-d3d308d36035', name: 'Allan' },
    { id: '42cd4f85-0411-49be-a02c-7271c03fc596', name: 'Júlia' },
    { id: '77fe480f-2fb1-43da-bbb7-2f0ef3c2df3c', name: 'Bernardo' },
  ];

  public getPeople(): People[] {
    return this.people;
  }

  public addPerson(
    name: string
  ): People {
    const newPerson = { id: uuidv4(), name };
    this.people.push(newPerson);
    return newPerson;
  }

  public updatePerson(
    id: string,
    name: string
  ): People {
    const personIndex = this.people.findIndex(person => person.id === id);
    if (personIndex === -1) {
      throw new Error('Person not found');
    }

    this.people[personIndex].name = name;
    return this.people[personIndex];
  }

  public deletePerson(
    id: string
  ) {
    const personIndex = this.people.findIndex(person => person.id === id);
    if (personIndex === -1) {
      throw new Error('Person not found');
    }

    return this.people.splice(personIndex, 1);
  }
}
