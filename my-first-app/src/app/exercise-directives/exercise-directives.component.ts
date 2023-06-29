import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise-directives',
  templateUrl: './exercise-directives.component.html',
  styleUrls: ['./exercise-directives.component.css']
})
export class ExerciseDirectivesComponent {
  displayParagraph = false;
  log = [];

  onToggleDisplay() {
    this.displayParagraph = !(this.displayParagraph);
    this.log.push(new Date());
  }

}
