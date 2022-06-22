import { Component, OnInit } from '@angular/core';

// Service
import { TeamService } from './services/team.service';
import { PersonService } from './services/person.service';

// Models
import { Team } from 'src/app/models/Team';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'tp-teams';
  
  personId =  0;
  teamName = "";

  persons : Person[] = [];
  teams : Team[] = [];
  
  firstname = "";
  lastname = "";
  teamIndex = -1;
  
  constructor(private teamService: TeamService, private personService: PersonService) {}  
  
  ngOnInit() {
    // Initialize services
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
    this.personService.getPersons().subscribe(persons => this.persons = persons);

    let dernier = this.persons.length - 1; // indice du dernier

    if (dernier == -1) {
      this.personId = 0;
    } else {
      this.personId = this.persons[dernier].id;
    }
  }

  createTeam() {
    this.teamService.addTeam(new Team(this.teamName));
    
    // Clear input
    this.teamName = ""; 
  }


  createPerson() {
    this.personId++; // on incrémente l id
    
    let person = new Person(this.personId, this.firstname, this.lastname);
    this.personService.addPerson(person);

    // Clear inputs
    this.lastname = ""; 
    this.firstname = ""; 

    if (this.teamIndex != -1) {
      person.hasTeam = true;
      this.teamService.addPersonInTeam(this.teamIndex, person);
      
      // Initialize the input value
      this.teamIndex = -1;
    }

    console.log(this.teams);
  }
}
