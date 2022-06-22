import { Component, Input } from '@angular/core';

import { TeamService } from '../services/team.service';

import { Team } from 'src/app/models/Team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  @Input() teams : Team[] = [];
  
  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  } 
  

  /**
   * Delete team (disused team in persons)
   * 
   * @param teamIndex 
   */
  deleteTeam(teamIndex: number) {
    this.teamService.removeTeam(teamIndex);
  }

  /**
   * Delete person in the team's staff list
   * @param teamIndex 
   * @param personIndex 
   */
  deletePersonOfTeam(teamIndex: number, personIndex: number) {
    let person = this.teamService.getPersonsInTeam(teamIndex)[personIndex];
    person.hasTeam = false;

    this.teamService.removePersonInTeam(teamIndex, person.id);
  }
}