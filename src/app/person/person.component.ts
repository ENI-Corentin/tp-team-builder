import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { PersonService } from '../services/person.service';

import { Team } from 'src/app/models/Team';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnChanges {

  @Input() teams : Team[] = [];
  @Input() teamIndex : number = -1;
  @Input() persons : Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    // Initialize services
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  } 

  ngOnChanges(_changes: SimpleChanges): void {}

  /**
   * Get persons who aren't affected in one team
   * 
   * @returns Persons[]
   */
  getAvailablePersons(): Person[] {
    return this.persons.filter((person)=> !person.hasTeam);
  }

  /**
   * Delete person of staff list
   * 
   * @param personIndex 
   */
  deletePerson(personIndex: number) {
    this.personService.removePerson(personIndex);
  }
}