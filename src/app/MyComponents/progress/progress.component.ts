import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Chart, registerables } from 'chart.js';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
Chart.register(...registerables);

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavComponent, CommonModule, RouterLink],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  chart: any;

  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  getUsers(): void {
    const storedUsers = localStorage.getItem('userData');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  initializeChart(): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  onUserChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const userId = +selectElement.value;
    const user = this.users.find(u => u.id === userId);

    if (user) {
      const labels = user.workouts.map((workout: Workout) => workout.type);
      const data = user.workouts.map((workout: Workout) => workout.minutes);

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.data.datasets[0].label = `${user.name}'s Workout Minutes`;
      this.chart.update();
    } else {
      this.clearChart();
    }
  }

  clearChart(): void {
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.data.datasets[0].label = '';
    this.chart.update();
  }
}
