import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warningalert/warningalert.component';
import { SuccessAlertComponent } from './successalert/successalert.component';
import { ExerciseDatabindingComponent } from './exercise-databinding/databinding-exercise.component';
import { ExerciseDirectivesComponent } from './exercise-directives/exercise-directives.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ExerciseDatabindingComponent,
    ExerciseDirectivesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
