import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  pagedUsers: User[] = [];
  filteredUsers: User[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  searchTerm: string = '';
  selectedWorkoutType: string = 'all';

  // total: any

  constructor() {}

  ngOnInit(): void {
    this.getUsers();
    // this.updatePagedUsers();
  }

  ngAfterViewInit(): void {
    const searchInput = document.getElementById(
      'searchInput'
    ) as HTMLInputElement;
    searchInput.addEventListener('input', (event) => {
      this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.filterUsers();
    });

    const workoutTypeSelect = document.getElementById(
      'workoutType'
    ) as HTMLSelectElement;
    workoutTypeSelect.addEventListener('change', (event) => {
      this.selectedWorkoutType = (event.target as HTMLSelectElement).value;
      this.filterUsers();
    });
  }

  getUsers(): void {
    const storedUsers = localStorage.getItem('userData');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers).map((user: User) => ({
        ...user,
        workouts: user.workouts || [],
      }));
      // this.totalPages = Math.ceil(this.users.length / this.pageSize);
      // this.updatePagedUsers();
      this.filterUsers();
    }
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) => {
      const searchText = this.searchTerm.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.workouts.some(
          (workout) =>
            workout.type.toLowerCase().includes(searchText) ||
            workout.minutes.toString().includes(searchText)
        );
      const matchesWorkoutType =
        this.selectedWorkoutType === 'all' ||
        user.workouts.some(
          (workout) => workout.type === this.selectedWorkoutType
        );

      return matchesSearch && matchesWorkoutType;
    });
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagedUsers();
  }

  updatePagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);

    console.log('Current Page:', this.currentPage);
    console.log('Start Index:', startIndex);
    console.log('End Index:', endIndex);
    console.log('Paged Users:', this.pagedUsers);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedUsers();
    }
  }
}
