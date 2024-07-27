import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyyComponent } from './bodyy.component';

describe('BodyyComponent', () => {
  let component: BodyyComponent;
  let fixture: ComponentFixture<BodyyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyyComponent]
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
