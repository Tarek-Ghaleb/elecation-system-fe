import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUserPageComponent } from './school-user-page.component';

describe('SchoolUserPageComponent', () => {
  let component: SchoolUserPageComponent;
  let fixture: ComponentFixture<SchoolUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
