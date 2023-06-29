import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise-directives',
  templateUrl: './exercise-directives.component.html',
  styleUrls: ['./exercise-directives.component.css']
})
export class ExerciseDirectivesComponent {
  displayParagraph = false;
  buttonClicks = 0;
  clicksArray = [];

  onToggleDisplay() {
    this.displayParagraph = !(this.displayParagraph);
    this.buttonClicks++;
    this.clicksArray.push(this.buttonClicks);
  }

}
