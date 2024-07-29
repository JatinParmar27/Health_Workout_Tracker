import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

class Workout {
  constructor(
    public type: string,
    public minutes: number
  ) {}
}

class User {
  constructor(
    public id: number,
    public name: string,
    public workouts: Workout[]
  ) {}
}

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent {
  workoutForm: FormGroup;
  userId: number = 1; // Replace with logic to get a unique user ID

  constructor(private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      workoutType: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const workoutData = new Workout(
        this.workoutForm.value.workoutType,
        parseInt(this.workoutForm.value.duration, 10)
      );

      let userData = JSON.parse(localStorage.getItem('userData') || '[]');
      let user = userData.find((u: User) => u.name === this.workoutForm.value.name);

      if (user) {
        user.workouts.push(workoutData);
      } else {
        user = new User(
          this.userId++,
          this.workoutForm.value.name,
          [workoutData]
        );
        userData.push(user);
      }

      localStorage.setItem('userData', JSON.stringify(userData));
      
      console.log('Workout saved:', userData);

      // Call functions to update table and chart if needed
      this.updateTable();
      this.updateChart();
    }
  }

  updateTable(): void {
    // Implement table update logic here
  }

  updateChart(): void {
    // Implement chart update logic here
  }
}