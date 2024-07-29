import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BodyyComponent } from './bodyy.component';

describe('BodyyComponent', () => {
  let component: BodyyComponent;
  let fixture: ComponentFixture<BodyyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyyComponent],
      // declarations: [BodyyComponent]
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapsot: {paramMap: {get : () => 'test-value'}}}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
