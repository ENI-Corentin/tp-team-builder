import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../models/Person';

import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams: Team[] = [];

  constructor() { }

   /**
   * Get teams list
   * @returns Observable<Team[]
   */
  getTeams(): Observable<Team[]> {   
    return of(this.teams);
  }

  /**
   * Get team in the teams list
   * 
   * @param index
   * @returns Team 
   */
  getTeam(index: number): Team {
    return this.teams[index];
  }

  /**
   * Add team in the teams list
   * 
   * @param team 
   */
  addTeam(team: Team): void {
    this.teams.push(team);
  }

  /**
   * Remove team in the teams list
   * @param index 
   */
  removeTeam(index: number): void {
    this.getPersonsInTeam(index).forEach(person => person.hasTeam = false);
    
    this.teams.splice(index, 1);
  }

  /**
   * Get staff list of a team
   * @param index 
   */
  getPersonsInTeam(index: number) {
    return this.getTeam(index).persons;
  }

  /**
   * Add person in the staff list of a team
   * 
   * @param index 
   * @param person 
   */
   addPersonInTeam(teamIndex: number, person: Person): void {
    this.getTeam(teamIndex).persons.push(person);
  }

  /**
   * Remove person in the staff list of a team
   * @param teamIndex 
   * @param id 
   */
  removePersonInTeam(teamIndex: number, id: number): void {
    let index = this.getPersonsInTeam(teamIndex).findIndex(person => person.id == id);
    this.getPersonsInTeam(teamIndex).splice(index, 1);
  }
}
