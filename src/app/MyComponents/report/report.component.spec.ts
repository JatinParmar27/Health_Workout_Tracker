import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportComponent],
      // declarations: [ReportComponent]
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapsot: { paramMap: { get: () => 'test-value' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter users based on search input', () => {
    // Mock user data
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Cycling', minutes: 45 }] },
    ];
    component.searchTerm = 'john'; // Simulate search input
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1); // Only John Doe should match
  });

  it('should filter users based on workout type', () => {
    // Mock user data
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Cycling', minutes: 45 }] },
    ];
    component.selectedWorkoutType = 'Cycling'; // Simulate workout type filter
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1); // Only Jane Doe should match
  });

  it('should correctly paginate users', () => {
    // Mock user data
    component.users = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      workouts: [{ type: 'Running', minutes: 30 }],
    }));
    // Simulate a search term that matches all users
    component.searchTerm = '';
    component.filterUsers(); // This will update filteredUsers
    component.updatePagedUsers(); // This should populate pagedUsers based on currentPage and pageSize

    expect(component.pagedUsers.length).toBe(5); // Expecting 5 users on the first page

    // Simulate page change
    component.nextPage();
    component.updatePagedUsers(); // Update pagedUsers after changing the page

    expect(component.currentPage).toBe(2); // Expecting the currentPage to be 2 after nextPage call
    expect(component.pagedUsers.length).toBe(5); // Expecting 5 users on the second page
  });

  it('should calculate total workout minutes correctly', () => {
    const workouts = [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ];
    expect(component.getTotalMinutes(workouts)).toBe(75); // 30 + 45 = 75
  });

  it('should handle no users gracefully', () => {
    component.users = [];
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(0); // No users should be displayed
  });

  it('should show all users when search term is empty', () => {
    component.users = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Cycling', minutes: 45 }] },
    ];
    component.searchTerm = ''; // Empty search term
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(2); // Should show both users
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
