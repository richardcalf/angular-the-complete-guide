import { Component } from '@angular/core';

@Component({
  selector: 'app-databinding-exercise',
  templateUrl: './databinding-exercise.component.html',
  styleUrls: ['./databinding-exercise.component.css']
})
export class DatabindingExerciseComponent {
  username = "";

  onResetUserName() {
    this.username = "";
  }
}
