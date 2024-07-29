import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AddWorkoutComponent } from './add-workout.component';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkoutComponent],
      // declarations: [AddWorkoutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapsot: {paramMap: {get : () => 'test-value'}}}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not submit form with invalid values', () => {
    component.workoutForm.setValue({
      name: '', // Empty name
      workoutType: '', 
      duration: '' 
    });
    component.onSubmit();
    let userData = JSON.parse(localStorage.getItem('userData') || '[]');
    expect(userData.length).toBe(0); // No data should be saved
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
