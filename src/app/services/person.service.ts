import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TeamService } from './team.service';

import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  persons: Person[] = [];

  constructor(private teamService: TeamService) { }
  
  /**
   * Get staff list
   * @returns Observable<Person[]
   */
  getPersons(): Observable<Person[]> {   
    return of(this.persons);
  }

  /**
   * Get person in the staff list
   * 
   * @param index
   * @returns Person 
   */
  getPerson(index: number): Person {   
    return this.persons[index];
  }

  /**
   * Add person in the staff list
   * 
   * @param person 
   */
  addPerson(person: Person): void {
    this.persons.push(person);
  }

  /**
   * Remove person in the staff list
   * @param index 
   */
  removePerson(index: number): void {
    this.persons.splice(index, 1);
  }
}
