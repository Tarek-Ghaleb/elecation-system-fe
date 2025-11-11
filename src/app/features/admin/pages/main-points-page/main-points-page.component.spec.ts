import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPointsPageComponent } from './main-points-page.component';

describe('MainPointsPageComponent', () => {
  let component: MainPointsPageComponent;
  let fixture: ComponentFixture<MainPointsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPointsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
