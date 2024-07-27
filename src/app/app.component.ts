import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./MyComponents/nav/nav.component";
import { BodyyComponent } from "./MyComponents/bodyy/bodyy.component";
import { AddWorkoutComponent } from "./MyComponents/add-workout/add-workout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, BodyyComponent, AddWorkoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HealthWorkout';
}
